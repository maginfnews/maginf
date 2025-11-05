import React from 'react';
import { 
  Award, 
  Users, 
  Building, 
  GraduationCap,
  Shield,
  Clock,
  CheckCircle,
  Target
} from 'lucide-react';
import { IMAGES } from '../config/imageConfig';
import CountUp from './CountUp';

const About = () => {
  const differentials = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Atendimento 24/7",
      description: "Suporte técnico presencial e remoto disponível 24 horas por dia, 7 dias por semana."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Especialização Técnica",
      description: "Expertise em CFTV, redes Wi-Fi mesh, servidores e soluções em nuvem (AWS, Microsoft 365)."
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Experiência Pública",
      description: "Ampla experiência em projetos para órgãos públicos e instituições educacionais."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Fornecimento Completo",
      description: "Integração de hardware com logística, NF-e e suporte fiscal para grandes volumes."
    }
  ];

  const stats = [
    { number: "8+", label: "Anos de experiência", icon: <Clock className="h-8 w-8" /> },
    { number: "100+", label: "Clientes atendidos", icon: <Users className="h-8 w-8" /> },
    { number: "99.5%", label: "Disponibilidade SLA", icon: <CheckCircle className="h-8 w-8" /> },
    { number: "24/7", label: "Monitoramento", icon: <Shield className="h-8 w-8" /> }
  ];

  const expertise = [
    "Órgãos educacionais e secretarias",
    "Empresas locais e corporações",
    "Projetos de CFTV e segurança",
    "Fornecimento de hardware em volume",
    "Migração para nuvem (AWS/Azure)",
    "Redes Wi-Fi empresariais"
  ];

  return (
    <section id="sobre" className="bg-white section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-maginf-gray mb-4">
            Sobre a <span className="text-maginf-gray">MAGINF</span><span className="text-maginf-orange">TECNOLOGIA</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 8 anos transformando a tecnologia em motor de crescimento para empresas brasileiras.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Company Description */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-maginf-orange to-maginf-orange-dark p-8 rounded-2xl text-white">
              <Target className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
              <p className="text-lg leading-relaxed">
                Garantir que a tecnologia funcione como motor do negócio: 
                <strong> disponível, segura e escalável</strong>. Trabalhamos com contratos de SLA claros, 
                pacotes MSP flexíveis e atendimento humano.
              </p>
            </div>

            <div className="prose prose-lg text-gray-700">
              <p>
                A <strong>MAGINF Tecnologia</strong> é uma empresa brasileira especializada em soluções de TI, 
                com mais de 8 anos de atuação atendendo clientes do setor público e privado — incluindo 
                órgãos educacionais e empresas locais.
              </p>
              <p>
                Oferecemos serviços completos que vão desde suporte técnico presencial até gestão de 
                infraestrutura em nuvem (AWS, Microsoft 365), projetos de CFTV, redes Wi-Fi e 
                fornecimento de hardware.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-maginf-orange mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-maginf-gray mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Differentials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-maginf-gray mb-8 text-center">
            Nossos Diferenciais
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-maginf-orange text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-maginf-gray mb-3">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Areas */}
        <div className="max-w-2xl mx-auto">
          {/* Expertise */}
          <div className="bg-maginf-gray rounded-2xl p-8 text-white">
            <div className="flex items-center mb-6">
              <GraduationCap className="h-8 w-8 text-maginf-orange mr-3" />
              <h3 className="text-xl font-bold">Áreas de Atuação</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {expertise.map((area, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-maginf-orange rounded-full mr-3"></div>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-maginf-gray mb-8 text-center">
            O que nossos clientes dizem
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-maginf-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-maginf-gray">Maria Silva</h4>
                  <p className="text-sm text-gray-600">Diretora de TI</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "O suporte 24/7 da MAGINF foi essencial para manter nossa operação funcionando sem interrupções. A equipe é extremamente competente e ágil."
              </p>
              <div className="flex text-maginf-orange">
                ★★★★★
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-maginf-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                  J
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-maginf-gray">João Santos</h4>
                  <p className="text-sm text-gray-600">Gestor de Infraestrutura</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "A migração para a nuvem foi conduzida de forma impecável. Reduzimos custos e aumentamos a segurança dos nossos dados."
              </p>
              <div className="flex text-maginf-orange">
                ★★★★★
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-maginf-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-maginf-gray">Ana Costa</h4>
                  <p className="text-sm text-gray-600">Coordenadora Administrativa</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "Profissionais altamente qualificados. A implementação do sistema de CFTV superou nossas expectativas em qualidade e prazo."
              </p>
              <div className="flex text-maginf-orange">
                ★★★★★
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery - Nosso Trabalho */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-maginf-gray mb-8 text-center">
            Nosso Trabalho em Ação
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Image 1 - Data Center */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src={IMAGES.about.team} 
                alt="Equipe técnica MAGINF"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maginf-gray/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold text-lg">Equipe Especializada</h4>
                  <p className="text-sm text-gray-300">Profissionais certificados em TI</p>
                </div>
              </div>
            </div>

            {/* Image 2 - Technician */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src={IMAGES.about.technician} 
                alt="Técnico trabalhando"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maginf-gray/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold text-lg">Suporte Técnico</h4>
                  <p className="text-sm text-gray-300">Atendimento presencial e remoto</p>
                </div>
              </div>
            </div>

            {/* Image 3 - Office */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src={IMAGES.about.office} 
                alt="Infraestrutura moderna"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maginf-gray/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold text-lg">Infraestrutura Moderna</h4>
                  <p className="text-sm text-gray-300">Tecnologia de ponta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
