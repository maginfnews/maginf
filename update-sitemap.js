/**
 * Script para Atualizar Sitemap Automaticamente
 * MAGINF Tecnologia
 * 
 * Uso: node update-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuração
const SITE_URL = 'https://maginf.com.br';
const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');
const SITEMAP_INDEX_PATH = path.join(__dirname, 'public', 'sitemap-index.xml');

// Data atual no formato YYYY-MM-DD
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Estrutura de URLs do site
const urls = [
  // Página Principal
  {
    loc: '/',
    changefreq: 'weekly',
    priority: '1.0',
    comment: 'Página Principal'
  },
  
  // Páginas Principais
  {
    loc: '/servicos',
    changefreq: 'weekly',
    priority: '0.9',
    comment: 'Páginas Principais'
  },
  {
    loc: '/planos',
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/sobre',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/contato',
    changefreq: 'monthly',
    priority: '0.8'
  },
  
  // Blog
  {
    loc: '/blog',
    changefreq: 'daily',
    priority: '0.7',
    comment: 'Blog'
  },
  
  // Páginas de Serviços SEO
  {
    loc: '/suporte-tecnico-ti',
    changefreq: 'weekly',
    priority: '0.9',
    comment: 'Páginas de Serviços SEO'
  },
  {
    loc: '/msp-brasil',
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    loc: '/backup-nuvem',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    loc: '/monitoramento-ti',
    changefreq: 'weekly',
    priority: '0.8'
  },
  
  // Artigos do Blog
  {
    loc: '/blog/como-escolher-msp-brasil',
    changefreq: 'monthly',
    priority: '0.7',
    comment: 'Artigos do Blog'
  },
  {
    loc: '/blog/backup-nuvem-vs-local',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: '/blog/monitoramento-proativo-ti',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: '/blog/seguranca-dados-empresas',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: '/blog/infraestrutura-ti-pequenas-empresas',
    changefreq: 'monthly',
    priority: '0.7'
  },
  
  // Páginas Legais
  {
    loc: '/privacidade',
    changefreq: 'yearly',
    priority: '0.3',
    comment: 'Páginas Legais'
  },
  {
    loc: '/termos',
    changefreq: 'yearly',
    priority: '0.3'
  }
];

/**
 * Gera o XML do sitemap
 */
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  let lastComment = null;
  
  urls.forEach(url => {
    // Adicionar comentário se for uma nova seção
    if (url.comment && url.comment !== lastComment) {
      xml += `  <!-- ${url.comment} -->\n`;
      lastComment = url.comment;
    }
    
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${url.loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
    
    // Adicionar linha em branco após cada seção
    if (url.comment) {
      xml += '  \n';
    }
  });
  
  xml += '</urlset>';
  
  return xml;
};

/**
 * Gera o XML do sitemap index
 */
const generateSitemapIndex = () => {
  const currentDate = getCurrentDate();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += '  <sitemap>\n';
  xml += `    <loc>${SITE_URL}/sitemap.xml</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '  </sitemap>\n';
  xml += '</sitemapindex>';
  
  return xml;
};

/**
 * Salva o sitemap no arquivo
 */
const saveSitemap = () => {
  try {
    // Gerar e salvar sitemap principal
    const sitemapXml = generateSitemap();
    fs.writeFileSync(SITEMAP_PATH, sitemapXml, 'utf8');
    console.log('✅ Sitemap principal atualizado:', SITEMAP_PATH);
    
    // Gerar e salvar sitemap index
    const sitemapIndexXml = generateSitemapIndex();
    fs.writeFileSync(SITEMAP_INDEX_PATH, sitemapIndexXml, 'utf8');
    console.log('✅ Sitemap index atualizado:', SITEMAP_INDEX_PATH);
    
    // Estatísticas
    console.log('\n📊 Estatísticas:');
    console.log(`   - Total de URLs: ${urls.length}`);
    console.log(`   - Data de atualização: ${getCurrentDate()}`);
    console.log(`   - URL do sitemap: ${SITE_URL}/sitemap.xml`);
    
    // Próximos passos
    console.log('\n🚀 Próximos passos:');
    console.log('   1. Verifique os arquivos gerados em /public');
    console.log('   2. Faça commit das alterações');
    console.log('   3. Faça deploy para produção');
    console.log('   4. Reenvie o sitemap no Google Search Console');
    console.log('\n   URL do Search Console:');
    console.log('   https://search.google.com/search-console\n');
    
  } catch (error) {
    console.error('❌ Erro ao salvar sitemap:', error.message);
    process.exit(1);
  }
};

/**
 * Adiciona uma nova URL ao sitemap
 */
const addUrl = (loc, changefreq = 'monthly', priority = '0.7', comment = null) => {
  urls.push({ loc, changefreq, priority, comment });
  console.log(`✅ URL adicionada: ${loc}`);
};

/**
 * Remove uma URL do sitemap
 */
const removeUrl = (loc) => {
  const index = urls.findIndex(url => url.loc === loc);
  if (index !== -1) {
    urls.splice(index, 1);
    console.log(`✅ URL removida: ${loc}`);
  } else {
    console.log(`⚠️  URL não encontrada: ${loc}`);
  }
};

/**
 * Lista todas as URLs do sitemap
 */
const listUrls = () => {
  console.log('\n📋 URLs no sitemap:\n');
  urls.forEach((url, index) => {
    if (url.comment) {
      console.log(`\n   ${url.comment}:`);
    }
    console.log(`   ${index + 1}. ${url.loc} (prioridade: ${url.priority})`);
  });
  console.log(`\n   Total: ${urls.length} URLs\n`);
};

/**
 * Valida o sitemap
 */
const validateSitemap = () => {
  console.log('\n🔍 Validando sitemap...\n');
  
  let errors = 0;
  
  // Verificar URLs duplicadas
  const duplicates = urls.filter((url, index) => 
    urls.findIndex(u => u.loc === url.loc) !== index
  );
  
  if (duplicates.length > 0) {
    console.log('❌ URLs duplicadas encontradas:');
    duplicates.forEach(url => console.log(`   - ${url.loc}`));
    errors++;
  }
  
  // Verificar prioridades válidas
  const invalidPriorities = urls.filter(url => {
    const priority = parseFloat(url.priority);
    return priority < 0 || priority > 1;
  });
  
  if (invalidPriorities.length > 0) {
    console.log('❌ Prioridades inválidas (devem estar entre 0.0 e 1.0):');
    invalidPriorities.forEach(url => 
      console.log(`   - ${url.loc}: ${url.priority}`)
    );
    errors++;
  }
  
  // Verificar changefreq válidos
  const validChangefreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  const invalidChangefreqs = urls.filter(url => 
    !validChangefreqs.includes(url.changefreq)
  );
  
  if (invalidChangefreqs.length > 0) {
    console.log('❌ Frequências de mudança inválidas:');
    invalidChangefreqs.forEach(url => 
      console.log(`   - ${url.loc}: ${url.changefreq}`)
    );
    errors++;
  }
  
  if (errors === 0) {
    console.log('✅ Sitemap válido! Nenhum erro encontrado.\n');
  } else {
    console.log(`\n❌ ${errors} erro(s) encontrado(s). Corrija antes de gerar o sitemap.\n`);
    process.exit(1);
  }
};

// CLI
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'add':
    if (args.length < 2) {
      console.log('Uso: node update-sitemap.js add <url> [changefreq] [priority] [comment]');
      console.log('Exemplo: node update-sitemap.js add /nova-pagina monthly 0.8 "Nova Seção"');
      process.exit(1);
    }
    addUrl(args[1], args[2] || 'monthly', args[3] || '0.7', args[4] || null);
    saveSitemap();
    break;
    
  case 'remove':
    if (args.length < 2) {
      console.log('Uso: node update-sitemap.js remove <url>');
      console.log('Exemplo: node update-sitemap.js remove /pagina-antiga');
      process.exit(1);
    }
    removeUrl(args[1]);
    saveSitemap();
    break;
    
  case 'list':
    listUrls();
    break;
    
  case 'validate':
    validateSitemap();
    break;
    
  case 'help':
    console.log('\n📖 Comandos disponíveis:\n');
    console.log('   node update-sitemap.js           - Atualiza o sitemap com a data atual');
    console.log('   node update-sitemap.js add       - Adiciona uma nova URL');
    console.log('   node update-sitemap.js remove    - Remove uma URL');
    console.log('   node update-sitemap.js list      - Lista todas as URLs');
    console.log('   node update-sitemap.js validate  - Valida o sitemap');
    console.log('   node update-sitemap.js help      - Mostra esta ajuda\n');
    break;
    
  default:
    // Comando padrão: atualizar sitemap
    validateSitemap();
    saveSitemap();
}
