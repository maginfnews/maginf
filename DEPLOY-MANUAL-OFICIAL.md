# 🚀 Deploy Manual - Site Oficial MAGINF

## ⚠️ ATENÇÃO: Este processo substitui o WordPress!

### 📋 Pré-requisitos:
- ✅ Build já criado (`npm run build`)
- ✅ Backup do WordPress (se necessário)
- ✅ Acesso ao hPanel da Hostinger

## 🔧 Passo a Passo Manual

### 1. Preparar arquivos localmente
```bash
# Criar build de produção
npm run build
```
**Resultado:** Pasta `build/` com todos os arquivos

### 2. Compactar arquivos
- Vá para a pasta `build/`
- Selecione **TODOS** os arquivos (Ctrl+A)
- Clique com botão direito > **"Enviar para"** > **"Pasta compactada"**
- Renomeie para: `maginf-site.zip`

### 3. Acessar Hostinger hPanel
1. **Login**: https://hpanel.hostinger.com
2. **Credenciais**: Suas credenciais da Hostinger
3. **Painel**: Selecionar domínio maginf.com.br

### 4. Gerenciador de Arquivos
1. No hPanel, clique em **"Arquivos"**
2. Clique em **"Gerenciador de Arquivos"**
3. Navegue até **`/public_html/`**

### 5. Backup WordPress (Opcional)
1. Selecione todos os arquivos em `public_html/`
2. Clique em **"Compactar"**
3. Nome: `backup-wordpress-$(date).zip`
4. **Download** do backup

### 6. Limpar pasta public_html
1. Selecione **TODOS** os arquivos em `public_html/`
2. Clique em **"Excluir"**
3. **Confirmar** exclusão

### 7. Upload do site React
1. Clique em **"Upload"**
2. Selecione `maginf-site.zip`
3. Aguarde upload completo
4. Clique com botão direito no zip
5. Selecione **"Extrair"**
6. **Confirmar** extração

### 8. Configurar .htaccess
Criar arquivo `.htaccess` com conteúdo:
```apache
# React Router
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

# Compressão
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
```

### 9. Verificar estrutura final
Pasta `public_html/` deve ter:
```
public_html/
├── index.html
├── .htaccess
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── logo-maginf-oficial.svg
├── favicon.ico
└── outros arquivos...
```

### 10. Testar site
1. **Aguardar**: 2-5 minutos para propagação
2. **Acessar**: https://maginf.com.br
3. **Verificar**:
   - ✅ Página carrega
   - ✅ Navegação funciona
   - ✅ Formulário de contato
   - ✅ Responsividade mobile

## 🎯 Checklist Final

### ✅ Pré-deploy:
- [ ] Build criado (`npm run build`)
- [ ] Arquivos compactados
- [ ] Backup WordPress (se necessário)

### ✅ Durante deploy:
- [ ] Login no hPanel
- [ ] Pasta public_html limpa
- [ ] Upload do zip
- [ ] Extração completa
- [ ] .htaccess criado

### ✅ Pós-deploy:
- [ ] Site carregando (https://maginf.com.br)
- [ ] Todas as páginas funcionando
- [ ] Formulário testado
- [ ] Mobile responsivo
- [ ] Links das redes sociais

## 🚨 Troubleshooting

### ❌ Site não carrega:
- Verificar se index.html está na raiz
- Aguardar mais tempo (até 30 min)
- Limpar cache do navegador

### ❌ Páginas 404:
- Verificar .htaccess
- Confirmar React Router configurado

### ❌ Formulário não funciona:
- Testar método mailto
- Verificar configuração FormSubmit

## 🔄 Para futuras atualizações:

### Método rápido:
1. `npm run build`
2. Compactar pasta `build/`
3. Upload via Gerenciador de Arquivos
4. Extrair sobre arquivos existentes

### Automatizar depois:
- Resolver problema FTP
- Usar `npm run deploy:build`

---

**🎉 Após completar: Site oficial da MAGINF estará no ar em https://maginf.com.br**
