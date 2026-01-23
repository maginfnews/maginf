import React from 'react';
import SEO from '../src/components/SEO';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import { Cloud, Shield, Clock, CheckCircle, Database, Lock } from 'lucide-react';

export default function BackupNuvem() {
  const features = [
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Backup Automático",
      description: "Backups diários automáticos sem intervenção manual"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Criptografia AES-256",
      description: "Seus dados protegidos com criptografia militar"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Recuperação Rápida",
      description: "Restaure seus dados em minutos, não em horas"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Armazenamento Ilimitado",
      description: "Sem limites de espaço para seus backups"
    }
  ];

  const benefits = [
    "Backup incremental para economia de banda",
    "Versionamento de arquivos (até 30 versões)",
    "Retenção configurável de dados",
    "Testes automáticos de recuperação",
    "Relatórios detalhados de backup",
    "Suporte para Windows, Linux e macOS",
    "Backup de bancos de dados (SQL, MySQL, PostgreSQL)",
    "Disaster Recovery Plan incluso"
  ];

  return (
    <>
      <SEO 
        title="Backup em Nuvem Empresarial | Proteção de Dados MAGINF"
        description="Solução completa de backup em nuvem para empresas. Backup automático, criptografia AES-256, recuperação rápida e armazenamento ilimitado."
        keywords="backup em nuvem, backup cloud, proteção de dados, disaster recovery, backup empresarial, backup automático"
        canonical="https://maginf.com.br/backup-nuvem"
        ogUrl="https://maginf.com.br/backup-nuvem"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Backup em Nuvem Empresarial
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Proteja os dados da sua empresa com nossa solução completa de backup em nuvem. 
                  Seguro, automático e sempre disponível.
                </p>
                <a 
                  href="/#contato"
                  className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Proteger Meus Dados
                </a>
              </div>
              <div className="flex items-center justify-center">
                <Database className="h-64 w-64 text-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container-max py-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-16">
            Por Que Backup em Nuvem?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 text-purple-600">
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

        {/* How it Works */}
        <div className="bg-white py-20">
          <div className="container-max">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-16">
              Como Funciona
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-maginf-gray mb-3">Instalação</h3>
                <p className="text-gray-600">
                  Instalamos o agente de backup em seus servidores e estações de trabalho
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-maginf-gray mb-3">Configuração</h3>
                <p className="text-gray-600">
                  Definimos políticas de backup, retenção e horários ideais para sua empresa
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-maginf-gray mb-3">Proteção</h3>
                <p className="text-gray-600">
                  Seus dados são protegidos automaticamente todos os dias, sem preocupação
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="container-max py-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-12">
            O Que Está Incluído
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-gray-100 py-20">
          <div className="container-max">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-maginf-gray mb-12">
              Nuvem vs Local
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-purple-600 mb-6">☁️ Backup em Nuvem</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Acesso de qualquer lugar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Proteção contra desastres físicos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Escalabilidade automática</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Sem necessidade de hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Custo previsível mensal</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-600 mb-6">💾 Backup Local</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Vulnerável a incêndios e roubos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Requer manutenção de hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Capacidade limitada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Investimento inicial alto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Acesso apenas local</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container-max py-20">
          <div className="bg-gradient-to-br from-maginf-orange to-orange-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Não Arrisque Perder Seus Dados
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Comece a proteger os dados da sua empresa hoje mesmo com nossa solução de backup em nuvem.
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

        <Footer />      </div>
    </>
  );
}
