const ftp = require('basic-ftp');

async function testSecureConnection() {
  console.log('🔒 Testando conexão FTPS (segura) com Hostinger...\n');
  
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    console.log('📡 Tentando FTPS na porta 21...');
    
    await client.access({
      host: '185.245.180.69',
      user: 'u773500958.maginf.com.br',
      password: 'uQF]RGE$xMYZyp5#',
      secure: true, // FTPS
      port: 21
    });
    
    console.log('✅ FTPS conectado com sucesso!');
    
  } catch (error) {
    console.log('❌ FTPS porta 21 falhou:', error.message);
    
    try {
      console.log('\n📡 Tentando SFTP na porta 22...');
      
      await client.access({
        host: '185.245.180.69',
        user: 'u773500958.maginf.com.br',
        password: 'uQF]RGE$xMYZyp5#',
        secure: true,
        port: 22
      });
      
      console.log('✅ SFTP conectado com sucesso!');
      
    } catch (error2) {
      console.log('❌ SFTP porta 22 falhou:', error2.message);
      
      console.log('\n🔍 Testando hosts alternativos...');
      
      const hosts = [
        'ftp.hostinger.com',
        'ftp.hostinger.com.br',
        'files.000webhost.com'
      ];
      
      for (const host of hosts) {
        try {
          console.log(`\n📡 Tentando ${host}...`);
          
          await client.access({
            host: host,
            user: 'u773500958.maginf.com.br',
            password: 'uQF]RGE$xMYZyp5#',
            secure: false,
            port: 21
          });
          
          console.log(`✅ Sucesso com ${host}!`);
          break;
          
        } catch (hostError) {
          console.log(`❌ ${host} falhou:`, hostError.message);
        }
      }
    }
  }
  
  client.close();
}

testSecureConnection();
