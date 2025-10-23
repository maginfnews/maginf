const fs = require('fs');
const path = require('path');

// Criar estrutura de diretórios para SEO
const directories = [
  'src/utils',
  'src/components/SEO',
  'src/components/Navigation',
  'src/pages/seo',
  'src/content/blog',
  'public',
  'scripts'
];

console.log('📁 Criando estrutura de diretórios...');

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Criado: ${dir}`);
  } else {
    console.log(`⚠️ Já existe: ${dir}`);
  }
});

console.log('✅ Estrutura criada com sucesso!');
