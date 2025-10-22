// Teste com credenciais MAGINF (backup)
const API_KEY_MAGINF = 'Vp?Fm$k@il!1M6298b0B!y$v';
const PARTNER_ID_MAGINF = '2871061';
const BASE_URL = 'https://api.backup.management/jsonapi';

console.log('🔍 Testando EnumeratePartners com credenciais MAGINF\n');
console.log('API Key MAGINF:', `${API_KEY_MAGINF.substring(0, 10)}...`);
console.log('Partner ID MAGINF:', PARTNER_ID_MAGINF);

async function testMaginfPartners() {
  try {
    // 1. Fazer login com MAGINF
    console.log('\n🔗 Fazendo login MAGINF...');
    
    const loginPayload = {
      jsonrpc: '2.0',
      method: 'Login',
      params: {
        username: 'API-USER-DASHBOARD',
        password: API_KEY_MAGINF
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
      console.log(`❌ Erro no login MAGINF: ${loginData.error.message}`);
      
      if (loginData.error.message.includes('temporarily unavailable')) {
        const match = loginData.error.message.match(/(\d+)s/);
        if (match) {
          const seconds = parseInt(match[1]);
          const minutes = Math.ceil(seconds / 60);
          console.log(`⏰ Bloqueado por mais ${minutes} minutos`);
        }
      }
      return;
    }
    
    if (!loginData.visa) {
      console.log('❌ Visa não retornado no login MAGINF');
      return;
    }

    const visa = loginData.visa;
    console.log(`✅ Login MAGINF OK! Visa obtido.`);

    // 2. Testar EnumeratePartners com MAGINF
    console.log('\n📋 Listando partners MAGINF...');
    
    const partnersPayload = {
      jsonrpc: '2.0',
      method: 'EnumeratePartners',
      visa: visa,
      params: {
        parentPartnerId: Number(PARTNER_ID_MAGINF),
        fields: [0, 1, 3, 4, 5, 8, 10, 20],
        fetchRecursively: true
      },
      id: '2'
    };

    const partnersResponse = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partnersPayload)
    });

    const partnersData = await partnersResponse.json();
    
    if (partnersData.error) {
      console.log(`❌ Erro EnumeratePartners MAGINF: ${partnersData.error.message}`);
      return;
    }

    const partners = partnersData.result?.result || [];
    console.log(`✅ MAGINF: ${partners.length} partners encontrados\n`);
    
    if (partners.length > 0) {
      console.log('📋 CLIENTES MAGINF:');
      console.log('=' .repeat(60));
      
      partners.forEach((partner, index) => {
        console.log(`${index + 1}. ${partner.Name || 'Nome não disponível'}`);
        console.log(`   ID: ${partner.Id}`);
        console.log(`   Level: ${partner.Level || 'N/A'}`);
        console.log(`   State: ${partner.State || 'N/A'}`);
        console.log(`   ServiceType: ${partner.ServiceType || 'N/A'}`);
        if (partner.Company?.Name) {
          console.log(`   Empresa: ${partner.Company.Name}`);
        }
        console.log('');
      });
      
      // Estatísticas
      const byLevel = partners.reduce((acc, p) => {
        acc[p.Level] = (acc[p.Level] || 0) + 1;
        return acc;
      }, {});
      
      const byState = partners.reduce((acc, p) => {
        acc[p.State] = (acc[p.State] || 0) + 1;
        return acc;
      }, {});
      
      console.log('📊 ESTATÍSTICAS:');
      console.log('Por Level:', byLevel);
      console.log('Por State:', byState);
      
    } else {
      console.log('📭 Nenhum cliente encontrado na MAGINF.');
      console.log('💡 Partner ID 2871061 pode ser um EndCustomer (sem sub-clientes)');
    }

  } catch (error) {
    console.log(`❌ Erro: ${error.message}`);
  }
}

testMaginfPartners();
