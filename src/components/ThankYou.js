import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const ThankYou = () => {
  useEffect(() => {
    // Rolar para o topo da página
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maginf-orange/10 to-maginf-gray/10 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {/* Ícone de sucesso */}
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        
        {/* Título */}
        <h1 className="text-2xl font-bold text-maginf-gray mb-4">
          Mensagem Enviada!
        </h1>
        
        {/* Mensagem */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Obrigado por entrar em contato conosco! Sua mensagem foi enviada com sucesso 
          e nossa equipe responderá em breve.
        </p>
        
        {/* Informações adicionais */}
        <div className="bg-maginf-orange/5 rounded-lg p-4 mb-6">
          <p className="text-sm text-maginf-gray">
            <strong>Tempo de resposta:</strong> Até 24 horas<br />
            <strong>Horário comercial:</strong> Seg-Sex, 8h às 18h
          </p>
        </div>
        
        {/* Botão voltar */}
        <button 
          onClick={handleBackToHome}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Voltar ao site
        </button>
        
        {/* Informações de contato */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            Precisa de ajuda urgente?
          </p>
          <div className="space-y-1">
            <p className="text-sm text-maginf-gray">
              <strong>E-mail:</strong> sac@maginf.com.br
            </p>
            <p className="text-sm text-maginf-gray">
              <strong>Telefone:</strong> (11) 9999-9999
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
