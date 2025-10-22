# MAGINF Tecnologia - Site Institucional

Site institucional moderno e responsivo para a MAGINF Tecnologia, desenvolvido em React com TailwindCSS.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional com identidade visual laranja/cinza
- **Responsivo**: Otimizado para desktop, tablet e mobile
- **Performance**: Carregamento rápido e otimizado
- **SEO**: Meta tags e estrutura otimizada para buscadores
- **Acessibilidade**: Navegação por teclado e leitores de tela

## 📋 Seções do Site

1. **Header/Navegação**: Menu fixo com logo e navegação suave
2. **Hero**: Apresentação principal com CTAs e estatísticas
3. **Serviços**: Cards detalhados dos serviços oferecidos
4. **Planos MSP**: Tabela comparativa de planos com preços
5. **Processo**: Timeline de como a empresa trabalha
6. **Sobre**: Informações da empresa, diferenciais e experiência
7. **Contato**: Formulário de contato e informações

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework JavaScript
- **TailwindCSS**: Framework CSS utilitário
- **Lucide React**: Ícones modernos
- **PostCSS**: Processamento CSS
- **Create React App**: Configuração base

## 📦 Instalação

1. **Clone ou baixe o projeto**
```bash
cd c:\app-maginf
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 🎨 Identidade Visual

### Cores Principais
- **Laranja**: `#e35300` (cor ativa/CTAs)
- **Laranja Claro**: `#ff6b1a`
- **Laranja Escuro**: `#b84200`
- **Cinza**: `#2C3E50` (cor institucional)
- **Cinza Claro**: `#34495E`
- **Cinza Escuro**: `#1A252F`

### Logotipo
- **Arquivo principal**: `/public/logo-maginf.svg`
- **Versão branca**: `/public/logo-maginf-white.svg` (para fundos escuros)
- **Ícone/Favicon**: `/public/logo-icon.svg`

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Personalização

### Alterando Cores
Edite o arquivo `tailwind.config.js` para modificar as cores da marca:

```javascript
colors: {
  'maginf-orange': '#FF6B35',
  'maginf-gray': '#2C3E50',
  // ...
}
```

### Modificando Conteúdo
- **Textos**: Edite os componentes em `src/components/`
- **Imagens**: Adicione na pasta `public/` e referencie nos componentes
- **Contatos**: Modifique as informações no componente `Footer.js`

## 📈 SEO e Performance

### Meta Tags Incluídas
- Title otimizado
- Meta description
- Keywords relevantes
- Open Graph tags
- Viewport responsivo

### Otimizações
- Lazy loading de imagens
- Minificação automática
- Compressão de assets
- Cache de recursos estáticos

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Deploy Sugerido
- **Netlify**: Conecte o repositório Git
- **Vercel**: Deploy automático via Git
- **GitHub Pages**: Para repositórios públicos
- **Servidor próprio**: Upload da pasta `build/`

## 📞 Suporte

Para dúvidas ou suporte técnico:
- **E-mail**: contato@maginf.com.br
- **Telefone**: (11) 9999-9999

## 📄 Licença

Este projeto foi desenvolvido especificamente para a MAGINF Tecnologia.

---

**MAGINF Tecnologia** - Soluções de TI Completas
