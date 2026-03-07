---
description: Deploy e manutenção do sistema de vistoria Marriott Airport
---

## Rotas do sistema

| Rota | Descrição | Senha |
|---|---|---|
| `/vistoria` | Login técnicos em campo | `marriott2026` |
| `/vistoria/registrar` | Formulário multi-etapa de vistoria | — |
| `/vistoria/admin` | Painel admin MAGINF | — |
| `/marriott` | Login portal do cliente | `NEXT_PUBLIC_CLIENTE_SENHA` |
| `/marriott/painel` | Dashboard completo Marriott | — |

## Deploy via GitHub → Vercel

1. Fazer as alterações nos arquivos
2. Rodar no terminal:
```
git add .
git commit -m "descricao da mudanca"
git push
```
3. Vercel detecta automaticamente e faz deploy em ~2 min

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

Todas devem estar em **All Environments**:

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon do Supabase |
| `SUPABASE_SERVICE_KEY` | Chave service role (server-side) |
| `CLOUDINARY_UPLOAD_PRESET` | `vistoria_maginf` (unsigned preset) |
| `RESEND_API_KEY` | Chave da API Resend para emails |
| `NEXT_PUBLIC_VISTORIA_SENHA` | Senha dos técnicos: `marriott2026` |
| `NEXT_PUBLIC_CLIENTE_SENHA` | Senha portal Marriott (definir) |

## SQL Supabase – colunas de aprovação

Rodar uma única vez em Supabase → SQL Editor:

```sql
ALTER TABLE vistorias
ADD COLUMN IF NOT EXISTS aprovado_status VARCHAR(20) DEFAULT 'pendente',
ADD COLUMN IF NOT EXISTS aprovado_em TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS aprovado_por VARCHAR(100),
ADD COLUMN IF NOT EXISTS aprovado_obs TEXT;
```

## Emails automáticos

- **Vistoria finalizada**: notifica `maicon@magpass.com.br`
- **Aprovação/reprovação**: notifica `maicon@magpass.com.br`
- **Relatório manual** (`/marriott/painel`): envia para o email digitado + CC fixo para `maicon@magpass.com.br` e `matheussleduc@gmail.com`

## Cloudinary

- Upload preset: `vistoria_maginf` (unsigned, criado em Cloudinary → Settings → Upload)
- Cloud name: `dxr6mywet`

## Arquivos principais

- `pages/vistoria/` — sistema técnicos
- `pages/marriott/` — portal cliente Marriott
- `pages/api/vistoria/` — todas as APIs
- `lib/supabase.js` — cliente Supabase
