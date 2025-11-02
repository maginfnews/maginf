'use client';

import React, { useEffect } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';

const ContactForm: React.FC = () => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
    reset
  } = useContactForm();

  // Auto-reset após 5 segundos de sucesso
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset]);

  return (
    <section id="contato" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Formulário de Contato */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">
              Fale com um Consultor
            </h2>
            <p className="text-gray-300 mb-8">
              Agende uma avaliação gratuita e descubra como podemos otimizar 
              sua infraestrutura de TI com soluções personalizadas.
            </p>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                    placeholder="Nome da sua empresa"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all"
                    placeholder="Descreva suas necessidades de TI..."
                  />
                </div>
                
                {error && (
                  <div className="bg-red-600/20 border border-red-500 rounded-lg p-4 flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  <span>{isLoading ? 'Enviando...' : 'Enviar Mensagem'}</span>
                  <Send className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <div className="bg-green-600/20 border border-green-500 rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-green-300 mb-4">
                  Obrigado pelo contato! Nossa equipe responderá em breve.
                </p>
                <button
                  onClick={reset}
                  className="text-green-400 hover:text-green-300 text-sm underline transition-colors"
                >
                  Enviar nova mensagem
                </button>
              </div>
            )}
          </div>

          {/* Informações de Contato */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">
              Informações de Contato
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Telefone</h4>
                  <p className="text-gray-300">+55 (11) 99999-9999</p>
                  <p className="text-sm text-gray-400">Seg-Sex: 8h às 18h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">E-mail</h4>
                  <p className="text-gray-300">sac@maginf.com.br</p>
                  <p className="text-sm text-gray-400">Resposta em até 2h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Endereço</h4>
                  <p className="text-gray-300">São Paulo, SP</p>
                  <p className="text-sm text-gray-400">Atendimento presencial</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Suporte 24/7</h4>
                  <p className="text-gray-300">Monitoramento contínuo</p>
                  <p className="text-sm text-gray-400">Emergências: WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
