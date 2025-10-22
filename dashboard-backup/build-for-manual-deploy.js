const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Gerando build para deploy manual no dashboard.maginf.com.br\n');

try {
  // 1. Configurar ambiente de produção
  console.log('⚙️  Configurando ambiente de produção...');
  if (fs.existsSync('.env.production')) {
    fs.copyFileSync('.env.production', '.env.local');
    console.log('✅ Variáveis de produção configuradas');
  }

  // 2. Verificar dependências
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Instalando dependências...');
    execSync('npm install', { stdio: 'inherit' });
  }

  // 3. Build Next.js
  console.log('🔨 Executando build do Next.js...');
  execSync('npm run build', { stdio: 'inherit' });

  // 4. Verificar se build foi criado
  if (fs.existsSync('./build')) {
    const files = fs.readdirSync('./build');
    const totalSize = files.reduce((size, file) => {
      const filePath = path.join('./build', file);
      if (fs.statSync(filePath).isFile()) {
        return size + fs.statSync(filePath).size;
      }
      return size;
    }, 0);

    console.log('\n✅ BUILD CRIADO COM SUCESSO!');
    console.log('=' .repeat(50));
    console.log(`📁 Pasta: ./build/`);
    console.log(`📄 Arquivos: ${files.length}`);
    console.log(`💾 Tamanho: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Listar arquivos principais
    console.log('\n📋 Arquivos principais:');
    files.slice(0, 10).forEach(file => {
      const filePath = path.join('./build', file);
      const stats = fs.statSync(filePath);
      const type = stats.isDirectory() ? '📁' : '📄';
      console.log(`   ${type} ${file}`);
    });
    
    if (files.length > 10) {
      console.log(`   ... e mais ${files.length - 10} arquivos`);
    }

    // Criar arquivo .htaccess
    console.log('\n⚙️  Criando .htaccess...');
    const htaccessContent = `# Dashboard MAGINF - Configuração Next.js
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

# Headers de segurança
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
`;

    fs.writeFileSync('./build/.htaccess', htaccessContent);
    console.log('✅ .htaccess criado na pasta build/');

    console.log('\n🚀 PRÓXIMOS PASSOS - DEPLOY MANUAL:');
    console.log('=' .repeat(50));
    console.log('1. 🌐 Acesse: https://hpanel.hostinger.com');
    console.log('2. 🔑 Login com conta MAGINF');
    console.log('3. 📁 Vá em: Arquivos → Gerenciador de Arquivos');
    console.log('4. 📂 Navegue: /public_html/dashboard/');
    console.log('5. 📤 Upload: TODOS os arquivos da pasta build/');
    console.log('6. ⚙️  Verifique: se .htaccess foi enviado');
    console.log('7. 🔒 Ative: SSL para dashboard.maginf.com.br');
    console.log('8. ✅ Teste: https://dashboard.maginf.com.br');

    console.log('\n📋 CRIAR SUBDOMÍNIO (se ainda não criou):');
    console.log('   hPanel → Domínios → Subdomínios → Criar');
    console.log('   Subdomínio: dashboard');
    console.log('   Domínio: maginf.com.br');
    console.log('   Pasta: public_html/dashboard');

    console.log('\n🎯 URLs para testar após deploy:');
    console.log('   🏠 https://dashboard.maginf.com.br');
    console.log('   👥 https://dashboard.maginf.com.br/clientes');
    console.log('   ⚙️  https://dashboard.maginf.com.br/status');

    console.log('\n✅ Build pronto para deploy manual!');
    
  } else {
    console.log('❌ Erro: pasta build não foi criada');
    console.log('🔧 Verifique se há erros no build do Next.js');
  }

} catch (error) {
  console.error('\n❌ ERRO NO BUILD:');
  console.error('   ', error.message);
  
  console.log('\n🔧 Possíveis soluções:');
  console.log('   1. Verificar se todas as dependências estão instaladas');
  console.log('   2. Verificar se há erros no código TypeScript');
  console.log('   3. Executar: npm install');
  console.log('   4. Executar: npm run lint');
}
