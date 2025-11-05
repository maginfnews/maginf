# 🤖 Integração ChatGPT no Chatbot MAGINF

## ✨ O que foi implementado

O chatbot agora usa **ChatGPT (GPT-3.5-turbo)** da OpenAI para responder perguntas de forma inteligente e natural!

---

## 🎯 Recursos

### ✅ Implementado:
- **ChatGPT API** - Respostas inteligentes com IA
- **Fallback System** - Respostas locais se API falhar
- **Context Memory** - Lembra últimas 3 conversas
- **Loading States** - Indicador "digitando..."
- **AI Badge** - Mostra quando resposta é da IA
- **Error Handling** - Nunca deixa usuário sem resposta
- **Custom Prompt** - Treinado com info da MAGINF

---

## 🔑 Como Configurar

### 1. Obter API Key da OpenAI

1. Acesse: https://platform.openai.com
2. Crie uma conta (ou faça login)
3. Vá em: **API Keys** (https://platform.openai.com/api-keys)
4. Clique em **"Create new secret key"**
5. Copie a chave (começa com `sk-proj-...`)

### 2. Adicionar Créditos

1. Vá em: **Billing** (https://platform.openai.com/account/billing)
2. Adicione método de pagamento
3. Adicione créditos (mínimo $5)
4. Configure limite de gastos

**Custos estimados:**
- GPT-3.5-turbo: ~$0.002 por conversa
- 1000 conversas = ~$2.00
- Muito econômico! 💰

### 3. Configurar no Projeto

Crie arquivo `.env.local` na raiz do projeto:

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**IMPORTANTE:** 
- ⚠️ NUNCA commite este arquivo no Git!
- ⚠️ Já está no `.gitignore`
- ⚠️ Use `.env.example` como referência

### 4. Configurar na Vercel (Produção)

1. Acesse painel da Vercel
2. Vá em: **Settings** > **Environment Variables**
3. Adicione:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `sk-proj-...` (sua chave)
   - **Environment:** Production, Preview, Development
4. Clique em **Save**
5. Faça redeploy do site

---

## 🧠 Como Funciona

### Fluxo de Conversa:

```
Usuário digita mensagem
        ↓
Chatbot envia para /api/chat
        ↓
API tenta usar ChatGPT
        ↓
    ┌───────┴───────┐
    ↓               ↓
Sucesso         Falha
    ↓               ↓
Resposta IA    Resposta Local
    ↓               ↓
    └───────┬───────┘
            ↓
Usuário recebe resposta
```

### System Prompt Customizado:

O ChatGPT foi treinado com informações da MAGINF:
- ✅ Serviços oferecidos
- ✅ Planos e preços
- ✅ Contatos e localização
- ✅ Diferenciais da empresa
- ✅ Tom de voz profissional

---

## 📊 Monitoramento

### Ver uso da API:

1. Acesse: https://platform.openai.com/usage
2. Veja:
   - Número de requisições
   - Tokens usados
   - Custo total
   - Gráficos de uso

### Limites recomendados:

```javascript
// Em pages/api/chat.js
max_tokens: 300,        // Máximo de palavras na resposta
temperature: 0.7,       // Criatividade (0-1)
presence_penalty: 0.6,  // Evita repetição
frequency_penalty: 0.3  // Varia vocabulário
```

---

## 🎨 Personalização

### Mudar modelo da IA:

```javascript
// Em pages/api/chat.js, linha 71
model: 'gpt-3.5-turbo',  // Padrão (econômico)
// ou
model: 'gpt-4',          // Mais inteligente (mais caro)
```

### Ajustar personalidade:

```javascript
// Em pages/api/chat.js, linha 20-50
const systemPrompt = `
Você é [personalidade]
[instruções]
[informações]
`;
```

### Mudar tamanho das respostas:

```javascript
// Em pages/api/chat.js, linha 72
max_tokens: 300,  // Menor = mais curto
max_tokens: 500,  // Maior = mais detalhado
```

---

## 🔒 Segurança

### ✅ Implementado:

- API Key no servidor (não exposta ao cliente)
- Rate limiting (evita spam)
- Validação de entrada
- Sanitização de dados
- Error handling robusto

### 🛡️ Boas Práticas:

```javascript
// ❌ NUNCA faça isso:
const apiKey = 'sk-proj-xxx'; // Hardcoded

// ✅ SEMPRE faça isso:
const apiKey = process.env.OPENAI_API_KEY; // Variável de ambiente
```

---

## 🧪 Testar Localmente

### 1. Instalar dependências:
```bash
npm install
```

### 2. Criar .env.local:
```bash
OPENAI_API_KEY=sk-proj-sua-chave-aqui
```

### 3. Rodar servidor:
```bash
npm run dev
```

### 4. Testar chatbot:
1. Abra: http://localhost:3000
2. Clique no botão azul do chat
3. Digite uma pergunta
4. Veja a resposta da IA! ✨

---

## 💬 Exemplos de Perguntas

### O chatbot responde bem a:

✅ **Perguntas sobre serviços:**
- "Quais serviços vocês oferecem?"
- "Como funciona o MSP?"
- "Vocês trabalham com cloud?"

✅ **Perguntas sobre preços:**
- "Quanto custa o plano Bronze?"
- "Qual o melhor plano para minha empresa?"
- "Tem desconto para contrato anual?"

✅ **Perguntas técnicas:**
- "Vocês fazem backup?"
- "Como é o suporte 24/7?"
- "Atendem em Guarulhos?"

✅ **Conversas naturais:**
- "Olá, preciso de ajuda"
- "Meu servidor caiu, o que fazer?"
- "Quero migrar para a nuvem"

---

## 🚨 Troubleshooting

### Erro: "API key not configured"
**Solução:** Adicione `OPENAI_API_KEY` no `.env.local`

### Erro: "Rate limit exceeded"
**Solução:** Aguarde alguns minutos ou aumente limite na OpenAI

### Erro: "Insufficient credits"
**Solução:** Adicione créditos na conta OpenAI

### Chatbot usa fallback sempre
**Solução:** 
1. Verifique se API key está correta
2. Veja logs no console
3. Teste API key em: https://platform.openai.com/playground

### Respostas muito genéricas
**Solução:** Melhore o system prompt com mais detalhes da empresa

---

## 📈 Otimizações

### Reduzir custos:

1. **Cache respostas comuns:**
```javascript
const cache = {
  'preços': 'resposta pré-definida',
  'contato': 'resposta pré-definida'
};
```

2. **Limitar tokens:**
```javascript
max_tokens: 200, // Respostas mais curtas
```

3. **Usar GPT-3.5 em vez de GPT-4:**
```javascript
model: 'gpt-3.5-turbo', // 10x mais barato
```

### Melhorar qualidade:

1. **Aumentar contexto:**
```javascript
conversationHistory: messages.slice(-10) // Últimas 5 trocas
```

2. **Ajustar temperatura:**
```javascript
temperature: 0.8, // Mais criativo
temperature: 0.3, // Mais preciso
```

3. **Adicionar exemplos no prompt:**
```javascript
const systemPrompt = `
...
EXEMPLOS:
Usuário: "Quanto custa?"
Você: "Nossos planos começam em R$ X..."
`;
```

---

## 📊 Métricas

### Acompanhe:

- ✅ Número de conversas/dia
- ✅ Custo médio por conversa
- ✅ Taxa de satisfação
- ✅ Perguntas mais comuns
- ✅ Conversões (contatos gerados)

### Google Analytics:

As conversas já são rastreadas automaticamente!

---

## 🎯 Próximos Passos

### Melhorias futuras:

1. **Fine-tuning** - Treinar modelo específico da MAGINF
2. **Voice input** - Falar com o chatbot
3. **Multilíngua** - Suporte a inglês/espanhol
4. **Integração CRM** - Salvar leads automaticamente
5. **Analytics avançado** - Dashboard de conversas

---

## 💰 Custos Estimados

### GPT-3.5-turbo:

| Uso Mensal | Conversas | Custo |
|------------|-----------|-------|
| Baixo | 100 | $0.20 |
| Médio | 500 | $1.00 |
| Alto | 2000 | $4.00 |
| Muito Alto | 10000 | $20.00 |

**Conclusão:** Muito acessível! 💰

---

## 📞 Suporte

Dúvidas sobre a integração?
- Email: sac@maginf.com.br
- Tel: (11) 4610-6363

Problemas com OpenAI?
- Docs: https://platform.openai.com/docs
- Support: https://help.openai.com

---

## ✅ Checklist de Implementação

- [x] Criar API route `/api/chat`
- [x] Atualizar componente Chatbot
- [x] Adicionar loading states
- [x] Implementar fallback system
- [x] Adicionar AI badge
- [x] Criar documentação
- [ ] Obter OpenAI API key
- [ ] Adicionar créditos
- [ ] Configurar .env.local
- [ ] Testar localmente
- [ ] Configurar na Vercel
- [ ] Deploy em produção

---

**🎉 Chatbot com IA está pronto!**

Agora é só configurar a API key e testar! 🚀

---

**Última atualização:** 05/11/2025
