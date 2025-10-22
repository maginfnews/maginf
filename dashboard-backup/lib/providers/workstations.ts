import { BackupProvider, BackupItem, BackupStatus } from '../types';
import { mapGenericStatus, mapType, toISO, generateId } from '../utils';

interface WorkstationApiResponse {
  items?: Array<{
    name: string;
    type?: string;
    status: string;
    lastRunAt?: string;
    [key: string]: any;
  }>;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
}

export class WorkstationProvider implements BackupProvider {
  private baseUrl = process.env.B_API_BASE!;
  private token = process.env.B_API_TOKEN!;
  
  // Mapeamento configurável via ENV (opcional)
  private fieldMapping = {
    name: process.env.B_FIELD_NAME || 'name',
    type: process.env.B_FIELD_TYPE || 'type', 
    status: process.env.B_FIELD_STATUS || 'status',
    lastRunAt: process.env.B_FIELD_LAST_RUN || 'lastRunAt'
  };

  async listStatus({ 
    partnerId, 
    q, 
    status, 
    page = 1, 
    pageSize = 200 
  }: {
    partnerId: string | number;
    q?: string;
    status?: BackupStatus;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: BackupItem[]; total: number }> {
    
    try {
      // Construir URL com parâmetros
      const url = new URL(`${this.baseUrl}/backups`);
      url.searchParams.set("partnerId", String(partnerId));
      url.searchParams.set("page", String(page));
      url.searchParams.set("pageSize", String(pageSize));
      
      if (q) {
        url.searchParams.set("q", q);
      }
      
      if (status) {
        // Mapear status interno para o que a API B espera
        const externalStatus = this.mapStatusToExternal(status);
        if (externalStatus) {
          url.searchParams.set("status", externalStatus);
        }
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Workstation API failed: ${response.statusText}`);
      }

      const data: WorkstationApiResponse = await response.json();
      
      const rawItems = data.items ?? [];
      
      const items: BackupItem[] = rawItems.map((item: any) => {
        const name = item[this.fieldMapping.name] || "unknown";
        const type = item[this.fieldMapping.type];
        const status = item[this.fieldMapping.status];
        const lastRunAt = item[this.fieldMapping.lastRunAt];
        
        return {
          id: generateId("workstation", name),
          deviceName: name,
          kind: mapType(type),
          source: 'A' as const,
          lastStatus: mapGenericStatus(status),
          lastCompletedAt: toISO(lastRunAt),
          raw: item
        };
      });

      // Filtros client-side adicionais (se a API não suportar)
      let filteredItems = items;
      
      if (q && !url.searchParams.has("q")) {
        const searchTerm = q.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.deviceName.toLowerCase().includes(searchTerm)
        );
      }
      
      if (status && !url.searchParams.has("status")) {
        filteredItems = filteredItems.filter(item => 
          item.lastStatus === status
        );
      }

      return { 
        items: filteredItems, 
        total: data.meta?.total ?? filteredItems.length 
      };
      
    } catch (error) {
      console.error('WorkstationProvider error:', error);
      // Em caso de erro, retornar array vazio para não quebrar o dashboard
      return { items: [], total: 0 };
    }
  }

  // Mapear status interno para formato da API externa
  private mapStatusToExternal(status: BackupStatus): string | null {
    const mapping: Record<BackupStatus, string> = {
      Success: "success",
      Failed: "failed", 
      CompletedWithErrors: "warning",
      InProgress: "running",
      NeverRun: "never",
      Unknown: "unknown"
    };
    
    return mapping[status] || null;
  }
}
