import React from 'react';
import SEO from '../src/components/SEO';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import WhatsAppButton from '../src/components/WhatsAppButton';
import { Calendar, User, ArrowRight, Award, Cloud, Activity, Shield, Server } from 'lucide-react';
import Link from 'next/link';

export default function Blog() {
  const articles = [
    {
      slug: "como-escolher-msp-brasil",
      title: "Como Escolher o MSP Ideal para Sua Empresa no Brasil",
      excerpt: "Descubra os critérios essenciais para selecionar um provedor de serviços gerenciados que atenda às necessidades específicas do seu negócio.",
      date: "2025-11-12",
      author: "Equipe MAGINF",
      category: "MSP",
      icon: <Award className="h-20 w-20" />,
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      slug: "backup-nuvem-vs-local",
      title: "Backup em Nuvem vs Backup Local: Qual é Melhor?",
      excerpt: "Análise completa das vantagens e desvantagens de cada solução de backup para ajudar você a tomar a melhor decisão.",
      date: "2025-11-10",
      author: "Equipe MAGINF",
      category: "Backup",
      icon: <Cloud className="h-20 w-20" />,
      gradient: "from-purple-600 to-pink-600"
    },
    {
      slug: "monitoramento-proativo-ti",
      title: "Monitoramento Proativo de TI: Por Que é Essencial?",
      excerpt: "Entenda como o monitoramento 24/7 pode prevenir problemas antes que afetem seu negócio e aumentar a produtividade.",
      date: "2025-11-08",
      author: "Equipe MAGINF",
      category: "Monitoramento",
      icon: <Activity className="h-20 w-20" />,
      gradient: "from-green-600 to-teal-600"
    },
    {
      slug: "seguranca-dados-empresas",
      title: "Segurança de Dados: Protegendo sua Empresa em 2025",
      excerpt: "As melhores práticas e tecnologias para proteger os dados da sua empresa contra ameaças cibernéticas modernas.",
      date: "2025-11-05",
      author: "Equipe MAGINF",
      category: "Segurança",
      icon: <Shield className="h-20 w-20" />,
      gradient: "from-red-600 to-orange-600"
    },
    {
      slug: "infraestrutura-ti-pequenas-empresas",
      title: "Infraestrutura de TI para Pequenas Empresas: Guia Completo",
      excerpt: "Tudo o que você precisa saber para montar uma infraestrutura de TI eficiente e escalável para pequenos negócios.",
      date: "2025-11-01",
      author: "Equipe MAGINF",
      category: "Infraestrutura",
      icon: <Server className="h-20 w-20" />,
      gradient: "from-indigo-600 to-purple-600"
    }
  ];

  return (
    <>
      <SEO 
        title="Blog MAGINF - Dicas e Novidades sobre TI, MSP e Cloud"
        description="Artigos, tutoriais e dicas sobre serviços gerenciados de TI, cloud computing, segurança da informação, backup e infraestrutura tecnológica."
        keywords="blog TI, artigos MSP, dicas cloud, segurança informação, backup empresarial, infraestrutura TI"
        canonical="https://maginf.com.br/blog"
        ogUrl="https://maginf.com.br/blog"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white py-20">
          <div className="container-max">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Blog MAGINF
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Insights, dicas e novidades sobre tecnologia, MSP e transformação digital
              </p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container-max py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Link 
                key={index}
                href={`/blog/${article.slug}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image with Icon */}
                <div className={`h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    {article.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="px-2 py-1 bg-maginf-orange/10 text-maginf-orange rounded text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-maginf-gray mb-3 group-hover:text-maginf-orange transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      {article.author}
                    </span>
                    <span className="text-maginf-orange font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ler mais
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-maginf-gray mb-4">
                Receba Novidades por Email
              </h2>
              <p className="text-gray-600 mb-8">
                Inscreva-se em nossa newsletter e receba dicas exclusivas sobre TI e tecnologia
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-maginf-orange text-white rounded-lg font-bold hover:bg-orange-600 transition-colors"
                >
                  Inscrever
                </button>
              </form>
            </div>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
