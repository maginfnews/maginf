// Teste do perfil Bonneville
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.COVE_API_KEY;
const PARTNER_ID = process.env.COVE_PARTNER_ID;
const BASE_URL = 'https://api.backup.management/jsonapi';

console.log('🔍 Teste do Perfil Bonneville\n');
console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NÃO DEFINIDA');
console.log('Partner:', PARTNER_ID || 'NÃO DEFINIDO');

async function testBonneville() {
  if (!API_KEY || !PARTNER_ID) {
    console.log('❌ Credenciais não configuradas!');
    return;
  }

  try {
    console.log('\n🔗 Testando login Bonneville...');
    
    const loginPayload = {
      jsonrpc: '2.0',
      method: 'Login',
      params: {
        username: 'API-USER-DASHBOARD',
        password: API_KEY
      },
      id: '1'
    };

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload)
    });

    console.log(`Status: ${response.status}`);
    
    const data = await response.json();
    
    if (data.error) {
      console.log(`❌ Erro: ${data.error.message}`);
      
      if (data.error.message.includes('temporarily unavailable')) {
        console.log('⏰ API temporariamente indisponível');
        console.log('💡 Aguarde alguns minutos e tente novamente');
      } else if (data.error.message.includes('Unknown partner')) {
        console.log('🔧 Tentando descobrir Partner ID correto...');
        await tryDiscoverPartner();
      }
      return;
    }
    
    if (data.visa) {
      console.log(`✅ Login Bonneville SUCESSO!`);
      console.log(`   Visa: ${data.visa.substring(0, 30)}...`);
      
      if (data.result?.result?.PartnerId) {
        console.log(`   Partner ID descoberto: ${data.result.result.PartnerId}`);
      }
      
      console.log('\n🎉 Perfil Bonneville funcionando!');
      console.log('🚀 Reinicie o servidor e teste o dashboard');
      return true;
    }
    
    console.log('⚠️ Resposta inesperada:', data);
    
  } catch (error) {
    console.log(`❌ Erro de conexão: ${error.message}`);
  }
  
  return false;
}

async function tryDiscoverPartner() {
  console.log('\n🔍 Tentando diferentes formatos de partner...');
  
  const variations = [
    'BONNEVILLE',
    'Bonneville', 
    'bonneville',
    'BONNEVILLE-SALT-FLATS',
    'API-USER-DASHBOARD'
  ];
  
  for (const partner of variations) {
    console.log(`   Testando: ${partner}`);
    
    const payload = {
      jsonrpc: '2.0',
      method: 'Login',
      params: {
        partner: partner,
        username: 'API-USER-DASHBOARD',
        password: API_KEY
      },
      id: '1'
    };
    
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.visa) {
        console.log(`   ✅ ENCONTRADO! Partner: ${partner}`);
        console.log(`   Partner ID: ${data.result?.result?.PartnerId || 'N/A'}`);
        return partner;
      }
    } catch (e) {
      // Continuar tentando
    }
  }
  
  console.log('   ❌ Nenhum formato funcionou');
  return null;
}

testBonneville();
