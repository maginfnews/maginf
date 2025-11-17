import React from 'react';
import { Clock, Users, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CountUp from './CountUp';

const AboutPreview = () => {
  const stats = [
    { number: "8+", label: "Anos de experiência", icon: <Clock className="h-8 w-8" /> },
    { number: "100+", label: "Clientes atendidos", icon: <Users className="h-8 w-8" /> },
    { number: "99.5%", label: "Disponibilidade SLA", icon: <CheckCircle className="h-8 w-8" /> },
    { number: "24/7", label: "Monitoramento", icon: <Shield className="h-8 w-8" /> }
  ];

  return (
    <section id="sobre" className="bg-white section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-maginf-gray mb-4">
            Por Que Escolher a <span className="text-maginf-orange">MAGINF</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 8 anos transformando a tecnologia em motor de crescimento para empresas brasileiras
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-maginf-orange to-orange-600 text-white mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-maginf-gray mb-2">
                {stat.number.includes('+') || stat.number.includes('%') ? (
                  <>
                    <CountUp end={parseInt(stat.number)} />
                    {stat.number.replace(/[0-9]/g, '')}
                  </>
                ) : (
                  stat.number
                )}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white rounded-2xl p-8 lg:p-12 text-center mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">Nossa Missão</h3>
          <p className="text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto">
            Garantir que a tecnologia funcione como motor do negócio: 
            <strong> disponível, segura e escalável</strong>. Trabalhamos com contratos de SLA claros, 
            pacotes MSP flexíveis e atendimento humano.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/sobre"
            className="inline-flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Conheça Nossa História
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
