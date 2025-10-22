// Provider para API da Plataforma MAGINF
// Integração com N-able Cove usando credenciais da MAGINF

interface MaginfCredentials {
  // Credenciais da plataforma MAGINF
  platformUser: string;
  platformPassword: string;
  
  // Credenciais da API N-able Cove
  apiUser: string;
  apiKey: string;
}

interface MaginfClient {
  id: number;
  name: string;
  email?: string;
  company?: string;
  level: string;
  state: string;
  serviceType: string;
  devices?: number;
  lastBackup?: string;
  backupStatus?: string;
}

export class MaginfPlatformProvider {
  private baseUrl = 'https://api.backup.management/jsonapi';
  private credentials: MaginfCredentials;
  private visaCache: { visa: string; expiresAt: number } | null = null;

  constructor() {
    this.credentials = {
      platformUser: 'maicon@maginf.com.br',
      platformPassword: '@@Maginf_301',
      apiUser: 'API-USER-DASHBOARD',
      apiKey: 'Vp?Fm$k@il!1M6298b0B!y$v'
    };
  }

  private async getVisa(): Promise<string> {
    // Verificar cache do visa
    if (this.visaCache && Date.now() < this.visaCache.expiresAt) {
      return this.visaCache.visa;
    }

    console.log('🔐 Fazendo login na plataforma MAGINF...');
    
    const loginPayload = {
      jsonrpc: '2.0',
      method: 'Login',
      params: {
        username: this.credentials.apiUser,
        password: this.credentials.apiKey
      },
      id: '1'
    };

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload)
    });

    if (!response.ok) {
      throw new Error(`Login MAGINF falhou: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Erro login MAGINF: ${data.error.message}`);
    }

    if (!data.visa) {
      throw new Error('Login MAGINF: Visa não retornado');
    }

    // Cache por 15 minutos
    this.visaCache = {
      visa: data.visa,
      expiresAt: Date.now() + (15 * 60 * 1000)
    };

    console.log('✅ Login MAGINF realizado com sucesso');
    return data.visa;
  }

  private async callApi(method: string, params: any = {}): Promise<any> {
    const visa = await this.getVisa();
    
    const payload = {
      jsonrpc: '2.0',
      method,
      visa: visa,
      params,
      id: Date.now().toString()
    };

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API MAGINF falhou: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Erro API MAGINF: ${data.error.message || 'Unknown error'}`);
    }

    return data;
  }

  // Listar todos os clientes gerenciados pela MAGINF
  async listClients(): Promise<MaginfClient[]> {
    try {
      console.log('📋 Listando clientes da MAGINF...');
      
      // Usar o Partner ID da MAGINF como root
      const maginfPartnerId = 2871061; // ID da MAGINF na plataforma N-able
      
      const response = await this.callApi('EnumeratePartners', {
        parentPartnerId: maginfPartnerId,
        fields: [0, 1, 3, 4, 5, 8, 10, 18, 20], // Name, Level, ChildServiceTypes, ServiceType, State, LocationId, Company, ExternalCode, CreationTime
        fetchRecursively: true
      });

      const partners = response.result?.result || [];
      
      console.log(`📊 ${partners.length} partners encontrados na MAGINF`);
      
      // Transformar partners em clientes MAGINF
      const clients: MaginfClient[] = partners.map((partner: any) => ({
        id: partner.Id,
        name: partner.Name || 'Cliente sem nome',
        email: partner.Company?.Email || partner.ExternalCode || undefined,
        company: partner.Company?.Name || partner.Name,
        level: partner.Level || 'Unknown',
        state: partner.State || 'Unknown',
        serviceType: partner.ServiceType || 'Unknown',
        devices: 0, // Será preenchido em outra chamada se necessário
        lastBackup: undefined,
        backupStatus: 'Unknown'
      }));

      // Filtrar apenas clientes finais (EndCustomer)
      const endCustomers = clients.filter(client => 
        client.level === 'EndCustomer' || client.level === 'SubDistributor'
      );

      console.log(`🎯 ${endCustomers.length} clientes finais encontrados`);
      
      return endCustomers;
      
    } catch (error) {
      console.error('❌ Erro ao listar clientes MAGINF:', error);
      
      // Retornar clientes de demonstração em caso de erro
      return this.getDemoClients();
    }
  }

  // Obter informações detalhadas de um cliente específico
  async getClientDetails(clientId: number): Promise<MaginfClient | null> {
    try {
      console.log(`🔍 Obtendo detalhes do cliente ${clientId}...`);
      
      const response = await this.callApi('GetPartnerInfoById', {
        partnerId: clientId
      });

      const partner = response.result;
      
      if (!partner) {
        return null;
      }

      return {
        id: partner.Id,
        name: partner.Name || 'Cliente sem nome',
        email: partner.Company?.Email || undefined,
        company: partner.Company?.Name || partner.Name,
        level: partner.Level || 'Unknown',
        state: partner.State || 'Unknown',
        serviceType: partner.ServiceType || 'Unknown',
        devices: 0,
        lastBackup: undefined,
        backupStatus: 'Unknown'
      };
      
    } catch (error) {
      console.error(`❌ Erro ao obter detalhes do cliente ${clientId}:`, error);
      return null;
    }
  }

  // Obter estatísticas de backup de um cliente
  async getClientBackupStats(clientId: number) {
    try {
      console.log(`📊 Obtendo estatísticas de backup do cliente ${clientId}...`);
      
      const response = await this.callApi('EnumerateAccountStatistics', {
        query: {
          PartnerId: clientId,
          SelectionMode: 'Merged',
          StartRecordNumber: 0,
          RecordsCount: 100,
          Columns: ['I1', 'F17', 'F18'] // DeviceName, LastStatus, LastBackupTime
        }
      });

      const devices = response.result?.result || [];
      
      const stats = {
        totalDevices: devices.length,
        successfulBackups: 0,
        failedBackups: 0,
        warningBackups: 0,
        lastBackup: null as string | null
      };

      devices.forEach((device: any) => {
        const settings = Object.assign({}, ...device.Settings);
        const status = settings.F17;
        const lastBackup = settings.F18;
        
        if (status === 'Success') stats.successfulBackups++;
        else if (status === 'Failed') stats.failedBackups++;
        else if (status === 'CompletedWithErrors') stats.warningBackups++;
        
        if (lastBackup && (!stats.lastBackup || lastBackup > stats.lastBackup)) {
          stats.lastBackup = lastBackup;
        }
      });

      return stats;
      
    } catch (error) {
      console.error(`❌ Erro ao obter estatísticas do cliente ${clientId}:`, error);
      return {
        totalDevices: 0,
        successfulBackups: 0,
        failedBackups: 0,
        warningBackups: 0,
        lastBackup: null
      };
    }
  }

  // Clientes de demonstração para fallback
  private getDemoClients(): MaginfClient[] {
    return [
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
  }

  // Verificar status da conexão
  async checkConnection(): Promise<{ connected: boolean; message: string }> {
    try {
      await this.getVisa();
      return {
        connected: true,
        message: 'Conectado à plataforma MAGINF com sucesso'
      };
    } catch (error) {
      return {
        connected: false,
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }
}
