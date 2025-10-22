# 🔍 Como Verificar Credenciais FTP Corretas - Hostinger

## 🎯 Problema
As credenciais FTP não estão funcionando para o deploy do dashboard. Precisamos verificar as informações corretas no hPanel da Hostinger.

## 📋 Passo a Passo para Verificar

### 1. 🌐 Acesse o hPanel
1. **URL**: https://hpanel.hostinger.com
2. **Login**: com email e senha da conta MAGINF
3. **Selecione**: o domínio `maginf.com.br`

### 2. 🔑 Encontrar Credenciais FTP

#### Opção A - Via Contas FTP:
1. **Vá em**: "Avançado" → **"Contas FTP"**
2. **Veja**: lista de contas FTP existentes
3. **Anote**: Host, Usuário, Porta

#### Opção B - Via Gerenciador de Arquivos:
1. **Vá em**: "Arquivos" → **"Gerenciador de Arquivos"**
2. **Clique**: "Configurações FTP" (canto superior direito)
3. **Veja**: informações de conexão

### 3. 📝 Informações Necessárias

Precisamos confirmar estas 4 informações:

```
🏠 HOST (Servidor FTP):
   Pode ser: ftp.hostinger.com
            ftp.maginf.com.br
            files.000webhost.com
            IP direto (ex: 185.xxx.xxx.xxx)

👤 USUÁRIO:
   Atual: u169795690
   Pode ser diferente: maginf@maginf.com.br
                      outro formato

🔒 SENHA:
   Atual: uQF]RGE$xMYZyp5#
   Confirmar se está correta

🚪 PORTA:
   21 (FTP padrão)
   22 (SFTP)
```

### 4. 🔧 Testar Diferentes Configurações

Após obter as informações corretas, teste estas variações:

#### Configuração 1 - FTP Padrão:
```javascript
ftp: {
  host: 'HOST_CORRETO_DO_HPANEL',
  user: 'USUARIO_CORRETO',
  password: 'SENHA_CORRETA',
  secure: false,
  port: 21
}
```

#### Configuração 2 - SFTP:
```javascript
ftp: {
  host: 'HOST_CORRETO_DO_HPANEL',
  user: 'USUARIO_CORRETO', 
  password: 'SENHA_CORRETA',
  secure: true,
  port: 22
}
```

### 5. 🌐 Criar Subdomínio (Se Ainda Não Criou)

1. **No hPanel**: "Domínios" → **"Subdomínios"**
2. **Clique**: "Criar Subdomínio"
3. **Configure**:
   ```
   Subdomínio: dashboard
   Domínio: maginf.com.br
   Pasta de destino: public_html/dashboard
   ```
4. **Clique**: "Criar"

### 6. ✅ Verificar se Funcionou

Após atualizar as credenciais no arquivo `deploy-config-dashboard.js`, teste:

```bash
cd dashboard-backup
node test-ftp-dashboard.js
```

### 7. 🚀 Deploy Quando Funcionar

```bash
npm run deploy
```

## 📞 Se Ainda Não Funcionar

### Chat Hostinger:
1. **Acesse**: hPanel → Chat (canto inferior direito)
2. **Pergunte**: "Preciso das credenciais FTP corretas para maginf.com.br"
3. **Solicite**: Host, usuário, porta para conexão FTP/SFTP

### Informações para o Suporte:
- **Domínio**: maginf.com.br
- **Objetivo**: Criar subdomínio dashboard.maginf.com.br
- **Problema**: Credenciais FTP não funcionando
- **Usuário atual**: u169795690

---

## 🎯 Próximo Passo

**Verifique as credenciais no hPanel e atualize o arquivo:**
`deploy-config-dashboard.js`

**Depois teste novamente:**
`node test-ftp-dashboard.js`
