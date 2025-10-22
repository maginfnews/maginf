const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Gerando build estático para deploy manual\n');

try {
  // 1. Backup do next.config.js original
  console.log('💾 Fazendo backup do next.config.js...');
  if (fs.existsSync('next.config.js')) {
    fs.copyFileSync('next.config.js', 'next.config.js.backup');
  }

  // 2. Usar configuração estática
  console.log('⚙️  Usando configuração estática...');
  fs.copyFileSync('next.config.static.js', 'next.config.js');

  // 3. Configurar ambiente de produção
  console.log('🌍 Configurando ambiente de produção...');
  if (fs.existsSync('.env.production')) {
    fs.copyFileSync('.env.production', '.env.local');
  }

  // 4. Build estático
  console.log('🔨 Executando build estático...');
  execSync('npm run build', { stdio: 'inherit' });

  // 5. Restaurar configuração original
  console.log('🔄 Restaurando configuração original...');
  if (fs.existsSync('next.config.js.backup')) {
    fs.copyFileSync('next.config.js.backup', 'next.config.js');
    fs.unlinkSync('next.config.js.backup');
  }

  // 6. Verificar build
  if (fs.existsSync('./out')) {
    const files = fs.readdirSync('./out');
    console.log(`\n✅ BUILD ESTÁTICO CRIADO!`);
    console.log('=' .repeat(50));
    console.log(`📁 Pasta: ./out/`);
    console.log(`📄 Arquivos: ${files.length}`);

    // Criar .htaccess
    const htaccessContent = `# Dashboard MAGINF - Configuração Estática
RewriteEngine On

# Redirecionar para index.html se arquivo não existir
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Forçar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache para assets estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
`;

    fs.writeFileSync('./out/.htaccess', htaccessContent);
    console.log('✅ .htaccess criado');

    console.log('\n🚀 DEPLOY MANUAL - PRÓXIMOS PASSOS:');
    console.log('=' .repeat(50));
    console.log('1. 🌐 Acesse: https://hpanel.hostinger.com');
    console.log('2. 📁 Vá em: Arquivos → Gerenciador de Arquivos');
    console.log('3. 📂 Navegue: /public_html/dash/');
    console.log('4. 📤 Upload: TODOS os arquivos da pasta out/');
    console.log('5. ✅ Teste: https://dashboard.maginf.com.br');

    console.log('\n⚠️  IMPORTANTE:');
    console.log('   - As APIs não funcionarão no build estático');
    console.log('   - Apenas dados de demonstração serão exibidos');
    console.log('   - Para APIs funcionais, use servidor Node.js');

  } else {
    console.log('❌ Pasta out/ não foi criada');
  }

} catch (error) {
  console.error('\n❌ ERRO:', error.message);
  
  // Restaurar configuração em caso de erro
  if (fs.existsSync('next.config.js.backup')) {
    fs.copyFileSync('next.config.js.backup', 'next.config.js');
    fs.unlinkSync('next.config.js.backup');
  }
}
