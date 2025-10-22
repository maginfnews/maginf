// Teste múltiplas configurações FTP
const ftp = require('basic-ftp');

const configurations = [
  {
    name: 'Config 1 - FTP com usuário completo',
    config: {
      host: '185.245.180.69',
      user: 'u773500958.maginf.com.br',
      password: 'uQF]RGE$xMYZyp5#',
      secure: false,
      port: 21
    }
  },
  {
    name: 'Config 2 - FTP com usuário simples',
    config: {
      host: '185.245.180.69',
      user: 'u773500958',
      password: 'uQF]RGE$xMYZyp5#',
      secure: false,
      port: 21
    }
  },
  {
    name: 'Config 3 - SFTP com usuário completo',
    config: {
      host: '185.245.180.69',
      user: 'u773500958.maginf.com.br',
      password: 'uQF]RGE$xMYZyp5#',
      secure: true,
      port: 22
    }
  },
  {
    name: 'Config 4 - FTP com host alternativo',
    config: {
      host: 'ftp.hostinger.com',
      user: 'u773500958.maginf.com.br',
      password: 'uQF]RGE$xMYZyp5#',
      secure: false,
      port: 21
    }
  },
  {
    name: 'Config 5 - FTP com domínio',
    config: {
      host: 'maginf.com.br',
      user: 'u773500958.maginf.com.br',
      password: 'uQF]RGE$xMYZyp5#',
      secure: false,
      port: 21
    }
  }
];

async function testConfiguration(configData) {
  const { name, config } = configData;
  console.log(`\n🔍 Testando: ${name}`);
  console.log(`   Host: ${config.host}:${config.port}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Secure: ${config.secure}`);

  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    // Timeout de 10 segundos
    await Promise.race([
      client.access(config),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]);

    console.log('   ✅ CONEXÃO FUNCIONOU!');
    
    // Testar listagem
    try {
      await client.cd('/public_html/');
      const list = await client.list();
      console.log(`   📁 Encontrados ${list.length} itens em /public_html/`);
      
      // Verificar se pasta dashboard existe
      const dashboardExists = list.some(item => 
        item.isDirectory && item.name === 'dashboard'
      );
      
      if (dashboardExists) {
        console.log('   📂 Pasta dashboard/ já existe');
      } else {
        console.log('   📂 Pasta dashboard/ não existe (será criada)');
      }
      
      return { success: true, config };
      
    } catch (listError) {
      console.log('   ⚠️  Conectou mas erro ao listar:', listError.message);
      return { success: true, config, warning: listError.message };
    }

  } catch (error) {
    if (error.message === 'Timeout') {
      console.log('   ❌ Timeout (10s)');
    } else if (error.message.includes('530')) {
      console.log('   ❌ Login incorreto');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('   ❌ Host não encontrado');
    } else if (error.message.includes('ETIMEDOUT')) {
      console.log('   ❌ Conexão timeout');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('   ❌ Conexão recusada');
    } else {
      console.log('   ❌ Erro:', error.message);
    }
    return { success: false, error: error.message };
    
  } finally {
    client.close();
  }
}

async function testAllConfigurations() {
  console.log('🚀 Testando múltiplas configurações FTP para MAGINF\n');
  console.log('=' .repeat(60));

  const results = [];
  
  for (const configData of configurations) {
    const result = await testConfiguration(configData);
    results.push({ ...configData, result });
    
    if (result.success) {
      console.log('\n🎉 CONFIGURAÇÃO FUNCIONOU!');
      console.log('📋 Use esta configuração no deploy-config-dashboard.js:');
      console.log('```javascript');
      console.log('ftp: {');
      console.log(`  host: '${configData.config.host}',`);
      console.log(`  user: '${configData.config.user}',`);
      console.log(`  password: '${configData.config.password}',`);
      console.log(`  secure: ${configData.config.secure},`);
      console.log(`  port: ${configData.config.port}`);
      console.log('}');
      console.log('```');
      break; // Parar no primeiro que funcionar
    }
  }

  console.log('\n📊 RESUMO DOS TESTES:');
  console.log('=' .repeat(60));
  
  results.forEach(({ name, result }) => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${name}`);
    if (result.warning) {
      console.log(`   ⚠️  ${result.warning}`);
    }
  });

  const workingConfigs = results.filter(r => r.result.success);
  
  if (workingConfigs.length === 0) {
    console.log('\n❌ NENHUMA CONFIGURAÇÃO FUNCIONOU');
    console.log('🔧 Sugestões:');
    console.log('   1. Verificar credenciais no hPanel da Hostinger');
    console.log('   2. Verificar se FTP está habilitado na conta');
    console.log('   3. Contactar suporte da Hostinger');
    console.log('   4. Tentar usar o Gerenciador de Arquivos do hPanel');
  } else {
    console.log(`\n✅ ${workingConfigs.length} configuração(ões) funcionaram!`);
    console.log('🚀 Agora você pode executar: npm run deploy');
  }
}

testAllConfigurations();
