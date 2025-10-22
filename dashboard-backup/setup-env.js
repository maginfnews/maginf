// Script para configurar automaticamente o .env.local
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envContent = `# Configurações do N-able Cove - MAGINF
COVE_API_KEY=Vp?Fm$k@il!1M6298b0B!y$v
COVE_PARTNER_ID=2871061

# Configurações do Next.js
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
`;

console.log('🔧 Configurando ambiente...\n');

// Verificar se .env.local existe
if (fs.existsSync(envPath)) {
  console.log('✅ Arquivo .env.local já existe');
  
  // Verificar conteúdo
  const currentContent = fs.readFileSync(envPath, 'utf8');
  
  if (currentContent.includes('COVE_API_KEY') && currentContent.includes('COVE_PARTNER_ID')) {
    console.log('✅ Variáveis COVE já configuradas');
  } else {
    console.log('⚠️  Variáveis COVE não encontradas, adicionando...');
    fs.appendFileSync(envPath, '\n' + envContent);
    console.log('✅ Variáveis adicionadas ao .env.local');
  }
} else {
  console.log('📝 Criando .env.local...');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Arquivo .env.local criado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar .env.local:', error.message);
    console.log('\n📋 Conteúdo para criar manualmente:');
    console.log('---');
    console.log(envContent);
    console.log('---');
  }
}

console.log('\n🎯 Próximos passos:');
console.log('1. Reinicie o servidor: npm run dev');
console.log('2. Acesse: http://localhost:3000/clientes/2871061/backups');
console.log('\n✅ Configuração concluída!');
