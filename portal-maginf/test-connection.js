const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  console.log('🔍 Testando conexão com o banco...');
  
  try {
    // Testar conexão
    await prisma.$connect();
    console.log('✅ Conexão estabelecida!');
    
    // Contar registros
    const userCount = await prisma.user.count();
    const clientCount = await prisma.client.count();
    const serviceCount = await prisma.service.count();
    
    console.log(`📊 Estatísticas do banco:
    👥 Usuários: ${userCount}
    🏢 Clientes: ${clientCount}
    🛠️ Serviços: ${serviceCount}`);
    
    if (userCount === 0) {
      console.log('⚠️ Banco vazio. Execute: node restore-data-prisma.js');
    } else {
      console.log('✅ Banco populado e funcionando!');
    }
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();