import React from 'react';
import SEO from '../src/components/SEO';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import WhatsAppButton from '../src/components/WhatsAppButton';
import { Check, X } from 'lucide-react';

export default function Planos() {
  const plans = [
    {
      name: "Essencial",
      description: "Ideal para pequenas empresas que estão começando",
      features: [
        { text: "Até 5 usuários", included: true },
        { text: "Monitoramento 8x5", included: true },
        { text: "Backup semanal", included: true },
        { text: "Suporte via e-mail", included: true },
        { text: "Microsoft 365 Basic", included: true },
        { text: "Monitoramento 24/7", included: false },
        { text: "Visitas técnicas", included: false },
        { text: "Gerente dedicado", included: false }
      ],
      highlight: false,
      cta: "Solicitar Orçamento"
    },
    {
      name: "Profissional",
      description: "Para empresas em crescimento que precisam de mais suporte",
      features: [
        { text: "Até 15 usuários", included: true },
        { text: "Monitoramento 24/7", included: true },
        { text: "Backup diário", included: true },
        { text: "Suporte prioritário", included: true },
        { text: "Microsoft 365 Business", included: true },
        { text: "2 visitas técnicas/mês", included: true },
        { text: "Firewall gerenciado", included: true },
        { text: "Gerente dedicado", included: false }
      ],
      highlight: true,
      cta: "Solicitar Orçamento"
    },
    {
      name: "Enterprise",
      description: "Solução completa e personalizada para grandes empresas",
      features: [
        { text: "Usuários ilimitados", included: true },
        { text: "Monitoramento 24/7/365", included: true },
        { text: "Backup em tempo real", included: true },
        { text: "Suporte VIP", included: true },
        { text: "Microsoft 365 E5", included: true },
        { text: "Visitas ilimitadas", included: true },
        { text: "Infraestrutura dedicada", included: true },
        { text: "Gerente dedicado", included: true }
      ],
      highlight: false,
      cta: "Falar com Consultor"
    }
  ];

  return (
    <>
      <SEO 
        title="Planos de Serviços Gerenciados de TI | MAGINF"
        description="Conheça nossos planos de serviços gerenciados de TI (MSP). Soluções personalizadas para pequenas, médias e grandes empresas com suporte 24/7. Valores sob consulta."
        keywords="planos MSP, serviços gerenciados, planos de TI, MSP Brasil, suporte técnico mensal, infraestrutura gerenciada"
        canonical="https://maginf.com.br/planos"
        ogUrl="https://maginf.com.br/planos"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white py-20">
          <div className="container-max">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Nossos Planos
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Escolha o plano ideal para sua empresa. Todos incluem suporte técnico especializado 
                e infraestrutura gerenciada. Entre em contato para valores personalizados.
              </p>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="container-max py-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.highlight 
                    ? 'ring-4 ring-maginf-orange transform md:scale-105' 
                    : ''
                }`}
              >
                {plan.highlight && (
                  <div className="bg-maginf-orange text-white text-center py-2 font-bold">
                    MAIS POPULAR
                  </div>
                )}
                
                {/* Header */}
                <div className={`p-8 ${plan.highlight ? 'bg-gradient-to-br from-maginf-orange to-orange-600 text-white' : 'bg-gray-50'}`}>
                  <h3 className={`text-3xl font-bold mb-4 ${plan.highlight ? 'text-white' : 'text-maginf-gray'}`}>
                    {plan.name}
                  </h3>
                  <p className={`${plan.highlight ? 'text-white/90' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/#contato"
                    className={`block w-full text-center py-3 px-6 rounded-lg font-bold transition-colors ${
                      plan.highlight
                        ? 'bg-maginf-orange text-white hover:bg-orange-600'
                        : 'bg-gray-100 text-maginf-gray hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-maginf-gray mb-4">
              Todos os planos incluem:
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-gray-600">
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <p className="font-semibold">Segurança Garantida</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📊</div>
                <p className="font-semibold">Relatórios Mensais</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-semibold">SLA Definido</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-maginf-gray to-maginf-gray-light py-16">
          <div className="container-max text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Precisa de um plano personalizado?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Fale com nossos especialistas e monte um plano sob medida para sua empresa.
            </p>
            <a 
              href="/#contato"
              className="inline-block bg-maginf-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors"
            >
              Solicitar Orçamento Personalizado
            </a>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
