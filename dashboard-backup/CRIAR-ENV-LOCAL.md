# 🚨 ERRO 500 - VARIÁVEIS DE AMBIENTE NÃO DEFINIDAS

## ❌ Problema Identificado:
As variáveis `COVE_API_KEY` e `COVE_PARTNER_ID` não estão definidas, causando erro 500 na API.

## ✅ Solução:

### 1. Criar arquivo `.env.local`
Na pasta `c:\app-maginf\dashboard-backup\`, crie o arquivo `.env.local` com o conteúdo:

```env
# Configurações do N-able Cove - MAGINF
COVE_API_KEY=Vp?Fm$k@il!1M6298b0B!y$v
COVE_PARTNER_ID=2871061

# Configurações do Next.js
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Reiniciar o servidor
```bash
# Parar o servidor atual (Ctrl+C no terminal)
# Depois executar:
npm run dev
```

### 3. Testar novamente
Após reiniciar, acesse:
```
http://localhost:3000/clientes/123/backups
```

## 🔍 Como Criar o Arquivo:

### Opção 1: Via VS Code
1. Clique com botão direito na pasta `dashboard-backup`
2. Selecione "New File"
3. Digite `.env.local`
4. Cole o conteúdo acima

### Opção 2: Via Terminal
```bash
cd c:\app-maginf\dashboard-backup
echo COVE_API_KEY=Vp?Fm$k@il!1M6298b0B!y$v > .env.local
echo COVE_PARTNER_ID=2871061 >> .env.local
```

### Opção 3: Via Notepad
1. Abra o Notepad
2. Cole o conteúdo das variáveis
3. Salve como `.env.local` na pasta `dashboard-backup`

## ⚠️ IMPORTANTE:
- O arquivo `.env.local` deve estar na **raiz** da pasta `dashboard-backup`
- **Reinicie o servidor** após criar o arquivo
- As variáveis só são carregadas na inicialização do Next.js

## 🎯 Resultado Esperado:
Após criar o arquivo e reiniciar, o dashboard deve funcionar sem erro 500.
