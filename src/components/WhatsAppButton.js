import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Número do WhatsApp da MAGINF (formato internacional: +55 11 4610-6363)
  const whatsappNumber = '551146106363';
  const message = 'Olá! Gostaria de saber mais sobre os serviços da MAGINF.';

  useEffect(() => {
    // Mostrar botão após rolar um pouco
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {/* Tooltip/Message Bubble */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 animate-fadeIn">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
            <div className="flex items-start gap-3">
              <div className="bg-green-500 p-2 rounded-full flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Fale Conosco!</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Tire suas dúvidas sobre nossos serviços de TI.
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors w-full"
                >
                  Iniciar Conversa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group relative"
          aria-label="WhatsApp"
        >
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
          
          {/* Icon */}
          <MessageCircle className="h-7 w-7 relative z-10" />
          
          {/* Badge de notificação */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            1
          </span>
        </button>
      </div>
    </>
  );
};

export default WhatsAppButton;
