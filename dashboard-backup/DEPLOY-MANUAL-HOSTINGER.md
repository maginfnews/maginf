# 📤 Deploy Manual - Dashboard via hPanel Hostinger

## ❌ Problema FTP
As credenciais FTP não estão funcionando. Vamos fazer o deploy manual via Gerenciador de Arquivos da Hostinger.

## 🚀 Passo a Passo - Deploy Manual

### 1. 📦 Gerar Build Local
```bash
cd dashboard-backup
npm run build
```

### 2. 🌐 Criar Subdomínio na Hostinger

1. **Acesse**: https://hpanel.hostinger.com
2. **Login** com conta MAGINF
3. **Vá em**: "Domínios" → **"Subdomínios"**
4. **Clique**: "Criar Subdomínio"
5. **Configure**:
   ```
   Subdomínio: dashboard
   Domínio: maginf.com.br
   Pasta de destino: public_html/dashboard
   ```
6. **Clique**: "Criar"

### 3. 📁 Acessar Gerenciador de Arquivos

1. **No hPanel**: "Arquivos" → **"Gerenciador de Arquivos"**
2. **Navegue**: para `/public_html/dashboard/`
3. **Se a pasta não existir**: criar manualmente

### 4. 📤 Upload dos Arquivos

#### Opção A - Upload Direto:
1. **Selecione todos os arquivos** da pasta `build/`
2. **Arraste e solte** no Gerenciador de Arquivos
3. **Aguarde** o upload completar

#### Opção B - Upload via ZIP:
1. **Compacte** a pasta `build/` em um arquivo ZIP
2. **Faça upload** do ZIP para `/public_html/dashboard/`
3. **Extraia** o ZIP no servidor
4. **Delete** o arquivo ZIP

### 5. ⚙️ Configurar .htaccess

Crie o arquivo `.htaccess` na pasta `/public_html/dashboard/`:

```apache
# Dashboard MAGINF - Configuração Next.js
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
```

### 6. 🔒 Ativar SSL

1. **No hPanel**: "SSL/TLS" → **"Gerenciar SSL"**
2. **Ativar SSL** para `dashboard.maginf.com.br`
3. **Forçar HTTPS** (recomendado)

### 7. ✅ Testar Dashboard

Acesse: **https://dashboard.maginf.com.br**

**Páginas para testar**:
- `/` - Página inicial
- `/clientes` - Lista de clientes
- `/status` - Status do sistema

## 🔄 Script para Gerar Build Otimizado

Crie `build-for-manual-deploy.js`:

```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Gerando build para deploy manual...\n');

try {
  // 1. Configurar ambiente de produção
  console.log('⚙️  Configurando ambiente...');
  if (fs.existsSync('.env.production')) {
    fs.copyFileSync('.env.production', '.env.local');
  }

  // 2. Build
  console.log('🔨 Executando build...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Verificar build
  if (fs.existsSync('./build')) {
    const files = fs.readdirSync('./build');
    console.log(`\n✅ Build criado com ${files.length} arquivos`);
    
    console.log('\n📋 Próximos passos:');
    console.log('1. Acesse: https://hpanel.hostinger.com');
    console.log('2. Vá em: Arquivos → Gerenciador de Arquivos');
    console.log('3. Navegue: /public_html/dashboard/');
    console.log('4. Upload: todos os arquivos da pasta build/');
    console.log('5. Crie: arquivo .htaccess (veja DEPLOY-MANUAL-HOSTINGER.md)');
    console.log('6. Teste: https://dashboard.maginf.com.br');
    
  } else {
    console.log('❌ Erro: pasta build não foi criada');
  }

} catch (error) {
  console.error('❌ Erro no build:', error.message);
}
```

## 🎯 Comandos Rápidos

```bash
# Gerar build
npm run build

# Ou usar script personalizado
node build-for-manual-deploy.js
```

## 📞 Suporte Hostinger

Se tiver problemas:
- **Chat**: hPanel → Chat (canto inferior direito)
- **Pergunta**: "Como criar subdomínio dashboard.maginf.com.br e fazer upload de arquivos?"

---

## ✅ Resultado Final

Após seguir estes passos:
- ✅ **dashboard.maginf.com.br** funcionando
- ✅ **SSL ativo** (HTTPS)
- ✅ **Cache otimizado**
- ✅ **Headers de segurança**

**Deploy manual é mais trabalhoso, mas 100% confiável!** 🎉
