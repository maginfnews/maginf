import Head from 'next/head';

const SEO = ({
  title = 'MAGINF Tecnologia - Soluções de TI e Serviços Gerenciados (MSP)',
  description = 'Serviços gerenciados de TI (MSP), infraestrutura em nuvem, CFTV, suporte 24/7 e soluções completas para empresas. Mais de 8 anos de experiência em tecnologia.',
  keywords = 'MSP, serviços gerenciados, TI, suporte técnico, infraestrutura, cloud, CFTV, backup, segurança, Microsoft 365, AWS, Azure',
  ogImage = 'https://maginf.com.br/logo-maginf-oficial.svg',
  ogUrl = 'https://maginf.com.br',
  canonical = 'https://maginf.com.br'
}) => {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="MAGINF Tecnologia" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Portuguese" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="MAGINF Tecnologia" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />

      {/* Theme Color */}
      <meta name="theme-color" content="#FF6B35" />
      <meta name="msapplication-TileColor" content="#FF6B35" />

      {/* Additional SEO */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />

      {/* Geo Tags */}
      <meta name="geo.region" content="BR-SP" />
      <meta name="geo.placename" content="Guarulhos" />
      <meta name="geo.position" content="-23.4538;-46.5333" />
      <meta name="ICBM" content="-23.4538, -46.5333" />

      {/* Business Info */}
      <meta name="contact" content="sac@maginf.com.br" />
      <meta name="phone" content="+55-11-4610-6363" />
    </Head>
  );
};

export default SEO;
