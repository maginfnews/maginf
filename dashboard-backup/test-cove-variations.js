// Teste diferentes variações de login N-able Cove
const API_KEY = 'Vp?Fm$k@il!1M6298b0B!y$v';
const BASE_URL = 'https://api.backup.management/jsonapi';

async function testLoginVariation(params, description) {
  console.log(`\n🔗 ${description}`);
  console.log(`   Params: ${JSON.stringify(params, null, 2)}`);
  
  const loginPayload = {
    jsonrpc: '2.0',
    method: 'Login',
    params: params,
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
      return false;
    }
    
    if (data.visa) {
      console.log(`   ✅ SUCESSO! Visa: ${data.visa.substring(0, 30)}...`);
      console.log(`   Partner ID da resposta: ${data.result?.result?.PartnerId || 'N/A'}`);
      return true;
    }
    
    console.log(`   ⚠️ Resposta inesperada:`, data);
    return false;
    
  } catch (error) {
    console.log(`   ❌ Erro de conexão: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🔍 Teste N-able Cove - Variações de Login\n');
  
  const variations = [
    // Variação 1: Sem campo partner
    {
      params: {
        username: 'API-USER-DASHBOARD',
        password: API_KEY
      },
      description: 'Login sem campo partner'
    },
    
    // Variação 2: Username como email
    {
      params: {
        partner: 'MAGINF',
        username: 'maicon@maginf.com.br',
        password: API_KEY
      },
      description: 'Username como email do cliente'
    },
    
    // Variação 3: API Key como username
    {
      params: {
        partner: 'MAGINF',
        username: API_KEY,
        password: API_KEY
      },
      description: 'API Key como username e password'
    },
    
    // Variação 4: Apenas API Key
    {
      params: {
        username: API_KEY,
        password: API_KEY
      },
      description: 'Apenas API Key (sem partner)'
    },
    
    // Variação 5: Partner como número
    {
      params: {
        partner: 2871061,
        username: 'API-USER-DASHBOARD',
        password: API_KEY
      },
      description: 'Partner como número (não string)'
    }
  ];
  
  for (const variation of variations) {
    const success = await testLoginVariation(variation.params, variation.description);
    if (success) {
      console.log(`\n🎉 CONFIGURAÇÃO CORRETA ENCONTRADA!`);
      break;
    }
  }
  
  console.log('\n✅ Teste concluído');
}

main();
