import { NextResponse } from 'next/server'
import { Site24x7Provider } from '@/lib/providers/site24x7-provider'

export async function GET() {
  try {
    const provider = new Site24x7Provider()
    
    // Buscar dados em paralelo
    const [currentStatus, monitors, alarms] = await Promise.all([
      provider.getCurrentStatus(),
      provider.getMonitors(),
      provider.getAlarms(1) // Alertas de hoje
    ])

    // Transformar para formato do Portal MAGINF
    const monitoringData = provider.transformToMonitoringData(currentStatus, monitors, alarms)

    return NextResponse.json({
      success: true,
      data: monitoringData,
      timestamp: new Date().toISOString(),
      source: 'site24x7'
    })

  } catch (error) {
    console.error('Erro na API Site24x7 Status:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST() {
  return NextResponse.json({ 
    error: 'Método não permitido' 
  }, { status: 405 })
}
