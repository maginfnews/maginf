// Teste para verificar variáveis de ambiente
console.log('🔍 Verificando variáveis de ambiente...\n');

console.log('COVE_API_KEY:', process.env.COVE_API_KEY ? 
  `${process.env.COVE_API_KEY.substring(0, 10)}...` : 
  '❌ NÃO DEFINIDA');

console.log('COVE_PARTNER_ID:', process.env.COVE_PARTNER_ID || '❌ NÃO DEFINIDA');

console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined');

console.log('\n📋 Todas as variáveis que começam com COVE:');
Object.keys(process.env)
  .filter(key => key.startsWith('COVE'))
  .forEach(key => {
    console.log(`${key}:`, process.env[key] ? 
      (key.includes('KEY') ? `${process.env[key].substring(0, 10)}...` : process.env[key]) : 
      'undefined');
  });

console.log('\n✅ Teste concluído');
