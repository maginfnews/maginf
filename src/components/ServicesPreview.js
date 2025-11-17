import React from 'react';
import { Monitor, Cloud, Shield, Camera, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ServicesPreview = () => {
  const services = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Serviços Gerenciados (MSP)",
      color: "from-blue-600 to-cyan-600",
      description: "Monitoramento proativo 24/7, gestão de patches e suporte remoto completo.",
      link: "/servicos"
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Infraestrutura & Cloud",
      color: "from-purple-600 to-pink-600",
      description: "Migração e gestão completa em AWS, Azure e Microsoft 365.",
      link: "/servicos"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Segurança & Backup",
      color: "from-green-600 to-emerald-600",
      description: "Proteção de dados com backup automatizado e recuperação de desastres.",
      link: "/servicos"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "CFTV e Segurança Física",
      color: "from-red-600 to-orange-600",
      description: "Instalação e monitoramento de sistemas de CFTV integrados.",
      link: "/servicos"
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
            Soluções completas de TI para empresas que buscam excelência tecnológica
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-maginf-gray mb-3 group-hover:text-maginf-orange transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/servicos"
            className="inline-flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Ver Todos os Serviços
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
