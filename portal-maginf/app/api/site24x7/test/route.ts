import { NextResponse } from 'next/server'
import { Site24x7Provider } from '../../../../lib/providers/site24x7-provider'

export async function GET() {
  try {
    const provider = new Site24x7Provider()
    
    // Testar conectividade
    const isConnected = await provider.testConnection()
    
    if (!isConnected) {
      return NextResponse.json({
        success: false,
        message: 'Falha na conexão com Site24x7',
        timestamp: new Date().toISOString()
      }, { status: 503 })
    }

    // Buscar dados básicos para teste
    const currentStatus = await provider.getCurrentStatus()
    
    return NextResponse.json({
      success: true,
      message: 'Conexão Site24x7 OK',
      data: {
        total_monitors: currentStatus.monitors.length,
        monitors_count: currentStatus.monitors_count,
        sample_monitor: currentStatus.monitors[0] || null
      },
      timestamp: new Date().toISOString(),
      source: 'site24x7'
    })

  } catch (error) {
    console.error('Erro no teste Site24x7:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      details: error instanceof Error ? error.stack : null,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
