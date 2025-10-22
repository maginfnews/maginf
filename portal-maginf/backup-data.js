// Script para fazer backup dos dados antes da migração
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function backupData() {
  try {
    console.log('🔄 Iniciando backup dos dados...')
    
    // Criar pasta de backup
    const backupDir = path.join(__dirname, 'backup')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir)
    }
    
    // Backup dos clientes
    console.log('📊 Fazendo backup dos clientes...')
    const clients = await prisma.client.findMany({
      include: {
        settings: true,
        users: true,
        monitors: true,
        alerts: true
      }
    })
    
    fs.writeFileSync(
      path.join(backupDir, 'clients.json'),
      JSON.stringify(clients, null, 2)
    )
    
    // Backup dos usuários
    console.log('👥 Fazendo backup dos usuários...')
    const users = await prisma.user.findMany({
      include: {
        client: true
      }
    })
    
    fs.writeFileSync(
      path.join(backupDir, 'users.json'),
      JSON.stringify(users, null, 2)
    )
    
    // Backup das configurações
    console.log('⚙️ Fazendo backup das configurações...')
    const settings = await prisma.clientSettings.findMany()
    
    fs.writeFileSync(
      path.join(backupDir, 'settings.json'),
      JSON.stringify(settings, null, 2)
    )
    
    // Estatísticas do backup
    console.log('\n✅ Backup concluído com sucesso!')
    console.log(`📁 Pasta: ${backupDir}`)
    console.log(`👥 Usuários: ${users.length}`)
    console.log(`🏢 Clientes: ${clients.length}`)
    console.log(`⚙️ Configurações: ${settings.length}`)
    
    // Criar arquivo de resumo
    const summary = {
      timestamp: new Date().toISOString(),
      counts: {
        users: users.length,
        clients: clients.length,
        settings: settings.length
      },
      files: [
        'clients.json',
        'users.json', 
        'settings.json'
      ]
    }
    
    fs.writeFileSync(
      path.join(backupDir, 'backup-summary.json'),
      JSON.stringify(summary, null, 2)
    )
    
    console.log('\n📋 Arquivos criados:')
    console.log('  - clients.json')
    console.log('  - users.json')
    console.log('  - settings.json')
    console.log('  - backup-summary.json')
    
  } catch (error) {
    console.error('❌ Erro no backup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

backupData()
