import React from 'react';
import { Check, ArrowRight, Shield, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

const PlansPreview = () => {
  const plans = [
    {
      name: "Essencial",
      icon: <Shield className="h-8 w-8" />,
      color: "from-blue-600 to-cyan-600",
      description: "Ideal para pequenas empresas",
      highlights: [
        "Até 5 usuários",
        "Monitoramento 8x5",
        "Backup semanal",
        "Suporte via e-mail"
      ],
      popular: false
    },
    {
      name: "Profissional",
      icon: <Zap className="h-8 w-8" />,
      color: "from-maginf-orange to-orange-600",
      description: "Para empresas em crescimento",
      highlights: [
        "Até 15 usuários",
        "Monitoramento 24/7",
        "Backup diário",
        "Suporte prioritário"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      icon: <Crown className="h-8 w-8" />,
      color: "from-purple-600 to-pink-600",
      description: "Solução completa personalizada",
      highlights: [
        "Usuários ilimitados",
        "Monitoramento 24/7/365",
        "Backup em tempo real",
        "Suporte VIP dedicado"
      ],
      popular: false
    }
  ];

  return (
    <section id="planos" className="bg-white section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-maginf-gray mb-4">
            Planos que Crescem com Sua Empresa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal e tenha suporte técnico especializado com infraestrutura gerenciada
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                plan.popular ? 'ring-4 ring-maginf-orange transform md:scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-maginf-orange text-white text-center py-2 font-bold text-sm">
                  MAIS POPULAR
                </div>
              )}
              
              {/* Header */}
              <div className={`p-8 bg-gradient-to-br ${plan.color} text-white`}>
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">
                  {plan.name}
                </h3>
                <p className="text-center text-white/90 text-sm">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="p-8">
                <ul className="space-y-3 mb-6">
                  {plan.highlights.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/planos"
            className="inline-flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Ver Planos Completos
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlansPreview;
