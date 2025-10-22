import { NextResponse } from 'next/server'
import { Site24x7Provider } from '@/lib/providers/site24x7-provider'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'servers', 'services', 'all'
    
    const provider = new Site24x7Provider()
    const monitors = await provider.getMonitors()

    // Filtrar por tipo se especificado
    let filteredMonitors = monitors
    if (type === 'servers') {
      filteredMonitors = monitors.filter(m => 
        m.monitor_type === 'SERVER' || m.host_name
      )
    } else if (type === 'services') {
      filteredMonitors = monitors.filter(m => 
        ['URL', 'DNS', 'PORT', 'PING', 'SSL_CERT', 'FTP', 'SMTP'].includes(m.monitor_type)
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredMonitors,
      count: filteredMonitors.length,
      timestamp: new Date().toISOString(),
      source: 'site24x7'
    })

  } catch (error) {
    console.error('Erro na API Site24x7 Monitors:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
