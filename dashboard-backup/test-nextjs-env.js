// Teste para verificar se Next.js carrega as variáveis
console.log('🔍 Testando variáveis no contexto Next.js...\n');

// Simular o que o Next.js faz
const path = require('path');
const fs = require('fs');

const envPath = path.join(process.cwd(), '.env.local');

console.log('📁 Procurando .env.local em:', envPath);
console.log('📄 Arquivo existe:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('📋 Conteúdo do arquivo:');
  console.log('---');
  console.log(content);
  console.log('---');
  
  // Verificar se tem as variáveis necessárias
  const hasApiKey = content.includes('COVE_API_KEY=');
  const hasPartnerId = content.includes('COVE_PARTNER_ID=');
  
  console.log('\n✅ Verificação:');
  console.log('COVE_API_KEY presente:', hasApiKey);
  console.log('COVE_PARTNER_ID presente:', hasPartnerId);
  
  if (hasApiKey && hasPartnerId) {
    console.log('\n🎯 Arquivo está correto!');
    console.log('💡 O problema pode ser que o Next.js precisa ser reiniciado completamente.');
    console.log('   Tente: Ctrl+C e depois npm run dev');
  }
} else {
  console.log('❌ Arquivo .env.local não encontrado!');
  console.log('💡 Execute: node setup-env.js');
}

console.log('\n✅ Teste concluído');
