import React, { useState, useEffect } from 'react';
import { Gift, X, ExternalLink, Sparkles, Star, TreePine, Heart, Snowflake } from 'lucide-react';

const CampanhaNatal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIcon, setCurrentIcon] = useState(0);
  
  const icons = [Gift, Sparkles, Star, TreePine, Heart, Snowflake];
  const messages = [
    "Feliz Natal e Próspero 2026!",
    "Tecnologia que conecta pessoas",
    "Gratidão por confiar em nós",
    "Juntos construímos o futuro",
    "Inovação com propósito",
    "Sucesso e prosperidade"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [icons.length]);

  if (!isVisible) return null;

  const CurrentIcon = icons[currentIcon];

  return (
    <div className="bg-gradient-to-r from-red-700 via-green-700 to-red-700 text-white py-4 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Icons */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => {
            const IconComponent = icons[i % icons.length];
            return (
              <div
                key={i}
                className="absolute animate-float-christmas"
                style={{
                  left: `${(i * 5) % 100}%`,
                  top: `${(i * 7) % 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${5 + (i % 4)}s`
                }}
              >
                <IconComponent className="h-6 w-6" />
              </div>
            );
          })}
        </div>
        
        {/* Snowflakes Effect */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={`snow-${i}`}
              className="absolute animate-snowfall"
              style={{
                left: `${(i * 3.3) % 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${8 + (i % 5)}s`,
                fontSize: `${8 + (i % 8)}px`,
                opacity: 0.6
              }}
            >
              ❄
            </div>
          ))}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-green-600/20"></div>
        
        {/* Animated Lights */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-red-400 opacity-60">
          <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
        </div>
      </div>
      
      <div className="container-max relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Animated Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-300/40 rounded-full animate-ping"></div>
              <div className="relative bg-white/20 p-2 rounded-full backdrop-blur-sm border-2 border-yellow-300/50">
                <CurrentIcon className="h-6 w-6 text-yellow-100 transition-all duration-500" />
              </div>
            </div>
            
            <div className="text-sm md:text-base">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                <span className="font-bold text-lg bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent animate-pulse">
                  🎄 Feliz Natal 2025 🎅
                </span>
                <span className="hidden md:inline text-yellow-200">•</span>
                <span className="text-green-100 font-medium">
                  {messages[currentIcon]}
                </span>
              </div>
              <div className="text-xs md:text-sm text-yellow-200 mt-1">
                A MAGINF deseja um Natal repleto de paz, amor e tecnologia! 🎁✨
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Holiday Stats */}
            <div className="hidden lg:flex items-center space-x-4 text-xs text-green-100">
              <div className="text-center">
                <div className="font-bold text-yellow-200">2025</div>
                <div>Ano de conquistas</div>
              </div>
              <div className="w-px h-8 bg-yellow-300/50"></div>
              <div className="text-center">
                <div className="font-bold text-yellow-200">2026</div>
                <div>Novos desafios</div>
              </div>
            </div>
            
            <a 
              href="mailto:sac@maginf.com.br"
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-white/20 to-yellow-200/20 hover:from-white/30 hover:to-yellow-200/30 px-4 py-2 rounded-full text-sm transition-all duration-300 backdrop-blur-sm border border-yellow-300/30"
            >
              <Gift className="h-4 w-4" />
              <span>Fale conosco</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="bg-white/20 hover:bg-red-500/40 p-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 group"
              aria-label="Fechar banner"
            >
              <X className="h-4 w-4 group-hover:text-red-200" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float-christmas {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          33% { 
            transform: translateY(-15px) rotate(120deg) scale(1.1); 
          }
          66% { 
            transform: translateY(-25px) rotate(240deg) scale(0.9); 
          }
        }
        @keyframes snowfall {
          0% { 
            transform: translateY(-10px) translateX(0); 
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% { 
            transform: translateY(100vh) translateX(20px); 
            opacity: 0;
          }
        }
        .animate-float-christmas {
          animation: float-christmas 6s ease-in-out infinite;
        }
        .animate-snowfall {
          animation: snowfall 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CampanhaNatal;
