// Script para restaurar dados no banco PostgreSQL de produção
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function restoreData() {
  try {
    console.log('🔄 Iniciando restauração dos dados...')
    
    const backupDir = path.join(__dirname, 'backup')
    
    // Verificar se arquivos de backup existem
    const requiredFiles = ['clients.json', 'users.json', 'settings.json']
    for (const file of requiredFiles) {
      if (!fs.existsSync(path.join(backupDir, file))) {
        throw new Error(`Arquivo de backup não encontrado: ${file}`)
      }
    }
    
    // Ler dados do backup
    const clients = JSON.parse(fs.readFileSync(path.join(backupDir, 'clients.json')))
    const users = JSON.parse(fs.readFileSync(path.join(backupDir, 'users.json')))
    const settings = JSON.parse(fs.readFileSync(path.join(backupDir, 'settings.json')))
    
    console.log(`📊 Dados para restaurar:`)
    console.log(`  - ${clients.length} clientes`)
    console.log(`  - ${users.length} usuários`)
    console.log(`  - ${settings.length} configurações`)
    
    // Limpar tabelas existentes (cuidado!)
    console.log('🗑️ Limpando dados existentes...')
    await prisma.alert.deleteMany()
    await prisma.monitor.deleteMany()
    await prisma.user.deleteMany()
    await prisma.clientSettings.deleteMany()
    await prisma.client.deleteMany()
    
    // Restaurar clientes
    console.log('🏢 Restaurando clientes...')
    for (const client of clients) {
      await prisma.client.create({
        data: {
          id: client.id,
          name: client.name,
          slug: client.slug,
          email: client.email,
          phone: client.phone,
          address: client.address,
          logo: client.logo,
          domain: client.domain,
          active: client.active,
          createdAt: new Date(client.createdAt),
          updatedAt: new Date(client.updatedAt)
        }
      })
    }
    
    // Restaurar configurações
    console.log('⚙️ Restaurando configurações...')
    for (const setting of settings) {
      await prisma.clientSettings.create({
        data: {
          id: setting.id,
          clientId: setting.clientId,
          primaryColor: setting.primaryColor,
          secondaryColor: setting.secondaryColor,
          customLogo: setting.customLogo,
          customFavicon: setting.customFavicon,
          refreshInterval: setting.refreshInterval,
          alertsEnabled: setting.alertsEnabled,
          emailNotifications: setting.emailNotifications,
          smsNotifications: setting.smsNotifications,
          site24x7Enabled: setting.site24x7Enabled,
          site24x7ApiKey: setting.site24x7ApiKey,
          coveEnabled: setting.coveEnabled,
          coveApiKey: setting.coveApiKey,
          createdAt: new Date(setting.createdAt),
          updatedAt: new Date(setting.updatedAt)
        }
      })
    }
    
    // Restaurar usuários
    console.log('👥 Restaurando usuários...')
    for (const user of users) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password, // Já está hasheado
          role: user.role,
          active: user.active,
          lastLogin: user.lastLogin ? new Date(user.lastLogin) : null,
          clientId: user.clientId,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt)
        }
      })
    }
    
    console.log('\n✅ Restauração concluída com sucesso!')
    
    // Verificar dados restaurados
    const restoredCounts = {
      clients: await prisma.client.count(),
      users: await prisma.user.count(),
      settings: await prisma.clientSettings.count()
    }
    
    console.log('\n📊 Dados restaurados:')
    console.log(`  - ${restoredCounts.clients} clientes`)
    console.log(`  - ${restoredCounts.users} usuários`)
    console.log(`  - ${restoredCounts.settings} configurações`)
    
    // Testar login do admin
    console.log('\n🔐 Testando login do admin...')
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@maginf.com.br' },
      include: { client: true }
    })
    
    if (adminUser) {
      console.log(`✅ Admin encontrado: ${adminUser.name} (${adminUser.role})`)
    } else {
      console.log('❌ Admin não encontrado!')
    }
    
  } catch (error) {
    console.error('❌ Erro na restauração:', error)
  } finally {
    await prisma.$disconnect()
  }
}

restoreData()
