import React from 'react';
import NovenbroAzul from './NovenbroAzul';
import CampanhaNatal from './CampanhaNatal';

/**
 * Gerenciador de Campanhas Sazonais
 * 
 * Para ativar/desativar campanhas, altere os valores abaixo:
 * - true = campanha ativa
 * - false = campanha desativada
 */

const CAMPANHAS_ATIVAS = {
  novenbroAzul: true,  // Campanha Novembro Azul
  natal: true,         // Campanha de Natal
};

const CampanhaManager = () => {
  return (
    <div className="mt-28 md:mt-32 lg:mt-36">
      {CAMPANHAS_ATIVAS.novenbroAzul && <NovenbroAzul />}
      {CAMPANHAS_ATIVAS.natal && <CampanhaNatal />}
    </div>
  );
};

export default CampanhaManager;
