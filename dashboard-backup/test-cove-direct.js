// Teste direto da API N-able Cove com as credenciais do .env.local
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.COVE_API_KEY;
const PARTNER_ID = process.env.COVE_PARTNER_ID;
const BASE_URL = 'https://api.backup.management/jsonapi';

console.log('🔍 Teste direto N-able Cove com .env.local\n');
console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NÃO DEFINIDA');
console.log('Partner ID:', PARTNER_ID || 'NÃO DEFINIDO');

async function testDirectConnection() {
  if (!API_KEY || !PARTNER_ID) {
    console.log('❌ Variáveis não definidas!');
    return;
  }

  try {
    // Teste de login
    console.log('\n🔗 Fazendo login...');
    
    const loginPayload = {
      jsonrpc: '2.0',
      method: 'Login',
      params: {
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

    console.log(`Status: ${loginResponse.status}`);
    
    const loginData = await loginResponse.json();
    
    if (loginData.error) {
      console.log(`❌ Erro no login: ${loginData.error.message}`);
      return;
    }
    
    if (!loginData.visa) {
      console.log('❌ Visa não retornado');
      return;
    }

    const visa = loginData.visa;
    console.log(`✅ Login OK! Visa: ${visa.substring(0, 30)}...`);

    // Teste EnumerateAccountStatistics
    console.log('\n📊 Testando EnumerateAccountStatistics...');
    
    const statsPayload = {
      jsonrpc: '2.0',
      method: 'EnumerateAccountStatistics',
      visa: visa,
      params: {
        query: {
          PartnerId: Number(PARTNER_ID),
          SelectionMode: 'Merged',
          StartRecordNumber: 0,
          RecordsCount: 5,
          Columns: ['I1', 'F17', 'F18']
        }
      },
      id: '2'
    };

    const statsResponse = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statsPayload)
    });

    console.log(`Status: ${statsResponse.status}`);
    
    const statsData = await statsResponse.json();
    
    if (statsData.error) {
      console.log(`❌ Erro: ${statsData.error.message}`);
      return;
    }

    const devices = statsData.result?.result || [];
    console.log(`✅ Sucesso! ${devices.length} dispositivos encontrados`);
    
    if (devices.length > 0) {
      console.log('\n📋 Primeiros dispositivos:');
      devices.slice(0, 3).forEach((device, i) => {
        const settings = Object.assign({}, ...device.Settings);
        console.log(`${i + 1}. ${settings.I1 || 'Nome não disponível'}`);
      });
    }

    console.log('\n🎉 Conexão funcionando perfeitamente!');
    console.log('💡 O problema deve estar no código do CoveProvider.');

  } catch (error) {
    console.log(`❌ Erro de conexão: ${error.message}`);
  }
}

testDirectConnection();
