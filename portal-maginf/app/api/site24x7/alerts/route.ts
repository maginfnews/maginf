import { NextResponse } from 'next/server'
import { Site24x7Provider } from '@/lib/providers/site24x7-provider'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = parseInt(searchParams.get('period') || '1') // 1=Today, 2=Yesterday, 3=This Week
    const limit = parseInt(searchParams.get('limit') || '50')
    
    const provider = new Site24x7Provider()
    const alarms = await provider.getAlarms(period)

    // Limitar resultados
    const limitedAlarms = alarms.slice(0, limit)

    // Agrupar por severidade
    const groupedBySeverity = limitedAlarms.reduce((acc, alarm) => {
      const severity = alarm.severity?.toLowerCase() || 'unknown'
      if (!acc[severity]) acc[severity] = []
      acc[severity].push(alarm)
      return acc
    }, {} as Record<string, typeof alarms>)

    return NextResponse.json({
      success: true,
      data: {
        alarms: limitedAlarms,
        grouped: groupedBySeverity,
        summary: {
          total: limitedAlarms.length,
          critical: groupedBySeverity.critical?.length || 0,
          warning: groupedBySeverity.warning?.length || 0,
          info: groupedBySeverity.info?.length || 0,
          resolved: groupedBySeverity.resolved?.length || 0
        }
      },
      timestamp: new Date().toISOString(),
      source: 'site24x7'
    })

  } catch (error) {
    console.error('Erro na API Site24x7 Alerts:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
