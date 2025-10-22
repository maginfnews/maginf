import { NextRequest, NextResponse } from "next/server";
import { MaginfPlatformProvider } from "@/lib/providers/maginf-platform";

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 API /maginf/clientes - Iniciando busca de clientes...');
    
    const maginfProvider = new MaginfPlatformProvider();
    
    // Verificar conexão primeiro
    const connectionStatus = await maginfProvider.checkConnection();
    
    if (!connectionStatus.connected) {
      console.log('❌ Conexão com MAGINF falhou:', connectionStatus.message);
      
      // Retornar dados de demonstração
      const demoClients = [
        {
          id: 123001,
          name: 'Empresa Alpha Ltda',
          email: 'contato@alpha.com.br',
          company: 'Alpha Tecnologia',
          level: 'EndCustomer',
          state: 'Registered',
          serviceType: 'AllInclusive',
          devices: 5,
          lastBackup: '2025-10-20T18:30:00Z',
          backupStatus: 'Success'
        },
        {
          id: 123002,
          name: 'Beta Soluções',
          email: 'admin@beta.com.br',
          company: 'Beta Consultoria',
          level: 'EndCustomer',
          state: 'Registered',
          serviceType: 'SoftwareOnly',
          devices: 3,
          lastBackup: '2025-10-20T17:45:00Z',
          backupStatus: 'CompletedWithErrors'
        },
        {
          id: 123003,
          name: 'Gamma Indústria',
          email: 'ti@gamma.com.br',
          company: 'Gamma Manufacturing',
          level: 'EndCustomer',
          state: 'InTrial',
          serviceType: 'AllInclusive',
          devices: 8,
          lastBackup: '2025-10-19T22:30:00Z',
          backupStatus: 'Failed'
        }
      ];
      
      return NextResponse.json({
        clients: demoClients,
        total: demoClients.length,
        demo: true,
        error: connectionStatus.message,
        provider: 'MAGINF Platform (Demo)',
        timestamp: new Date().toISOString()
      });
    }
    
    // Buscar clientes reais da MAGINF
    console.log('✅ Conexão OK - Buscando clientes reais...');
    const clients = await maginfProvider.listClients();
    
    // Enriquecer dados com estatísticas de backup (opcional, pode ser lento)
    const { searchParams } = new URL(request.url);
    const includeStats = searchParams.get('includeStats') === 'true';
    
    if (includeStats && clients.length > 0) {
      console.log('📊 Incluindo estatísticas de backup...');
      
      for (const client of clients.slice(0, 5)) { // Limitar a 5 para não sobrecarregar
        try {
          const stats = await maginfProvider.getClientBackupStats(client.id);
          client.devices = stats.totalDevices;
          client.lastBackup = stats.lastBackup || undefined;
          client.backupStatus = stats.successfulBackups > 0 ? 'Success' : 
                              stats.failedBackups > 0 ? 'Failed' : 'Unknown';
        } catch (error) {
          console.log(`⚠️ Erro ao obter stats do cliente ${client.id}:`, error);
        }
      }
    }
    
    console.log(`✅ ${clients.length} clientes MAGINF encontrados`);
    
    return NextResponse.json({
      clients: clients,
      total: clients.length,
      demo: false,
      provider: 'MAGINF Platform',
      connection: connectionStatus,
      timestamp: new Date().toISOString(),
      includeStats: includeStats
    });
    
  } catch (error) {
    console.error('❌ Erro na API /maginf/clientes:', error);
    
    // Fallback para dados de demonstração
    const demoClients = [
      {
        id: 123001,
        name: 'Empresa Alpha Ltda - DEMO',
        email: 'demo@alpha.com.br',
        company: 'Alpha Tecnologia (Demo)',
        level: 'EndCustomer',
        state: 'Registered',
        serviceType: 'AllInclusive'
      }
    ];
    
    return NextResponse.json({
      clients: demoClients,
      total: demoClients.length,
      demo: true,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      provider: 'MAGINF Platform (Error Fallback)',
      timestamp: new Date().toISOString()
    });
  }
}
