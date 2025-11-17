import React from 'react';
import SEO from '../src/components/SEO';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import WhatsAppButton from '../src/components/WhatsAppButton';
import { Monitor, Bell, TrendingUp, CheckCircle, Activity, Eye } from 'lucide-react';

export default function MonitoramentoTI() {
  const features = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Monitoramento 24/7",
      description: "Vigilância constante de servidores, redes e aplicações"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Alertas Inteligentes",
      description: "Notificações proativas antes que problemas afetem usuários"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Métricas em Tempo Real",
      description: "Dashboards com dados atualizados a cada minuto"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Análise Preditiva",
      description: "Identifique tendências e previna problemas futuros"
    }
  ];

  const monitored = [
    "Servidores Windows e Linux",
    "Switches, roteadores e firewalls",
    "Aplicações web e APIs",
    "Bancos de dados (SQL, MySQL, PostgreSQL)",
    "Serviços em nuvem (AWS, Azure, Microsoft 365)",
    "Espaço em disco e performance",
    "Uso de CPU, memória e rede",
    "Disponibilidade de sites e serviços"
  ];

  return (
    <>
      <SEO 
        title="Monitoramento de TI 24/7 | NOC e Infraestrutura MAGINF"
        description="Monitoramento proativo de infraestrutura de TI 24/7. NOC especializado, alertas inteligentes e dashboards em tempo real para sua empresa."
        keywords="monitoramento TI, NOC, monitoramento 24/7, infraestrutura TI, monitoramento proativo, alertas TI"
        canonical="https://maginf.com.br/monitoramento-ti"
        ogUrl="https://maginf.com.br/monitoramento-ti"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-20">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Monitoramento de TI 24/7
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Mantenha sua infraestrutura sempre disponível com monitoramento proativo 
                  e alertas inteligentes que previnem problemas antes que aconteçam.
                </p>
                <a 
                  href="/#contato"
                  className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Começar Monitoramento
                </a>
              </div>
              <div className="flex items-center justify-center">
                <Eye className="h-64 w-64 text-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container-max py-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-16">
            Recursos do Monitoramento
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 text-green-600">
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

        {/* What We Monitor */}
        <div className="bg-white py-20">
          <div className="container-max">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-12">
              O Que Monitoramos
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {monitored.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="container-max py-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-16">
            Benefícios do Monitoramento Proativo
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-maginf-gray mb-3">Menos Downtime</h3>
              <p className="text-gray-600">
                Identifique e resolva problemas antes que afetem seus usuários
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-maginf-gray mb-3">Redução de Custos</h3>
              <p className="text-gray-600">
                Evite gastos emergenciais com manutenção preventiva
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-maginf-gray mb-3">Melhor Planejamento</h3>
              <p className="text-gray-600">
                Tome decisões baseadas em dados reais de performance
              </p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 py-20 text-white">
          <div className="container-max">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Como Funciona
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold mb-2">Instalação</h3>
                <p className="text-white/80 text-sm">
                  Configuramos agentes de monitoramento em sua infraestrutura
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold mb-2">Coleta de Dados</h3>
                <p className="text-white/80 text-sm">
                  Métricas são coletadas continuamente 24/7
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold mb-2">Análise</h3>
                <p className="text-white/80 text-sm">
                  Sistema identifica anomalias e tendências
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold mb-2">Ação</h3>
                <p className="text-white/80 text-sm">
                  Nossa equipe age proativamente para resolver
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container-max py-20">
          <div className="bg-gradient-to-br from-maginf-orange to-orange-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Comece a Monitorar Hoje
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Tenha visibilidade completa da sua infraestrutura de TI e durma tranquilo sabendo que estamos cuidando de tudo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#contato"
                className="inline-block bg-white text-maginf-orange px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Solicitar Demonstração
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

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
