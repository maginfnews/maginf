import React from 'react';
import SEO from '../src/components/SEO';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import WhatsAppButton from '../src/components/WhatsAppButton';
import { Monitor, Shield, Cloud, TrendingUp, CheckCircle, Award } from 'lucide-react';

export default function MSPBrasil() {
  const benefits = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Monitoramento 24/7",
      description: "Vigilância constante de toda sua infraestrutura de TI"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Segurança Proativa",
      description: "Proteção contra ameaças antes que causem danos"
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Backup Automatizado",
      description: "Seus dados sempre protegidos e recuperáveis"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Redução de Custos",
      description: "Economia de até 40% comparado a equipe interna"
    }
  ];

  const services = [
    "Monitoramento proativo 24/7/365",
    "Gestão de patches e atualizações",
    "Backup e disaster recovery",
    "Segurança da informação",
    "Help desk e suporte técnico",
    "Gestão de ativos de TI",
    "Relatórios e dashboards",
    "Planejamento estratégico de TI"
  ];

  return (
    <>
      <SEO 
        title="MSP Brasil - Serviços Gerenciados de TI | MAGINF Tecnologia"
        description="Provedor de Serviços Gerenciados (MSP) no Brasil. Monitoramento 24/7, backup em nuvem, segurança e suporte técnico especializado para sua empresa."
        keywords="MSP Brasil, serviços gerenciados TI, managed services provider, MSP São Paulo, infraestrutura gerenciada, TI terceirizada"
        canonical="https://maginf.com.br/msp-brasil"
        ogUrl="https://maginf.com.br/msp-brasil"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-20">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Managed Services Provider
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  MSP Brasil: Serviços Gerenciados de TI
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Transforme sua TI em vantagem competitiva com nossos serviços gerenciados. 
                  Monitoramento 24/7, segurança e suporte especializado.
                </p>
                <a 
                  href="/#contato"
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Solicitar Proposta
                </a>
              </div>
              <div className="flex items-center justify-center">
                <Award className="h-64 w-64 text-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="container-max py-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-16">
            Benefícios do MSP MAGINF
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 text-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-maginf-gray mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What is MSP */}
        <div className="bg-white py-20">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-8">
                O Que é MSP?
              </h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  <strong>MSP (Managed Services Provider)</strong> ou Provedor de Serviços Gerenciados 
                  é uma empresa especializada em gerenciar e assumir a responsabilidade pela infraestrutura 
                  de TI de outras organizações.
                </p>
                <p>
                  Ao contratar um MSP, sua empresa ganha acesso a uma equipe completa de especialistas, 
                  tecnologias avançadas de monitoramento e processos otimizados, tudo por um custo mensal 
                  previsível e muito menor do que manter uma equipe interna.
                </p>
                <p>
                  A MAGINF atua como MSP oferecendo monitoramento 24/7, backup automatizado, segurança 
                  da informação, suporte técnico e muito mais, permitindo que você foque no seu negócio 
                  enquanto cuidamos da sua tecnologia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Included */}
        <div className="container-max py-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-12">
            Serviços Incluídos
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-lg">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
          <div className="container-max">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-5xl font-bold mb-2">200+</div>
                <div className="text-xl text-white/80">Clientes Ativos</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">99.9%</div>
                <div className="text-xl text-white/80">Uptime Garantido</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">8+</div>
                <div className="text-xl text-white/80">Anos de Experiência</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-xl text-white/80">Monitoramento</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container-max py-20">
          <div className="bg-gradient-to-br from-maginf-orange to-orange-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Pronto para Transformar sua TI?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Descubra como nossos serviços gerenciados podem reduzir custos e aumentar a eficiência da sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#contato"
                className="inline-block bg-white text-maginf-orange px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Solicitar Proposta
              </a>
              <a 
                href="/planos"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Ver Planos MSP
              </a>
            </div>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
