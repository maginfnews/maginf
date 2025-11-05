import React, { useState } from 'react';
import { ExternalLink, Eye, Calendar, MapPin, Users } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { IMAGES } from '../config/imageConfig';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const projects = [
    {
      id: 1,
      title: "Modernização de Infraestrutura - Indústria Metalúrgica",
      category: "Infraestrutura",
      color: "from-blue-600 to-cyan-600",
      client: "MetalTech Indústria",
      location: "São Paulo, SP",
      date: "Set 2025",
      team: "8 pessoas",
      description: "Migração completa para nuvem híbrida com Microsoft Azure, implementação de backup automatizado e monitoramento 24/7.",
      image: IMAGES.portfolio.infraestrutura,
      technologies: ["Microsoft Azure", "Windows Server", "Backup Veeam", "Monitoramento"],
      results: [
        "99.9% de uptime alcançado",
        "Redução de 40% nos custos de TI",
        "Backup automatizado implementado"
      ],
      featured: true
    },
    {
      id: 2,
      title: "Sistema CFTV Inteligente - Shopping Center",
      category: "CFTV",
      color: "from-red-600 to-orange-600",
      client: "Shopping Metropolitano",
      location: "Guarulhos, SP",
      date: "Ago 2025",
      team: "6 pessoas",
      description: "Instalação de sistema CFTV com 120 câmeras IP, analytics de comportamento e integração com sistema de segurança.",
      image: IMAGES.portfolio.cftvShopping,
      technologies: ["Câmeras IP 4K", "Analytics IA", "Storage NAS", "Monitoramento"],
      results: [
        "120 câmeras instaladas",
        "Detecção automática de incidentes",
        "Redução de 60% em ocorrências"
      ]
    },
    {
      id: 3,
      title: "Migração Microsoft 365 - Escritório de Advocacia",
      category: "Cloud",
      color: "from-purple-600 to-pink-600",
      client: "Advocacia & Associados",
      location: "São Paulo, SP",
      date: "Jul 2025",
      team: "4 pessoas",
      description: "Migração completa para Microsoft 365 com implementação de políticas de segurança e treinamento de usuários.",
      image: IMAGES.portfolio.microsoft365Advocacia,
      technologies: ["Microsoft 365", "Exchange Online", "SharePoint", "Teams"],
      results: [
        "50 usuários migrados",
        "Colaboração 100% em nuvem",
        "Segurança avançada implementada"
      ]
    },
    {
      id: 4,
      title: "Rede Wi-Fi Corporativa - Hospital",
      category: "Redes",
      color: "from-green-600 to-emerald-600",
      client: "Hospital São Lucas",
      location: "Osasco, SP",
      date: "Jun 2025",
      team: "10 pessoas",
      description: "Implementação de rede Wi-Fi 6 em todo o hospital com cobertura completa e segurança hospitalar.",
      image: IMAGES.portfolio.wifiHospital,
      technologies: ["Wi-Fi 6", "Ubiquiti", "VLAN Segmentada", "Monitoramento"],
      results: [
        "100% de cobertura Wi-Fi",
        "Velocidade 10x superior",
        "Segurança hospitalar garantida"
      ]
    },
    {
      id: 5,
      color: "from-yellow-600 to-amber-600",
      title: "Backup e Disaster Recovery - Fintech",
      category: "Backup",
      client: "FinPay Solutions",
      location: "São Paulo, SP",
      date: "Mai 2025",
      team: "5 pessoas",
      description: "Implementação de solução de backup híbrida com replicação em tempo real e plano de disaster recovery.",
      image: IMAGES.portfolio.backupFintech,
      technologies: ["Veeam Backup", "AWS S3", "Replicação", "DR Testing"],
      results: [
        "RTO de 15 minutos",
        "RPO de 5 minutos",
        "99.99% de disponibilidade"
      ]
    },
    {
      id: 6,
      title: "Contrato MSP - Instituição de Ensino",
      category: "MSP",
      color: "from-indigo-600 to-blue-600",
      client: "Colégio Excelência",
      location: "São Paulo, SP",
      date: "Abr 2025",
      team: "12 pessoas",
      description: "Contrato MSP completo com suporte 24/7, monitoramento proativo e gestão de toda infraestrutura de TI.",
      image: IMAGES.portfolio.mspEducacao,
      technologies: ["RMM", "PSA", "Monitoramento", "Help Desk"],
      results: [
        "500+ usuários atendidos",
        "Suporte 24/7 implementado",
        "SLA 99.5% mantido"
      ]
    }
  ];

  const categories = ["Todos", "Infraestrutura", "CFTV", "Cloud", "Redes", "Backup", "MSP"];

  const filteredProjects = activeFilter === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container-max">
        <AnimatedSection animation="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Projetos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos para nossos clientes, 
              sempre focando em resultados e excelência técnica.
            </p>
          </div>
        </AnimatedSection>

        {/* Filtros */}
        <AnimatedSection animation="fadeInUp" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  activeFilter === category
                    ? 'bg-maginf-orange text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-maginf-orange hover:text-white shadow-md hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grid de Projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedSection 
              key={project.id} 
              animation="fadeInUp" 
              delay={0.1 * index}
            >
              <div className="relative rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-500">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}></div>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute -top-3 -right-3 z-20">
                    <span className="bg-white text-maginf-orange px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      ⭐ DESTAQUE
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-6 text-white">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/90 mb-4 line-clamp-3 text-sm">
                    {project.description}
                  </p>
                  
                  {/* Info Cards */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-medium">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs font-medium">{project.date}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                      <Users className="h-4 w-4" />
                      <span className="text-xs font-medium">{project.team}</span>
                    </div>
                  </div>
                  
                  {/* Button */}
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="w-full bg-white text-gray-900 py-3 px-4 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                  >
                    Ver Detalhes
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Modal de Projeto */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedProject.category}
                  </span>
                  {selectedProject.featured && (
                    <span className="bg-maginf-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                      Projeto Destaque
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedProject.title}
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cliente</h4>
                    <p className="text-gray-600">{selectedProject.client}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Localização</h4>
                    <p className="text-gray-600">{selectedProject.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Equipe</h4>
                    <p className="text-gray-600">{selectedProject.team}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Descrição</h4>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Tecnologias Utilizadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Resultados Alcançados</h4>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-maginf-orange rounded-full"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
