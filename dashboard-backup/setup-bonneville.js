// Script para configurar perfil Bonneville
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const bonnevilleContent = `# Configurações do N-able Cove - Perfil Bonneville
COVE_API_KEY=9WC!cvB2j?%h3h$4^iA6p%y2
COVE_PARTNER_ID=BONNEVILLE

# Configurações do Next.js
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
`;

console.log('🔧 Configurando perfil Bonneville...\n');

try {
  // Backup do arquivo atual se existir
  if (fs.existsSync(envPath)) {
    const backupPath = envPath + '.backup-maginf';
    fs.copyFileSync(envPath, backupPath);
    console.log('💾 Backup criado:', backupPath);
  }

  // Criar novo arquivo com credenciais Bonneville
  fs.writeFileSync(envPath, bonnevilleContent);
  console.log('✅ Perfil Bonneville configurado!');
  
  console.log('\n📋 Credenciais configuradas:');
  console.log('   API Key: 9WC!cvB2j?%h3h$4^iA6p%y2');
  console.log('   Partner: BONNEVILLE');
  
  console.log('\n🎯 Próximos passos:');
  console.log('1. Reinicie o servidor: Ctrl+C e npm run dev');
  console.log('2. Teste a conexão: node test-bonneville.js');
  console.log('3. Acesse o dashboard com dados reais!');
  
} catch (error) {
  console.error('❌ Erro ao configurar Bonneville:', error.message);
}

console.log('\n✅ Configuração concluída!');
