const { execSync } = require('child_process');
const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

// Carregar configuração do dashboard
let config;
try {
  config = require('./deploy-config-dashboard.js');
} catch (error) {
  console.log('❌ Arquivo deploy-config-dashboard.js não encontrado!');
  console.log('📋 Configure suas credenciais FTP primeiro.');
  process.exit(1);
}

async function deployDashboard() {
  console.log('🚀 Deploy Dashboard MAGINF → dashboard.maginf.com.br\n');

  try {
    // 1. Verificar se credenciais foram configuradas
    if (config.ftp.user === 'SEU_USUARIO_FTP' || config.ftp.password === 'SUA_SENHA_FTP') {
      console.log('❌ Configure suas credenciais FTP primeiro!');
      console.log('📝 Edite o arquivo: deploy-config-dashboard.js');
      console.log('🔑 Substitua SEU_USUARIO_FTP e SUA_SENHA_FTP pelas suas credenciais');
      process.exit(1);
    }

    // 2. Copiar .env de produção
    console.log('⚙️  Configurando ambiente de produção...');
    if (fs.existsSync('.env.production')) {
      fs.copyFileSync('.env.production', '.env.local');
      console.log('✅ Variáveis de produção configuradas');
    }

    // 3. Instalar dependências se necessário
    if (!fs.existsSync('node_modules')) {
      console.log('📦 Instalando dependências...');
      execSync('npm install', { stdio: 'inherit' });
    }

    // 4. Build Next.js
    console.log('📦 Criando build do dashboard...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build criado!\n');

    // 5. Verificar se build foi criado
    if (!fs.existsSync(config.localBuildPath)) {
      throw new Error('❌ Pasta build não foi criada! Verifique erros no build.');
    }

    // 6. Conectar FTP
    console.log('🔗 Conectando à Hostinger...');
    console.log(`   Host: ${config.ftp.host}`);
    console.log(`   User: ${config.ftp.user}`);
    
    const client = new ftp.Client();
    client.ftp.verbose = false; // Reduzir logs
    
    await client.access(config.ftp);
    console.log('✅ Conectado à Hostinger!\n');

    // 7. Preparar pasta do subdomínio
    console.log('📁 Preparando pasta dashboard/...');
    console.log(`   Caminho: ${config.remotePath}`);
    
    await client.ensureDir(config.remotePath);
    await client.cd(config.remotePath);
    console.log('✅ Pasta preparada');

    // 8. Limpar pasta anterior
    if (config.clearRemoteDir) {
      console.log('🧹 Limpando versão anterior...');
      try {
        const list = await client.list();
        let filesRemoved = 0;
        
        for (const item of list) {
          if (item.isFile) {
            await client.remove(item.name);
            filesRemoved++;
          } else if (item.isDirectory) {
            await client.removeDir(item.name);
            filesRemoved++;
          }
        }
        
        console.log(`✅ ${filesRemoved} itens removidos`);
      } catch (error) {
        console.log('⚠️  Pasta já estava vazia');
      }
    }

    // 9. Upload do dashboard
    console.log('📤 Fazendo upload do dashboard...');
    console.log('   Isso pode levar alguns minutos...');
    
    await client.uploadFromDir(config.localBuildPath);
    console.log('✅ Upload concluído!\n');

    // 10. Criar .htaccess para Next.js
    console.log('⚙️  Configurando .htaccess...');
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
    
    await client.uploadFrom(Buffer.from(htaccessContent), '.htaccess');
    console.log('✅ .htaccess configurado!\n');

    // 11. Fechar conexão
    client.close();

    // 12. Sucesso!
    console.log('🎉 DASHBOARD PUBLICADO COM SUCESSO!');
    console.log('=' .repeat(50));
    console.log('🌐 URL: https://dashboard.maginf.com.br');
    console.log('📁 Pasta: /public_html/dashboard/');
    console.log('⏰ Aguarde 5-10 minutos para propagação DNS');
    console.log('🔒 SSL será ativado automaticamente\n');

    console.log('📊 Informações do deploy:');
    console.log(`   📦 Projeto: ${config.projectName}`);
    console.log(`   🚀 Deploy: ${new Date().toLocaleString()}`);
    console.log(`   📂 Build: ${config.localBuildPath}`);
    console.log(`   🌐 Destino: ${config.remotePath}`);
    
    console.log('\n🔗 Links úteis:');
    console.log('   Dashboard: https://dashboard.maginf.com.br');
    console.log('   Clientes:  https://dashboard.maginf.com.br/clientes');
    console.log('   Status:    https://dashboard.maginf.com.br/status');

    console.log('\n✅ Deploy concluído com sucesso!');

  } catch (error) {
    console.error('\n❌ ERRO NO DEPLOY:');
    console.error('   ', error.message);
    
    console.log('\n🔧 Possíveis soluções:');
    console.log('   1. Verificar se subdomínio "dashboard" foi criado na Hostinger');
    console.log('   2. Verificar credenciais FTP no deploy-config-dashboard.js');
    console.log('   3. Verificar conexão com internet');
    console.log('   4. Verificar se pasta /public_html/dashboard/ existe');
    console.log('   5. Contactar suporte da Hostinger se necessário');
    
    console.log('\n📞 Suporte Hostinger:');
    console.log('   Chat: https://hpanel.hostinger.com (canto inferior direito)');
    console.log('   Docs: https://support.hostinger.com');
    
    process.exit(1);
  }
}

// Executar deploy
deployDashboard();
