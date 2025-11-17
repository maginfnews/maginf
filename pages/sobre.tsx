import React from 'react';
import SEO from '../src/components/SEO';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import WhatsAppButton from '../src/components/WhatsAppButton';
import { Award, Users, Target, Heart, TrendingUp, Shield } from 'lucide-react';

export default function Sobre() {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Foco no Cliente",
      description: "Colocamos as necessidades dos nossos clientes em primeiro lugar, sempre."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Segurança",
      description: "Proteção de dados e infraestrutura com os mais altos padrões de segurança."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Inovação",
      description: "Sempre atualizados com as últimas tecnologias e melhores práticas do mercado."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Transparência",
      description: "Comunicação clara e honesta em todos os nossos relacionamentos."
    }
  ];

  const stats = [
    { number: "8+", label: "Anos de Experiência" },
    { number: "200+", label: "Clientes Atendidos" },
    { number: "24/7", label: "Suporte Disponível" },
    { number: "99.9%", label: "Uptime Garantido" }
  ];

  return (
    <>
      <SEO 
        title="Sobre a MAGINF - Especialistas em TI e MSP | Nossa História"
        description="Conheça a MAGINF Tecnologia. Mais de 8 anos de experiência em serviços gerenciados de TI (MSP), infraestrutura cloud e suporte técnico especializado."
        keywords="sobre MAGINF, empresa de TI, MSP Brasil, história MAGINF, equipe técnica, valores empresa"
        canonical="https://maginf.com.br/sobre"
        ogUrl="https://maginf.com.br/sobre"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white py-20">
          <div className="container-max">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Sobre a MAGINF
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Transformando empresas através da tecnologia há mais de 8 anos
              </p>
            </div>
          </div>
        </div>

        {/* Nossa História */}
        <div className="container-max py-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16">
              <h2 className="text-3xl font-bold text-maginf-gray mb-6">Nossa História</h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  A <strong>MAGINF Tecnologia</strong> nasceu da visão de oferecer soluções de TI 
                  completas e acessíveis para empresas de todos os portes. Fundada em 2016, começamos 
                  como uma pequena equipe de profissionais apaixonados por tecnologia.
                </p>
                <p>
                  Ao longo dos anos, evoluímos para nos tornar um <strong>Provedor de Serviços Gerenciados (MSP)</strong> 
                  completo, oferecendo desde infraestrutura em nuvem até monitoramento 24/7 e suporte técnico especializado.
                </p>
                <p>
                  Hoje, atendemos mais de 200 clientes em todo o Brasil, sempre com o compromisso de 
                  entregar excelência, inovação e resultados que fazem a diferença no dia a dia das empresas.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-4xl font-bold text-maginf-orange mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Missão, Visão, Valores */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-maginf-gray mb-4 text-center">Missão</h3>
                <p className="text-gray-600 text-center">
                  Fornecer soluções de TI que impulsionem o crescimento e a eficiência dos nossos clientes.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-maginf-gray mb-4 text-center">Visão</h3>
                <p className="text-gray-600 text-center">
                  Ser referência nacional em serviços gerenciados de TI, reconhecidos pela excelência e inovação.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 mx-auto">
                  <Heart className="h-8 w-8 text-maginf-orange" />
                </div>
                <h3 className="text-xl font-bold text-maginf-gray mb-4 text-center">Valores</h3>
                <p className="text-gray-600 text-center">
                  Transparência, inovação, foco no cliente e compromisso com a segurança.
                </p>
              </div>
            </div>

            {/* Nossos Valores Detalhados */}
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-maginf-gray mb-8 text-center">
                Nossos Valores
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-maginf-orange/10 rounded-lg flex items-center justify-center text-maginf-orange">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-maginf-gray mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-maginf-orange to-orange-600 py-16">
          <div className="container-max text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Quer fazer parte da nossa história?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Entre em contato e descubra como podemos ajudar sua empresa a crescer.
            </p>
            <a 
              href="/#contato"
              className="inline-block bg-white text-maginf-orange px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Fale Conosco
            </a>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
