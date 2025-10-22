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
      title: "Suporte MSP - Grupo Educacional",
      category: "MSP",
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
              <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-maginf-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                      Destaque
                    </span>
                  </div>
                )}
                
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="opacity-0 group-hover:opacity-100 bg-white text-maginf-orange p-3 rounded-full hover:bg-maginf-orange hover:text-white transition-all duration-300"
                    >
                      <Eye className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {project.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {project.team}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="w-full btn-primary justify-center"
                  >
                    Ver detalhes
                    <ExternalLink className="h-4 w-4" />
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
