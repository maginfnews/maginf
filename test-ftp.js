const ftp = require('basic-ftp');

async function testConnection() {
  console.log('🔍 Testando conexão FTP com Hostinger...\n');
  
  const client = new ftp.Client();
  client.ftp.verbose = true; // Logs detalhados
  
  try {
    console.log('📡 Tentando conectar...');
    
    // Configurações da Hostinger
    await client.access({
      host: '185.245.180.69',
      user: 'u773500958.maginf.com.br',
      password: 'pUZkPFxas9XT6Au&',
      secure: false,
      port: 21
    });
    
    console.log('✅ Conectado com sucesso!\n');
    
    // Testar navegação
    console.log('📁 Listando diretório atual...');
    const list = await client.list();
    console.log('Arquivos encontrados:', list.length);
    
    // Tentar acessar public_html
    console.log('\n📂 Tentando acessar /public_html/...');
    await client.cd('/public_html/');
    console.log('✅ Acesso a public_html OK!');
    
    // Listar conteúdo
    const htmlList = await client.list();
    console.log('Arquivos em public_html:', htmlList.length);
    
    if (htmlList.length > 0) {
      console.log('\n📋 Primeiros 5 arquivos:');
      htmlList.slice(0, 5).forEach(file => {
        console.log(`  ${file.isDirectory ? '📁' : '📄'} ${file.name}`);
      });
    }
    
    client.close();
    console.log('\n🎉 Teste de conexão concluído com sucesso!');
    console.log('✅ FTP está funcionando corretamente.');
    
  } catch (error) {
    console.error('\n❌ Erro na conexão FTP:');
    console.error('   Código:', error.code);
    console.error('   Mensagem:', error.message);
    
    console.log('\n🔧 Possíveis soluções:');
    console.log('   1. Verificar se credenciais estão corretas');
    console.log('   2. Tentar FTPS (secure: true, port: 22)');
    console.log('   3. Verificar firewall/antivírus');
    console.log('   4. Contactar suporte Hostinger');
    
    client.close();
  }
}

testConnection();
