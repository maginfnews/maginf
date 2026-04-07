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

## Observações

- O projeto não exige variáveis de ambiente para rodar localmente.
- Os textos e links estão preparados para `Português (Brasil)` e `English`.
- Sem `VITE_LEAD_WEBHOOK_URL`, o diagnóstico tenta enviar para `/api/contact` no mesmo domínio antes de cair no fluxo manual.
- O bloco de diagnóstico online funciona sem backend, mas o envio automático do lead depende de `VITE_LEAD_WEBHOOK_URL`.
- Quando o webhook não está configurado, o site ainda gera o resultado e monta o resumo para WhatsApp e e-mail.
