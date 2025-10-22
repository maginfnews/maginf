// Script para testar conexão com N-able Cove
// Execute com: node test-cove-connection.js

const API_KEY = 'Vp?Fm$k@il!1M6298b0B!y$v';
const PARTNER_ID = '2871061'; // Partner ID numérico descoberto anteriormente
const BASE_URL = 'https://api.backup.management/jsonapi';

async function testCoveConnection() {
  console.log('🔍 Testando conexão com N-able Cove...\n');
  
  console.log('📋 Configurações:');
  console.log(`   API Key: ${API_KEY.substring(0, 10)}...`);
  console.log(`   Partner ID: ${PARTNER_ID}`);
  console.log(`   Base URL: ${BASE_URL}\n`);

  try {
    // Teste 1: Fazer login para obter visa
    console.log('🔗 Teste 1: Fazendo login para obter visa...');
    
    // Testar diferentes combinações de partner
    const loginVariations = [
      { partner: 'MAGINF', desc: 'Nome do parceiro' },
      { partner: '2871061', desc: 'ID numérico' },
      { partner: 'MAGINF-INFORMATICA-LTDA', desc: 'Nome completo' },
      { partner: 'maicon@maginf.com.br', desc: 'Email' }
    ];

    for (const variation of loginVariations) {
      console.log(`   Tentando com partner: ${variation.partner} (${variation.desc})`);
      
      const loginPayload = {
        jsonrpc: '2.0',
        method: 'Login',
        params: {
          partner: variation.partner,
          username: 'API-USER-DASHBOARD',
          password: API_KEY
        },
        id: '1'
      };

    const loginResponse = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload)
    });

    console.log(`   Status HTTP: ${loginResponse.status} ${loginResponse.statusText}`);

    if (!loginResponse.ok) {
      console.log('❌ Erro no login');
      const errorText = await loginResponse.text();
      console.log(`   Resposta: ${errorText}`);
      return;
    }

    const loginData = await loginResponse.json();
    
    if (loginData.error) {
      console.log('❌ Erro no login JSON-RPC:');
      console.log(`   Código: ${loginData.error.code}`);
      console.log(`   Mensagem: ${loginData.error.message}`);
      return;
    }

    console.log('📋 Resposta completa do login:');
    console.log(JSON.stringify(loginData, null, 2));

    if (!loginData.visa) {
      console.log('❌ Login não retornou visa');
      console.log('   Verificando se há outros campos...');
      console.log('   Campos na raiz:', Object.keys(loginData));
      return;
    }

    const visa = loginData.visa;
    const partnerId = loginData.result?.result?.PartnerId;
    console.log('✅ Login realizado com sucesso!');
    console.log(`   Visa obtido: ${visa.substring(0, 20)}...\n`);

    // Teste 2: Verificar se API responde com visa
    console.log('🔗 Teste 2: Testando EnumerateAccountStatistics...');
    
    console.log(`   Partner ID do login: ${partnerId}`);
    
    const payload = {
      jsonrpc: '2.0',
      method: 'EnumerateAccountStatistics',
      visa: visa,
      params: {
        query: {
          PartnerId: partnerId,
          SelectionMode: 'Merged',
          StartRecordNumber: 0,
          RecordsCount: 5,
          Columns: ['I1', 'F17', 'F18']
        }
      },
      id: '2'
    };
    
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log(`   Status HTTP: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      console.log('❌ Erro na requisição HTTP');
      const errorText = await response.text();
      console.log(`   Resposta: ${errorText}`);
      return;
    }

    const data = await response.json();
    console.log('✅ API respondeu com sucesso!\n');

    // Teste 3: Verificar resposta JSON-RPC
    console.log('📊 Teste 3: Analisando resposta...');
    
    if (data.error) {
      console.log('❌ Erro JSON-RPC:');
      console.log(`   Código: ${data.error.code}`);
      console.log(`   Mensagem: ${data.error.message}`);
      
      if (data.error.code === -32602) {
        console.log('\n💡 Dica: Erro de parâmetros inválidos');
        console.log('   Tente Partner ID numérico ou verifique permissões da API Key');
      }
      return;
    }

    if (data.result && data.result.result) {
      const items = data.result.result;
      console.log(`✅ Dados recebidos: ${items.length} dispositivos encontrados`);
      
      if (items.length > 0) {
        console.log('\n📋 Primeiros dispositivos:');
        items.slice(0, 3).forEach((item, index) => {
          const settings = Object.assign({}, ...item.Settings);
          console.log(`   ${index + 1}. ${settings.I1 || 'Nome não disponível'}`);
          console.log(`      Status: ${settings.F17 || 'Desconhecido'}`);
          console.log(`      Último backup: ${settings.F18 || 'Não disponível'}`);
        });
      }
    } else {
      console.log('⚠️  Resposta válida mas sem dados');
      console.log('   Pode indicar que não há dispositivos ou filtros muito restritivos');
    }

    console.log('\n🎉 Teste de conexão concluído com sucesso!');
    console.log('   O dashboard deve funcionar corretamente.');

  } catch (error) {
    console.log('❌ Erro na conexão:');
    console.log(`   ${error.message}`);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Dica: Problema de conectividade');
      console.log('   Verifique sua conexão com a internet');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Dica: Conexão recusada');
      console.log('   O servidor pode estar indisponível');
    }
  }
}

// Executar teste
testCoveConnection();
