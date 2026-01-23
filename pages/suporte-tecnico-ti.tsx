import React from 'react';
import SEO from '../src/components/SEO';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import { Headphones, Clock, Shield, CheckCircle, Users, Zap } from 'lucide-react';

export default function SuporteTecnicoTI() {
  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Atendimento Rápido",
      description: "SLA de resposta em até 30 minutos para chamados críticos"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Equipe Especializada",
      description: "Profissionais certificados e experientes em diversas tecnologias"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Suporte Seguro",
      description: "Acesso remoto criptografado e protocolos de segurança rigorosos"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Resolução Eficiente",
      description: "Taxa de resolução no primeiro contato acima de 85%"
    }
  ];

  const services = [
    "Suporte remoto via TeamViewer, AnyDesk e RDP",
    "Atendimento presencial quando necessário",
    "Resolução de problemas de hardware e software",
    "Configuração de estações de trabalho",
    "Instalação e atualização de sistemas",
    "Suporte a Microsoft 365 e Google Workspace",
    "Treinamento de usuários",
    "Documentação técnica completa"
  ];

  return (
    <>
      <SEO 
        title="Suporte Técnico de TI Especializado | MAGINF Tecnologia"
        description="Suporte técnico de TI profissional com atendimento rápido, equipe especializada e SLA garantido. Atendimento remoto e presencial para sua empresa."
        keywords="suporte técnico TI, help desk, suporte remoto, assistência técnica, suporte informática, TI empresarial"
        canonical="https://maginf.com.br/suporte-tecnico-ti"
        ogUrl="https://maginf.com.br/suporte-tecnico-ti"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Suporte Técnico de TI Profissional
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Atendimento especializado para resolver os problemas de TI da sua empresa 
                  com agilidade e eficiência.
                </p>
                <a 
                  href="/#contato"
                  className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Solicitar Suporte
                </a>
              </div>
              <div className="flex items-center justify-center">
                <Headphones className="h-64 w-64 text-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container-max py-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-16">
            Por Que Escolher Nosso Suporte?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4 text-indigo-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-maginf-gray mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white py-20">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-12">
                O Que Está Incluído
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-lg">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
          <div className="container-max">
            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="text-5xl font-bold mb-2">30min</div>
                <div className="text-xl text-white/80">Tempo Médio de Resposta</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">85%</div>
                <div className="text-xl text-white/80">Resolução no 1º Contato</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-xl text-white/80">Disponibilidade MSP</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container-max py-20">
          <div className="bg-gradient-to-br from-maginf-orange to-orange-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Precisa de Suporte Técnico Agora?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Nossa equipe está pronta para atender sua empresa e resolver qualquer problema de TI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#contato"
                className="inline-block bg-white text-maginf-orange px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Falar com Especialista
              </a>
              <a 
                href="/planos"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Ver Planos
              </a>
            </div>
          </div>
        </div>

        <Footer />      </div>
    </>
  );
}
