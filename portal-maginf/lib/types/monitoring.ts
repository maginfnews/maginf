// Tipos para integração com APIs de monitoramento

export interface Site24x7Monitor {
  monitor_id: string
  display_name: string
  monitor_type: string
  status: number // 0=Down, 1=Up, 2=Trouble, 3=Critical, 5=Suspended
  last_polled_time: string
  attribute_value: number | string
  attribute_label: string
  unit: string
  down_reason?: string
  duration?: string
  host_name?: string
  port?: number
  check_frequency: string
  timeout: number
  location_profile_id: string
  threshold_profile_id: string
  notification_profile_id: string
  user_group_ids: string[]
  tags?: string[]
}

export interface Site24x7CurrentStatus {
  monitors: Site24x7Monitor[]
  monitors_count: {
    up: number
    down: number
    trouble: number
    critical: number
    maintenance: number
    suspended: number
    discovery: number
    configuration_error: number
    total: number
  }
}

export interface Site24x7Alarm {
  alarm_id: string
  monitor_id: string
  monitor_name: string
  monitor_type: string
  status: number
  severity: string
  alarm_time: string
  acknowledged: boolean
  reason: string
  duration: string
}

export interface Site24x7Performance {
  monitor_id: string
  monitor_name: string
  chart_data: Array<[string, number]>
  table_data: {
    [location_id: string]: {
      [metric: string]: {
        max: number
        min: number
        average: number
        unit: string
        chart_data: Array<[string, number]>
      }
    }
  }
}

export interface MonitoringData {
  status: {
    servers: {
      online: number
      offline: number
      warning: number
      total: number
    }
    workstations: {
      online: number
      offline: number
      warning: number
      total: number
    }
    services: {
      running: number
      stopped: number
      warning: number
      total: number
    }
  }
  monitors: Array<{
    id: string
    name: string
    type: 'server' | 'workstation' | 'service' | 'website'
    status: 'online' | 'offline' | 'warning' | 'critical'
    uptime: string
    cpu?: number
    memory?: number
    disk?: number
    response_time?: number
    last_check: string
    location?: string
    ip?: string
    os?: string
    user?: string
  }>
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info' | 'success'
    message: string
    time: string
    monitor_id?: string
    monitor_name?: string
    acknowledged?: boolean
  }>
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// Mapeamento de status Site24x7 para Portal MAGINF
export const SITE24X7_STATUS_MAP = {
  0: 'offline',    // Down
  1: 'online',     // Up
  2: 'warning',    // Trouble
  3: 'critical',   // Critical
  5: 'offline'     // Suspended
} as const

export const MONITOR_TYPE_MAP = {
  'URL': 'website',
  'SERVER': 'server',
  'DNS': 'service',
  'PORT': 'service',
  'PING': 'service',
  'SSL_CERT': 'service',
  'FTP': 'service',
  'SMTP': 'service',
  'POP': 'service'
} as const
