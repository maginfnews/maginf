import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    console.log('Tentativa de login:', email)
    
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        client: {
          include: {
            settings: true
          }
        }
      }
    })
    
    if (!user) {
      console.log('Usuário não encontrado:', email)
      return NextResponse.json({
        success: false,
        error: 'Usuário não encontrado'
      }, { status: 401 })
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      console.log('Senha incorreta para:', email)
      return NextResponse.json({
        success: false,
        error: 'Senha incorreta'
      }, { status: 401 })
    }
    
    console.log('Login bem-sucedido:', email)
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        client: user.client.name
      }
    })
    
  } catch (error) {
    console.error('Erro no teste de login:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno'
    }, { status: 500 })
  }
}
