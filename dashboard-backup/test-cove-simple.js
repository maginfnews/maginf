// Teste simples da API N-able Cove
const API_KEY = 'Vp?Fm$k@il!1M6298b0B!y$v';
const BASE_URL = 'https://api.backup.management/jsonapi';

async function testLogin(partner) {
  console.log(`\n🔗 Testando login com partner: "${partner}"`);
  
  const loginPayload = {
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
      body: JSON.stringify(loginPayload)
    });

    console.log(`   Status: ${response.status}`);
    
    const data = await response.json();
    
    if (data.error) {
      console.log(`   ❌ Erro: ${data.error.message}`);
      return null;
    }
    
    if (data.visa) {
      console.log(`   ✅ Sucesso! Visa: ${data.visa.substring(0, 30)}...`);
      return data.visa;
    }
    
    console.log(`   ⚠️ Sem visa na resposta`);
    return null;
    
  } catch (error) {
    console.log(`   ❌ Erro de conexão: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🔍 Teste N-able Cove - Diferentes Partners\n');
  
  const partners = [
    'MAGINF',
    '2871061', 
    'MAGINF-INFORMATICA-LTDA',
    'maicon@maginf.com.br',
    'MAGINF INFORMATICA LTDA'
  ];
  
  for (const partner of partners) {
    const visa = await testLogin(partner);
    if (visa) {
      console.log(`\n🎉 Partner correto encontrado: "${partner}"`);
      break;
    }
  }
  
  console.log('\n✅ Teste concluído');
}

main();
