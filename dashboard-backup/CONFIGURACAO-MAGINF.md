# 🔑 Configuração N-able Cove - MAGINF

## Credenciais Fornecidas:
- **Customer**: MAGINF - INFORMATICA LTDA (maicon@maginf.com.br)
- **Login name**: API-USER-DASHBOARD
- **API Key**: Vp?Fm$k@il!1M6298b0B!y$v

## 📋 Como Configurar:

### 1. Criar arquivo `.env.local`
Na pasta `c:\app-maginf\dashboard-backup\`, crie o arquivo `.env.local` com:

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
# Parar o servidor atual (Ctrl+C)
# Depois executar:
npm run dev
```

### 3. Testar o dashboard
```
http://localhost:3000/clientes/MAGINF/backups
```

## 🔍 Troubleshooting:

Se não funcionar, tente estas variações do PARTNER_ID:
- `MAGINF`
- `MAGINF-INFORMATICA-LTDA`
- `maicon@maginf.com.br`
- Ou o ID numérico que aparece no painel do N-able

## 🚀 URLs para Testar:
- http://localhost:3000 (página inicial)
- http://localhost:3000/clientes/MAGINF/backups (dashboard principal)
- http://localhost:3000/clientes/123/backups (cliente demo)

---
**⚠️ IMPORTANTE**: Mantenha estas credenciais seguras e não as compartilhe!
