# 🚀 Guia Completo de Deploy - MAGINF

## ✅ Pré-requisitos

- [x] Node.js 18+ instalado
- [x] Git configurado
- [x] Conta no GitHub
- [x] Conta na Vercel (recomendado) ou Netlify

---

## 📦 1. Build Local

Teste o build antes de fazer deploy:

```bash
npm run build
npm run start
```

Acesse: `http://localhost:3000`

---

## 🌐 2. Deploy na Vercel (Recomendado)

### Opção A: Via GitHub (Automático)

1. **Push para GitHub:**
```bash
git add .
git commit -m "Deploy: Site completo"
git push origin main
```

2. **Conectar na Vercel:**
   - Acesse: https://vercel.com
   - Clique em "Import Project"
   - Selecione seu repositório GitHub
   - Clique em "Deploy"

3. **Configurar Variáveis de Ambiente:**
   - No painel da Vercel, vá em "Settings" > "Environment Variables"
   - Adicione:
     - `RESEND_API_KEY` = sua chave da Resend

### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

---

## 🔧 3. Configurar Domínio Personalizado

### Na Vercel:

1. Vá em "Settings" > "Domains"
2. Adicione: `maginf.com.br`
3. Configure DNS:

```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

4. Aguarde propagação (até 48h)

---

## 📊 4. Configurar Analytics

### Google Analytics 4:

1. Crie conta em: https://analytics.google.com
2. Crie propriedade GA4
3. Copie o ID (G-XXXXXXXXXX)
4. Substitua em:
   - `src/components/Analytics.js` (linha 11 e 15)
   - `src/utils/analytics.js` (linha 3)

### Microsoft Clarity:

1. Crie conta em: https://clarity.microsoft.com
2. Adicione seu site
3. Copie o código
4. Substitua em `src/components/Analytics.js` (linha 42)

### Facebook Pixel (Opcional):

1. Crie conta Facebook Business
2. Crie Pixel
3. Copie o ID
4. Substitua em `src/components/Analytics.js` (linha 52 e 63)

---

## 🔍 5. SEO - Google Search Console

1. Acesse: https://search.google.com/search-console
2. Adicione propriedade: `maginf.com.br`
3. Verifique propriedade (método DNS ou HTML)
4. Envie sitemap: `https://maginf.com.br/sitemap.xml`

---

## 🎯 6. Otimizações Pós-Deploy

### Testar Performance:

```bash
# PageSpeed Insights
https://pagespeed.web.dev/

# GTmetrix
https://gtmetrix.com/

# WebPageTest
https://www.webpagetest.org/
```

### Checklist:

- [ ] Testar em mobile
- [ ] Testar em diferentes navegadores
- [ ] Verificar formulário de contato
- [ ] Testar WhatsApp button
- [ ] Verificar todas as imagens
- [ ] Testar links de Privacidade e Termos
- [ ] Verificar página 404
- [ ] Testar velocidade de carregamento

---

## 🔄 7. CI/CD Automático

Com Vercel + GitHub, o deploy é automático:

```bash
# Fazer alterações
git add .
git commit -m "Atualização: descrição"
git push origin main

# Deploy automático acontece!
```

---

## 📱 8. PWA (Progressive Web App)

O site já está configurado como PWA:

- ✅ `manifest.json` configurado
- ✅ Service Worker (`sw.js`) criado
- ✅ Ícones configurados

**Testar PWA:**
1. Abra o site no Chrome mobile
2. Clique em "Adicionar à tela inicial"
3. App instalado!

---

## 🔐 9. SSL/HTTPS

Vercel fornece SSL automático e gratuito via Let's Encrypt.

**Verificar:**
- https://maginf.com.br (deve funcionar)
- http://maginf.com.br (deve redirecionar para https)

---

## 📧 10. Configurar E-mail (Resend)

1. Crie conta: https://resend.com
2. Verifique domínio `maginf.com.br`
3. Adicione registros DNS:
```
Tipo: TXT
Nome: _resend
Valor: [código fornecido]
```
4. Copie API Key
5. Adicione em Vercel Environment Variables

---

## 🎨 11. Customizações Finais

### Substituir IDs de Tracking:

**Google Analytics:**
- Arquivo: `src/components/Analytics.js`
- Substituir: `G-XXXXXXXXXX` por seu ID real

**Microsoft Clarity:**
- Arquivo: `src/components/Analytics.js`
- Substituir: `XXXXXXXXXX` por seu ID real

**Facebook Pixel:**
- Arquivo: `src/components/Analytics.js`
- Substituir: `XXXXXXXXXX` por seu ID real

---

## 🐛 12. Troubleshooting

### Build falha:

```bash
# Limpar cache
rm -rf .next node_modules
npm install
npm run build
```

### Imagens não carregam:

- Verificar URLs em `src/config/imageConfig.js`
- Verificar `next.config.js` > `images.remotePatterns`

### Formulário não envia:

- Verificar `RESEND_API_KEY` nas variáveis de ambiente
- Verificar domínio verificado na Resend

---

## 📞 Suporte

**Dúvidas sobre deploy?**
- Email: sac@maginf.com.br
- Tel: (11) 4610-6363

---

## ✨ Checklist Final

- [ ] Build local funcionando
- [ ] Deploy na Vercel concluído
- [ ] Domínio configurado
- [ ] SSL ativo (HTTPS)
- [ ] Google Analytics configurado
- [ ] Search Console configurado
- [ ] Sitemap enviado
- [ ] Formulário testado
- [ ] WhatsApp funcionando
- [ ] Mobile responsivo
- [ ] Performance > 90 (PageSpeed)

---

**🎉 Parabéns! Seu site está no ar!**

Acesse: https://maginf.com.br
