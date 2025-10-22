# 🚀 MAGINF Apps - Deploy no Vercel

## 📁 Estrutura do Projeto

```
maginf-apps/
├── 🌐 Site Principal (React CRA)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── ⚡ Portal MAGINF (Next.js)
│   ├── portal-maginf/
│   │   ├── app/
│   │   ├── components/
│   │   ├── prisma/
│   │   └── package.json
│   └── backup-data.js
│
└── 📋 Documentação
    ├── DEPLOY-VERCEL-GUIA.md
    └── README-DEPLOY.md
```

## 🎯 URLs de Deploy

- **Site Principal**: `https://maginf.com.br`
- **Portal MAGINF**: `https://portal.maginf.com.br`

## 🔧 Comandos Rápidos

### Preparar Deploy
```bash
# 1. Fazer backup dos dados do portal
cd portal-maginf
node backup-data.js

# 2. Subir para GitHub
git add .
git commit -m "🚀 Ready for Vercel deploy"
git push origin main
```

### Após Deploy no Vercel
```bash
# Restaurar dados no banco PostgreSQL
cd portal-maginf
node restore-data.js
```

## 📊 Configurações do Vercel

### Site Principal
```
Framework: Create React App
Root Directory: ./
Build Command: npm run build
Output Directory: build
```

### Portal MAGINF
```
Framework: Next.js
Root Directory: ./portal-maginf
Build Command: npm run build
Output Directory: .next
```

## 🔐 Variáveis de Ambiente

### Portal MAGINF
```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://portal.maginf.com.br
NEXTAUTH_SECRET=sua-chave-super-secreta
```

## ✅ Status do Deploy

- [ ] Repositório GitHub criado
- [ ] Site principal no Vercel
- [ ] Portal MAGINF no Vercel
- [ ] Banco PostgreSQL configurado
- [ ] Dados migrados
- [ ] Domínios configurados
- [ ] SSL ativo
- [ ] Testes realizados

## 🆘 Suporte

Em caso de problemas:
1. Verificar logs no Vercel Dashboard
2. Testar build local: `npm run build`
3. Verificar variáveis de ambiente
4. Consultar documentação do Vercel
