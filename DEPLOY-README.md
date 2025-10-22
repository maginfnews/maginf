# 🚀 Deploy Automático - MAGINF Hostinger

## ⚡ Setup Rápido

### 1. Configurar Credenciais
```bash
# Copiar arquivo de exemplo
copy deploy-config.example.js deploy-config.js

# Editar com suas credenciais da Hostinger
notepad deploy-config.js
```

### 2. Configurar deploy-config.js
```javascript
module.exports = {
  ftp: {
    host: 'ftp.hostinger.com', // ou seu domínio
    user: 'seu-usuario@seudominio.com',
    password: 'sua-senha-ftp',
    secure: false,
    port: 21
  },
  remotePath: '/public_html/',
  domain: 'https://seudominio.com'
};
```

### 3. Deploy com 1 comando!
```bash
# Build + Deploy automático
npm run deploy:build

# Ou apenas deploy (se já tiver build)
npm run deploy
```

## 📋 Como obter credenciais FTP na Hostinger

### Passo a passo:
1. **Login no hPanel** da Hostinger
2. **Vá em "Arquivos"** > **"Gerenciador de Arquivos"**
3. **Clique em "Configurações FTP"**
4. **Anote as informações:**
   - **Host**: Geralmente `ftp.hostinger.com` ou seu domínio
   - **Usuário**: Seu email ou usuário FTP
   - **Senha**: Sua senha (pode criar nova se necessário)
   - **Porta**: 21 (FTP padrão)

### Exemplo de configuração:
```javascript
ftp: {
  host: 'ftp.hostinger.com',
  user: 'u123456789@seudominio.com',
  password: 'MinhaSenh@123',
  secure: false,
  port: 21
}
```

## 🎯 Comandos Disponíveis

```bash
# Desenvolvimento
npm start              # Servidor local
npm run build         # Build de produção

# Deploy
npm run deploy        # Deploy (precisa ter build)
npm run deploy:build  # Build + Deploy automático
```

## ✅ Checklist de Deploy

### Antes do primeiro deploy:
- [ ] Configurar `deploy-config.js`
- [ ] Testar credenciais FTP
- [ ] Verificar se pasta `public_html` existe

### A cada deploy:
- [ ] Testar site localmente (`npm start`)
- [ ] Verificar formulário de contato
- [ ] Executar `npm run deploy:build`
- [ ] Aguardar conclusão
- [ ] Testar site online

## 🔧 Troubleshooting

### ❌ Erro: "deploy-config.js não encontrado"
```bash
copy deploy-config.example.js deploy-config.js
# Editar o arquivo com suas credenciais
```

### ❌ Erro: "Connection refused"
- Verificar credenciais FTP
- Verificar se host está correto
- Tentar com `secure: true` (FTPS)

### ❌ Erro: "Permission denied"
- Verificar usuário e senha
- Verificar se usuário tem permissão na pasta

### ❌ Site não carrega após deploy
- Aguardar alguns minutos (propagação)
- Verificar se arquivos foram enviados
- Verificar se .htaccess foi enviado

## 🛡️ Segurança

### ⚠️ IMPORTANTE:
- **NUNCA** commitar `deploy-config.js` (já está no .gitignore)
- **SEMPRE** usar senhas fortes
- **CONSIDERAR** usar FTPS (`secure: true`) se disponível

### Backup automático:
O script limpa a pasta antes do upload. Se quiser manter backup:
```javascript
clearRemoteDir: false  // No deploy-config.js
```

## 📞 Suporte

### Hostinger:
- Chat no hPanel
- Documentação: https://www.hostinger.com.br/tutoriais/

### Script de Deploy:
- Verificar logs no terminal
- Arquivo: `deploy-hostinger.js`

---

**🎉 Deploy automático configurado! Agora é só usar `npm run deploy:build`**
