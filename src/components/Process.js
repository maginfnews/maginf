import React from 'react';
import { 
  Search, 
  FileText, 
  Settings, 
  RotateCcw, 
  TrendingUp,
  ArrowRight 
} from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Diagnóstico Inicial",
      number: "01",
      color: "from-blue-600 to-cyan-600",
      description: "Avaliação completa do ambiente atual e definição de prioridades técnicas e de negócio.",
      details: [
        "Auditoria de infraestrutura existente",
        "Identificação de vulnerabilidades",
        "Mapeamento de processos críticos",
        "Análise de custos atuais"
      ]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Proposta e SLA",
      number: "02",
      color: "from-purple-600 to-pink-600",
      description: "Definição do pacote recomendado, escopo detalhado e acordos de nível de serviço.",
      details: [
        "Proposta técnica personalizada",
        "SLAs claros e mensuráveis",
        "Cronograma de implementação",
        "Modelo de precificação transparente"
      ]
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Onboarding Técnico",
      number: "03",
      color: "from-orange-600 to-red-600",
      description: "Configuração completa de monitoramento, inventário de ativos e sistemas de backup.",
      details: [
        "Instalação de agentes de monitoramento",
        "Configuração de backups automáticos",
        "Inventário completo de hardware/software",
        "Treinamento da equipe interna"
      ]
    },
    {
      icon: <RotateCcw className="h-8 w-8" />,
      title: "Operação Contínua",
      number: "04",
      color: "from-green-600 to-emerald-600",
      description: "Suporte diário, manutenção preventiva, atualizações e relatórios de performance.",
      details: [
        "Monitoramento proativo 24/7",
        "Gestão de patches e atualizações",
        "Suporte técnico multicanal",
        "Relatórios mensais detalhados"
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Revisão Estratégica",
      number: "05",
      color: "from-yellow-600 to-amber-600",
      description: "Reuniões trimestrais para otimização de custos, capacidade e roadmap tecnológico.",
      details: [
        "Análise de performance e custos",
        "Planejamento de crescimento",
        "Otimização de recursos",
        "Roadmap de melhorias"
      ]
    }
  ];

  return (
    <section className="bg-gray-50 section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-maginf-gray mb-4">
            Como Trabalhamos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nosso processo estruturado garante implementação eficiente e 
            resultados mensuráveis para sua empresa.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-500"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-90`}></div>
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 text-white">
                {/* Number Badge */}
                <div className="absolute -top-3 -right-3 bg-white text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-xl">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/90 mb-6 text-center text-sm">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-colors">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-xs font-medium">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Summary */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-maginf-gray mb-8 text-center">
            Timeline Típico de Implementação
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-maginf-orange/10 text-maginf-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1-2</span>
              </div>
              <h4 className="font-semibold text-maginf-gray mb-2">Semanas</h4>
              <p className="text-sm text-gray-600">Diagnóstico e Proposta</p>
            </div>
            
            <div className="text-center">
              <div className="bg-maginf-orange/10 text-maginf-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2-4</span>
              </div>
              <h4 className="font-semibold text-maginf-gray mb-2">Semanas</h4>
              <p className="text-sm text-gray-600">Implementação Inicial</p>
            </div>
            
            <div className="text-center">
              <div className="bg-maginf-orange/10 text-maginf-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">24/7</span>
              </div>
              <h4 className="font-semibold text-maginf-gray mb-2">Contínuo</h4>
              <p className="text-sm text-gray-600">Operação e Suporte</p>
            </div>
            
            <div className="text-center">
              <div className="bg-maginf-orange/10 text-maginf-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3M</span>
              </div>
              <h4 className="font-semibold text-maginf-gray mb-2">Trimestral</h4>
              <p className="text-sm text-gray-600">Revisões Estratégicas</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-maginf-orange to-maginf-orange-dark rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Agende uma avaliação gratuita e descubra como podemos otimizar sua infraestrutura de TI.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contato');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-maginf-orange hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Agendar Avaliação Gratuita
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
