# 📧 Configuração do Resend para Envio de E-mails

## 🚀 Por que Resend?

- ✅ **3.000 e-mails gratuitos/mês**
- ✅ **API moderna e simples**
- ✅ **Alta entregabilidade**
- ✅ **Dashboard completo**
- ✅ **Templates HTML nativos**
- ✅ **Webhooks para tracking**

## 📋 Passos para Configurar

### 1. Criar Conta no Resend
1. Acesse [https://resend.com/](https://resend.com/)
2. Crie uma conta gratuita
3. Confirme seu e-mail

### 2. Verificar Domínio (Recomendado)
1. No dashboard, vá para **"Domains"**
2. Clique em **"Add Domain"**
3. Digite `maginf.com.br`
4. Configure os registros DNS conforme instruções
5. Aguarde verificação (pode levar até 24h)

### 3. Gerar API Key
1. Vá para **"API Keys"**
2. Clique em **"Create API Key"**
3. Nome: `MAGINF Website`
4. Permissões: **Send emails**
5. Copie a API Key gerada

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
REACT_APP_RESEND_API_KEY=re_sua_api_key_aqui
```

### 5. Atualizar Configuração

Edite `src/config/resend.js`:

```javascript
export const resendConfig = {
  apiKey: process.env.REACT_APP_RESEND_API_KEY,
  fromDomain: 'maginf.com.br', // ou 'onboarding@resend.dev' para testes
  toEmail: 'sac@maginf.com.br',
};
```

## 🔧 Para Produção (Backend)

### Opção 1: Next.js API Routes
```javascript
// pages/api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // ... código da API
}
```

### Opção 2: Node.js + Express
```javascript
// server.js
const express = require('express');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-email', async (req, res) => {
  // ... código da API
});
```

### Opção 3: Vercel Functions
```javascript
// api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // ... código da API
}
```

## 📊 Monitoramento

1. **Dashboard Resend**: Acompanhe entregas, aberturas, cliques
2. **Webhooks**: Configure notificações para eventos
3. **Logs**: Visualize todos os e-mails enviados

## 🎨 Templates Personalizados

O sistema já inclui templates HTML responsivos com:
- ✅ **Branding MAGINF** (cores e logo)
- ✅ **Layout profissional**
- ✅ **Informações organizadas**
- ✅ **Responsivo para mobile**

## 🔒 Segurança

- ✅ **API Key em variável de ambiente**
- ✅ **Validação de domínio**
- ✅ **Rate limiting automático**
- ✅ **Logs de auditoria**

## 🧪 Teste

1. Configure a API Key
2. Execute `npm run dev`
3. Preencha o formulário de contato
4. Verifique o e-mail em `sac@maginf.com.br`
5. Monitore no dashboard do Resend

## 📞 Suporte

- [Documentação Resend](https://resend.com/docs)
- [Discord da Resend](https://resend.com/discord)
- [GitHub Issues](https://github.com/resendlabs/resend-node)

## 💡 Próximos Passos

1. **Configurar domínio personalizado**
2. **Implementar templates avançados**
3. **Adicionar webhooks para tracking**
4. **Configurar auto-resposta**
5. **Implementar sistema de tickets**
