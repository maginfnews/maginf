import React from 'react';
import SEO from '../src/components/SEO';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contato() {
  return (
    <>
      <SEO 
        title="Contato - Fale com a MAGINF Tecnologia | Suporte e Orçamentos"
        description="Entre em contato com a MAGINF. Atendimento especializado, orçamentos personalizados e suporte técnico. Telefone: (11) 4610-6363 | Email: sac@maginf.com.br"
        keywords="contato MAGINF, orçamento TI, suporte técnico, telefone MAGINF, email MAGINF, atendimento"
        canonical="https://maginf.com.br/contato"
        ogUrl="https://maginf.com.br/contato"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white py-20">
          <div className="container-max">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Entre em Contato
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Estamos prontos para atender sua empresa. Fale com nossos especialistas.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="container-max py-20">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-maginf-gray mb-8">
                Informações de Contato
              </h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-maginf-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-maginf-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-maginf-gray mb-1">Telefone</h3>
                    <a href="tel:+551146106363" className="text-gray-600 hover:text-maginf-orange transition-colors">
                      (11) 4610-6363
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-maginf-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-maginf-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-maginf-gray mb-1">Email</h3>
                    <a href="mailto:sac@maginf.com.br" className="text-gray-600 hover:text-maginf-orange transition-colors">
                      sac@maginf.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-maginf-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-maginf-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-maginf-gray mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      Guarulhos, São Paulo - Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-maginf-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-maginf-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-maginf-gray mb-1">Horário de Atendimento</h3>
                    <p className="text-gray-600">
                      Segunda a Sexta: 8h às 18h<br />
                      Suporte 24/7 para clientes MSP
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-maginf-gray mb-4">Redes Sociais</h3>
                <p className="text-gray-600 mb-4">
                  Siga-nos nas redes sociais para ficar por dentro das novidades e dicas de tecnologia.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/company/maginf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    in
                  </a>
                  <a 
                    href="https://wa.me/5511946106363" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white hover:bg-green-700 transition-colors"
                  >
                    ✓
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-maginf-gray mb-6">
                Envie uma Mensagem
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none transition-all"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none transition-all"
                    placeholder="Nome da empresa"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-maginf-orange text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
                >
                  Enviar Mensagem
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Responderemos em até 24 horas úteis
                </p>
              </form>
            </div>
          </div>
        </div>

        <Footer />      </div>
    </>
  );
}
