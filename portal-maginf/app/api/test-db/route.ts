import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    // Testar conexão com banco
    const users = await prisma.user.findMany({
      include: {
        client: true
      }
    })
    
    return NextResponse.json({
      success: true,
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        client: user.client.name
      })),
      count: users.length
    })
  } catch (error) {
    console.error('Erro no banco:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
