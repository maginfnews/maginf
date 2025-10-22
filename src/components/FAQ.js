import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const faqs = [
    {
      id: 1,
      category: "MSP",
      question: "O que é MSP (Managed Service Provider)?",
      answer: "MSP é um provedor de serviços gerenciados que assume a responsabilidade de monitorar, gerenciar e/ou resolver problemas com sistemas de TI de forma proativa. Oferecemos suporte 24/7, monitoramento contínuo, backup, segurança e manutenção preventiva para garantir que sua infraestrutura funcione perfeitamente."
    },
    {
      id: 2,
      category: "MSP",
      question: "Qual a diferença entre suporte tradicional e MSP?",
      answer: "O suporte tradicional é reativo - você chama quando há problema. O MSP é proativo - monitoramos constantemente seus sistemas, identificamos e resolvemos problemas antes que afetem seu negócio. Além disso, oferecemos custos previsíveis, SLA garantido e uma equipe especializada dedicada."
    },
    {
      id: 3,
      category: "Segurança",
      question: "Como vocês garantem a segurança dos nossos dados?",
      answer: "Implementamos múltiplas camadas de segurança: firewall avançado, antivírus empresarial, backup criptografado, monitoramento 24/7, políticas de acesso, atualizações automáticas e treinamento de usuários. Seguimos as melhores práticas de segurança e compliance com LGPD."
    },
    {
      id: 4,
      category: "Backup",
      question: "Com que frequência é feito o backup dos dados?",
      answer: "Realizamos backup automático diário de todos os dados críticos, com retenção configurável (30, 60, 90 dias ou mais). Para dados críticos, podemos configurar backup em tempo real. Todos os backups são testados regularmente e armazenados em múltiplas localidades (local + nuvem)."
    },
    {
      id: 5,
      category: "Suporte",
      question: "Qual o tempo de resposta do suporte técnico?",
      answer: "Nosso SLA garante: Crítico (15 min), Alto (1h), Médio (4h), Baixo (24h). Oferecemos suporte 24/7 via telefone, WhatsApp, email e sistema de tickets. Para clientes MSP, temos monitoramento proativo que resolve muitos problemas antes mesmo de você perceber."
    },
    {
      id: 6,
      category: "Cloud",
      question: "Vocês trabalham com quais plataformas de nuvem?",
      answer: "Somos especialistas em Microsoft Azure, AWS e Google Cloud. Também trabalhamos com Microsoft 365, Google Workspace e soluções híbridas. Ajudamos na migração, configuração, otimização e gerenciamento contínuo de ambientes em nuvem."
    },
    {
      id: 7,
      category: "CFTV",
      question: "Que tipo de sistema CFTV vocês instalam?",
      answer: "Instalamos sistemas CFTV IP com câmeras 4K, analytics de IA, detecção de movimento, reconhecimento facial, acesso remoto via app, armazenamento local e em nuvem. Oferecemos desde sistemas residenciais até grandes corporações com centenas de câmeras."
    },
    {
      id: 8,
      category: "Redes",
      question: "Vocês fazem projeto de rede Wi-Fi corporativa?",
      answer: "Sim! Fazemos survey do local, projeto técnico, instalação de equipamentos empresariais (Ubiquiti, Cisco, etc.), configuração de VLANs, políticas de acesso, guest network e monitoramento. Garantimos cobertura total e performance otimizada."
    },
    {
      id: 9,
      category: "Custos",
      question: "Como funciona a cobrança dos serviços MSP?",
      answer: "Oferecemos planos mensais fixos baseados no número de usuários/dispositivos. Isso inclui monitoramento 24/7, suporte ilimitado, backup, antivírus, atualizações e manutenção preventiva. Sem surpresas na fatura - custo previsível para seu orçamento."
    },
    {
      id: 10,
      category: "Implementação",
      question: "Quanto tempo leva para implementar os serviços?",
      answer: "Depende da complexidade: Monitoramento básico (1-2 dias), Migração para nuvem (1-4 semanas), CFTV (3-10 dias), Rede Wi-Fi (2-7 dias). Fazemos um cronograma detalhado e trabalhamos fora do horário comercial para não impactar suas operações."
    },
    {
      id: 11,
      category: "Suporte",
      question: "Vocês atendem empresas de que tamanho?",
      answer: "Atendemos desde pequenas empresas (5 usuários) até grandes corporações (500+ usuários). Nossos planos são escaláveis e personalizáveis conforme o crescimento da sua empresa. Temos experiência em diversos segmentos: indústria, saúde, educação, varejo, etc."
    },
    {
      id: 12,
      category: "Monitoramento",
      question: "O que é monitorado nos sistemas?",
      answer: "Monitoramos: servidores, workstations, rede, internet, aplicações, banco de dados, backup, antivírus, espaço em disco, performance, temperatura, UPS e muito mais. Recebemos alertas automáticos e agimos proativamente antes que problemas afetem sua operação."
    }
  ];

  const categories = ["Todos", "MSP", "Segurança", "Backup", "Suporte", "Cloud", "CFTV", "Redes", "Custos", "Implementação", "Monitoramento"];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'Todos' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container-max">
        <AnimatedSection animation="fadeInUp">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-16 w-16 text-maginf-orange" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços. 
              Não encontrou o que procura? Entre em contato conosco!
            </p>
          </div>
        </AnimatedSection>

        {/* Busca */}
        <AnimatedSection animation="fadeInUp" delay={0.2}>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar perguntas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-maginf-orange focus:border-transparent text-lg"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Filtros por Categoria */}
        <AnimatedSection animation="fadeInUp" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-maginf-orange text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-maginf-orange hover:text-white shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Lista de FAQs */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhuma pergunta encontrada
                </h3>
                <p className="text-gray-500">
                  Tente ajustar sua busca ou categoria selecionada.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AnimatedSection 
                  key={faq.id} 
                  animation="fadeInUp" 
                  delay={0.1 * index}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        {activeIndex === index ? (
                          <ChevronUp className="h-6 w-6 text-maginf-orange" />
                        ) : (
                          <ChevronDown className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </button>
                    
                    {activeIndex === index && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <AnimatedSection animation="fadeInUp" delay={0.5}>
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-gray-600 mb-6">
                Nossa equipe está pronta para esclarecer qualquer questão e 
                ajudar você a encontrar a melhor solução para sua empresa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Falar com consultor
                </button>
                <button className="btn-secondary">
                  WhatsApp: (11) 3514-2933
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQ;
