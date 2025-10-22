import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar cliente MAGINF (administrador)
  const maginfClient = await prisma.client.upsert({
    where: { slug: 'maginf' },
    update: {},
    create: {
      name: 'MAGINF Tecnologia',
      slug: 'maginf',
      email: 'contato@maginf.com.br',
      phone: '(11) 99999-9999',
      address: 'São Paulo, SP',
      logo: '/images/maginf-logo.png',
      active: true,
      settings: {
        create: {
          primaryColor: '#FF6B35',
          secondaryColor: '#2D3748',
          refreshInterval: 30,
          alertsEnabled: true,
          emailNotifications: true,
          site24x7Enabled: true,
          coveEnabled: true
        }
      }
    },
    include: {
      settings: true
    }
  })

  // Criar usuário admin MAGINF
  const hashedPassword = await bcrypt.hash('maginf2024', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@maginf.com.br' },
    update: {},
    create: {
      email: 'admin@maginf.com.br',
      name: 'Administrador MAGINF',
      password: hashedPassword,
      role: 'ADMIN',
      clientId: maginfClient.id,
      active: true
    }
  })

  // Criar cliente exemplo
  const exampleClient = await prisma.client.upsert({
    where: { slug: 'empresa-exemplo' },
    update: {},
    create: {
      name: 'Empresa Exemplo Ltda',
      slug: 'empresa-exemplo',
      email: 'contato@empresaexemplo.com.br',
      phone: '(11) 88888-8888',
      address: 'São Paulo, SP',
      active: true,
      settings: {
        create: {
          primaryColor: '#3B82F6',
          secondaryColor: '#1F2937',
          refreshInterval: 60,
          alertsEnabled: true,
          emailNotifications: true,
          site24x7Enabled: false,
          coveEnabled: false
        }
      }
    },
    include: {
      settings: true
    }
  })

  // Criar usuário do cliente exemplo
  const clientPassword = await bcrypt.hash('123456', 12)
  const clientUser = await prisma.user.upsert({
    where: { email: 'admin@empresaexemplo.com.br' },
    update: {},
    create: {
      email: 'admin@empresaexemplo.com.br',
      name: 'João Silva',
      password: clientPassword,
      role: 'CLIENT',
      clientId: exampleClient.id,
      active: true
    }
  })

  // Criar monitores exemplo
  const monitors = [
    {
      name: 'Site Principal',
      type: 'WEBSITE' as const,
      status: 'ONLINE' as const,
      url: 'https://empresaexemplo.com.br',
      uptime: 99.8,
      responseTime: 150,
      clientId: exampleClient.id
    },
    {
      name: 'Servidor Principal',
      type: 'SERVER' as const,
      status: 'ONLINE' as const,
      ip: '192.168.1.10',
      uptime: 99.5,
      responseTime: 50,
      clientId: exampleClient.id
    },
    {
      name: 'API REST',
      type: 'API' as const,
      status: 'WARNING' as const,
      url: 'https://api.empresaexemplo.com.br',
      uptime: 98.2,
      responseTime: 300,
      clientId: exampleClient.id
    }
  ]

  for (const monitor of monitors) {
    await prisma.monitor.create({
      data: {
        ...monitor,
        lastCheck: new Date(),
        checkInterval: 300,
        timeout: 30,
        active: true
      }
    })
  }

  // Criar alertas exemplo
  const alerts = [
    {
      type: 'HIGH_RESPONSE_TIME' as const,
      title: 'API com alta latência',
      message: 'API REST está respondendo em mais de 250ms',
      status: 'OPEN' as const,
      severity: 'MEDIUM' as const,
      clientId: exampleClient.id
    },
    {
      type: 'MONITOR_UP' as const,
      title: 'Servidor voltou online',
      message: 'Servidor Principal voltou a responder normalmente',
      status: 'RESOLVED' as const,
      severity: 'LOW' as const,
      clientId: exampleClient.id,
      resolvedAt: new Date()
    }
  ]

  for (const alert of alerts) {
    await prisma.alert.create({
      data: {
        ...alert,
        triggeredAt: new Date()
      }
    })
  }

  console.log('✅ Seed concluído!')
  console.log('\n📊 Dados criados:')
  console.log(`- Cliente MAGINF: ${maginfClient.name}`)
  console.log(`- Admin MAGINF: ${adminUser.email} / maginf2024`)
  console.log(`- Cliente Exemplo: ${exampleClient.name}`)
  console.log(`- Usuário Cliente: ${clientUser.email} / 123456`)
  console.log(`- Monitores: ${monitors.length}`)
  console.log(`- Alertas: ${alerts.length}`)
  console.log('\n🚀 Acesse: http://localhost:3000/login')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
