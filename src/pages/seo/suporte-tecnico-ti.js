import React from 'react';
import AdvancedSEO from '../components/SEO/AdvancedSEO';
import { organizationSchema, serviceSchema } from '../components/SEO/structuredData';

const suportetecnicotiPage = () => {
  const structuredData = [organizationSchema, serviceSchema];
  
  return (
    <>
      <AdvancedSEO
        title="Suporte Técnico TI Especializado - MAGINF"
        description="Descrição otimizada para SEO com palavras-chave estratégicas"
        structuredData={structuredData}
      />
      <div>
        <h1>Suporte Técnico TI Especializado - MAGINF</h1>
        <p>Conteúdo otimizado para SEO...</p>
      </div>
    </>
  );
};

export default suportetecnicotiPage;