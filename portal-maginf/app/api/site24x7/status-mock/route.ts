import { NextResponse } from 'next/server'

// Dados mock para demonstração
const mockMonitoringData = {
  status: {
    servers: {
      online: 8,
      offline: 1,
      warning: 2,
      total: 11
    },
    workstations: {
      online: 25,
      offline: 2,
      warning: 3,
      total: 30
    },
    services: {
      running: 15,
      stopped: 1,
      warning: 2,
      total: 18
    }
  },
  monitors: [
    {
      id: 'srv-001',
      name: 'SRV-EXCHANGE01',
      type: 'server',
      status: 'online',
      uptime: '99.8%',
      cpu: 45,
      memory: 67,
      disk: 78,
      response_time: 120,
      last_check: '2 min atrás',
      ip: '192.168.1.10',
      os: 'Windows Server 2022',
      location: 'Datacenter Principal'
    },
    {
      id: 'srv-002',
      name: 'SRV-DATABASE01',
      type: 'server',
      status: 'warning',
      uptime: '98.2%',
      cpu: 85,
      memory: 92,
      disk: 95,
      response_time: 250,
      last_check: '1 min atrás',
      ip: '192.168.1.11',
      os: 'Windows Server 2019',
      location: 'Datacenter Principal'
    },
    {
      id: 'web-001',
      name: 'Site Institucional',
      type: 'website',
      status: 'online',
      uptime: '99.9%',
      response_time: 180,
      last_check: '30 seg atrás',
      location: 'Site24x7 - São Paulo'
    },
    {
      id: 'srv-003',
      name: 'SRV-FILE01',
      type: 'server',
      status: 'offline',
      uptime: '0%',
      cpu: 0,
      memory: 0,
      disk: 0,
      last_check: '15 min atrás',
      ip: '192.168.1.12',
      os: 'Ubuntu Server 22.04',
      location: 'Datacenter Secundário'
    },
    {
      id: 'dns-001',
      name: 'DNS Principal',
      type: 'service',
      status: 'online',
      uptime: '99.5%',
      response_time: 45,
      last_check: '1 min atrás',
      location: 'Site24x7 - Global'
    }
  ],
  alerts: [
    {
      id: 'alert-001',
      type: 'critical',
      message: 'SRV-DATABASE01 - Disco C: 95% cheio',
      time: '2 min atrás',
      monitor_id: 'srv-002',
      monitor_name: 'SRV-DATABASE01',
      acknowledged: false
    },
    {
      id: 'alert-002',
      type: 'critical',
      message: 'SRV-FILE01 - Servidor offline',
      time: '15 min atrás',
      monitor_id: 'srv-003',
      monitor_name: 'SRV-FILE01',
      acknowledged: false
    },
    {
      id: 'alert-003',
      type: 'warning',
      message: 'SRV-DATABASE01 - CPU acima de 80%',
      time: '5 min atrás',
      monitor_id: 'srv-002',
      monitor_name: 'SRV-DATABASE01',
      acknowledged: true
    },
    {
      id: 'alert-004',
      type: 'success',
      message: 'Site Institucional - Voltou online',
      time: '1h atrás',
      monitor_id: 'web-001',
      monitor_name: 'Site Institucional',
      acknowledged: true
    }
  ]
}

export async function GET() {
  try {
    // Simular delay da API real
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      data: mockMonitoringData,
      timestamp: new Date().toISOString(),
      source: 'site24x7-mock',
      note: 'Dados de demonstração - Site24x7 API requer token válido'
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
