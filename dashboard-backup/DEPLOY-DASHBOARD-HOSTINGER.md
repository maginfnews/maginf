# 🚀 Deploy Dashboard no Subdomínio - Hostinger

## 🎯 Objetivo
Publicar o dashboard de backup no subdomínio: **dashboard.maginf.com.br**

## 📋 Passo a Passo na Hostinger

### 1. 🌐 Criar Subdomínio na Hostinger

1. **Acesse o hPanel**: https://hpanel.hostinger.com
2. **Faça login** com suas credenciais
3. **Vá em "Domínios"** → **"Subdomínios"**
4. **Clique em "Criar Subdomínio"**
5. **Configure**:
   ```
   Subdomínio: dashboard
   Domínio: maginf.com.br
   Pasta de destino: /public_html/dashboard/
   ```
6. **Clique em "Criar"**

### 2. 📁 Estrutura de Pastas no Servidor

Após criar o subdomínio, você terá:
```
/public_html/
├── dashboard/          ← Pasta do subdomínio
│   └── (arquivos do dashboard aqui)
├── index.html         ← Site principal
└── outros arquivos...
```

### 3. ⚙️ Configurar Deploy Automático

Crie o arquivo de configuração para o dashboard:

```javascript
// dashboard-backup/deploy-config-dashboard.js
module.exports = {
  ftp: {
    host: 'ftp.hostinger.com',
    user: 'SEU_USUARIO_FTP',      // Ex: u123456789
    password: 'SUA_SENHA_FTP',     // Sua senha FTP
    secure: false,
    port: 21
  },
  localBuildPath: './build',       // Pasta do build Next.js
  remotePath: '/public_html/dashboard/',  // Pasta do subdomínio
  domain: 'https://dashboard.maginf.com.br',
  clearRemoteDir: true,           // Limpar pasta antes do upload
  uploadHtaccess: true
};
```

### 4. 🔧 Preparar Dashboard para Produção

#### A. Configurar Next.js para Subdomínio

Edite `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // Para gerar arquivos estáticos
  trailingSlash: true,          // URLs com / no final
  images: {
    unoptimized: true           // Para hospedagem estática
  },
  basePath: '',                 // Sem basePath para subdomínio
  assetPrefix: '',              // Sem prefix para subdomínio
}

module.exports = nextConfig
```

#### B. Configurar Variáveis de Ambiente

Crie `.env.production`:
```env
# Configurações de Produção - Dashboard MAGINF
COVE_API_KEY=Vp?Fm$k@il!1M6298b0B!y$v
COVE_PARTNER_ID=2871061
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://dashboard.maginf.com.br
```

### 5. 📦 Script de Deploy Automático

Crie `deploy-dashboard.js`:
```javascript
const { execSync } = require('child_process');
const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

// Carregar configuração do dashboard
const config = require('./deploy-config-dashboard.js');

async function deployDashboard() {
  console.log('🚀 Deploy Dashboard MAGINF → dashboard.maginf.com.br\n');

  try {
    // 1. Copiar .env de produção
    console.log('⚙️  Configurando ambiente de produção...');
    if (fs.existsSync('.env.production')) {
      fs.copyFileSync('.env.production', '.env.local');
    }

    // 2. Build Next.js
    console.log('📦 Criando build do dashboard...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build criado!\n');

    // 3. Conectar FTP
    console.log('🔗 Conectando à Hostinger...');
    const client = new ftp.Client();
    await client.access(config.ftp);
    console.log('✅ Conectado!\n');

    // 4. Preparar pasta do subdomínio
    console.log('📁 Preparando pasta dashboard/...');
    await client.ensureDir(config.remotePath);
    await client.cd(config.remotePath);

    // 5. Limpar pasta anterior
    if (config.clearRemoteDir) {
      console.log('🧹 Limpando versão anterior...');
      try {
        const list = await client.list();
        for (const item of list) {
          if (item.isFile) {
            await client.remove(item.name);
          } else if (item.isDirectory) {
            await client.removeDir(item.name);
          }
        }
      } catch (error) {
        console.log('⚠️  Pasta já estava vazia');
      }
    }

    // 6. Upload do dashboard
    console.log('📤 Fazendo upload do dashboard...');
    await client.uploadFromDir(config.localBuildPath);
    console.log('✅ Upload concluído!\n');

    // 7. Criar .htaccess para Next.js
    console.log('⚙️  Configurando .htaccess...');
    const htaccessContent = `
# Next.js Dashboard - Configuração Hostinger
RewriteEngine On

# Redirecionar para index.html se arquivo não existir
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

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
    
    await client.uploadFrom(Buffer.from(htaccessContent), '.htaccess');
    console.log('✅ .htaccess configurado!\n');

    // 8. Fechar conexão
    client.close();

    // 9. Sucesso!
    console.log('🎉 DASHBOARD PUBLICADO COM SUCESSO!');
    console.log('🌐 Acesse: https://dashboard.maginf.com.br');
    console.log('⏰ Aguarde 5-10 minutos para propagação DNS\n');

    console.log('📊 Informações do deploy:');
    console.log('   📦 Pasta: /public_html/dashboard/');
    console.log('   🚀 Deploy:', new Date().toLocaleString());
    console.log('   🔗 URL: https://dashboard.maginf.com.br');

  } catch (error) {
    console.error('\n❌ ERRO NO DEPLOY:');
    console.error('   ', error.message);
    console.log('\n🔧 Soluções:');
    console.log('   1. Verificar se subdomínio foi criado na Hostinger');
    console.log('   2. Verificar credenciais FTP');
    console.log('   3. Verificar se pasta /public_html/dashboard/ existe');
    process.exit(1);
  }
}

deployDashboard();
```

### 6. 🏃‍♂️ Como Executar o Deploy

1. **Configure suas credenciais FTP** no `deploy-config-dashboard.js`
2. **Execute o deploy**:
   ```bash
   cd dashboard-backup
   node deploy-dashboard.js
   ```

### 7. ✅ Verificar se Funcionou

Após o deploy, teste:
- **URL principal**: https://dashboard.maginf.com.br
- **Lista de clientes**: https://dashboard.maginf.com.br/clientes
- **Status**: https://dashboard.maginf.com.br/status

### 8. 🔧 Troubleshooting

#### ❌ "Subdomínio não encontrado"
- Verificar se foi criado corretamente na Hostinger
- Aguardar propagação DNS (até 24h)

#### ❌ "Erro 500 - Internal Server Error"
- Verificar .htaccess
- Verificar se todos os arquivos foram enviados
- Verificar logs de erro na Hostinger

#### ❌ "Página em branco"
- Verificar se index.html existe na pasta
- Verificar configuração do Next.js
- Verificar console do navegador para erros

### 9. 📱 Configurações Extras

#### A. SSL Automático
Na Hostinger, vá em:
1. **"SSL/TLS"** → **"Gerenciar SSL"**
2. **Ativar SSL** para `dashboard.maginf.com.br`
3. **Forçar HTTPS** (recomendado)

#### B. Monitoramento
- Configure alertas de uptime
- Monitore logs de acesso
- Configure backup automático

---

## 🎯 Resultado Final

Após seguir este guia, você terá:
- ✅ **dashboard.maginf.com.br** funcionando
- ✅ **SSL ativo** (HTTPS)
- ✅ **Deploy automático** configurado
- ✅ **Cache otimizado** para performance
- ✅ **Monitoramento** ativo

**🚀 Seu dashboard estará online e acessível para os clientes da MAGINF!**
