const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function restoreData() {
  console.log('🔄 Restaurando dados do MAGINF...');
  
  try {
    // Limpar dados existentes
    await prisma.ticket.deleteMany();
    await prisma.contract.deleteMany();
    await prisma.client.deleteMany();
    await prisma.user.deleteMany();
    await prisma.service.deleteMany();
    await prisma.settings.deleteMany();
    
    console.log('🗑️ Dados antigos removidos');
    
    // Criar usuários
    const users = await prisma.user.createMany({
      data: [
        {
          email: 'admin@maginf.com.br',
          name: 'Administrador MAGINF',
          role: 'admin'
        },
        {
          email: 'tecnico@maginf.com.br',
          name: 'Técnico MAGINF',
          role: 'technician'
        }
      ]
    });
    
    console.log('👥 Usuários criados:', users.count);
    
    // Criar clientes
    const clients = await prisma.client.createMany({
      data: [
        {
          name: 'Empresa ABC Ltda',
          email: 'contato@empresaabc.com.br',
          phone: '(11) 9999-1111',
          company: 'ABC Ltda',
          status: 'active'
        },
        {
          name: 'João Silva',
          email: 'joao@exemplo.com.br',
          phone: '(11) 9999-2222',
          company: 'Silva & Associados',
          status: 'active'
        }
      ]
    });
    
    console.log('🏢 Clientes criados:', clients.count);
    
    // Criar serviços
    const services = await prisma.service.createMany({
      data: [
        {
          name: 'Suporte Técnico MSP',
          description: 'Suporte técnico completo para infraestrutura de TI',
          price: 299.90,
          category: 'MSP',
          active: true
        },
        {
          name: 'Backup em Nuvem',
          description: 'Solução completa de backup automatizado',
          price: 199.90,
          category: 'Cloud',
          active: true
        },
        {
          name: 'Monitoramento 24/7',
          description: 'Monitoramento contínuo da infraestrutura',
          price: 399.90,
          category: 'Monitoring',
          active: true
        }
      ]
    });
    
    console.log('🛠️ Serviços criados:', services.count);
    
    // Criar configurações
    const settings = await prisma.settings.createMany({
      data: [
        { key: 'company_name', value: 'MAGINF Tecnologia' },
        { key: 'company_email', value: 'contato@maginf.com.br' },
        { key: 'company_phone', value: '(11) 9999-9999' },
        { key: 'support_hours', value: '08:00-18:00' }
      ]
    });
    
    console.log('⚙️ Configurações criadas:', settings.count);
    
    console.log('✅ Dados restaurados com sucesso!');
    console.log('🌐 Acesse: https://maginf-portal.vercel.app');
    
  } catch (error) {
    console.error('❌ Erro ao restaurar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

restoreData();