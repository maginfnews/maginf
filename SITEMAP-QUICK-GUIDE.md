# Guia Rápido: Sitemap para Google

## 🎯 URLs do Sitemap

```
Principal: https://maginf.com.br/sitemap.xml
Index:     https://maginf.com.br/sitemap-index.xml
```

## ⚡ Comandos Rápidos

### Atualizar Sitemap
```bash
npm run sitemap
```

### Validar Sitemap
```bash
npm run sitemap:validate
```

### Listar URLs
```bash
npm run sitemap:list
```

### Adicionar Nova URL
```bash
node update-sitemap.js add /nova-pagina monthly 0.8
```

### Remover URL
```bash
node update-sitemap.js remove /pagina-antiga
```

## 📤 Submeter ao Google Search Console

### Passo a Passo
1. Acesse: https://search.google.com/search-console
2. Selecione: **maginf.com.br**
3. Menu: **Sitemaps**
4. Digite: `sitemap.xml`
5. Clique: **Enviar**

### Verificar Status
- Aguarde 1-2 dias para processamento
- Status esperado: **Sucesso** ✅
- Verifique URLs descobertas

## 📊 Páginas Incluídas (17 URLs)

### Principais (6)
- ✅ Home (prioridade 1.0)
- ✅ Serviços (0.9)
- ✅ Planos (0.9)
- ✅ Sobre (0.8)
- ✅ Contato (0.8)
- ✅ Blog (0.7)

### Serviços SEO (4)
- ✅ Suporte Técnico TI (0.9)
- ✅ MSP Brasil (0.9)
- ✅ Backup em Nuvem (0.8)
- ✅ Monitoramento TI (0.8)

### Blog (5)
- ✅ Como escolher MSP no Brasil
- ✅ Backup em nuvem vs local
- ✅ Monitoramento proativo de TI
- ✅ Segurança de dados para empresas
- ✅ Infraestrutura de TI para pequenas empresas

### Legais (2)
- ✅ Privacidade (0.3)
- ✅ Termos (0.3)

## 🔄 Quando Atualizar

### Obrigatório
- ✅ Adicionar nova página
- ✅ Remover página
- ✅ Mudar URL

### Recomendado
- 📝 Novo artigo do blog
- 🔄 Atualização importante
- 📅 Mensalmente

## 🛠️ Manutenção

### Workflow Completo
```bash
# 1. Atualizar sitemap
npm run sitemap

# 2. Validar
npm run sitemap:validate

# 3. Commit
git add public/sitemap*.xml
git commit -m "chore: atualizar sitemap"

# 4. Deploy
npm run deploy:build

# 5. Reenviar ao Google
# Acesse Search Console e reenvie
```

## 📈 Monitoramento

### Métricas Chave
- **Cobertura**: 100% indexado
- **CTR**: >3%
- **Posição**: <10
- **Core Web Vitals**: Verde

### Ferramentas
- Google Search Console
- Google Analytics 4
- Bing Webmaster Tools

## ⚠️ Troubleshooting

### Sitemap não aparece
- Aguarde 24-48h
- Verifique robots.txt
- Teste URL manualmente

### Erros de indexação
- Verifique formato XML
- Confirme URLs acessíveis
- Valide com ferramenta online

### URLs não indexadas
- Aumente prioridade
- Melhore conteúdo
- Adicione links internos

## 📚 Documentação Completa

Ver: `GOOGLE-SEARCH-CONSOLE.md`

## 🎯 Próximos Passos

1. ✅ Sitemap atualizado
2. 📤 Submeter ao Google
3. ⏳ Aguardar processamento
4. 📊 Monitorar métricas
5. 🔄 Atualizar mensalmente

---

*Última atualização: 12/11/2025*
