// Dados estruturados para SEO (Schema.org)

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MAGINF Tecnologia",
  "alternateName": "MAGINF",
  "url": "https://maginf.com.br",
  "logo": "https://maginf.com.br/images/logo-maginf.svg",
  "description": "Líder em suporte técnico de TI, MSP, backup em nuvem e monitoramento 24/7 no Brasil",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua da Tecnologia, 123",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "01000-000",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-99999-9999",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  },
  "sameAs": [
    "https://www.linkedin.com/company/maginf",
    "https://www.facebook.com/maginf",
    "https://www.instagram.com/maginf"
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "Brasil"
  }
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Suporte Técnico TI MSP",
  "description": "Serviços completos de MSP (Managed Service Provider) com suporte técnico 24/7, backup em nuvem e monitoramento proativo",
  "provider": {
    "@type": "Organization",
    "name": "MAGINF Tecnologia"
  },
  "serviceType": "Managed IT Services",
  "areaServed": "Brasil",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços de TI",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Suporte Técnico MSP",
          "description": "Suporte técnico completo para infraestrutura de TI"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Backup em Nuvem",
          "description": "Solução completa de backup automatizado na nuvem"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Monitoramento 24/7",
          "description": "Monitoramento contínuo da infraestrutura de TI"
        }
      }
    ]
  }
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MAGINF Tecnologia",
  "image": "https://maginf.com.br/images/logo-maginf.svg",
  "telephone": "+55-11-99999-9999",
  "email": "contato@maginf.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua da Tecnologia, 123",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "01000-000",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "url": "https://maginf.com.br",
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ]
};