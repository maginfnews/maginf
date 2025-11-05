import Head from 'next/head';

const SchemaMarkup = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MAGINF Tecnologia",
    "url": "https://maginf.com.br",
    "logo": "https://maginf.com.br/logo-maginf-oficial.svg",
    "description": "Serviços gerenciados de TI (MSP), infraestrutura em nuvem, CFTV, suporte 24/7 e soluções completas para empresas.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Carmela Antónia Fanganiello Cecchinato, 301",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "postalCode": "07000-000",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-4610-6363",
      "contactType": "customer service",
      "email": "sac@maginf.com.br",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.linkedin.com/company/maginf",
      "https://www.facebook.com/maginf",
      "https://www.instagram.com/maginf"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MAGINF Tecnologia",
    "image": "https://maginf.com.br/logo-maginf-oficial.svg",
    "@id": "https://maginf.com.br",
    "url": "https://maginf.com.br",
    "telephone": "+55-11-4610-6363",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Carmela Antónia Fanganiello Cecchinato, 301",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "postalCode": "07000-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.4538,
      "longitude": -46.5333
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:30",
      "closes": "17:30"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Managed IT Services (MSP)",
    "provider": {
      "@type": "Organization",
      "name": "MAGINF Tecnologia"
    },
    "areaServed": {
      "@type": "State",
      "name": "São Paulo"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de TI",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Serviços Gerenciados (MSP)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Infraestrutura e Cloud"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CFTV e Segurança"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Suporte Técnico 24/7"
          }
        }
      ]
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </Head>
  );
};

export default SchemaMarkup;
