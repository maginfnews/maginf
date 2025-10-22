# 🚀 Deploy Completo no Vercel - MAGINF

## 📋 **Plano de Ação**

Vamos fazer deploy de **ambas as aplicações** no Vercel:
1. **Site Principal** (React) → `maginf.com.br`
2. **Portal MAGINF** (Next.js) → `portal.maginf.com.br`

---

## 🔥 **PASSO 1: Preparar o Repositório GitHub**

### 1.1 Criar Repositório
```bash
# 1. Vá em github.com e crie um novo repositório
# Nome sugerido: "maginf-apps"
# Público ou Privado (sua escolha)
```

### 1.2 Fazer Upload do Código
```bash
# No terminal, na pasta c:\app-maginf
git init
git add .
git commit -m "🚀 Initial commit - MAGINF Apps"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/maginf-apps.git
git push -u origin main
```

---

## 🌐 **PASSO 2: Deploy do Site Principal**

### 2.1 Acessar Vercel
1. Ir em [vercel.com](https://vercel.com)
2. **Sign up** com GitHub
3. **Import Git Repository**

### 2.2 Configurar Deploy do Site
```
Repository: maginf-apps
Framework Preset: Create React App
Root Directory: ./
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### 2.3 Variáveis de Ambiente (Site)
```env
# Não precisa de variáveis especiais para o site estático
```

---

## ⚡ **PASSO 3: Deploy do Portal MAGINF**

### 3.1 Segundo Deploy no Vercel
1. **Add New Project**
2. **Import** o mesmo repositório
3. **Configurar para pasta do portal**

### 3.2 Configurar Deploy do Portal
```
Repository: maginf-apps
Framework Preset: Next.js
Root Directory: ./portal-maginf
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 3.3 Variáveis de Ambiente (Portal)
```env
# Database (vamos configurar depois)
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://portal-maginf.vercel.app
NEXTAUTH_SECRET=sua-chave-super-secreta-aqui-mude-isso

# Opcional - APIs externas
SITE24X7_API_KEY=sua_api_key
COVE_API_KEY=sua_api_key
```

---

## 🗄️ **PASSO 4: Configurar Banco de Dados**

### 4.1 Criar Banco PostgreSQL
**Opção A: Vercel Postgres (Recomendado)**
1. No dashboard do portal no Vercel
2. **Storage** → **Create Database**
3. **Postgres** → **Continue**
4. Nome: `portal-maginf-db`

**Opção B: Supabase (Alternativa)**
1. Ir em [supabase.com](https://supabase.com)
2. **New Project**
3. Copiar connection string

### 4.2 Atualizar Schema do Prisma
```bash
# No portal-maginf/prisma/schema.prisma
# Já está configurado para PostgreSQL!
```

### 4.3 Fazer Backup dos Dados Locais
```bash
cd portal-maginf
node backup-data.js  # Script que vou criar
```

---

## 🔧 **PASSO 5: Configurar Domínios**

### 5.1 Site Principal
1. **Settings** → **Domains**
2. **Add Domain**: `maginf.com.br`
3. Configurar DNS:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### 5.2 Portal
1. **Settings** → **Domains**  
2. **Add Domain**: `portal.maginf.com.br`
3. Configurar DNS:
```
Type: CNAME
Name: portal
Value: cname.vercel-dns.com
```

---

## ✅ **CHECKLIST DE DEPLOY**

### Site Principal
- [ ] Repositório no GitHub criado
- [ ] Deploy no Vercel configurado
- [ ] Build funcionando
- [ ] Domínio configurado

### Portal MAGINF
- [ ] Deploy no Vercel configurado
- [ ] Banco de dados criado
- [ ] Variáveis de ambiente configuradas
- [ ] Migrations executadas
- [ ] Dados migrados
- [ ] Login funcionando
- [ ] Domínio configurado

---

## 🚨 **IMPORTANTE - PRÓXIMOS COMANDOS**

Vou criar os scripts necessários para facilitar o processo:

1. **Script de backup dos dados**
2. **Script de migração**
3. **Configurações otimizadas**
4. **Arquivo .gitignore atualizado**

**Está pronto para começar? Vamos ao primeiro passo!**
