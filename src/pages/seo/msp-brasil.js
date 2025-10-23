import React from 'react';
import AdvancedSEO from '../components/SEO/AdvancedSEO';
import { organizationSchema, serviceSchema } from '../components/SEO/structuredData';

const mspbrasilPage = () => {
  const structuredData = [organizationSchema, serviceSchema];
  
  return (
    <>
      <AdvancedSEO
        title="MSP Brasil - Managed Service Provider Líder"
        description="Descrição otimizada para SEO com palavras-chave estratégicas"
        structuredData={structuredData}
      />
      <div>
        <h1>MSP Brasil - Managed Service Provider Líder</h1>
        <p>Conteúdo otimizado para SEO...</p>
      </div>
    </>
  );
};

export default mspbrasilPage;