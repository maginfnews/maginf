// Teste da nova API da MAGINF Platform
console.log('🔍 Testando API da MAGINF Platform\n');

async function testMaginfAPI() {
  try {
    console.log('📡 Fazendo requisição para /api/maginf/clientes...');
    
    const response = await fetch('http://localhost:3000/api/maginf/clientes');
    
    console.log(`Status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('\n📊 RESULTADO:');
    console.log('=' .repeat(50));
    console.log(`Total de clientes: ${data.total}`);
    console.log(`Modo demo: ${data.demo ? 'SIM' : 'NÃO'}`);
    console.log(`Provider: ${data.provider}`);
    console.log(`Timestamp: ${data.timestamp}`);
    
    if (data.error) {
      console.log(`⚠️ Erro: ${data.error}`);
    }
    
    if (data.connection) {
      console.log(`🔗 Conexão: ${data.connection.connected ? 'OK' : 'FALHA'}`);
      console.log(`   Mensagem: ${data.connection.message}`);
    }
    
    console.log('\n👥 CLIENTES ENCONTRADOS:');
    console.log('=' .repeat(50));
    
    if (data.clients && data.clients.length > 0) {
      data.clients.forEach((client, index) => {
        console.log(`${index + 1}. ${client.name}`);
        console.log(`   ID: ${client.id}`);
        console.log(`   Empresa: ${client.company || 'N/A'}`);
        console.log(`   Email: ${client.email || 'N/A'}`);
        console.log(`   Level: ${client.level}`);
        console.log(`   State: ${client.state}`);
        console.log(`   Serviço: ${client.serviceType}`);
        if (client.devices !== undefined) {
          console.log(`   Dispositivos: ${client.devices}`);
        }
        if (client.lastBackup) {
          console.log(`   Último backup: ${client.lastBackup}`);
        }
        if (client.backupStatus) {
          console.log(`   Status backup: ${client.backupStatus}`);
        }
        console.log('');
      });
      
      // Estatísticas
      const byLevel = data.clients.reduce((acc, c) => {
        acc[c.level] = (acc[c.level] || 0) + 1;
        return acc;
      }, {});
      
      const byState = data.clients.reduce((acc, c) => {
        acc[c.state] = (acc[c.state] || 0) + 1;
        return acc;
      }, {});
      
      console.log('📈 ESTATÍSTICAS:');
      console.log('Por Level:', byLevel);
      console.log('Por State:', byState);
      
    } else {
      console.log('📭 Nenhum cliente encontrado');
    }
    
    console.log('\n✅ Teste concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

// Executar teste
testMaginfAPI();
