import { NextRequest, NextResponse } from "next/server";
import { CoveProvider } from "@/lib/providers/cove";
import { BackupResponse, BackupStatus } from "@/lib/types";
import { calculateKPIs, sanitizeString, sanitizeNumber } from "@/lib/utils";
import { headers } from 'next/headers';

// Rate limiting simples (em produção, usar Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 60; // requests por minuto
const RATE_WINDOW = 60 * 1000; // 1 minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { partnerId: string } }
) {
  try {
    // Rate limiting
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Sanitizar e validar parâmetros
    const partnerId = sanitizeString(params.partnerId);
    if (!partnerId) {
      return NextResponse.json(
        { error: 'Partner ID is required' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    
    const q = sanitizeString(searchParams.get("q") || undefined);
    const status = searchParams.get("status") as BackupStatus | null;
    const page = sanitizeNumber(searchParams.get("page") || "1");
    const pageSize = Math.min(
      sanitizeNumber(searchParams.get("pageSize") || "50"), 
      200 // Máximo 200 por página
    );

    // Validar status se fornecido
    const validStatuses: BackupStatus[] = [
      "Success", "Failed", "CompletedWithErrors", 
      "InProgress", "NeverRun", "Unknown"
    ];
    
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status parameter' },
        { status: 400 }
      );
    }

    // Executar chamada apenas para o Cove Provider (N-able)
    try {
      const coveProvider = new CoveProvider();
      const result = await coveProvider.listStatus({ 
        partnerId, 
        q, 
        status: status || undefined, 
        page, 
        pageSize 
      });

      const allItems = result.items;
      const totalCount = result.total;

      // Calcular KPIs
      const kpis = calculateKPIs(allItems);

      // Ordenar por nome do dispositivo
      allItems.sort((a, b) => a.deviceName.localeCompare(b.deviceName));

      // Paginação final (se necessário)
      const startIndex = (page - 1) * pageSize;
      const paginatedItems = allItems.slice(startIndex, startIndex + pageSize);

      const response: BackupResponse = {
        items: paginatedItems,
        meta: {
          total: totalCount,
          page,
          pageSize,
          lastSyncAt: new Date().toISOString()
        },
        kpis
      };

      return NextResponse.json(response);
      
    } catch (coveError) {
      console.error('Cove Provider error:', coveError);
      
      // Retornar resposta vazia em caso de erro
      const emptyResponse: BackupResponse = {
        items: [],
        meta: {
          total: 0,
          page,
          pageSize,
          lastSyncAt: new Date().toISOString()
        },
        kpis: {
          total: 0,
          success: 0,
          warnings: 0,
          failed: 0,
          inProgress: 0,
          neverRun: 0
        }
      };

      return NextResponse.json(emptyResponse);
    }
    
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? 
          (error as Error).message : 'Something went wrong'
      },
      { status: 500 }
    );
  }
}

// Método OPTIONS para CORS (se necessário)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
