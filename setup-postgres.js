const https = require('https');

// Configurações
const VERCEL_TOKEN = 'GHvRGQtmjV8YRcZndaQQ9P7X';
const PROJECT_NAME = 'maginf-portal';

async function setupPostgreSQL() {
  console.log('🗄️ Configurando PostgreSQL automaticamente...');
  
  try {
    // 1. Obter informações do projeto
    console.log('📋 Buscando informações do projeto...');
    const projectInfo = await makeVercelRequest(`/v9/projects/${PROJECT_NAME}`, 'GET');
    
    if (!projectInfo.success) {
      throw new Error('Projeto não encontrado: ' + JSON.stringify(projectInfo.error));
    }
    
    console.log('✅ Projeto encontrado:', projectInfo.data.name);
    
    // 2. Criar banco PostgreSQL
    console.log('🚀 Criando banco PostgreSQL...');
    const dbData = {
      type: 'postgres',
      name: 'maginf-database',
      region: 'iad1' // US East
    };
    
    const dbResponse = await makeVercelRequest('/v1/storage/stores', 'POST', dbData);
    
    if (!dbResponse.success) {
      console.log('⚠️ Erro ao criar banco (pode já existir):', dbResponse.error);
      
      // Tentar listar bancos existentes
      console.log('📋 Verificando bancos existentes...');
      const existingDbs = await makeVercelRequest('/v1/storage/stores', 'GET');
      
      if (existingDbs.success && existingDbs.data.length > 0) {
        console.log('✅ Bancos encontrados:');
        existingDbs.data.forEach(db => {
          console.log(`  - ${db.name} (${db.type}) - ${db.id}`);
        });
        
        // Usar o primeiro banco PostgreSQL encontrado
        const postgresDb = existingDbs.data.find(db => db.type === 'postgres');
        if (postgresDb) {
          console.log(`🎯 Usando banco existente: ${postgresDb.name}`);
          await linkDatabaseToProject(postgresDb.id, projectInfo.data.id);
          return;
        }
      }
      
      throw new Error('Não foi possível criar ou encontrar banco PostgreSQL');
    }
    
    console.log('✅ Banco PostgreSQL criado:', dbResponse.data.name);
    
    // 3. Conectar banco ao projeto
    await linkDatabaseToProject(dbResponse.data.id, projectInfo.data.id);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.log('\n📋 Instruções manuais:');
    printManualInstructions();
  }
}

async function linkDatabaseToProject(databaseId, projectId) {
  console.log('🔗 Conectando banco ao projeto...');
  
  try {
    const linkData = {
      type: 'postgres'
    };
    
    const linkResponse = await makeVercelRequest(
      `/v1/storage/stores/${databaseId}/projects/${projectId}`, 
      'POST', 
      linkData
    );
    
    if (linkResponse.success) {
      console.log('✅ Banco conectado ao projeto com sucesso!');
      
      // 4. Obter string de conexão
      console.log('🔑 Obtendo string de conexão...');
      const connectionInfo = await makeVercelRequest(
        `/v1/storage/stores/${databaseId}/projects/${projectId}`, 
        'GET'
      );
      
      if (connectionInfo.success) {
        console.log('✅ Configuração concluída!');
        console.log('\n🎯 PRÓXIMOS PASSOS:');
        console.log('1. Acesse: https://vercel.com/dashboard/projects/maginf-portal');
        console.log('2. Vá em Settings → Environment Variables');
        console.log('3. A variável DATABASE_URL já deve estar configurada automaticamente');
        console.log('4. Execute o script de restauração de dados');
        
        updateNextSteps();
      }
    } else {
      throw new Error('Erro ao conectar banco: ' + JSON.stringify(linkResponse.error));
    }
    
  } catch (error) {
    console.error('❌ Erro ao conectar banco:', error.message);
    printManualInstructions();
  }
}

function makeVercelRequest(endpoint, method, data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    
    const options = {
      hostname: 'api.vercel.com',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };
    
    if (postData) {
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = responseData ? JSON.parse(responseData) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ success: true, data: parsed });
          } else {
            resolve({ success: false, error: parsed, statusCode: res.statusCode });
          }
        } catch (e) {
          reject(new Error('Erro ao parsear resposta da API: ' + responseData));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

function printManualInstructions() {
  console.log(`
🔧 INSTRUÇÕES MANUAIS PARA POSTGRESQL:

1. Acesse: https://vercel.com/dashboard/projects/${PROJECT_NAME}
2. Clique em "Storage" na barra lateral
3. Clique em "Create Database"
4. Selecione "Postgres"
5. Configure:
   - Database Name: maginf-database
   - Region: US East (iad1)
6. Clique em "Create"
7. Copie a DATABASE_URL gerada
8. Vá em Settings → Environment Variables
9. Atualize a variável DATABASE_URL com o valor copiado
10. Faça redeploy do projeto

🔄 DEPOIS:
- Execute: node restore-data.js (para restaurar os dados)
`);
}

function updateNextSteps() {
  console.log('📝 PostgreSQL configurado! Próximo passo: restaurar dados.');
}

// Executar configuração
setupPostgreSQL();
