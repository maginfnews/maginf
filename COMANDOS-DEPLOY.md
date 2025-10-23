# 🚀 Comandos para Deploy - MAGINF

## 📝 **PASSO ATUAL: Subir para GitHub**

Execute estes comandos (substitua SEU_USUARIO):

```bash
# Configurar remote (SUBSTITUA SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/maginf.git

# Fazer push
git push -u origin main
```

---

## 🌐 **PRÓXIMO: Deploy no Vercel**

### 1. Site Principal
1. Ir em [vercel.com](https://vercel.com)
2. **Import Git Repository**
3. Selecionar repositório `maginf`

**Configurações:**
```
Framework: Create React App
Root Directory: ./
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### 2. Portal MAGINF
1. **Add New Project** no Vercel
2. **Import** o mesmo repositório `maginf`

**Configurações:**
```
Framework: Next.js
Root Directory: ./portal-maginf
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**Variáveis de Ambiente:**
```env
DATABASE_URL=postgresql://... (configurar depois)
NEXTAUTH_URL=https://seu-portal.vercel.app
NEXTAUTH_SECRET=mude-esta-chave-super-secreta-123
```

---

## 🗄️ **Banco de Dados (Após Deploy)**

### Criar Postgres no Vercel:
1. Dashboard do Portal → **Storage**
2. **Create Database** → **Postgres**
3. Copiar `DATABASE_URL`
4. Adicionar nas variáveis de ambiente

### Executar Migrations:
```bash
cd portal-maginf
npx prisma migrate deploy
npx prisma generate
```

### Restaurar Dados:
```bash
node restore-data.js
```

---

## ✅ **Status Atual**

- [x] Backup dos dados realizado
- [x] Código commitado no Git
- [ ] Push para GitHub
- [ ] Deploy site no Vercel
- [ ] Deploy portal no Vercel
- [ ] Configurar banco PostgreSQL
- [ ] Restaurar dados
- [ ] Configurar domínios

**Próximo passo:** Fazer push para GitHub!
