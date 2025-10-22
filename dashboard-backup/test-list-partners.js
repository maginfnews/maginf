// Teste direto do EnumeratePartners
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.COVE_API_KEY;
const PARTNER_ID = process.env.COVE_PARTNER_ID;
const BASE_URL = 'https://api.backup.management/jsonapi';

console.log('🔍 Testando EnumeratePartners no N-able Cove\n');
console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NÃO DEFINIDA');
console.log('Partner ID:', PARTNER_ID || 'NÃO DEFINIDO');

async function testEnumeratePartners() {
  if (!API_KEY || !PARTNER_ID) {
    console.log('❌ Credenciais não configuradas!');
    return;
  }

  try {
    // 1. Fazer login primeiro
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

    const loginData = await loginResponse.json();
    
    if (loginData.error) {
      console.log(`❌ Erro no login: ${loginData.error.message}`);
      return;
    }
    
    if (!loginData.visa) {
      console.log('❌ Visa não retornado no login');
      return;
    }

    const visa = loginData.visa;
    console.log(`✅ Login OK! Visa obtido.`);

    // 2. Testar EnumeratePartners
    console.log('\n📋 Testando EnumeratePartners...');
    
    const partnersPayload = {
      jsonrpc: '2.0',
      method: 'EnumeratePartners',
      visa: visa,
      params: {
        parentPartnerId: Number(PARTNER_ID),
        fields: [0, 1, 3, 4, 5, 8, 10, 20], // Name, Level, ChildServiceTypes, ServiceType, State, LocationId, Company, CreationTime
        fetchRecursively: true
      },
      id: '2'
    };

    const partnersResponse = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partnersPayload)
    });

    console.log(`Status: ${partnersResponse.status}`);
    
    const partnersData = await partnersResponse.json();
    
    if (partnersData.error) {
      console.log(`❌ Erro EnumeratePartners: ${partnersData.error.message}`);
      return;
    }

    const partners = partnersData.result?.result || [];
    console.log(`✅ Sucesso! ${partners.length} partners encontrados\n`);
    
    if (partners.length > 0) {
      console.log('📋 Lista de Partners/Clientes:');
      console.log('=' .repeat(50));
      
      partners.forEach((partner, index) => {
        console.log(`${index + 1}. ${partner.Name || 'Nome não disponível'}`);
        console.log(`   ID: ${partner.Id}`);
        console.log(`   Level: ${partner.Level || 'N/A'}`);
        console.log(`   State: ${partner.State || 'N/A'}`);
        console.log(`   ServiceType: ${partner.ServiceType || 'N/A'}`);
        if (partner.ParentId) {
          console.log(`   Parent ID: ${partner.ParentId}`);
        }
        console.log('');
      });
      
      // Filtrar apenas EndCustomers
      const endCustomers = partners.filter(p => p.Level === 'EndCustomer');
      console.log(`🎯 EndCustomers encontrados: ${endCustomers.length}`);
      
      if (endCustomers.length > 0) {
        console.log('\n👥 Clientes Finais (EndCustomers):');
        endCustomers.forEach((customer, index) => {
          console.log(`${index + 1}. ${customer.Name} (ID: ${customer.Id})`);
        });
      }
      
    } else {
      console.log('📭 Nenhum partner encontrado.');
      console.log('💡 Isso pode significar:');
      console.log('   - Partner ID não tem sub-partners');
      console.log('   - Partner ID é um EndCustomer (folha da árvore)');
      console.log('   - Permissões insuficientes');
    }

  } catch (error) {
    console.log(`❌ Erro de conexão: ${error.message}`);
  }
}

testEnumeratePartners();
