import React from 'react';
import NovenbroAzul from './NovenbroAzul';
import CampanhaNatal from './CampanhaNatal';
import JaneiroBranco from './JaneiroBranco';
import CarnavalBrasil from './CarnavalBrasil';
import DiaDasMulheres from './DiaDasMulheres';

/**
 * Gerenciador de Campanhas Sazonais
 * 
 * Para ativar/desativar campanhas, altere os valores abaixo:
 * - true = campanha ativa
 * - false = campanha desativada
 */

const CAMPANHAS_ATIVAS = {
  diaDasMulheres: true,   // Dia Internacional da Mulher - 8 de Março
  carnavalBrasil: false,  // Campanha Carnaval Brasil (DESATIVADA)
  janeiroBranco: false,  // Campanha Janeiro Branco (DESATIVADA)
  novenbroAzul: false,   // Campanha Novembro Azul (DESATIVADA)
  natal: false,          // Campanha de Natal (DESATIVADA)
};

const CampanhaManager = () => {
  return (
    <div className="mt-28 md:mt-32 lg:mt-36">
      {CAMPANHAS_ATIVAS.diaDasMulheres && <DiaDasMulheres />}
      {CAMPANHAS_ATIVAS.carnavalBrasil && <CarnavalBrasil />}
      {CAMPANHAS_ATIVAS.janeiroBranco && <JaneiroBranco />}
      {CAMPANHAS_ATIVAS.novenbroAzul && <NovenbroAzul />}
      {CAMPANHAS_ATIVAS.natal && <CampanhaNatal />}
    </div>
  );
};

export default CampanhaManager;
