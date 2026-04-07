# MAGINF Tecnologia

Landing page institucional da MAGINF construída com React, Vite e Tailwind CSS 4.

## Requisitos

- Node.js 20 ou superior

## Scripts

- `npm install`: instala as dependências
- `npm run dev`: inicia o ambiente local em `http://localhost:5173`
- `npm run build`: gera a versão de produção em `dist/`
- `npm run preview`: serve a build localmente
- `npm run lint`: executa o typecheck com TypeScript
- `npm run clean`: remove a pasta `dist/`

## Estrutura

- `src/App.tsx`: composição principal da landing
- `src/components`: seções e blocos reutilizáveis da interface
- `src/content`: conteúdo bilíngue da página
- `src/constants.ts`: agregador de conteúdo e constantes compartilhadas
- `src/index.css`: tema global e utilitários do projeto
- `api/contact.ts`: API própria do projeto para receber o lead do diagnóstico e enviar via Resend

## Observações

- O projeto não exige variáveis de ambiente para rodar localmente.
- Os textos e links estão preparados para `Português (Brasil)` e `English`.
- O diagnóstico usa a API local em `/api/contact` dentro do próprio projeto.
- Em produção, configure `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME` e `RESEND_CONTACT_TO` no projeto `novo-site` do Vercel.
- Se a API local não estiver disponível em ambiente de preview local, o site ainda gera o resultado e monta o resumo para WhatsApp e e-mail.
