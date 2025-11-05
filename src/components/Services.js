import React from 'react';
import { 
  Monitor, 
  Cloud, 
  Shield, 
  Camera, 
  Package, 
  Settings,
  Database
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Serviços Gerenciados (MSP)",
      color: "from-blue-600 to-cyan-600",
      description: "Monitoramento proativo 24/7, gestão de patches, backup centralizado e suporte remoto completo.",
      features: [
        "Monitoramento 24/7 de hosts e serviços críticos",
        "Gestão de patches e atualizações automáticas",
        "Backup centralizado em nuvem com testes de recuperação",
        "Suporte remoto e visitas on-site programadas"
      ]
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Infraestrutura & Cloud",
      color: "from-purple-600 to-pink-600",
      description: "Migração e gestão completa em AWS, Azure e Microsoft 365 com foco em escalabilidade.",
      features: [
        "Migração para AWS, Azure e Microsoft 365",
        "Virtualização e backup corporativo",
        "Projetos de rede e Wi-Fi empresarial",
        "Configuração de VLANs e redes mesh"
      ]
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "CFTV e Segurança Física",
      color: "from-red-600 to-orange-600",
      description: "Instalação, manutenção e monitoramento de sistemas de CFTV com integração completa.",
      features: [
        "Instalação e manutenção de CFTV",
        "Monitoramento integrado com NOC",
        "Controle de acesso e automação",
        "Integração com DVRs Intelbras"
      ]
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Fornecimento e Logística",
      color: "from-green-600 to-emerald-600",
      description: "Compra e venda de hardware com NF-e, suporte fiscal e logística para grandes volumes.",
      features: [
        "Hardware com NF-e e suporte fiscal",
        "Logística para grandes lotes",
        "Consultoria em formação de preços",
        "Operações interestaduais (CFOP)"
      ]
    }
  ];

  const technicalServices = [
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Monitoramento e NOC",
      items: [
        "Coleta de métricas (CPU, disco, memória)",
        "Alertas por e-mail/WhatsApp/portal",
        "Integração com sistemas de CFTV"
      ]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Backup & Recuperação",
      items: [
        "Estratégia 3-2-1 (local + replicação + offsite)",
        "Testes periódicos de restauração",
        "Relatórios de conformidade"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança Gerenciada",
      items: [
        "Gestão de patches e vulnerabilidades",
        "Endpoint Detection & Response (EDR)",
        "Políticas de acesso e MFA"
      ]
    }
  ];

  return (
    <section id="servicos" className="bg-gradient-to-b from-maginf-gray/30 to-gray-50 section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-maginf-gray mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluções completas de TI para empresas de todos os tamanhos, 
            com foco em disponibilidade, segurança e custo previsível.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="relative rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-500"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`}></div>
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 text-white">
                {/* Icon */}
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold ml-4">{service.title}</h3>
                </div>
                
                <p className="text-white/90 mb-6 text-lg">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Services */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-10">
          <h3 className="text-3xl font-bold text-maginf-gray mb-10 text-center">
            Serviços Técnicos Especializados
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {technicalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-maginf-orange to-maginf-orange-dark text-white p-4 rounded-2xl">
                    {service.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-maginf-gray mb-4 text-center">{service.title}</h4>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <div className="w-2 h-2 bg-maginf-orange rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 bg-gradient-to-r from-maginf-orange to-maginf-orange-dark rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Por que escolher a MAGINF?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Custo previsível com contratos mensais</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Redução de tempo de inatividade</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Segurança reforçada e compliance</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Suporte local quando necessário</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Experiência em contratos públicos</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Relatórios e métricas transparentes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
