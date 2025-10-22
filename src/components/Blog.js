import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { IMAGES } from '../config/imageConfig';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const articles = [
    {
      id: 1,
      title: "MSP vs Suporte Tradicional: Qual é a melhor escolha para sua empresa?",
      excerpt: "Análise comparativa entre contratar um MSP e manter equipe interna de TI. Descubra quando cada modelo faz mais sentido financeiramente e operacionalmente para PMEs.",
      author: "Carlos Silva - CTO MAGINF",
      date: "15 Out 2025",
      readTime: "8 min",
      category: "MSP",
      image: IMAGES.blog.mspGuide,
      featured: true
    },
    {
      id: 2,
      title: "Ransomware em 2025: Como proteger sua empresa dos ataques mais comuns",
      excerpt: "Guia prático com 12 medidas preventivas contra ransomware, incluindo backup 3-2-1, segmentação de rede e treinamento de funcionários. Cases reais de empresas atacadas.",
      author: "Ana Costa - Especialista em Segurança",
      date: "12 Out 2025",
      readTime: "10 min",
      category: "Segurança",
      image: IMAGES.blog.segurancaTi,
    },
    {
      id: 3,
      title: "Microsoft 365 Business vs Enterprise: Qual licença escolher?",
      excerpt: "Comparativo detalhado entre as licenças do M365, com planilha de custos, funcionalidades e recomendações por porte de empresa. Inclui dicas de migração.",
      author: "Roberto Lima - Consultor Microsoft",
      date: "10 Out 2025",
      readTime: "12 min",
      category: "Produtividade",
      image: IMAGES.blog.microsoft365,
    },
    {
      id: 4,
      title: "Estratégia de Backup 3-2-1: Implementação prática para PMEs",
      excerpt: "Tutorial completo para implementar a regra 3-2-1 de backup: 3 cópias, 2 mídias diferentes, 1 offsite. Inclui ferramentas, custos e cronograma de implementação.",
      author: "Marcos Santos - Especialista em Backup",
      date: "08 Out 2025",
      readTime: "9 min",
      category: "Cloud",
      image: IMAGES.blog.backupNuvem,
    },
    {
      id: 5,
      title: "NOC (Network Operations Center): Vale a pena terceirizar o monitoramento?",
      excerpt: "Análise de ROI do monitoramento 24/7 terceirizado vs equipe interna. Métricas de SLA, custos operacionais e benefícios do NOC para empresas de 50-500 funcionários.",
      author: "Patricia Oliveira - Gerente de Operações",
      date: "05 Out 2025",
      readTime: "7 min",
      category: "Monitoramento",
      image: IMAGES.blog.monitoramento247,
    },
    {
      id: 6,
      title: "CFTV IP vs Analógico: Migração e ROI em 2025",
      excerpt: "Guia completo de migração de CFTV analógico para IP. Análise de custos, benefícios da IA integrada, armazenamento em nuvem e cases de sucesso em diferentes setores.",
      author: "João Ferreira - Especialista em CFTV",
      date: "03 Out 2025",
      readTime: "11 min",
      category: "CFTV",
      image: IMAGES.blog.cftvInteligente,
    }
  ];

  const categories = ["Todos", "MSP", "Segurança", "Produtividade", "Cloud", "Monitoramento", "CFTV"];

  // Filtrar artigos baseado na categoria ativa
  const filteredArticles = activeCategory === 'Todos' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  console.log('Categoria ativa:', activeCategory);
  console.log('Artigos filtrados:', filteredArticles.length);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container-max">
        <AnimatedSection animation="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Blog & Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantenha-se atualizado com as últimas tendências em tecnologia, 
              dicas práticas e insights do mercado de TI.
            </p>
          </div>
        </AnimatedSection>

        {/* Filtros de Categoria */}
        <AnimatedSection animation="fadeInUp" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  console.log('Clicou em:', category);
                  setActiveCategory(category);
                }}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-maginf-orange text-white shadow-lg transform scale-105' 
                    : 'bg-white text-gray-600 hover:bg-maginf-orange hover:text-white shadow-md hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Artigo em Destaque - Só mostra quando "Todos" está selecionado */}
        {activeCategory === 'Todos' && (
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <div className="mb-16">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={articles[0].image} 
                      alt={articles[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-maginf-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                        Destaque
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {articles[0].category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {articles[0].title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {articles[0].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {articles[0].author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {articles[0].date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {articles[0].readTime}
                        </div>
                      </div>
                      
                      <button className="flex items-center gap-2 text-maginf-orange hover:text-maginf-orange-dark font-medium transition-colors">
                        Ler mais
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Grid de Artigos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(activeCategory === 'Todos' ? 1 : 0).map((article, index) => (
            <AnimatedSection 
              key={article.id} 
              animation="fadeInUp" 
              delay={0.1 * index}
            >
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <button className="text-maginf-orange hover:text-maginf-orange-dark font-medium transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedSection animation="fadeInUp" delay={0.5}>
          <div className="text-center mt-16">
            <button className="btn-primary">
              Ver todos os artigos
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Blog;
