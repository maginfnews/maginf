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
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-maginf-orange/20 h-full"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Content */}
                <div className="flex-1 lg:max-w-md">
                  <div className={`bg-white rounded-2xl p-8 shadow-lg ${
                    index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                  }`}>
                    <h3 className="text-xl font-bold text-maginf-gray mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {step.description}
                    </p>
                    <ul className={`space-y-2 text-sm text-gray-700 ${
                      index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                    }`}>
                      {step.details.map((detail, idx) => (
                        <li key={idx} className={`flex items-center ${
                          index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                        }`}>
                          <div className={`w-2 h-2 bg-maginf-orange rounded-full ${
                            index % 2 === 0 ? 'lg:order-2 lg:ml-2 mr-2 lg:mr-0' : 'mr-2'
                          }`}></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step Number and Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="bg-maginf-orange text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-maginf-gray text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 lg:max-w-md hidden lg:block"></div>
              </div>
            ))}
          </div>
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
