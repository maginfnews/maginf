# 🚀 Deploy no GitHub - Guia Completo MAGINF

## 📋 Resumo do Projeto

Você possui **2 aplicações** que podem ser hospedadas no GitHub:

### 1. **Site Principal** (React/CRA)
- 📁 Pasta: `/` (raiz do projeto)
- 🛠️ Tecnologia: Create React App + TailwindCSS
- 🎯 Deploy: GitHub Pages (gratuito)

### 2. **Portal MAGINF** (Next.js)
- 📁 Pasta: `/portal-maginf/`
- 🛠️ Tecnologia: Next.js 14 + Prisma + SQLite
- 🎯 Deploy: Vercel (gratuito)

---

## 🌐 OPÇÃO 1: GitHub Pages (Site Principal)

### ✅ Vantagens
- ✅ **100% Gratuito**
- ✅ Deploy automático
- ✅ Domínio personalizado
- ✅ SSL gratuito
- ✅ Ideal para sites estáticos

### 📝 Passos para Deploy

#### 1. Preparar o Repositório
```bash
# 1. Criar repositório no GitHub
# 2. Fazer push do código

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU_USUARIO/maginf-website.git
git push -u origin main
```

#### 2. Configurar GitHub Actions
Criar arquivo: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

#### 3. Configurar GitHub Pages
1. Ir em **Settings** > **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages**
4. Folder: **/ (root)**

#### 4. Domínio Personalizado (Opcional)
```bash
# Adicionar arquivo CNAME na pasta build
echo "maginf.com.br" > public/CNAME
```

---

## ⚡ OPÇÃO 2: Vercel (Portal Next.js)

### ✅ Vantagens
- ✅ **Otimizado para Next.js**
- ✅ Deploy automático do GitHub
- ✅ Banco de dados gratuito
- ✅ Edge Functions
- ✅ Analytics gratuito

### 📝 Passos para Deploy

#### 1. Preparar o Portal
```bash
cd portal-maginf

# Verificar se está funcionando localmente
npm install
npm run build
npm run start
```

#### 2. Configurar Banco de Dados
```bash
# Opção A: Vercel Postgres (Recomendado)
# - Criar database no Vercel
# - Atualizar DATABASE_URL

# Opção B: PlanetScale (MySQL)
# - Criar database gratuito
# - Migrar schema do Prisma

# Opção C: Supabase (PostgreSQL)
# - Criar projeto gratuito
# - Configurar Prisma para PostgreSQL
```

#### 3. Deploy no Vercel
1. Ir em [vercel.com](https://vercel.com)
2. **Import Git Repository**
3. Selecionar pasta `portal-maginf`
4. Configurar variáveis de ambiente:

```env
DATABASE_URL="sua_database_url"
NEXTAUTH_URL="https://portal.maginf.com.br"
NEXTAUTH_SECRET="seu_secret_super_seguro"
```

#### 4. Configurar Domínio
1. **Settings** > **Domains**
2. Adicionar: `portal.maginf.com.br`
3. Configurar DNS no seu provedor

---

## 🔄 OPÇÃO 3: Monorepo (Ambos Juntos)

### Estrutura Recomendada
```
maginf-monorepo/
├── website/          # Site principal (React)
├── portal/           # Portal (Next.js)
├── .github/
│   └── workflows/
│       ├── deploy-website.yml
│       └── deploy-portal.yml
└── README.md
```

### Deploy Separado
- **Website**: GitHub Pages
- **Portal**: Vercel
- **Repositório**: Único, deploys independentes

---

## 🛠️ Configurações Necessárias

### 1. Variáveis de Ambiente (Portal)
```env
# Banco de dados
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://portal.maginf.com.br"
NEXTAUTH_SECRET="chave-super-secreta-aqui"

# APIs externas (se usar)
SITE24X7_API_KEY="sua_api_key"
COVE_API_KEY="sua_api_key"
```

### 2. Ajustes no Código

#### Site Principal - package.json
```json
{
  "homepage": "https://maginf.com.br",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### Portal - next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Para Vercel
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
```

---

## 💰 Custos Estimados

### GitHub Pages (Site)
- ✅ **R$ 0/mês** - Completamente gratuito
- ✅ Bandwidth ilimitado
- ✅ SSL incluído

### Vercel (Portal)
- ✅ **R$ 0/mês** - Plano Hobby
- ✅ 100GB bandwidth
- ✅ Serverless functions
- ✅ 1 banco de dados

### Total: **R$ 0/mês** 🎉

---

## 🚀 Próximos Passos

1. **Criar repositório no GitHub**
2. **Configurar GitHub Actions para o site**
3. **Migrar portal para Vercel**
4. **Configurar domínios personalizados**
5. **Testar deploys automáticos**

---

## 📞 Suporte

- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deploy**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

**🎯 Resultado Final:**
- `maginf.com.br` → Site principal (GitHub Pages)
- `portal.maginf.com.br` → Portal de monitoramento (Vercel)
- Deploy automático a cada push no GitHub
- **100% gratuito** para começar!
