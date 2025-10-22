# 🏠 Executar Dashboard Local - MAGINF

## 🎯 Objetivo
Rodar o dashboard completo localmente com todas as APIs e funcionalidades funcionando.

## 🚀 Como Executar Localmente

### 1. 📦 Instalar Dependências
```bash
cd dashboard-backup
npm install
```

### 2. ⚙️ Configurar Ambiente Local
```bash
# Copiar configurações de desenvolvimento
cp .env.production .env.local
```

### 3. 🔧 Configurar next.config.js para Local
Edite `next.config.js` para desenvolvimento:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remover output: 'export' para desenvolvimento local
  // output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Configurações de segurança
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### 4. 🏃‍♂️ Executar Dashboard
```bash
npm run dev
```

### 5. 🌐 Acessar Dashboard
- **URL Local**: http://localhost:3000
- **Página Principal**: http://localhost:3000
- **Clientes**: http://localhost:3000/clientes
- **Status**: http://localhost:3000/status

## 📋 Scripts Disponíveis

### Desenvolvimento:
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificar código
```

### Testes:
```bash
node test-maginf-partners.js     # Testar API N-able Cove
node test-list-partners.js       # Testar listagem de parceiros
```

## 🔧 Configurações Locais

### Variáveis de Ambiente (.env.local):
```env
# N-able Cove API - MAGINF
COVE_API_KEY=Vp?Fm$k@il!1M6298b0B!y$v
COVE_PARTNER_ID=2871061

# Ambiente
NODE_ENV=development

# URLs Locais
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🌐 APIs Disponíveis Localmente

### Endpoints da API:
- `GET /api/test-env` - Testar variáveis de ambiente
- `GET /api/maginf/clientes` - Listar clientes MAGINF
- `GET /api/cliente/[id]/backups` - Backups de cliente específico
- `GET /api/status` - Status do sistema

### Exemplo de Teste:
```bash
# Testar API local
curl http://localhost:3000/api/maginf/clientes
curl http://localhost:3000/api/status
```

## 🔄 Desenvolvimento Contínuo

### Hot Reload:
- ✅ Mudanças em arquivos são aplicadas automaticamente
- ✅ APIs são recarregadas em tempo real
- ✅ Styles são atualizados instantaneamente

### Debug:
```bash
# Ver logs detalhados
npm run dev -- --turbo

# Verificar tipos TypeScript
npm run type-check
```

## 📊 Monitoramento Local

### Logs do Sistema:
- Console do navegador (F12)
- Terminal onde roda `npm run dev`
- Network tab para requisições API

### Performance:
- Next.js Dev Tools
- React Developer Tools
- Lighthouse (F12 → Lighthouse)

## 🔧 Troubleshooting Local

### Porta em Uso:
```bash
# Se porta 3000 estiver ocupada
npm run dev -- -p 3001
# Acesse: http://localhost:3001
```

### Limpar Cache:
```bash
# Limpar cache do Next.js
rm -rf .next
npm run dev
```

### Reinstalar Dependências:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Vantagens do Ambiente Local

### ✅ Desenvolvimento:
- **APIs funcionam 100%**
- **Hot reload instantâneo**
- **Debug completo**
- **Sem limitações de hospedagem**

### ✅ Testes:
- **Testar integrações N-able Cove**
- **Simular cenários de erro**
- **Validar dados em tempo real**

### ✅ Personalização:
- **Modificar código livremente**
- **Adicionar novas funcionalidades**
- **Testar diferentes configurações**

---

## 🚀 Comando Rápido para Iniciar

```bash
cd dashboard-backup
npm install
npm run dev
```

**Dashboard estará disponível em: http://localhost:3000** 🎉
