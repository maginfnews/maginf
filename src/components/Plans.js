import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';

const Plans = () => {
  const plans = [
    {
      name: "Bronze",
      target: "PMEs até 15 estações",
      price: "Sob consulta",
      popular: false,
      features: {
        monitoring: "Básico (hosts críticos)",
        support: "9×5",
        visits: "1/mês (agendada)",
        backup: "Opcional",
        sla: "8 horas"
      },
      highlights: [
        "Monitoramento básico de servidores",
        "Suporte comercial (9h às 17h)",
        "1 visita mensal programada",
        "Relatórios mensais básicos",
        "Gestão de patches essenciais"
      ]
    },
    {
      name: "Prata",
      target: "Empresas 15–50 estações",
      price: "Sob consulta",
      popular: true,
      features: {
        monitoring: "Avançado (aplicações e servidores)",
        support: "9×5 + plantão remoto",
        visits: "2/mês ou quando necessário",
        backup: "Diário",
        sla: "4 horas"
      },
      highlights: [
        "Monitoramento avançado completo",
        "Suporte estendido + plantão",
        "Backup diário automatizado",
        "Gestão proativa de patches",
        "Relatórios detalhados",
        "Suporte a Microsoft 365"
      ]
    },
    {
      name: "Ouro",
      target: "50+ estações / missão crítica",
      price: "Sob consulta",
      popular: false,
      features: {
        monitoring: "Premium (24/7 + alertas)",
        support: "24×7",
        visits: "SLA com atendimento emergencial 24h",
        backup: "Replicação + testes",
        sla: "1 hora"
      },
      highlights: [
        "Monitoramento premium 24/7",
        "Suporte crítico 24 horas",
        "Backup com replicação e DR",
        "Atendimento emergencial on-site",
        "Gestão completa de segurança",
        "Relatórios executivos personalizados",
        "Consultor dedicado"
      ]
    }
  ];

  const slaMetrics = [
    {
      metric: "Tempo de resposta inicial",
      bronze: "8 horas",
      prata: "4 horas", 
      ouro: "1 hora"
    },
    {
      metric: "Disponibilidade de monitoramento",
      bronze: "99%",
      prata: "99.5%",
      ouro: "99.9%"
    },
    {
      metric: "Resolução P1 (crítico)",
      bronze: "24 horas",
      prata: "8 horas",
      ouro: "4 horas"
    },
    {
      metric: "Visitas técnicas incluídas",
      bronze: "1/mês",
      prata: "2/mês",
      ouro: "Ilimitadas"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="planos" className="bg-white section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-maginf-gray mb-4">
            Planos MSP
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para sua empresa. Todos incluem monitoramento, 
            suporte técnico e relatórios mensais.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl p-8 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-maginf-orange to-maginf-orange-dark text-white shadow-2xl scale-105' 
                  : 'bg-gray-50 border border-gray-200 hover:shadow-lg'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white text-maginf-orange px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-maginf-gray'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                  {plan.target}
                </p>
                <div className={`text-3xl font-bold ${plan.popular ? 'text-white' : 'text-maginf-orange'}`}>
                  {plan.price}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.highlights.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
                      plan.popular ? 'text-white' : 'text-maginf-orange'
                    }`} />
                    <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button 
                onClick={scrollToContact}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-white text-maginf-orange hover:bg-gray-100' 
                    : 'bg-maginf-orange text-white hover:bg-maginf-orange-dark'
                }`}
              >
                Solicitar Proposta
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          ))}
        </div>

        {/* SLA Comparison Table */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-maginf-gray mb-8 text-center">
            Comparativo de SLAs
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-maginf-gray">Métrica</th>
                  <th className="text-center py-4 px-4 font-semibold text-maginf-gray">Bronze</th>
                  <th className="text-center py-4 px-4 font-semibold text-white bg-maginf-orange rounded-t-lg">Prata</th>
                  <th className="text-center py-4 px-4 font-semibold text-maginf-gray">Ouro</th>
                </tr>
              </thead>
              <tbody>
                {slaMetrics.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-4 font-medium text-gray-700">{row.metric}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.bronze}</td>
                    <td className="py-4 px-4 text-center bg-maginf-orange/10 font-semibold text-maginf-orange">
                      {row.prata}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.ouro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-maginf-gray rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Garantias e Conformidade</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <strong>Atendimento SLA:</strong> Cumprimento rigoroso dos tempos contratuais
              </div>
              <div>
                <strong>Proteção de Dados:</strong> Política de confidencialidade e LGPD
              </div>
              <div>
                <strong>Contratos Públicos:</strong> Suporte administrativo e documentação completa
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
