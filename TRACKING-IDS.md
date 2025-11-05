# 🎯 Configuração de IDs de Tracking

## ⚠️ IMPORTANTE: Substitua os IDs de exemplo pelos seus IDs reais!

---

## 📊 Google Analytics 4

### Onde obter:
1. Acesse: https://analytics.google.com
2. Crie uma conta (se não tiver)
3. Crie uma propriedade GA4
4. Copie o **Measurement ID** (formato: G-XXXXXXXXXX)

### Onde substituir:

**Arquivo 1:** `src/components/Analytics.js`
```javascript
// Linha 11
window.gtag('config', 'G-XXXXXXXXXX', {

// Linha 15
src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"

// Linha 23
gtag('config', 'G-XXXXXXXXXX', {
```

**Arquivo 2:** `src/utils/analytics.js`
```javascript
// Linha 3
export const GA_TRACKING_ID = 'G-XXXXXXXXXX';
```

---

## 👁️ Microsoft Clarity

### Onde obter:
1. Acesse: https://clarity.microsoft.com
2. Crie uma conta
3. Adicione seu site
4. Copie o **Project ID** (formato: XXXXXXXXXX)

### Onde substituir:

**Arquivo:** `src/components/Analytics.js`
```javascript
// Linha 42
})(window, document, "clarity", "script", "XXXXXXXXXX");
```

---

## 📘 Facebook Pixel (Opcional)

### Onde obter:
1. Acesse: https://business.facebook.com
2. Vá em "Eventos" > "Pixels"
3. Crie um Pixel
4. Copie o **Pixel ID** (formato: XXXXXXXXXX)

### Onde substituir:

**Arquivo:** `src/components/Analytics.js`
```javascript
// Linha 52
fbq('init', 'XXXXXXXXXX');

// Linha 63
src="https://www.facebook.com/tr?id=XXXXXXXXXX&ev=PageView&noscript=1"
```

---

## 🔍 Google Search Console

### Onde obter:
1. Acesse: https://search.google.com/search-console
2. Adicione sua propriedade
3. Escolha método de verificação "Tag HTML"
4. Copie o código de verificação

### Onde substituir:

**Arquivo:** `src/utils/analytics.js`
```javascript
// Linha 32
export const searchConsoleVerification = '<meta name="google-site-verification" content="SEU_CODIGO_AQUI" />';
```

Ou adicione diretamente em `src/components/SEO.js`:
```javascript
<meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
```

---

## 📧 Resend API Key

### Onde obter:
1. Acesse: https://resend.com
2. Crie uma conta
3. Verifique seu domínio
4. Vá em "API Keys"
5. Crie uma nova chave

### Onde adicionar:

**Vercel:**
1. Painel da Vercel > Settings > Environment Variables
2. Adicione:
   - Nome: `RESEND_API_KEY`
   - Valor: `re_XXXXXXXXXX`

**Local (.env.local):**
```
RESEND_API_KEY=re_XXXXXXXXXX
```

---

## ✅ Checklist de Configuração

- [ ] Google Analytics ID substituído (2 arquivos)
- [ ] Microsoft Clarity ID substituído
- [ ] Facebook Pixel ID substituído (opcional)
- [ ] Google Search Console verificado
- [ ] Resend API Key configurada
- [ ] Testado em ambiente local
- [ ] Testado em produção

---

## 🧪 Como Testar

### Google Analytics:
1. Acesse seu site
2. Abra o painel do GA4
3. Vá em "Relatórios" > "Tempo real"
4. Você deve ver sua visita

### Microsoft Clarity:
1. Acesse seu site
2. Navegue por algumas páginas
3. Aguarde 5-10 minutos
4. Verifique gravações no painel Clarity

### Facebook Pixel:
1. Instale extensão "Facebook Pixel Helper"
2. Acesse seu site
3. Extensão deve mostrar pixel ativo

---

## 🔒 Segurança

**NUNCA:**
- ❌ Commite API Keys no Git
- ❌ Exponha IDs sensíveis publicamente
- ❌ Compartilhe suas chaves

**SEMPRE:**
- ✅ Use variáveis de ambiente para API Keys
- ✅ Adicione `.env.local` no `.gitignore`
- ✅ Rotacione chaves periodicamente

---

## 📞 Precisa de Ajuda?

Se tiver dúvidas sobre configuração:
- Email: sac@maginf.com.br
- Tel: (11) 4610-6363

---

**Última atualização:** 05/11/2025
