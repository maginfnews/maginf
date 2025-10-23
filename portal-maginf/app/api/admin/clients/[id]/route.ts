import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'

// GET - Buscar cliente específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        error: 'Acesso negado'
      }, { status: 403 })
    }

    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        settings: true,
        users: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            active: true,
            lastLogin: true
          }
        },
        monitors: {
          select: {
            id: true,
            name: true,
            type: true,
            status: true,
            uptime: true
          }
        },
        _count: {
          select: {
            users: true,
            monitors: true,
            alerts: true
          }
        }
      }
    })

    if (!client) {
      return NextResponse.json({
        success: false,
        error: 'Cliente não encontrado'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      client
    })

  } catch (error) {
    console.error('Erro ao buscar cliente:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}

// PUT - Atualizar cliente
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      primaryColor,
      secondaryColor,
      active
    } = data

    // Verificar se cliente existe
    const existingClient = await prisma.client.findUnique({
      where: { id: params.id }
    })

    if (!existingClient) {
      return NextResponse.json({
        success: false,
        error: 'Cliente não encontrado'
      }, { status: 404 })
    }

    // Verificar se slug já existe (exceto o próprio cliente)
    if (slug && slug !== existingClient.slug) {
      const slugExists = await prisma.client.findUnique({
        where: { slug }
      })

      if (slugExists) {
        return NextResponse.json({
          success: false,
          error: 'Slug já existe. Escolha outro.'
        }, { status: 400 })
      }
    }

    // Atualizar cliente
    const updatedClient = await prisma.client.update({
      where: { id: params.id },
      data: {
        name: name || existingClient.name,
        slug: slug || existingClient.slug,
        email: email || existingClient.email,
        phone: phone !== undefined ? phone : existingClient.phone,
        address: address !== undefined ? address : existingClient.address,
        active: active !== undefined ? active : existingClient.active
      },
      include: {
        settings: true,
        _count: {
          select: {
            users: true,
            monitors: true,
            alerts: true
          }
        }
      }
    })

    // Atualizar configurações se fornecidas
    if (primaryColor || secondaryColor) {
      await prisma.clientSettings.upsert({
        where: { clientId: params.id },
        update: {
          primaryColor: primaryColor || undefined,
          secondaryColor: secondaryColor || undefined
        },
        create: {
          clientId: params.id,
          primaryColor: primaryColor || '#3B82F6',
          secondaryColor: secondaryColor || '#1F2937'
        }
      })
    }

    return NextResponse.json({
      success: true,
      client: updatedClient
    })

  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}

// DELETE - Excluir cliente
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        error: 'Acesso negado'
      }, { status: 403 })
    }

    // Verificar se cliente existe
    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            users: true,
            monitors: true,
            alerts: true
          }
        }
      }
    })

    if (!client) {
      return NextResponse.json({
        success: false,
        error: 'Cliente não encontrado'
      }, { status: 404 })
    }

    // Não permitir excluir cliente MAGINF
    if (client.slug === 'maginf') {
      return NextResponse.json({
        success: false,
        error: 'Não é possível excluir o cliente MAGINF'
      }, { status: 400 })
    }

    // Excluir cliente (cascade vai excluir relacionados)
    await prisma.client.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: `Cliente ${client.name} excluído com sucesso`
    })

  } catch (error) {
    console.error('Erro ao excluir cliente:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}
