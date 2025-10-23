// Gerador de sitemap dinâmico

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://maginf.com.br';

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/servicos', priority: '0.9', changefreq: 'weekly' },
  { url: '/planos', priority: '0.9', changefreq: 'monthly' },
  { url: '/sobre', priority: '0.8', changefreq: 'monthly' },
  { url: '/contato', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.7', changefreq: 'daily' },
  { url: '/suporte-tecnico-ti', priority: '0.9', changefreq: 'weekly' },
  { url: '/msp-brasil', priority: '0.9', changefreq: 'weekly' },
  { url: '/backup-nuvem', priority: '0.8', changefreq: 'weekly' },
  { url: '/monitoramento-ti', priority: '0.8', changefreq: 'weekly' }
];

const blogPosts = [
  { url: '/blog/como-escolher-msp-brasil', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/backup-nuvem-vs-local', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/monitoramento-proativo-ti', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/seguranca-dados-empresas', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/infraestrutura-ti-pequenas-empresas', priority: '0.7', changefreq: 'monthly' }
];

function generateSitemap() {
  const allPages = [...staticPages, ...blogPosts];
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  allPages.forEach(page => {
    sitemap += `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;
  
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('✅ Sitemap XML gerado com sucesso!');
  
  // Gerar sitemap index se necessário
  generateSitemapIndex();
}

function generateSitemapIndex() {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap-index.xml'), sitemapIndex);
  console.log('✅ Sitemap Index gerado!');
}

// Executar geração
generateSitemap();

module.exports = { generateSitemap };