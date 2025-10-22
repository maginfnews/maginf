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
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-maginf-orange text-white p-3 rounded-lg mr-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-maginf-gray">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-maginf-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-maginf-gray mb-8 text-center">
            Serviços Técnicos Especializados
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {technicalServices.map((service, index) => (
              <div key={index} className="text-center">
                <div className="bg-maginf-orange/10 text-maginf-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {service.icon}
                </div>
                <h4 className="text-lg font-semibold text-maginf-gray mb-4">{service.title}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {service.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
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
