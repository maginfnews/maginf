const ftp = require('basic-ftp');

async function diagnosticoCompleto() {
  console.log('🔍 DIAGNÓSTICO COMPLETO FTP - HOSTINGER\n');
  
  // Teste 1: Conectividade básica
  console.log('📡 TESTE 1: Conectividade com servidor...');
  const client = new ftp.Client();
  
  try {
    await client.access({
      host: '185.245.180.69',
      user: 'anonymous', // Teste anônimo primeiro
      password: 'anonymous',
      secure: false,
      port: 21
    });
    console.log('✅ Servidor aceita conexões FTP');
  } catch (error) {
    console.log('❌ Servidor não aceita FTP anônimo:', error.message);
  }
  
  client.close();
  
  // Teste 2: Variações do usuário
  console.log('\n📋 TESTE 2: Testando variações do usuário...');
  
  const usuarios = [
    'u773500958.maginf.com.br',
    'u773500958',
    'maginf.com.br',
    'u773500958@maginf.com.br'
  ];
  
  for (const usuario of usuarios) {
    console.log(`\n👤 Testando usuário: ${usuario}`);
    
    const testClient = new ftp.Client();
    testClient.ftp.verbose = false;
    
    try {
      await testClient.access({
        host: '185.245.180.69',
        user: usuario,
        password: 'uQF]RGE$xMYZyp5#',
        secure: false,
        port: 21
      });
      
      console.log('✅ SUCESSO! Usuário correto:', usuario);
      testClient.close();
      return; // Parar se encontrar o correto
      
    } catch (error) {
      console.log(`❌ Falhou: ${error.message}`);
    }
    
    testClient.close();
  }
  
  // Teste 3: Hosts alternativos
  console.log('\n🌐 TESTE 3: Testando hosts alternativos...');
  
  const hosts = [
    '185.245.180.69',
    'ftp.hostinger.com',
    'ftp.hostinger.com.br',
    'maginf.com.br'
  ];
  
  for (const host of hosts) {
    console.log(`\n🏠 Testando host: ${host}`);
    
    const hostClient = new ftp.Client();
    hostClient.ftp.verbose = false;
    
    try {
      await hostClient.access({
        host: host,
        user: 'u773500958.maginf.com.br',
        password: 'uQF]RGE$xMYZyp5#',
        secure: false,
        port: 21
      });
      
      console.log('✅ SUCESSO! Host correto:', host);
      hostClient.close();
      return;
      
    } catch (error) {
      console.log(`❌ Falhou: ${error.message}`);
    }
    
    hostClient.close();
  }
  
  // Teste 4: Portas alternativas
  console.log('\n🚪 TESTE 4: Testando portas alternativas...');
  
  const portas = [21, 22, 990, 2121];
  
  for (const porta of portas) {
    console.log(`\n🔌 Testando porta: ${porta}`);
    
    const portClient = new ftp.Client();
    portClient.ftp.verbose = false;
    
    try {
      await portClient.access({
        host: '185.245.180.69',
        user: 'u773500958.maginf.com.br',
        password: 'uQF]RGE$xMYZyp5#',
        secure: porta === 22 || porta === 990,
        port: porta
      });
      
      console.log('✅ SUCESSO! Porta correta:', porta);
      portClient.close();
      return;
      
    } catch (error) {
      console.log(`❌ Falhou: ${error.message}`);
    }
    
    portClient.close();
  }
  
  console.log('\n📋 RESUMO DO DIAGNÓSTICO:');
  console.log('❌ Nenhuma combinação funcionou');
  console.log('🔧 RECOMENDAÇÕES:');
  console.log('   1. Verificar credenciais no hPanel da Hostinger');
  console.log('   2. Criar nova conta FTP');
  console.log('   3. Contactar suporte Hostinger');
  console.log('   4. Usar deploy manual via Gerenciador de Arquivos');
}

diagnosticoCompleto();
