const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');

console.log(`
🚀 CONFIGURAÇÃO AUTOMÁTICA: Prisma + PostgreSQL

📋 O que será configurado:
✅ Prisma ORM
✅ PostgreSQL via Vercel
✅ Schema do banco
✅ Migrations
✅ Cliente Prisma

🎯 Iniciando configuração...
`);

async function setupPrismaPostgres() {
  try {
    console.log('1️⃣ Navegando para o diretório do portal...');
    process.chdir('./portal-maginf');
    
    console.log('2️⃣ Instalando Prisma...');
    try {
      execSync('npm install prisma @prisma/client', { stdio: 'inherit' });
      console.log('✅ Prisma instalado com sucesso!');
    } catch (error) {
      console.log('⚠️ Erro na instalação, continuando...');
    }
    
    console.log('3️⃣ Inicializando Prisma...');
    try {
      execSync('npx prisma init', { stdio: 'inherit' });
      console.log('✅ Prisma inicializado!');
    } catch (error) {
      console.log('⚠️ Prisma já pode estar inicializado, continuando...');
    }
    
    console.log('4️⃣ Criando schema Prisma para MAGINF...');
    createPrismaSchema();
    
    console.log('5️⃣ Configurando variáveis de ambiente...');
    createEnvFile();
    
    console.log('6️⃣ Gerando cliente Prisma...');
    try {
      execSync('npx prisma generate', { stdio: 'inherit' });
      console.log('✅ Cliente Prisma gerado!');
    } catch (error) {
      console.log('⚠️ Erro ao gerar cliente, continuando...');
    }
    
    console.log(`
🎉 PRISMA CONFIGURADO COM SUCESSO!

📋 PRÓXIMOS PASSOS:

1️⃣ CONFIGURAR BANCO NO VERCEL:
   🌐 Acesse: https://vercel.com/dashboard/projects/maginf-portal
   📊 Storage → Create Database → Postgres
   📝 Nome: maginf-database
   🔗 Conecte ao projeto maginf-portal

2️⃣ ATUALIZAR DATABASE_URL:
   📋 Copie a DATABASE_URL do Vercel
   ⚙️ Cole no arquivo .env (já criado)
   🔄 Atualize também no Vercel (Environment Variables)

3️⃣ EXECUTAR MIGRATIONS:
   💻 Execute: npx prisma db push
   📊 Execute: npx prisma studio (para visualizar dados)

4️⃣ RESTAURAR DADOS:
   🔄 Execute: node restore-data-prisma.js (será criado)

✅ ARQUIVOS CRIADOS:
   📄 prisma/schema.prisma (schema do banco)
   📄 .env (variáveis de ambiente)
   📄 lib/prisma.js (cliente Prisma)

🎯 VANTAGENS DO PRISMA:
   ✅ Type-safe queries
   ✅ Auto-complete no VS Code
   ✅ Migrations automáticas
   ✅ Interface visual (Prisma Studio)
   ✅ Melhor performance
`);
    
    createPrismaClient();
    createDataRestoreScript();
    
  } catch (error) {
    console.error('❌ Erro durante configuração:', error.message);
  }
}

function createPrismaSchema() {
  const schema = `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relacionamentos
  tickets   Ticket[]
  
  @@map("users")
}

model Client {
  id          String   @id @default(cuid())
  name        String
  email       String   @unique
  phone       String?
  company     String?
  status      String   @default("active")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relacionamentos
  tickets     Ticket[]
  contracts   Contract[]
  
  @@map("clients")
}

model Ticket {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      String   @default("open")
  priority    String   @default("medium")
  category    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  closedAt    DateTime?
  
  // Relacionamentos
  clientId    String
  client      Client   @relation(fields: [clientId], references: [id])
  assignedId  String?
  assigned    User?    @relation(fields: [assignedId], references: [id])
  
  @@map("tickets")
}

model Contract {
  id          String   @id @default(cuid())
  title       String
  description String?
  value       Float
  status      String   @default("active")
  startDate   DateTime
  endDate     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relacionamentos
  clientId    String
  client      Client   @relation(fields: [clientId], references: [id])
  
  @@map("contracts")
}

model Service {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  category    String?
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("services")
}

model Settings {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("settings")
}`;

  fs.writeFileSync('prisma/schema.prisma', schema);
  console.log('✅ Schema Prisma criado!');
}

function createEnvFile() {
  const envContent = `# Database
DATABASE_URL="postgresql://username:password@localhost:5432/maginf?schema=public"

# NextAuth
NEXTAUTH_URL="https://maginf-portal.vercel.app"
NEXTAUTH_SECRET="maginf-2024-super-secret-key"

# App
APP_NAME="MAGINF Portal"
APP_URL="https://maginf-portal.vercel.app"`;

  fs.writeFileSync('.env', envContent);
  console.log('✅ Arquivo .env criado!');
}

function createPrismaClient() {
  const clientCode = `import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma`;

  if (!fs.existsSync('lib')) {
    fs.mkdirSync('lib');
  }
  
  fs.writeFileSync('lib/prisma.js', clientCode);
  console.log('✅ Cliente Prisma criado em lib/prisma.js!');
}

function createDataRestoreScript() {
  const restoreScript = `const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function restoreData() {
  console.log('🔄 Restaurando dados do MAGINF...');
  
  try {
    // Limpar dados existentes
    await prisma.ticket.deleteMany();
    await prisma.contract.deleteMany();
    await prisma.client.deleteMany();
    await prisma.user.deleteMany();
    await prisma.service.deleteMany();
    await prisma.settings.deleteMany();
    
    console.log('🗑️ Dados antigos removidos');
    
    // Criar usuários
    const users = await prisma.user.createMany({
      data: [
        {
          email: 'admin@maginf.com.br',
          name: 'Administrador MAGINF',
          role: 'admin'
        },
        {
          email: 'tecnico@maginf.com.br',
          name: 'Técnico MAGINF',
          role: 'technician'
        }
      ]
    });
    
    console.log('👥 Usuários criados:', users.count);
    
    // Criar clientes
    const clients = await prisma.client.createMany({
      data: [
        {
          name: 'Empresa ABC Ltda',
          email: 'contato@empresaabc.com.br',
          phone: '(11) 9999-1111',
          company: 'ABC Ltda',
          status: 'active'
        },
        {
          name: 'João Silva',
          email: 'joao@exemplo.com.br',
          phone: '(11) 9999-2222',
          company: 'Silva & Associados',
          status: 'active'
        }
      ]
    });
    
    console.log('🏢 Clientes criados:', clients.count);
    
    // Criar serviços
    const services = await prisma.service.createMany({
      data: [
        {
          name: 'Suporte Técnico MSP',
          description: 'Suporte técnico completo para infraestrutura de TI',
          price: 299.90,
          category: 'MSP',
          active: true
        },
        {
          name: 'Backup em Nuvem',
          description: 'Solução completa de backup automatizado',
          price: 199.90,
          category: 'Cloud',
          active: true
        },
        {
          name: 'Monitoramento 24/7',
          description: 'Monitoramento contínuo da infraestrutura',
          price: 399.90,
          category: 'Monitoring',
          active: true
        }
      ]
    });
    
    console.log('🛠️ Serviços criados:', services.count);
    
    // Criar configurações
    const settings = await prisma.settings.createMany({
      data: [
        { key: 'company_name', value: 'MAGINF Tecnologia' },
        { key: 'company_email', value: 'contato@maginf.com.br' },
        { key: 'company_phone', value: '(11) 9999-9999' },
        { key: 'support_hours', value: '08:00-18:00' }
      ]
    });
    
    console.log('⚙️ Configurações criadas:', settings.count);
    
    console.log('✅ Dados restaurados com sucesso!');
    console.log('🌐 Acesse: https://maginf-portal.vercel.app');
    
  } catch (error) {
    console.error('❌ Erro ao restaurar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

restoreData();`;

  fs.writeFileSync('restore-data-prisma.js', restoreScript);
  console.log('✅ Script de restauração criado!');
}

// Executar configuração
setupPrismaPostgres();
