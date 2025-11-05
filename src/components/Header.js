import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Configuração da imagem de fundo (opcional)
  const backgroundImages = {
    desktop: "/navbar-bg-desktop.jpg", // 2560x150px
    tablet: "/navbar-bg-tablet.jpg",   // 1024x120px  
    mobile: "/navbar-bg-mobile.jpg"    // 768x100px
  };
  const useBackgroundImage = false; // Mude para true para ativar a imagem de fundo
  const useGradientBackground = true; // Usar gradiente da identidade visual

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`shadow-lg fixed w-full top-0 z-50 backdrop-blur-md ${
      useBackgroundImage ? 'bg-cover bg-center bg-no-repeat' : 
      useGradientBackground ? 'bg-white/95' : 'bg-white'
    }`} style={useBackgroundImage ? {backgroundImage: `url(${backgroundImages.desktop})`} : {}}>
      {/* Overlay para melhorar legibilidade quando usar imagem de fundo */}
      {useBackgroundImage && (
        <div className="absolute inset-0 bg-white bg-opacity-60"></div>
      )}
      
      <div className="relative z-10">
        <div className="container-max">
        <div className="flex justify-between items-center py-8">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo-maginf-oficial.svg" 
              alt="MAGINF Tecnologia" 
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-maginf-gray hover:text-maginf-orange transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('servicos')}
              className="text-maginf-gray hover:text-maginf-orange transition-colors"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('planos')}
              className="text-maginf-gray hover:text-maginf-orange transition-colors"
            >
              Planos
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-maginf-gray hover:text-maginf-orange transition-colors"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-maginf-gray hover:text-maginf-orange transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="https://maginf.tomticket.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-maginf-gray hover:bg-maginf-gray-dark text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Área de Cliente
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <button 
              onClick={() => scrollToSection('contato')}
              className="btn-primary"
            >
              Fale com um consultor
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-maginf-gray"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="block w-full text-left px-4 py-2 text-maginf-gray hover:text-maginf-orange transition-colors"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('servicos')}
                className="block w-full text-left px-4 py-2 text-maginf-gray hover:text-maginf-orange transition-colors"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('planos')}
                className="block w-full text-left px-4 py-2 text-maginf-gray hover:text-maginf-orange transition-colors"
              >
                Planos
              </button>
              <button 
                onClick={() => scrollToSection('sobre')}
                className="block w-full text-left px-4 py-2 text-maginf-gray hover:text-maginf-orange transition-colors"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="block w-full text-left px-4 py-2 text-maginf-gray hover:text-maginf-orange transition-colors"
              >
                Contato
              </button>
              <div className="px-4 pt-2 space-y-3">
                <a 
                  href="https://maginf.tomticket.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-maginf-gray hover:bg-maginf-gray-dark text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 w-full flex items-center justify-center gap-2"
                >
                  Área de Cliente
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button 
                  onClick={() => scrollToSection('contato')}
                  className="btn-primary w-full justify-center"
                >
                  Fale com um consultor
                </button>
              </div>
            </nav>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
