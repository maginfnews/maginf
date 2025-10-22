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
        <div className="grid lg:grid-cols-2 gap-12">
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

          {/* Identity */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-maginf-gray mb-3">Identidade Visual</h4>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-8 bg-maginf-orange rounded"></div>
                <span className="text-sm text-gray-600">Laranja (cor ativa/CTA)</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-maginf-gray rounded"></div>
                <span className="text-sm text-gray-600">Cinza (cor institucional)</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-maginf-gray mb-3">Tom de Comunicação</h4>
              <p className="text-sm text-gray-600">
                Profissional, acessível e confiável — linguagem técnica mas sem jargões excessivos. 
                Focamos na clareza e transparência em todas as comunicações.
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-maginf-gray mb-6 text-center">
            Prova Social
          </h3>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-gray-700 mb-6">
              Atuamos com projetos para órgãos de ensino e secretarias, além de clientes corporativos locais. 
              Exemplos de atuação incluem suporte a instituições educacionais, implantação de CFTV e 
              fornecimento de hardware em grandes volumes.
            </p>
            <div className="bg-white rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-600 italic">
                "Clientes específicos podem ser listados mediante autorização"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
