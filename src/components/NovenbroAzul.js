import React, { useState, useEffect } from 'react';
import { Shield, X, ExternalLink, Heart, Users, Award, Stethoscope } from 'lucide-react';

const NovenbroAzul = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIcon, setCurrentIcon] = useState(0);
  
  const icons = [Shield, Heart, Users, Award, Stethoscope];
  const messages = [
    "Prevenção salva vidas",
    "Cuidado é masculinidade",
    "Juntos somos mais fortes",
    "Sua saúde é prioridade",
    "Diagnóstico precoce é vida"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const CurrentIcon = icons[currentIcon];

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-600 to-cyan-600 text-white py-4 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Icons */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(15)].map((_, i) => {
            const IconComponent = icons[i % icons.length];
            return (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 13) % 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + (i % 3)}s`
                }}
              >
                <IconComponent className="h-8 w-8" />
              </div>
            );
          })}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-600/20"></div>
        
        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-60">
          <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
      
      <div className="container-max relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Animated Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/30 rounded-full animate-ping"></div>
              <div className="relative bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <CurrentIcon className="h-6 w-6 text-blue-100 transition-all duration-500" />
              </div>
            </div>
            
            <div className="text-sm md:text-base">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                <span className="font-bold text-lg bg-gradient-to-r from-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  Novembro Azul 2025
                </span>
                <span className="hidden md:inline text-blue-100">•</span>
                <span className="text-blue-200 font-medium">
                  {messages[currentIcon]}
                </span>
              </div>
              <div className="text-xs md:text-sm text-blue-300 mt-1">
                A MAGINF apoia a conscientização sobre o câncer de próstata 💙
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Statistics */}
            <div className="hidden lg:flex items-center space-x-4 text-xs text-blue-200">
              <div className="text-center">
                <div className="font-bold text-white">90%+</div>
                <div>Taxa de cura</div>
              </div>
              <div className="w-px h-8 bg-blue-400/50"></div>
              <div className="text-center">
                <div className="font-bold text-white">45+</div>
                <div>Idade ideal</div>
              </div>
            </div>
            
            <a 
              href="https://www.inca.gov.br/tipos-de-cancer/cancer-de-prostata"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-white/20 to-blue-200/20 hover:from-white/30 hover:to-blue-200/30 px-4 py-2 rounded-full text-sm transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <Stethoscope className="h-4 w-4" />
              <span>Saiba mais</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="bg-white/20 hover:bg-red-500/30 p-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 group"
              aria-label="Fechar banner"
            >
              <X className="h-4 w-4 group-hover:text-red-200" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NovenbroAzul;
