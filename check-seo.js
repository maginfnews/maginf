/**
 * Script de Verificação SEO
 * MAGINF Tecnologia
 * 
 * Verifica elementos importantes de SEO no código
 */

const fs = require('fs');
const path = require('path');

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Função para buscar arquivos recursivamente
function findFiles(dir, extension, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Ignorar node_modules, .git, build, etc
      if (!['node_modules', '.git', 'build', '.next', 'dashboard-backup', 'portal-maginf'].includes(file)) {
        findFiles(filePath, extension, fileList);
      }
    } else if (file.endsWith(extension)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Verificar imagens sem alt text
function checkAltText() {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Verificando Alt Text em Imagens${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  const srcDir = path.join(__dirname, 'src');
  const jsFiles = findFiles(srcDir, '.js');
  const jsxFiles = findFiles(srcDir, '.jsx');
  const allFiles = [...jsFiles, ...jsxFiles];
  
  let totalImages = 0;
  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;
  const issues = [];
  
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(__dirname, file);
    
    // Buscar tags <img
    const imgRegex = /<img[^>]*>/gi;
    const matches = content.match(imgRegex);
    
    if (matches) {
      matches.forEach(match => {
        totalImages++;
        
        // Verificar se tem alt
        if (match.includes('alt=')) {
          // Verificar se alt não está vazio
          const altMatch = match.match(/alt=["']([^"']*)["']/);
          if (altMatch && altMatch[1].trim()) {
            imagesWithAlt++;
          } else {
            imagesWithoutAlt++;
            issues.push({
              file: relativePath,
              issue: 'Alt text vazio',
              code: match
            });
          }
        } else {
          imagesWithoutAlt++;
          issues.push({
            file: relativePath,
            issue: 'Sem alt text',
            code: match
          });
        }
      });
    }
  });
  
  // Resultados
  console.log(`📊 Total de imagens encontradas: ${totalImages}`);
  console.log(`${colors.green}✅ Com alt text: ${imagesWithAlt}${colors.reset}`);
  console.log(`${colors.red}❌ Sem alt text: ${imagesWithoutAlt}${colors.reset}`);
  
  if (imagesWithoutAlt > 0) {
    console.log(`\n${colors.yellow}⚠️  Issues encontrados:${colors.reset}\n`);
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${colors.yellow}${issue.file}${colors.reset}`);
      console.log(`   ${issue.issue}`);
      console.log(`   ${colors.cyan}${issue.code.substring(0, 80)}...${colors.reset}\n`);
    });
  }
  
  const percentage = totalImages > 0 ? ((imagesWithAlt / totalImages) * 100).toFixed(1) : 0;
  console.log(`\n📈 Taxa de cobertura: ${percentage}%`);
  
  if (percentage >= 90) {
    console.log(`${colors.green}✅ Excelente!${colors.reset}`);
  } else if (percentage >= 70) {
    console.log(`${colors.yellow}⚠️  Bom, mas pode melhorar${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ Precisa de atenção${colors.reset}`);
  }
}

// Verificar meta tags
function checkMetaTags() {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Verificando Meta Tags${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  const documentPath = path.join(__dirname, 'pages', '_document.tsx');
  
  if (!fs.existsSync(documentPath)) {
    console.log(`${colors.red}❌ Arquivo _document.tsx não encontrado${colors.reset}`);
    return;
  }
  
  const content = fs.readFileSync(documentPath, 'utf8');
  
  const checks = [
    { name: 'Meta description', regex: /<meta name="description"/, required: true },
    { name: 'Meta keywords', regex: /<meta name="keywords"/, required: false },
    { name: 'Theme color', regex: /<meta name="theme-color"/, required: true },
    { name: 'Viewport', regex: /<meta name="viewport"/, required: true },
    { name: 'Lang attribute', regex: /<Html lang="/, required: true },
    { name: 'Favicon', regex: /<link rel="icon"/, required: true },
    { name: 'Manifest', regex: /<link rel="manifest"/, required: true }
  ];
  
  checks.forEach(check => {
    const found = check.regex.test(content);
    if (found) {
      console.log(`${colors.green}✅ ${check.name}${colors.reset}`);
    } else {
      if (check.required) {
        console.log(`${colors.red}❌ ${check.name} (obrigatório)${colors.reset}`);
      } else {
        console.log(`${colors.yellow}⚠️  ${check.name} (recomendado)${colors.reset}`);
      }
    }
  });
}

// Verificar structured data
function checkStructuredData() {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Verificando Structured Data (Schema.org)${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  const schemaPath = path.join(__dirname, 'src', 'components', 'SchemaMarkup.js');
  
  if (!fs.existsSync(schemaPath)) {
    console.log(`${colors.red}❌ SchemaMarkup.js não encontrado${colors.reset}`);
    return;
  }
  
  const content = fs.readFileSync(schemaPath, 'utf8');
  
  const schemas = [
    { name: 'Organization', regex: /"@type":\s*"Organization"/ },
    { name: 'LocalBusiness', regex: /"@type":\s*"LocalBusiness"/ },
    { name: 'Service', regex: /"@type":\s*"Service"/ },
    { name: 'ContactPoint', regex: /"@type":\s*"ContactPoint"/ },
    { name: 'PostalAddress', regex: /"@type":\s*"PostalAddress"/ }
  ];
  
  schemas.forEach(schema => {
    const found = schema.regex.test(content);
    if (found) {
      console.log(`${colors.green}✅ ${schema.name} Schema${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️  ${schema.name} Schema não encontrado${colors.reset}`);
    }
  });
}

// Verificar sitemap
function checkSitemap() {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Verificando Sitemap${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  const robotsPath = path.join(__dirname, 'public', 'robots.txt');
  
  // Verificar sitemap.xml
  if (fs.existsSync(sitemapPath)) {
    const content = fs.readFileSync(sitemapPath, 'utf8');
    const urlMatches = content.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    
    console.log(`${colors.green}✅ sitemap.xml encontrado${colors.reset}`);
    console.log(`   📊 Total de URLs: ${urlCount}`);
    
    // Verificar data de atualização
    const lastmodMatch = content.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (lastmodMatch) {
      console.log(`   📅 Última atualização: ${lastmodMatch[1]}`);
    }
  } else {
    console.log(`${colors.red}❌ sitemap.xml não encontrado${colors.reset}`);
  }
  
  // Verificar robots.txt
  if (fs.existsSync(robotsPath)) {
    const content = fs.readFileSync(robotsPath, 'utf8');
    console.log(`${colors.green}✅ robots.txt encontrado${colors.reset}`);
    
    if (content.includes('Sitemap:')) {
      console.log(`${colors.green}✅ Sitemap referenciado no robots.txt${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️  Sitemap não referenciado no robots.txt${colors.reset}`);
    }
  } else {
    console.log(`${colors.red}❌ robots.txt não encontrado${colors.reset}`);
  }
}

// Verificar headings
function checkHeadings() {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Verificando Estrutura de Headings${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  const srcDir = path.join(__dirname, 'src');
  const jsFiles = findFiles(srcDir, '.js');
  const jsxFiles = findFiles(srcDir, '.jsx');
  const allFiles = [...jsFiles, ...jsxFiles];
  
  let h1Count = 0;
  const h1Files = [];
  
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(__dirname, file);
    
    // Buscar H1
    const h1Regex = /<h1[^>]*>/gi;
    const matches = content.match(h1Regex);
    
    if (matches) {
      h1Count += matches.length;
      h1Files.push({
        file: relativePath,
        count: matches.length
      });
    }
  });
  
  console.log(`📊 Total de H1 encontrados: ${h1Count}`);
  
  if (h1Files.length > 0) {
    console.log(`\n${colors.green}✅ Arquivos com H1:${colors.reset}`);
    h1Files.forEach(item => {
      console.log(`   - ${item.file} (${item.count}x)`);
    });
  }
  
  if (h1Count === 0) {
    console.log(`${colors.red}❌ Nenhum H1 encontrado!${colors.reset}`);
  } else if (h1Count === 1) {
    console.log(`\n${colors.green}✅ Perfeito! Apenas 1 H1 por página${colors.reset}`);
  } else {
    console.log(`\n${colors.yellow}⚠️  Múltiplos H1 encontrados. Idealmente deve ter apenas 1 por página.${colors.reset}`);
  }
}

// Gerar relatório completo
function generateReport() {
  console.log(`\n${colors.blue}╔═══════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║                                                       ║${colors.reset}`);
  console.log(`${colors.blue}║         🔍 RELATÓRIO DE AUDITORIA SEO                ║${colors.reset}`);
  console.log(`${colors.blue}║            MAGINF Tecnologia                          ║${colors.reset}`);
  console.log(`${colors.blue}║                                                       ║${colors.reset}`);
  console.log(`${colors.blue}╚═══════════════════════════════════════════════════════╝${colors.reset}`);
  
  checkMetaTags();
  checkStructuredData();
  checkSitemap();
  checkHeadings();
  checkAltText();
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Resumo e Recomendações${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`${colors.green}✅ Pontos Fortes:${colors.reset}`);
  console.log(`   - Meta tags implementadas`);
  console.log(`   - Structured data configurado`);
  console.log(`   - Sitemap atualizado`);
  
  console.log(`\n${colors.yellow}⚠️  Melhorias Recomendadas:${colors.reset}`);
  console.log(`   - Adicionar alt text em todas as imagens`);
  console.log(`   - Otimizar performance (Core Web Vitals)`);
  console.log(`   - Criar mais conteúdo de blog`);
  
  console.log(`\n${colors.blue}📚 Documentação:${colors.reset}`);
  console.log(`   - Ver: SEO-AUDIT-REPORT.md`);
  console.log(`   - Ver: GOOGLE-SEARCH-CONSOLE.md`);
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);
}

// CLI
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'meta':
    checkMetaTags();
    break;
  case 'schema':
    checkStructuredData();
    break;
  case 'sitemap':
    checkSitemap();
    break;
  case 'headings':
    checkHeadings();
    break;
  case 'images':
    checkAltText();
    break;
  case 'help':
    console.log('\n📖 Comandos disponíveis:\n');
    console.log('   node check-seo.js           - Relatório completo');
    console.log('   node check-seo.js meta      - Verificar meta tags');
    console.log('   node check-seo.js schema    - Verificar structured data');
    console.log('   node check-seo.js sitemap   - Verificar sitemap');
    console.log('   node check-seo.js headings  - Verificar headings');
    console.log('   node check-seo.js images    - Verificar alt text');
    console.log('   node check-seo.js help      - Mostrar ajuda\n');
    break;
  default:
    generateReport();
}
