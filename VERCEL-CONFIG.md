# 🚀 Configuração Vercel - MAGINF

## 📋 **Repositório GitHub**
- **URL**: https://github.com/Parkup301/maginf
- **Usuário**: Parkup301
- **Status**: ⏳ Aguardando push

---

## 🌐 **DEPLOY 1: Site Principal**

### Acesso Vercel:
1. [vercel.com](https://vercel.com)
2. **Sign up with GitHub**
3. **Import Git Repository**
4. Selecionar: `Parkup301/maginf`

### Configurações:
```
Project Name: maginf-website
Framework Preset: Create React App
Root Directory: ./
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### Variáveis de Ambiente:
```
Nenhuma necessária para o site estático
```

---

## ⚡ **DEPLOY 2: Portal MAGINF**

### Segundo Deploy:
1. **Add New Project** no Vercel
2. **Import** o mesmo repositório
3. Selecionar: `Parkup301/maginf`

### Configurações:
```
Project Name: maginf-portal
Framework Preset: Next.js
Root Directory: ./portal-maginf
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Variáveis de Ambiente:
```env
NEXTAUTH_URL=https://maginf-portal.vercel.app
NEXTAUTH_SECRET=maginf-super-secret-key-2024-production
DATABASE_URL=postgresql://... (configurar depois)
```

---

## 🗄️ **Banco de Dados PostgreSQL**

### Após Deploy do Portal:
1. **Dashboard Portal** → **Storage**
2. **Create Database** → **Postgres**
3. **Nome**: `maginf-portal-db`
4. Copiar `DATABASE_URL`
5. Adicionar nas **Environment Variables**

### Migrations:
```bash
# Será executado automaticamente no deploy
npx prisma migrate deploy
npx prisma generate
```

---

## 🔄 **Restaurar Dados**

### Após Banco Configurado:
1. Acessar **Functions** no Vercel
2. Criar função temporária para restore
3. Ou usar Vercel CLI:

```bash
vercel env pull .env.local
cd portal-maginf
node restore-data.js
```

---

## 🌍 **Domínios Finais**

### Site Principal:
- **Vercel**: `maginf-website.vercel.app`
- **Personalizado**: `maginf.com.br`

### Portal:
- **Vercel**: `maginf-portal.vercel.app`
- **Personalizado**: `portal.maginf.com.br`

---

## ✅ **Próximos Passos**

1. ⏳ **Push para GitHub** (você está fazendo)
2. 🚀 **Deploy site no Vercel**
3. ⚡ **Deploy portal no Vercel**
4. 🗄️ **Configurar PostgreSQL**
5. 🔄 **Restaurar dados**
6. 🌍 **Configurar domínios**

**Assim que fizer o push, me avise para continuarmos!**
