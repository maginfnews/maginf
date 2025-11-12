# 🔧 Troubleshooting - Página 404

## ❓ Problema: Página Preta Aparece

### Possíveis Causas

#### 1. **Next.js Página Padrão**
O Next.js tem uma página 404 padrão muito simples (quase preta) que aparece quando:
- O arquivo `pages/404.tsx` ou `pages/404.jsx` não existe
- O arquivo tem erros de compilação
- O Next.js não conseguiu compilar a página customizada

**Solução:**
```bash
# Verificar se o arquivo existe
ls pages/404.jsx

# Reiniciar o servidor Next.js
npm run dev
```

#### 2. **Erro de TypeScript**
Se você está usando `.tsx`, erros de tipo podem impedir a compilação:

```typescript
// ❌ ERRO - Tipo never[]
const [floatingIcons, setFloatingIcons] = useState([]);

// ✅ CORRETO - Tipo explícito
const [floatingIcons, setFloatingIcons] = useState<any[]>([]);
```

**Solução:**
- Converter para `.jsx` (JavaScript puro)
- Ou adicionar tipos corretos no TypeScript

#### 3. **CSS Tailwind Não Carregado**
O Tailwind CSS pode não estar sendo aplicado se:
- `_app.tsx` não está importando o CSS
- Build do Tailwind falhou
- Classes não foram geradas

**Verificar:**
```tsx
// pages/_app.tsx
import '../src/index.css'  // ✅ Deve estar presente
```

#### 4. **Cache do Next.js**
O cache pode estar servindo uma versão antiga:

**Solução:**
```bash
# Limpar cache e reiniciar
rm -rf .next
npm run dev
```

#### 5. **Erro de Compilação Silencioso**
Verifique o terminal onde o Next.js está rodando:

```bash
# Procure por erros como:
Error: Cannot find module...
SyntaxError: Unexpected token...
TypeError: ...
```

## 🛠️ Soluções Rápidas

### Solução 1: Usar Versão JSX (Recomendado)
```bash
# Renomear de .tsx para .jsx
mv pages/404.tsx pages/404.jsx
```

### Solução 2: Limpar e Reconstruir
```bash
# Parar o servidor (Ctrl+C)
rm -rf .next
npm run dev
```

### Solução 3: Verificar Logs
```bash
# Rodar em modo verbose
npm run dev -- --verbose
```

### Solução 4: Testar Página 404 Simples
Criar um `pages/404.jsx` mínimo para testar:

```jsx
export default function Custom404() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #2C3E50, #34495E)',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '120px', margin: 0 }}>404</h1>
        <p style={{ fontSize: '24px' }}>Página Não Encontrada</p>
        <a href="/" style={{ 
          color: '#e35300', 
          textDecoration: 'none',
          fontSize: '18px'
        }}>
          Voltar ao Início
        </a>
      </div>
    </div>
  );
}
```

Se esta versão simples funcionar, o problema está na versão complexa.

## 🔍 Como Identificar a Causa

### Passo 1: Verificar Terminal
Olhe o terminal onde `npm run dev` está rodando:
```
✓ Ready in 2s          ← OK
✗ Failed to compile    ← PROBLEMA!
```

### Passo 2: Verificar Browser Console
Abra DevTools (F12) e veja se há erros:
```
Failed to load resource: 404
Uncaught TypeError: ...
```

### Passo 3: Verificar Network Tab
No DevTools, aba Network:
- Verifique se `_next/static/css/...` está carregando
- Verifique se há erros 404 em recursos

### Passo 4: Testar URL Direta
```
http://localhost:3000/404
```

Se funcionar aqui mas não em URLs inexistentes, o problema é de roteamento.

## 📋 Checklist de Verificação

- [ ] Arquivo `pages/404.jsx` ou `pages/404.tsx` existe
- [ ] `pages/_app.tsx` importa `../src/index.css`
- [ ] Tailwind CSS está configurado em `tailwind.config.js`
- [ ] Next.js está rodando sem erros no terminal
- [ ] Não há erros no console do browser
- [ ] Cache `.next` foi limpo
- [ ] Dependências estão instaladas (`npm install`)

## 🎯 Teste Final

Após aplicar as correções:

1. **Parar servidor**: Ctrl+C
2. **Limpar cache**: `rm -rf .next`
3. **Reiniciar**: `npm run dev`
4. **Testar**: Acesse `http://localhost:3000/teste-404`

## 📞 Ainda com Problemas?

Se a página preta persistir:

1. **Verifique versão do Next.js**:
   ```bash
   npm list next
   ```

2. **Reinstale dependências**:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Use a versão simplificada** (inline styles) temporariamente

4. **Verifique se há conflito** com outras páginas ou layouts

## 💡 Dica Pro

Para debug, adicione console.log no início da página 404:

```jsx
export default function Custom404() {
  console.log('🔴 Página 404 carregada!');
  
  // resto do código...
}
```

Se você NÃO ver esta mensagem no console, a página não está sendo carregada.

---

**Última atualização**: Novembro 2025
**Arquivo**: `pages/404.jsx`
