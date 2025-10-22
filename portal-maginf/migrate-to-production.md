# 🗄️ Migração do Banco de Dados - Portal MAGINF

## 📊 Situação Atual
- **Banco Local**: SQLite (`dev.db`)
- **Dados**: Usuários, clientes, configurações

## 🎯 Opções de Banco em Produção

### Opção 1: Vercel Postgres (Recomendado)
```bash
# 1. Criar database no Vercel Dashboard
# 2. Obter connection string
# 3. Atualizar schema.prisma

# schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Opção 2: Supabase (Alternativa)
```bash
# 1. Criar projeto no supabase.com
# 2. Obter connection string PostgreSQL
# 3. Mesmo schema.prisma acima
```

## 🔄 Passos para Migração

### 1. Backup dos Dados Atuais
```bash
# Exportar dados do SQLite
node -e "
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function backup() {
  const users = await prisma.user.findMany({ include: { client: true } });
  const clients = await prisma.client.findMany({ include: { settings: true } });
  
  fs.writeFileSync('backup-users.json', JSON.stringify(users, null, 2));
  fs.writeFileSync('backup-clients.json', JSON.stringify(clients, null, 2));
  
  console.log('Backup concluído!');
  await prisma.\$disconnect();
}

backup();
"
```

### 2. Configurar Novo Banco
```bash
# Atualizar .env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Gerar e aplicar migrations
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Restaurar Dados
```bash
# Script de restore
node -e "
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function restore() {
  const clients = JSON.parse(fs.readFileSync('backup-clients.json'));
  const users = JSON.parse(fs.readFileSync('backup-users.json'));
  
  // Restaurar clientes
  for (const client of clients) {
    await prisma.client.create({
      data: {
        id: client.id,
        name: client.name,
        slug: client.slug,
        email: client.email,
        phone: client.phone,
        address: client.address,
        active: client.active,
        settings: client.settings ? {
          create: client.settings
        } : undefined
      }
    });
  }
  
  // Restaurar usuários
  for (const user of users) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password, // Já está hasheado
        role: user.role,
        active: user.active,
        clientId: user.clientId
      }
    });
  }
  
  console.log('Restore concluído!');
  await prisma.\$disconnect();
}

restore();
"
```

## 🔐 Variáveis de Ambiente (Vercel)

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://portal.maginf.com.br"
NEXTAUTH_SECRET="chave-super-secreta-production"

# APIs (opcional)
SITE24X7_API_KEY="sua_api_key"
COVE_API_KEY="sua_api_key"
```

## ✅ Checklist de Deploy

- [ ] Backup dos dados locais
- [ ] Criar banco PostgreSQL
- [ ] Atualizar schema.prisma
- [ ] Configurar variáveis no Vercel
- [ ] Deploy inicial
- [ ] Restaurar dados
- [ ] Testar login e funcionalidades
- [ ] Configurar domínio personalizado

## 🚨 Importante

1. **Backup**: Sempre fazer backup antes da migração
2. **Senhas**: Verificar se hashes estão corretos
3. **IDs**: Manter IDs originais para consistência
4. **Testes**: Testar todas as funcionalidades após migração
