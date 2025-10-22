import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    env: {
      SITE24X7_API_KEY: process.env.SITE24X7_API_KEY ? '***CONFIGURADA***' : 'NÃO CONFIGURADA',
      SITE24X7_BASE_URL: process.env.SITE24X7_BASE_URL || 'NÃO CONFIGURADA',
      NODE_ENV: process.env.NODE_ENV
    },
    timestamp: new Date().toISOString()
  })
}
