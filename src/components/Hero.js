import React from 'react';
import { ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { IMAGES } from '../config/imageConfig';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="inicio" 
      className="relative bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white section-padding pt-32 overflow-hidden"
    >
      
      {/* Content */}
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">MAGINF</span><span className="text-maginf-orange">TECNOLOGIA</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300">
                Soluções de TI completas para empresas — suporte técnico, infraestrutura, segurança e serviços gerenciados (MSP).
              </p>
              <p className="text-lg text-gray-400">
                Suporte local e gestão remota de TI com foco em disponibilidade, segurança e custo previsível.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contato')}
                className="btn-primary text-lg px-8 py-4"
              >
                Fale com um consultor
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('planos')}
                className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-maginf-gray"
              >
                Planos e preços
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-600">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="h-8 w-8 text-maginf-orange" />
                </div>
                <div className="text-2xl font-bold">8+</div>
                <div className="text-sm text-gray-400">Anos de experiência</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-maginf-orange" />
                </div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-gray-400">Monitoramento</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-maginf-orange" />
                </div>
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm text-gray-400">Clientes atendidos</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-gradient-to-br from-maginf-orange to-maginf-orange-dark rounded-2xl p-8 shadow-2xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Sistema de monitoramento ativo</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Servidores online</span>
                    <span className="text-green-400">98/100</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full w-[98%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Backup status</span>
                    <span className="text-green-400">Concluído</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-300 pt-2">
                  Última atualização: há 2 minutos
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-maginf-orange rounded-full p-4 shadow-lg animate-bounce">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
              <Clock className="h-6 w-6 text-maginf-orange" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
