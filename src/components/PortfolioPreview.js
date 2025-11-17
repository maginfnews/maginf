import React from 'react';
import { ArrowRight, CheckCircle, MapPin, Calendar } from 'lucide-react';
import { IMAGES } from '../config/imageConfig';

const PortfolioPreview = () => {
  const featuredProjects = [
    {
      id: 1,
      title: "Modernização de Infraestrutura",
      category: "Infraestrutura Cloud",
      color: "from-blue-600 to-cyan-600",
      client: "Indústria Metalúrgica",
      location: "São Paulo, SP",
      date: "Set 2025",
      description: "Migração completa para nuvem híbrida com Azure e implementação de monitoramento 24/7.",
      image: IMAGES.portfolio.infraestrutura,
      results: [
        "99.9% de uptime alcançado",
        "Redução de 40% nos custos",
        "Backup automatizado"
      ]
    },
    {
      id: 2,
      title: "Sistema CFTV Inteligente",
      category: "CFTV & Segurança",
      color: "from-red-600 to-orange-600",
      client: "Shopping Center",
      location: "Guarulhos, SP",
      date: "Ago 2025",
      description: "120 câmeras IP com analytics de IA e integração com sistema de segurança.",
      image: IMAGES.portfolio.cftvShopping,
      results: [
        "120 câmeras instaladas",
        "Detecção automática de incidentes",
        "60% menos ocorrências"
      ]
    },
    {
      id: 3,
      title: "Migração Microsoft 365",
      category: "Cloud & Produtividade",
      color: "from-purple-600 to-pink-600",
      client: "Escritório de Advocacia",
      location: "São Paulo, SP",
      date: "Jul 2025",
      description: "Migração completa para M365 com políticas de segurança e treinamento.",
      image: IMAGES.portfolio.microsoft365Advocacia,
      results: [
        "50 usuários migrados",
        "100% em nuvem",
        "Segurança avançada"
      ]
    }
  ];

  return (
    <section id="portfolio" className="bg-gradient-to-b from-gray-50 to-white section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-maginf-gray mb-4">
            Cases de Sucesso
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos projetos que transformaram a tecnologia de nossos clientes
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center p-6">
                    <div className="text-sm font-semibold mb-2 opacity-90">{project.category}</div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {project.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm">
                  {project.description}
                </p>

                {/* Results */}
                <div className="space-y-2">
                  {project.results.map((result, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a 
            href="/#contato"
            className="inline-flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Solicitar Orçamento
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
