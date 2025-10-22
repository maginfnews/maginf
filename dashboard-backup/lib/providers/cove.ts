import { BackupProvider, BackupItem, BackupStatus } from '../types';
import { mapCoveStatus, toISO, generateId } from '../utils';

interface CoveStatsResponse {
  id: number;
  jsonrpc: string;
  result?: {
    result?: Array<{
      Settings: Array<{ [key: string]: any }>;
    }>;
  };
  error?: any;
}

interface CovePartner {
  Id: number;
  Name: string;
  Level: string;
  State: string;
  ParentId: number;
  ServiceType: string;
  ChildServiceTypes?: string[];
  LocationId?: number;
  Company?: any;
  CreationTime?: string;
}

export class CoveProvider implements BackupProvider {
  private baseUrl = 'https://api.backup.management/jsonapi';
  private apiKey = process.env.COVE_API_KEY!;
  private partnerId = process.env.COVE_PARTNER_ID!;
  private visaCache: { visa: string; expiresAt: number } | null = null;

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
  }

  private async getVisa(): Promise<string> {
    // Verificar cache do visa (expira em ~15 min)
    if (this.visaCache && Date.now() < this.visaCache.expiresAt) {
      return this.visaCache.visa;
    }

    const loginPayload = {
      jsonrpc: '2.0',
      method: 'Login',
      params: {
        username: 'API-USER-DASHBOARD',
        password: this.apiKey
      },
      id: '1'
    };

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload)
    });

    if (!response.ok) {
      throw new Error(`Cove login failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Cove login error: ${data.error.message}`);
    }

    if (!data.visa) {
      throw new Error('Cove login error: No visa returned');
    }

    // Cache por 15 minutos
    this.visaCache = {
      visa: data.visa,
      expiresAt: Date.now() + (15 * 60 * 1000)
    };

    return data.visa;
  }

  private async call(method: string, params: any = {}): Promise<any> {
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
      throw new Error(`Cove API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Cove API error: ${data.error.message || 'Unknown error'}`);
    }

    return data;
  }

  async listPartners(parentPartnerId?: number): Promise<CovePartner[]> {
    try {
      const response = await this.call('EnumeratePartners', {
        parentPartnerId: parentPartnerId || Number(this.partnerId),
        fields: [0, 1, 3, 4, 5, 8, 10, 20], // Name, Level, ChildServiceTypes, ServiceType, State, LocationId, Company, CreationTime
        fetchRecursively: true
      });

      return response.result?.result || [];
    } catch (error) {
      console.error('CoveProvider listPartners error:', error);
      return [];
    }
  }

  async listStatus(params: {
    partnerId: string | number;
    q?: string;
    status?: BackupStatus;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: BackupItem[]; total: number }> {
    
    const { partnerId, q, status, page = 1, pageSize = 50 } = params;
    
    try {
      // Colunas necessárias do Cove conforme documentação
      const columns = ["I1", "F17", "F18"];
      
      const response = await this.call("EnumerateAccountStatistics", {
        query: {
          PartnerId: Number(partnerId),
          SelectionMode: "Merged",
          StartRecordNumber: (page - 1) * pageSize,
          RecordsCount: pageSize,
          Columns: columns
        }
      });

      const rawItems = response?.result?.result ?? [];
      
      const items: BackupItem[] = rawItems.map((item: any) => {
        const settings = Object.assign({}, ...item.Settings);
        
        const deviceName = settings.I1 || 'Unknown Device';
        return {
          id: generateId('cove', deviceName),
          deviceName: deviceName,
          kind: 'Server' as const,
          source: 'A' as const,
          lastStatus: mapCoveStatus(settings.F17),
          lastCompletedAt: settings.F18 ? toISO(settings.F18) : undefined,
          raw: settings
        };
      });

      // Aplicar filtros
      let filteredItems = items;
      
      if (q) {
        filteredItems = filteredItems.filter(item => 
          item.deviceName.toLowerCase().includes(q.toLowerCase())
        );
      }
      
      if (status) {
        filteredItems = filteredItems.filter(item => 
          item.lastStatus === status
        );
      }

      return {
        items: filteredItems,
        total: filteredItems.length
      };
      
    } catch (error) {
      console.error('CoveProvider error:', error);
      console.log('API Key usado:', this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'não definido');
      console.log('Partner ID usado:', this.partnerId);
      
      return {
        items: [],
        total: 0
      };
    }
  }
}
