// Teste com dotenv para carregar .env.local
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Verificando variáveis de ambiente (com dotenv)...\n');

console.log('COVE_API_KEY:', process.env.COVE_API_KEY ? 
  `${process.env.COVE_API_KEY.substring(0, 10)}...` : 
  '❌ NÃO DEFINIDA');

console.log('COVE_PARTNER_ID:', process.env.COVE_PARTNER_ID || '❌ NÃO DEFINIDA');

console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined');

if (process.env.COVE_API_KEY && process.env.COVE_PARTNER_ID) {
  console.log('\n✅ Todas as variáveis estão configuradas!');
  console.log('🎯 O Next.js deve funcionar após reiniciar o servidor.');
} else {
  console.log('\n❌ Variáveis ainda não configuradas');
}

console.log('\n✅ Teste concluído');
