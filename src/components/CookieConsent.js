import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Shield } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Sempre true, não pode ser desabilitado
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem('maginf-cookie-consent');
    if (!consent) {
      // Mostrar banner após 2 segundos
      setTimeout(() => setShowBanner(true), 2000);
    } else {
      // Carregar preferências salvas
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('maginf-cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    
    // Ativar scripts baseado nas preferências
    activateScripts(allAccepted);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('maginf-cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
    
    // Ativar scripts baseado nas preferências
    activateScripts(preferences);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('maginf-cookie-consent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
    
    // Ativar apenas scripts necessários
    activateScripts(onlyNecessary);
  };

  const loadGoogleAnalytics = () => {
    // Carregar Google Analytics dinamicamente
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);
    
    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  };

  const activateScripts = (prefs) => {
    // Google Analytics
    if (prefs.analytics) {
      // Verificar se gtag existe, se não, carregar
      if (typeof window.gtag === 'function') {
        window.gtag('config', 'G-XXXXXXXXXX');
      } else {
        console.log('Carregando Google Analytics...');
        loadGoogleAnalytics();
      }
    }
    
    // Scripts de marketing (Facebook Pixel, etc.)
    if (prefs.marketing) {
      // Ativar pixels de marketing
    }
    
    // Scripts funcionais (Chat, etc.)
    if (prefs.functional) {
      // Ativar chat e outras funcionalidades
    }
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Não pode ser desabilitado
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Banner Principal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-maginf-orange shadow-2xl z-50 p-6">
        <div className="container-max">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Cookie className="h-8 w-8 text-maginf-orange" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🍪 Utilizamos cookies para melhorar sua experiência
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Utilizamos cookies essenciais e tecnologias similares de acordo com nossa{' '}
                <button className="text-maginf-orange hover:underline font-medium">
                  Política de Privacidade
                </button>
                . Você pode escolher quais categorias deseja permitir. Cookies necessários são sempre ativos.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="bg-maginf-orange text-white px-6 py-2 rounded-lg hover:bg-maginf-orange-dark transition-colors font-medium"
                >
                  Aceitar todos
                </button>
                
                <button
                  onClick={handleRejectAll}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Apenas necessários
                </button>
                
                <button
                  onClick={() => setShowSettings(true)}
                  className="bg-white text-maginf-orange border-2 border-maginf-orange px-6 py-2 rounded-lg hover:bg-maginf-orange hover:text-white transition-colors font-medium flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Personalizar
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShowBanner(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Configurações */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-maginf-orange" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Configurações de Privacidade
                  </h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-gray-600">
                Escolha quais tipos de cookies você deseja permitir. Você pode alterar essas configurações a qualquer momento.
              </p>
              
              {/* Cookies Necessários */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Cookies Necessários</h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Sempre ativo
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Essenciais para o funcionamento básico do site. Incluem navegação, acesso a áreas seguras e funcionalidades básicas.
                </p>
              </div>
              
              {/* Cookies de Analytics */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Cookies de Análise</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maginf-orange"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Ajudam-nos a entender como os visitantes interagem com o site, coletando informações de forma anônima.
                </p>
              </div>
              
              {/* Cookies de Marketing */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Cookies de Marketing</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maginf-orange"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Utilizados para exibir anúncios relevantes e medir a eficácia de campanhas publicitárias.
                </p>
              </div>
              
              {/* Cookies Funcionais */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Cookies Funcionais</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => togglePreference('functional')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maginf-orange"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Permitem funcionalidades aprimoradas como chat online, vídeos incorporados e personalização de conteúdo.
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="bg-maginf-orange text-white px-6 py-2 rounded-lg hover:bg-maginf-orange-dark transition-colors font-medium"
                >
                  Salvar preferências
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
