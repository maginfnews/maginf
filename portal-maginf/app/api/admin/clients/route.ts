import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcryptjs'

// GET - Listar todos os clientes
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        error: 'Acesso negado'
      }, { status: 403 })
    }

    const clients = await prisma.client.findMany({
      include: {
        _count: {
          select: {
            users: true,
            monitors: true,
            alerts: true
          }
        },
        settings: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      clients
    })

  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}

// POST - Criar novo cliente
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        error: 'Acesso negado'
      }, { status: 403 })
    }

    const data = await request.json()
    const {
      name,
      slug,
      email,
      phone,
      address,
      adminName,
      adminEmail,
      adminPassword,
      primaryColor,
      secondaryColor
    } = data

    // Validações
    if (!name || !slug || !email || !adminName || !adminEmail || !adminPassword) {
      return NextResponse.json({
        success: false,
        error: 'Campos obrigatórios não preenchidos'
      }, { status: 400 })
    }

    // Verificar se slug já existe
    const existingClient = await prisma.client.findUnique({
      where: { slug }
    })

    if (existingClient) {
      return NextResponse.json({
        success: false,
        error: 'Slug já existe. Escolha outro.'
      }, { status: 400 })
    }

    // Verificar se email do admin já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'Email do administrador já está em uso'
      }, { status: 400 })
    }

    // Criar cliente
    const client = await prisma.client.create({
      data: {
        name,
        slug,
        email,
        phone: phone || null,
        address: address || null,
        active: true,
        settings: {
          create: {
            primaryColor: primaryColor || '#3B82F6',
            secondaryColor: secondaryColor || '#1F2937',
            refreshInterval: 30,
            alertsEnabled: true,
            emailNotifications: true,
            smsNotifications: false,
            site24x7Enabled: false,
            coveEnabled: false
          }
        }
      },
      include: {
        settings: true
      }
    })

    // Criar usuário administrador
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: 'CLIENT',
        clientId: client.id,
        active: true
      }
    })

    return NextResponse.json({
      success: true,
      client: {
        ...client,
        adminUser: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name
        }
      }
    })

  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}
