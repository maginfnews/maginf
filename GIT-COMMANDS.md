# 🚀 Comandos Git para Deploy

## Opção 1: Commit Completo (Recomendado)

```bash
# 1. Adicionar arquivos modificados importantes
git add pages/_document.tsx
git add public/sitemap.xml
git add public/sitemap-index.xml
git add src/components/Analytics.js
git add src/components/Blog.js
git add src/components/LazyImage.js
git add src/components/Portfolio.js
git add src/config/resend.js
git add src/utils/webVitalsOptimizer.js
git add package.json
git add .gitignore

# 2. Adicionar novos arquivos (scripts e documentação)
git add update-sitemap.js
git add check-seo.js
git add SEO-AUDIT-REPORT.md
git add GOOGLE-SEARCH-CONSOLE.md
git add SITEMAP-QUICK-GUIDE.md
git add FIX-ALT-TEXT-GUIDE.md
git add SEO-FIXES-LOG.md
git add ALT-TEXT-FIXES-SUMMARY.md
git add DEPLOY-COM-SEO.md

# 3. Commit com mensagem descritiva
git commit -m "feat: Otimização SEO completa e melhorias de acessibilidade

- Sitemap atualizado (17 URLs) e otimizado
- Viewport meta tag adicionada (obrigatório)
- Alt text melhorado em imagens (+5.9%)
- Estrutura de headings corrigida (H1 único por página)
- Scripts de automação criados (sitemap, seo check)
- Documentação completa adicionada
- SEO Score: 85/100 → 90/100

Arquivos modificados:
- pages/_document.tsx (viewport)
- public/sitemap*.xml (atualizado)
- src/components/*.js (alt text + fallbacks)
- src/config/resend.js (headings corrigidos)

Novos scripts:
- update-sitemap.js (gerenciar sitemap)
- check-seo.js (auditoria SEO)

Documentação:
- SEO-AUDIT-REPORT.md
- GOOGLE-SEARCH-CONSOLE.md
- DEPLOY-COM-SEO.md
- Guias de correção e quick reference"

# 4. Push para GitHub
git push origin main
```

---

## Opção 2: Commit Rápido (Todos os Arquivos)

```bash
# Adicionar TODOS os arquivos modificados e novos
git add .

# Commit
git commit -m "feat: SEO otimizado (90/100) - sitemap, viewport, alt text, documentação"

# Push
git push origin main
```

---

## Opção 3: Commit por Categoria

### A. Correções SEO
```bash
git add pages/_document.tsx
git add public/sitemap*.xml
git add src/components/Analytics.js
git add src/components/Blog.js
git add src/components/LazyImage.js
git add src/components/Portfolio.js
git add src/config/resend.js
git add src/utils/webVitalsOptimizer.js

git commit -m "fix(seo): viewport, sitemap, alt text e headings corrigidos"
```

### B. Scripts e Ferramentas
```bash
git add update-sitemap.js
git add check-seo.js
git add package.json

git commit -m "feat(tools): scripts de automação para sitemap e auditoria SEO"
```

### C. Documentação
```bash
git add SEO-AUDIT-REPORT.md
git add GOOGLE-SEARCH-CONSOLE.md
git add SITEMAP-QUICK-GUIDE.md
git add FIX-ALT-TEXT-GUIDE.md
git add SEO-FIXES-LOG.md
git add ALT-TEXT-FIXES-SUMMARY.md
git add DEPLOY-COM-SEO.md

git commit -m "docs: documentação completa de SEO e deploy"
```

### D. Push Final
```bash
git push origin main
```

---

## 🔍 Verificar Antes de Commitar

```bash
# Ver status
git status

# Ver diferenças
git diff pages/_document.tsx
git diff public/sitemap.xml

# Ver arquivos novos
git status --short
```

---

## 🚨 Se Houver Conflitos

```bash
# Puxar mudanças do remoto
git pull origin main

# Resolver conflitos manualmente
# Depois:
git add .
git commit -m "merge: resolver conflitos"
git push origin main
```

---

## 📊 Após o Push

### Verificar no GitHub
1. Acessar: https://github.com/seu-usuario/maginf
2. Verificar commits
3. Verificar arquivos atualizados

### Criar Release (Opcional)
```bash
# Criar tag
git tag -a v2.0 -m "SEO Otimizado - Score 90/100"

# Push da tag
git push origin v2.0
```

---

## 🎯 Recomendação

**Use a Opção 1** (Commit Completo)

**Por quê?**
- ✅ Mensagem de commit detalhada
- ✅ Histórico organizado
- ✅ Fácil de entender mudanças
- ✅ Boas práticas Git

---

## 📝 Mensagem de Commit Padrão

```
feat: Otimização SEO completa (90/100)

- Sitemap atualizado (17 URLs)
- Viewport meta tag adicionada
- Alt text melhorado (+5.9%)
- H1 único por página
- Scripts de automação
- Documentação completa

SEO Score: 85/100 → 90/100
```

---

## ✅ Checklist

- [ ] Verificar git status
- [ ] Adicionar arquivos importantes
- [ ] Commit com mensagem descritiva
- [ ] Push para GitHub
- [ ] Verificar no GitHub
- [ ] Criar tag de versão (opcional)

---

**Pronto para executar!** 🚀
