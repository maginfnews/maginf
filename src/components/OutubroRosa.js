import React, { useState } from 'react';
import { Heart, X, ExternalLink } from 'lucide-react';

const OutubroRosa = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="flex space-x-8 animate-pulse">
          {[...Array(20)].map((_, i) => (
            <Heart key={i} className="h-6 w-6" />
          ))}
        </div>
      </div>
      
      <div className="container-max relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="h-5 w-5 text-pink-200 animate-pulse" />
            <div className="text-sm md:text-base">
              <span className="font-semibold">Outubro Rosa 2025</span>
              <span className="hidden md:inline"> - A MAGINF apoia a conscientização sobre o câncer de mama. </span>
              <span className="font-medium">Cuide-se, previna-se! 💗</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <a 
              href="https://www.inca.gov.br/campanhas/outubro-rosa"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition-colors"
            >
              <span>Saiba mais</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="bg-white/20 hover:bg-white/30 p-1 rounded-full transition-colors"
              aria-label="Fechar banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutubroRosa;
