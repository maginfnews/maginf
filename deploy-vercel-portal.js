const https = require('https');
const fs = require('fs');

// Configurações do deploy
const VERCEL_TOKEN = 'GHvRGQtmjV8YRcZndaQQ9P7X';
const PROJECT_CONFIG = {
  name: 'maginf-portal',
  framework: 'nextjs',
  rootDirectory: 'portal-maginf',
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  environmentVariables: [
    {
      key: 'NEXTAUTH_URL',
      value: 'https://maginf-portal.vercel.app',
      type: 'plain',
      target: ['production']
    },
    {
      key: 'NEXTAUTH_SECRET',
      value: 'maginf-2024-super-secret-key',
      type: 'encrypted',
      target: ['production']
    },
    {
      key: 'DATABASE_URL',
      value: 'postgresql://placeholder-configure-later',
      type: 'encrypted',
      target: ['production']
    }
  ]
};

async function deployToVercel() {
  console.log('🚀 Iniciando deploy automático do Portal MAGINF...');
  
  try {
    // 1. Criar projeto no Vercel
    const projectData = {
      name: PROJECT_CONFIG.name,
      gitRepository: {
        repo: 'maginfnews/maginf',
        type: 'github'
      },
      framework: PROJECT_CONFIG.framework,
      rootDirectory: PROJECT_CONFIG.rootDirectory,
      buildCommand: PROJECT_CONFIG.buildCommand,
      outputDirectory: PROJECT_CONFIG.outputDirectory,
      environmentVariables: PROJECT_CONFIG.environmentVariables
    };

    console.log('📋 Configurações do projeto:');
    console.log(JSON.stringify(projectData, null, 2));

    // Fazer requisição para API do Vercel
    const response = await makeVercelRequest('/v10/projects', 'POST', projectData);
    
    if (response.success) {
      console.log('✅ Projeto criado com sucesso!');
      console.log(`🌐 URL: https://${PROJECT_CONFIG.name}.vercel.app`);
      console.log('📊 Dashboard:', `https://vercel.com/dashboard/projects/${PROJECT_CONFIG.name}`);
      
      // Atualizar arquivo de próximos passos
      updateNextSteps();
      
    } else {
      console.error('❌ Erro ao criar projeto:', response.error);
      console.log('\n📋 Instruções manuais:');
      printManualInstructions();
    }

  } catch (error) {
    console.error('❌ Erro durante deploy:', error.message);
    console.log('\n📋 Instruções manuais:');
    printManualInstructions();
  }
}

function makeVercelRequest(endpoint, method, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'api.vercel.com',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ success: true, data: parsed });
          } else {
            resolve({ success: false, error: parsed });
          }
        } catch (e) {
          reject(new Error('Erro ao parsear resposta da API'));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

function printManualInstructions() {
  console.log(`
🔧 INSTRUÇÕES MANUAIS PARA DEPLOY:

1. Acesse: https://vercel.com/dashboard
2. Clique em "Add New Project"
3. Selecione: maginfnews/maginf
4. Configure:
   - Project Name: ${PROJECT_CONFIG.name}
   - Framework: Next.js
   - Root Directory: ${PROJECT_CONFIG.rootDirectory}
   - Build Command: ${PROJECT_CONFIG.buildCommand}
   - Output Directory: ${PROJECT_CONFIG.outputDirectory}

5. Adicione as variáveis de ambiente:
${PROJECT_CONFIG.environmentVariables.map(env => `   - ${env.key}=${env.value}`).join('\n')}

6. Clique em "Deploy"
`);
}

function updateNextSteps() {
  console.log('📝 Atualizando próximos passos...');
  // Aqui poderíamos atualizar o arquivo PROXIMOS-PASSOS.md
  // mas como não temos acesso direto ao sistema de arquivos neste contexto,
  // vamos apenas mostrar o que seria atualizado
}

// Verificar se o token foi fornecido
if (VERCEL_TOKEN === 'your-vercel-token-here') {
  console.log(`
❌ ERRO: Token do Vercel não configurado!

Para usar este script automaticamente:

1. Acesse: https://vercel.com/account/tokens
2. Crie um novo token
3. Substitua 'your-vercel-token-here' pelo seu token neste arquivo
4. Execute: node deploy-vercel-portal.js

OU execute as instruções manuais abaixo:
`);
  printManualInstructions();
} else {
  // Executar deploy
  deployToVercel();
}
