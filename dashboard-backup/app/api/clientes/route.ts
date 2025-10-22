import { NextRequest, NextResponse } from "next/server";
import { CoveProvider } from "@/lib/providers/cove";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentPartnerId = searchParams.get("parentPartnerId");
    
    const coveProvider = new CoveProvider();
    
    // Listar clientes/partners
    const partners = await coveProvider.listPartners(
      parentPartnerId ? Number(parentPartnerId) : undefined
    );
    
    // Transformar para formato mais amigável
    const clients = partners.map(partner => ({
      id: partner.Id,
      name: partner.Name,
      level: partner.Level,
      state: partner.State,
      parentId: partner.ParentId,
      serviceType: partner.ServiceType,
      childServiceTypes: partner.ChildServiceTypes || [],
      locationId: partner.LocationId,
      company: partner.Company,
      creationTime: partner.CreationTime
    }));
    
    // Filtrar apenas EndCustomers para o dashboard
    const endCustomers = clients.filter(client => 
      client.level === 'EndCustomer' || client.level === 'SubDistributor'
    );
    
    return NextResponse.json({
      clients: endCustomers,
      total: endCustomers.length,
      allPartners: clients.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('API /clientes error:', error);
    
    // Retornar dados de demonstração em caso de erro
    const demoClients = [
      {
        id: 123,
        name: "Empresa Demo A",
        level: "EndCustomer",
        state: "Registered",
        serviceType: "AllInclusive"
      },
      {
        id: 456,
        name: "Empresa Demo B", 
        level: "EndCustomer",
        state: "InTrial",
        serviceType: "SoftwareOnly"
      },
      {
        id: 789,
        name: "Empresa Demo C",
        level: "EndCustomer", 
        state: "Registered",
        serviceType: "AllInclusive"
      }
    ];
    
    return NextResponse.json({
      clients: demoClients,
      total: demoClients.length,
      demo: true,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
