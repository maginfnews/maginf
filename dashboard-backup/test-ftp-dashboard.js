// Teste de conexão FTP para o dashboard
const ftp = require('basic-ftp');
const config = require('./deploy-config-dashboard.js');

async function testFTPConnection() {
  console.log('🔍 Testando conexão FTP para dashboard.maginf.com.br\n');
  
  console.log('📋 Configurações:');
  console.log(`   Host: ${config.ftp.host}`);
  console.log(`   User: ${config.ftp.user}`);
  console.log(`   Port: ${config.ftp.port}`);
  console.log(`   Pasta destino: ${config.remotePath}\n`);

  const client = new ftp.Client();
  client.ftp.verbose = true; // Mostrar logs detalhados

  try {
    // 1. Conectar
    console.log('🔗 Conectando...');
    await client.access(config.ftp);
    console.log('✅ Conectado com sucesso!\n');

    // 2. Listar pasta raiz
    console.log('📁 Listando /public_html/...');
    await client.cd('/public_html/');
    const rootList = await client.list();
    
    console.log('Arquivos encontrados:');
    rootList.forEach(item => {
      const type = item.isDirectory ? '📁' : '📄';
      console.log(`   ${type} ${item.name}`);
    });

    // 3. Verificar se pasta dashboard existe
    console.log('\n🔍 Verificando pasta dashboard...');
    const dashboardExists = rootList.some(item => 
      item.isDirectory && item.name === 'dashboard'
    );

    if (dashboardExists) {
      console.log('✅ Pasta dashboard/ já existe');
      
      // Listar conteúdo da pasta dashboard
      await client.cd('dashboard');
      const dashboardList = await client.list();
      
      console.log('Conteúdo da pasta dashboard:');
      if (dashboardList.length === 0) {
        console.log('   📭 Pasta vazia');
      } else {
        dashboardList.forEach(item => {
          const type = item.isDirectory ? '📁' : '📄';
          console.log(`   ${type} ${item.name}`);
        });
      }
    } else {
      console.log('⚠️  Pasta dashboard/ não existe ainda');
      console.log('💡 Será criada automaticamente no deploy');
    }

    // 4. Testar criação de pasta (se não existir)
    if (!dashboardExists) {
      console.log('\n🔧 Testando criação da pasta dashboard...');
      await client.cd('/public_html/');
      await client.ensureDir('dashboard');
      console.log('✅ Pasta dashboard criada com sucesso!');
    }

    console.log('\n🎉 TESTE DE CONEXÃO CONCLUÍDO COM SUCESSO!');
    console.log('✅ Credenciais FTP funcionando');
    console.log('✅ Pasta dashboard configurada');
    console.log('🚀 Pronto para fazer deploy!');

  } catch (error) {
    console.error('\n❌ ERRO NA CONEXÃO FTP:');
    console.error('   ', error.message);
    
    console.log('\n🔧 Possíveis soluções:');
    console.log('   1. Verificar se credenciais estão corretas');
    console.log('   2. Verificar conexão com internet');
    console.log('   3. Tentar SFTP (secure: true, port: 22)');
    console.log('   4. Contactar suporte da Hostinger');
  } finally {
    client.close();
  }
}

testFTPConnection();
