import { 
  Site24x7Monitor, 
  Site24x7CurrentStatus, 
  Site24x7Alarm, 
  Site24x7Performance,
  MonitoringData,
  ApiResponse,
  SITE24X7_STATUS_MAP,
  MONITOR_TYPE_MAP
} from '../types/monitoring'

export class Site24x7Provider {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.SITE24X7_API_KEY || ''
    this.baseUrl = process.env.SITE24X7_BASE_URL || 'https://www.site24x7.com/api'
    
    if (!this.apiKey) {
      throw new Error('SITE24X7_API_KEY não configurada')
    }
  }

  private async makeRequest<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json; version=2.0',
        'Authorization': `Zoho-oauthtoken ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Site24x7 API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Obter status atual de todos os monitores
  async getCurrentStatus(): Promise<Site24x7CurrentStatus> {
    const response = await this.makeRequest<Site24x7CurrentStatus>('/current_status', {
      apm_required: false,
      group_required: false,
      locations_required: false,
      suspended_required: true
    })

    return response.data
  }

  // Listar todos os monitores
  async getMonitors(): Promise<Site24x7Monitor[]> {
    const response = await this.makeRequest<Site24x7Monitor[]>('/monitors')
    return response.data
  }

  // Obter alarmes/alertas
  async getAlarms(period: number = 1): Promise<Site24x7Alarm[]> {
    const response = await this.makeRequest<Site24x7Alarm[]>('/alarms', {
      period // 1=Today, 2=Yesterday, 3=This Week, etc.
    })
    return response.data
  }

  // Obter dados de performance de um monitor específico
  async getPerformanceData(monitorId: string, period: number = 4): Promise<Site24x7Performance> {
    const response = await this.makeRequest<Site24x7Performance>(`/reports/performance/${monitorId}`, {
      period, // 4=Yesterday, 5=Last 7 days, etc.
      unit_of_time: 1 // 1=Hour, 2=Day, etc.
    })
    return response.data
  }

  // Converter dados Site24x7 para formato do Portal MAGINF
  transformToMonitoringData(currentStatus: Site24x7CurrentStatus, monitors: Site24x7Monitor[], alarms: Site24x7Alarm[]): MonitoringData {
    // Contar por tipo de dispositivo
    const serverMonitors = currentStatus.monitors.filter(m => 
      m.monitor_type === 'SERVER' || m.host_name
    )
    const serviceMonitors = currentStatus.monitors.filter(m => 
      ['URL', 'DNS', 'PORT', 'PING', 'SSL_CERT'].includes(m.monitor_type)
    )

    // Calcular contadores
    const serverStats = this.calculateStats(serverMonitors)
    const serviceStats = this.calculateStats(serviceMonitors)

    // Transformar monitores
    const transformedMonitors = currentStatus.monitors.map(monitor => ({
      id: monitor.monitor_id,
      name: monitor.display_name,
      type: this.getMonitorType(monitor.monitor_type),
      status: this.mapStatus(monitor.status),
      uptime: this.calculateUptime(monitor),
      cpu: this.extractCpuUsage(monitor),
      memory: this.extractMemoryUsage(monitor),
      disk: this.extractDiskUsage(monitor),
      response_time: this.extractResponseTime(monitor),
      last_check: this.formatLastCheck(monitor.last_polled_time),
      ip: monitor.host_name,
      os: this.extractOS(monitor),
      location: 'Monitorado via Site24x7'
    }))

    // Transformar alertas
    const transformedAlerts = alarms.slice(0, 10).map(alarm => ({
      id: alarm.alarm_id,
      type: this.mapAlarmSeverity(alarm.severity),
      message: `${alarm.monitor_name} - ${alarm.reason}`,
      time: this.formatAlarmTime(alarm.alarm_time),
      monitor_id: alarm.monitor_id,
      monitor_name: alarm.monitor_name,
      acknowledged: alarm.acknowledged
    }))

    return {
      status: {
        servers: {
          online: serverStats.online,
          offline: serverStats.offline,
          warning: serverStats.warning,
          total: serverStats.total
        },
        workstations: {
          online: 0, // Site24x7 não distingue workstations
          offline: 0,
          warning: 0,
          total: 0
        },
        services: {
          running: serviceStats.online,
          stopped: serviceStats.offline,
          warning: serviceStats.warning,
          total: serviceStats.total
        }
      },
      monitors: transformedMonitors,
      alerts: transformedAlerts
    }
  }

  private calculateStats(monitors: Site24x7Monitor[]) {
    return monitors.reduce((acc, monitor) => {
      const status = this.mapStatus(monitor.status)
      acc.total++
      
      switch (status) {
        case 'online':
          acc.online++
          break
        case 'offline':
        case 'critical':
          acc.offline++
          break
        case 'warning':
          acc.warning++
          break
      }
      
      return acc
    }, { online: 0, offline: 0, warning: 0, total: 0 })
  }

  private mapStatus(status: number): 'online' | 'offline' | 'warning' | 'critical' {
    return SITE24X7_STATUS_MAP[status as keyof typeof SITE24X7_STATUS_MAP] || 'offline'
  }

  private getMonitorType(monitorType: string): 'server' | 'workstation' | 'service' | 'website' {
    return MONITOR_TYPE_MAP[monitorType as keyof typeof MONITOR_TYPE_MAP] || 'service'
  }

  private calculateUptime(monitor: Site24x7Monitor): string {
    // Implementar cálculo de uptime baseado no status
    if (monitor.status === 1) return '99.9%'
    if (monitor.status === 2) return '95.0%'
    return '0%'
  }

  private extractCpuUsage(monitor: Site24x7Monitor): number | undefined {
    if (monitor.attribute_label?.toLowerCase().includes('cpu')) {
      return typeof monitor.attribute_value === 'number' ? monitor.attribute_value : undefined
    }
    return undefined
  }

  private extractMemoryUsage(monitor: Site24x7Monitor): number | undefined {
    if (monitor.attribute_label?.toLowerCase().includes('memory')) {
      return typeof monitor.attribute_value === 'number' ? monitor.attribute_value : undefined
    }
    return undefined
  }

  private extractDiskUsage(monitor: Site24x7Monitor): number | undefined {
    if (monitor.attribute_label?.toLowerCase().includes('disk')) {
      return typeof monitor.attribute_value === 'number' ? monitor.attribute_value : undefined
    }
    return undefined
  }

  private extractResponseTime(monitor: Site24x7Monitor): number | undefined {
    if (monitor.attribute_label?.toLowerCase().includes('response')) {
      return typeof monitor.attribute_value === 'number' ? monitor.attribute_value : undefined
    }
    return undefined
  }

  private formatLastCheck(lastPolled: string): string {
    const date = new Date(lastPolled)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffMins < 1) return 'agora'
    if (diffMins < 60) return `${diffMins} min atrás`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h atrás`
    
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} dias atrás`
  }

  private extractOS(monitor: Site24x7Monitor): string | undefined {
    // Site24x7 pode não fornecer OS diretamente
    if (monitor.monitor_type === 'SERVER') {
      return 'Sistema Monitorado'
    }
    return undefined
  }

  private mapAlarmSeverity(severity: string): 'critical' | 'warning' | 'info' | 'success' {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'down':
        return 'critical'
      case 'warning':
      case 'trouble':
        return 'warning'
      case 'up':
      case 'resolved':
        return 'success'
      default:
        return 'info'
    }
  }

  private formatAlarmTime(alarmTime: string): string {
    return this.formatLastCheck(alarmTime)
  }

  // Método para testar conectividade
  async testConnection(): Promise<boolean> {
    try {
      await this.getCurrentStatus()
      return true
    } catch (error) {
      console.error('Erro ao testar conexão Site24x7:', error)
      return false
    }
  }
}
