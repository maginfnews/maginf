import React from 'react';
import { Calendar, ArrowRight, Award, Cloud, Shield } from 'lucide-react';
import Link from 'next/link';

const BlogPreview = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "Como Escolher o MSP Ideal para Sua Empresa no Brasil",
      excerpt: "Descubra os critérios essenciais para selecionar um provedor de serviços gerenciados.",
      date: "2025-11-17",
      category: "MSP",
      icon: <Award className="h-12 w-12" />,
      gradient: "from-blue-600 to-cyan-600",
      slug: "como-escolher-msp-brasil"
    },
    {
      id: 2,
      title: "Backup em Nuvem vs Backup Local: Qual é Melhor?",
      excerpt: "Análise completa das vantagens e desvantagens de cada solução de backup.",
      date: "2025-11-17",
      category: "Backup",
      icon: <Cloud className="h-12 w-12" />,
      gradient: "from-purple-600 to-pink-600",
      slug: "backup-nuvem-vs-local"
    },
    {
      id: 3,
      title: "Segurança de Dados: Protegendo sua Empresa em 2025",
      excerpt: "As melhores práticas e tecnologias para proteger os dados da sua empresa.",
      date: "2025-11-17",
      category: "Segurança",
      icon: <Shield className="h-12 w-12" />,
      gradient: "from-red-600 to-orange-600",
      slug: "seguranca-dados-empresas"
    }
  ];

  return (
    <section id="blog" className="bg-gradient-to-b from-gray-50 to-white section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-maginf-gray mb-4">
            Blog & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dicas, novidades e tendências sobre tecnologia e transformação digital
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredArticles.map((article) => (
            <Link 
              key={article.id}
              href={`/blog/${article.slug}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image with Icon */}
              <div className={`h-40 bg-gradient-to-br ${article.gradient} flex items-center justify-center text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  {article.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="px-2 py-1 bg-maginf-orange/10 text-maginf-orange rounded text-xs font-semibold">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-maginf-gray mb-3 group-hover:text-maginf-orange transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {article.excerpt}
                </p>

                <span className="text-maginf-orange font-semibold flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                  Ler mais
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Ver Todos os Artigos
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
