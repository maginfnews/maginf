import React from 'react';
import SEO from '../src/components/SEO';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import { Monitor, Cloud, Shield, Camera, Database, Headphones } from 'lucide-react';

export default function Servicos() {
  const services = [
    {
      icon: <Monitor className="h-12 w-12" />,
      title: "Serviços Gerenciados (MSP)",
      color: "from-blue-600 to-cyan-600",
      description: "Monitoramento proativo 24/7, gestão de patches, backup centralizado e suporte remoto completo para sua empresa.",
      features: [
        "Monitoramento 24/7 de hosts e serviços críticos",
        "Gestão de patches e atualizações automáticas",
        "Backup centralizado em nuvem com testes de recuperação",
        "Suporte remoto e visitas on-site programadas"
      ]
    },
    {
      icon: <Cloud className="h-12 w-12" />,
      title: "Infraestrutura & Cloud",
      color: "from-purple-600 to-pink-600",
      description: "Migração e gestão completa em AWS, Azure e Microsoft 365 com foco em escalabilidade e performance.",
      features: [
        "Migração para AWS, Azure e Microsoft 365",
        "Virtualização e backup corporativo",
        "Projetos de rede e Wi-Fi empresarial",
        "Configuração de VLANs e redes mesh"
      ]
    },
    {
      icon: <Camera className="h-12 w-12" />,
      title: "CFTV e Segurança Física",
      color: "from-red-600 to-orange-600",
      description: "Instalação, manutenção e monitoramento de sistemas de CFTV com integração completa ao seu ambiente.",
      features: [
        "Instalação e manutenção de CFTV",
        "Monitoramento integrado com NOC",
        "Controle de acesso e automação",
        "Integração com DVRs Intelbras"
      ]
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Segurança da Informação",
      color: "from-green-600 to-teal-600",
      description: "Proteção completa contra ameaças cibernéticas com firewall, antivírus e políticas de segurança.",
      features: [
        "Firewall corporativo e VPN",
        "Antivírus e antimalware gerenciado",
        "Políticas de segurança e compliance",
        "Auditoria e monitoramento de logs"
      ]
    },
    {
      icon: <Database className="h-12 w-12" />,
      title: "Backup e Recuperação",
      color: "from-yellow-600 to-orange-600",
      description: "Soluções de backup em nuvem e local com testes regulares de recuperação de desastres.",
      features: [
        "Backup automático em nuvem",
        "Replicação de dados críticos",
        "Testes de recuperação periódicos",
        "Plano de continuidade de negócios"
      ]
    },
    {
      icon: <Headphones className="h-12 w-12" />,
      title: "Suporte Técnico",
      color: "from-indigo-600 to-purple-600",
      description: "Atendimento especializado com SLA definido, suporte remoto e visitas técnicas quando necessário.",
      features: [
        "Suporte técnico especializado",
        "SLA de atendimento garantido",
        "Atendimento remoto e presencial",
        "Help desk em português"
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Serviços de TI - MSP, Cloud, CFTV e Suporte | MAGINF"
        description="Conheça todos os serviços de TI da MAGINF: Serviços Gerenciados (MSP), Cloud Computing, CFTV, Segurança da Informação, Backup e Suporte Técnico 24/7."
        keywords="serviços de TI, MSP, cloud computing, CFTV, segurança da informação, backup em nuvem, suporte técnico, infraestrutura de TI"
        canonical="https://maginf.com.br/servicos"
        ogUrl="https://maginf.com.br/servicos"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white py-20">
          <div className="container-max">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Nossos Serviços de TI
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Soluções completas de tecnologia para impulsionar seu negócio com segurança, 
                eficiência e inovação.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container-max py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Icon Header */}
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-center">
                    {service.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-maginf-orange mt-1">✓</span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-maginf-orange to-orange-600 py-16">
          <div className="container-max text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Pronto para transformar sua TI?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Entre em contato e descubra como podemos ajudar sua empresa a crescer com tecnologia.
            </p>
            <a 
              href="/#contato"
              className="inline-block bg-white text-maginf-orange px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Fale com um Especialista
            </a>
          </div>
        </div>

        <Footer />      </div>
    </>
  );
}
