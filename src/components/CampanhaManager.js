import React from 'react';
import NovenbroAzul from './NovenbroAzul';
import CampanhaNatal from './CampanhaNatal';
import JaneiroBranco from './JaneiroBranco';

/**
 * Gerenciador de Campanhas Sazonais
 * 
 * Para ativar/desativar campanhas, altere os valores abaixo:
 * - true = campanha ativa
 * - false = campanha desativada
 */

const CAMPANHAS_ATIVAS = {
  janeiroBranco: true,  // Campanha Janeiro Branco
  novenbroAzul: false,  // Campanha Novembro Azul (DESATIVADA)
  natal: false,         // Campanha de Natal (DESATIVADA)
};

const CampanhaManager = () => {
  return (
    <div className="mt-28 md:mt-32 lg:mt-36">
      {CAMPANHAS_ATIVAS.janeiroBranco && <JaneiroBranco />}
      {CAMPANHAS_ATIVAS.novenbroAzul && <NovenbroAzul />}
      {CAMPANHAS_ATIVAS.natal && <CampanhaNatal />}
    </div>
  );
};

export default CampanhaManager;
