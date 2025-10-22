# Deploy MAGINF - Hostinger

## 📋 Checklist de Deploy

### Antes do Deploy:
- [ ] Testar site localmente (`npm start`)
- [ ] Verificar todos os links funcionando
- [ ] Confirmar formulário de contato
- [ ] Validar responsividade

### Build de Produção:
```bash
npm run build
```

### Upload para Hostinger:

#### Método 1: Gerenciador de Arquivos
1. Acesse hPanel da Hostinger
2. Vá em "Gerenciador de Arquivos"
3. Navegue até `public_html/`
4. Delete conteúdo existente
5. Upload todos os arquivos de `build/`

#### Método 2: FTP
**Configurações FTP:**
- Host: [seu-dominio.com] ou IP do servidor
- Usuário: [seu-usuario-ftp]
- Senha: [sua-senha-ftp]
- Porta: 21 (FTP) ou 22 (SFTP)

**Comandos:**
1. Conectar ao FTP
2. Navegar para `public_html/`
3. Upload pasta `build/` completa
4. Renomear arquivos se necessário

### Configurações Importantes:

#### .htaccess para React Router
Criar arquivo `.htaccess` em `public_html/`:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

#### Configurações de Performance
```apache
# Compressão Gzip
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

# Cache Headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### Pós-Deploy:
- [ ] Testar site no domínio
- [ ] Verificar formulário de contato
- [ ] Testar responsividade
- [ ] Validar SEO (Google PageSpeed)
- [ ] Configurar SSL (HTTPS)

### Domínio Personalizado:
1. No hPanel: "Domínios" > "Gerenciar"
2. Adicionar/configurar domínio
3. Aguardar propagação DNS (até 24h)

### SSL/HTTPS:
1. hPanel > "SSL"
2. Ativar "Let's Encrypt SSL"
3. Forçar HTTPS

### Monitoramento:
- Google Analytics
- Google Search Console
- Uptime monitoring

## 🚨 Troubleshooting

### Problema: Página em branco
- Verificar console do navegador
- Conferir caminhos dos arquivos
- Validar .htaccess

### Problema: 404 em rotas
- Adicionar .htaccess para React Router
- Verificar configuração de rotas

### Problema: Formulário não funciona
- Testar método de envio (FormSubmit/mailto)
- Verificar CORS se usando API externa

## 📞 Suporte
- Hostinger: Chat/ticket no hPanel
- MAGINF: Documentação interna
