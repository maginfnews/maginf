import React from 'react';
import AdvancedSEO from '../components/SEO/AdvancedSEO';
import { organizationSchema, serviceSchema } from '../components/SEO/structuredData';

const backupnuvemPage = () => {
  const structuredData = [organizationSchema, serviceSchema];
  
  return (
    <>
      <AdvancedSEO
        title="Backup em Nuvem Seguro e Confiável"
        description="Descrição otimizada para SEO com palavras-chave estratégicas"
        structuredData={structuredData}
      />
      <div>
        <h1>Backup em Nuvem Seguro e Confiável</h1>
        <p>Conteúdo otimizado para SEO...</p>
      </div>
    </>
  );
};

export default backupnuvemPage;