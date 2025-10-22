import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.SITE24X7_API_KEY
    const baseUrl = process.env.SITE24X7_BASE_URL
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'API Key não configurada'
      }, { status: 500 })
    }

    // Teste simples da API Site24x7
    const response = await fetch(`${baseUrl}/current_status`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json; version=2.0',
        'Authorization': `Zoho-oauthtoken ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    const responseText = await response.text()
    
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText.substring(0, 500), // Primeiros 500 caracteres
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : null,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
