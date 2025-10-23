import React from 'react';
import Head from 'next/head';

const AdvancedSEO = ({
  title = "MAGINF Tecnologia - Suporte Técnico TI e MSP no Brasil",
  description = "Líder em suporte técnico de TI, MSP, backup em nuvem e monitoramento 24/7. Soluções completas para sua empresa com 99.9% de uptime garantido.",
  keywords = "suporte técnico TI, MSP Brasil, backup nuvem, monitoramento TI, MAGINF tecnologia, suporte informática, infraestrutura TI",
  canonical,
  ogImage = "/images/maginf-og-image.jpg",
  ogType = "website",
  structuredData,
  noindex = false,
  nofollow = false
}) => {
  const fullTitle = title.includes('MAGINF') ? title : `${title} | MAGINF Tecnologia`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://maginf.com.br';
  
  return (
    <Head>
      {/* Título otimizado */}
      <title>{fullTitle}</title>
      
      {/* Meta tags essenciais */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical || currentUrl} />
      <meta property="og:site_name" content="MAGINF Tecnologia" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@maginf" />
      
      {/* Dados estruturados */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Meta tags técnicas */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Portuguese" />
      <meta name="author" content="MAGINF Tecnologia" />
      <meta name="copyright" content="MAGINF Tecnologia" />
      
      {/* Geo targeting */}
      <meta name="geo.region" content="BR" />
      <meta name="geo.placename" content="Brasil" />
      
      {/* Preload recursos críticos */}
      <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="" />
      <link rel="preload" href="/images/logo-maginf.svg" as="image" />
      
      {/* DNS prefetch para recursos externos */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Favicon otimizado */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme color */}
      <meta name="theme-color" content="#e35300" />
      <meta name="msapplication-TileColor" content="#e35300" />
    </Head>
  );
};

export default AdvancedSEO;