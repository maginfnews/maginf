# 🔄 Migração WordPress → React - MAGINF

## 🎯 Estratégias de Migração

### ⚠️ IMPORTANTE: Sempre faça backup antes!

## 📋 Opções Disponíveis

### 🔄 Opção 1: Substituição Completa (Recomendado)
**O que acontece:**
- WordPress atual é substituído
- Site React fica no domínio principal
- Melhor para SEO e experiência do usuário

**Configuração:**
```javascript
// No deploy-config.js
remotePath: '/public_html/',
clearRemoteDir: true, // Remove WordPress
domain: 'https://maginf.com'
```

**⚠️ Cuidados:**
- **FAZER BACKUP COMPLETO** antes
- Exportar dados importantes do WordPress
- Configurar redirecionamentos se necessário

---

### 📁 Opção 2: Subpasta (Coexistência)
**O que acontece:**
- WordPress mantido no domínio principal
- React fica em subpasta
- Acesso: `maginf.com/novo-site/`

**Configuração:**
```javascript
// No deploy-config.js
remotePath: '/public_html/novo-site/',
clearRemoteDir: false, // Mantém WordPress
domain: 'https://maginf.com/novo-site'
```

**Vantagens:**
- ✅ WordPress preservado
- ✅ Sem risco de perda de dados
- ✅ Pode testar antes de migrar

---

### 🌐 Opção 3: Subdomínio
**O que acontece:**
- WordPress no domínio principal
- React em subdomínio
- Acesso: `novo.maginf.com`

**Configuração:**
```javascript
// No deploy-config.js
remotePath: '/public_html/subdomains/novo/',
clearRemoteDir: false,
domain: 'https://novo.maginf.com'
```

**Passos extras:**
1. Criar subdomínio no hPanel
2. Configurar DNS
3. Aguardar propagação

---

## 🛡️ Processo Seguro de Migração

### 1. Backup Completo
```bash
# No hPanel da Hostinger:
# 1. Vá em "Arquivos" > "Backups"
# 2. Faça backup completo
# 3. Download do backup
```

### 2. Teste em Subpasta Primeiro
```javascript
// deploy-config.js - TESTE
remotePath: '/public_html/teste-react/',
clearRemoteDir: false,
domain: 'https://maginf.com/teste-react'
```

### 3. Deploy de Teste
```bash
npm run deploy:build
```

### 4. Validação
- ✅ Site React funcionando
- ✅ Formulário de contato
- ✅ Responsividade
- ✅ Performance

### 5. Migração Final (se escolher substituir)
```javascript
// deploy-config.js - FINAL
remotePath: '/public_html/',
clearRemoteDir: true, // ⚠️ Remove WordPress
domain: 'https://maginf.com'
```

## 🔧 Configurações Específicas

### Para Subpasta:
Criar arquivo `.htaccess` específico:
```apache
# Em /public_html/novo-site/.htaccess
RewriteEngine On
RewriteBase /novo-site/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /novo-site/index.html [L]
```

### Para Subdomínio:
1. **No hPanel:**
   - "Domínios" > "Subdomínios"
   - Criar: `novo.maginf.com`
   - Pasta: `/public_html/subdomains/novo/`

2. **Aguardar DNS** (até 24h)

## 📊 Comparação das Opções

| Aspecto | Substituição | Subpasta | Subdomínio |
|---------|-------------|----------|------------|
| **SEO** | ✅ Melhor | ⚠️ Médio | ⚠️ Médio |
| **Segurança** | ❌ Risco | ✅ Seguro | ✅ Seguro |
| **Simplicidade** | ✅ Simples | ✅ Simples | ⚠️ Complexo |
| **URL** | `maginf.com` | `maginf.com/novo` | `novo.maginf.com` |

## 🎯 Recomendação

### Para MAGINF:
1. **Começar com Subpasta** (`/novo-site/`)
2. **Testar tudo** por alguns dias
3. **Migrar completamente** quando estiver satisfeito
4. **Configurar redirecionamentos** do WordPress antigo

### Configuração Recomendada:
```javascript
// Fase 1 - Teste
remotePath: '/public_html/novo-site/',
clearRemoteDir: false,
domain: 'https://maginf.com/novo-site'

// Fase 2 - Produção (depois de validar)
remotePath: '/public_html/',
clearRemoteDir: true,
domain: 'https://maginf.com'
```

## 🚨 Checklist de Segurança

### Antes da migração:
- [ ] Backup completo do WordPress
- [ ] Backup do banco de dados
- [ ] Lista de plugins/temas importantes
- [ ] Exportar conteúdo importante
- [ ] Anotar configurações de SEO

### Durante o teste:
- [ ] Testar todas as páginas
- [ ] Validar formulários
- [ ] Verificar responsividade
- [ ] Testar performance
- [ ] Validar SEO básico

### Após migração:
- [ ] Configurar Google Analytics
- [ ] Atualizar Google Search Console
- [ ] Configurar redirecionamentos
- [ ] Monitorar por alguns dias

---

**💡 Dica**: Comece sempre com a opção mais segura (subpasta) e migre gradualmente!
