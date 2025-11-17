import { useRouter } from 'next/router';
import SEO from '../../src/components/SEO';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import WhatsAppButton from '../../src/components/WhatsAppButton';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Dados dos artigos
const articles = {
  'como-escolher-msp-brasil': {
    title: 'Como Escolher o MSP Ideal para Sua Empresa no Brasil',
    date: '2025-11-12',
    author: 'Equipe MAGINF',
    category: 'MSP',
    content: `
      <p>Escolher um provedor de serviços gerenciados (MSP) é uma decisão estratégica que pode impactar significativamente a eficiência e segurança da sua empresa.</p>
      
      <h2>1. Experiência e Especialização</h2>
      <p>Procure um MSP com experiência comprovada no mercado brasileiro. Verifique há quanto tempo a empresa atua e quais certificações possui (Microsoft, AWS, Cisco, etc.).</p>
      
      <h2>2. Portfólio de Serviços</h2>
      <p>Um bom MSP deve oferecer:</p>
      <ul>
        <li>Monitoramento 24/7 de infraestrutura</li>
        <li>Backup e disaster recovery</li>
        <li>Segurança da informação</li>
        <li>Suporte técnico especializado</li>
        <li>Gestão de cloud (AWS, Azure, Microsoft 365)</li>
      </ul>
      
      <h2>3. SLA e Disponibilidade</h2>
      <p>Exija um SLA (Service Level Agreement) claro com garantias de uptime mínimo de 99.9% e tempos de resposta definidos para cada tipo de chamado.</p>
      
      <h2>4. Referências e Cases de Sucesso</h2>
      <p>Solicite referências de clientes atuais e cases de sucesso. Um MSP confiável terá prazer em compartilhar histórias de clientes satisfeitos.</p>
      
      <h2>5. Transparência e Comunicação</h2>
      <p>O MSP deve fornecer relatórios regulares, dashboards em tempo real e manter comunicação clara sobre o status da sua infraestrutura.</p>
      
      <h2>6. Custo-Benefício</h2>
      <p>Compare não apenas o preço, mas o valor entregue. Um MSP mais caro pode economizar muito mais em downtime evitado e produtividade aumentada.</p>
      
      <h2>Conclusão</h2>
      <p>A MAGINF Tecnologia atende todos esses critérios, oferecendo serviços gerenciados completos com mais de 8 anos de experiência no mercado brasileiro.</p>
    `
  },
  'backup-nuvem-vs-local': {
    title: 'Backup em Nuvem vs Backup Local: Qual é Melhor?',
    date: '2025-11-10',
    author: 'Equipe MAGINF',
    category: 'Backup',
    content: `
      <p>A escolha entre backup em nuvem e backup local é crucial para a segurança dos dados da sua empresa. Vamos analisar as vantagens e desvantagens de cada solução.</p>
      
      <h2>Backup em Nuvem</h2>
      <h3>Vantagens:</h3>
      <ul>
        <li><strong>Proteção contra desastres físicos:</strong> Seus dados estão seguros mesmo em caso de incêndio, inundação ou roubo</li>
        <li><strong>Acesso remoto:</strong> Restaure dados de qualquer lugar com internet</li>
        <li><strong>Escalabilidade:</strong> Aumente o espaço conforme necessário sem comprar hardware</li>
        <li><strong>Custo previsível:</strong> Pagamento mensal fixo sem investimento inicial alto</li>
        <li><strong>Manutenção zero:</strong> O provedor cuida de toda infraestrutura</li>
      </ul>
      
      <h3>Desvantagens:</h3>
      <ul>
        <li>Depende de conexão com internet</li>
        <li>Custo recorrente mensal</li>
      </ul>
      
      <h2>Backup Local</h2>
      <h3>Vantagens:</h3>
      <ul>
        <li><strong>Velocidade:</strong> Backup e restauração mais rápidos</li>
        <li><strong>Controle total:</strong> Dados ficam fisicamente na empresa</li>
        <li><strong>Sem dependência de internet:</strong> Funciona offline</li>
      </ul>
      
      <h3>Desvantagens:</h3>
      <ul>
        <li>Vulnerável a desastres físicos (incêndio, inundação, roubo)</li>
        <li>Requer investimento em hardware</li>
        <li>Necessita manutenção constante</li>
        <li>Capacidade limitada</li>
        <li>Sem acesso remoto</li>
      </ul>
      
      <h2>Nossa Recomendação: Estratégia 3-2-1</h2>
      <p>A melhor abordagem é combinar ambos:</p>
      <ul>
        <li><strong>3</strong> cópias dos seus dados</li>
        <li><strong>2</strong> tipos diferentes de mídia</li>
        <li><strong>1</strong> cópia offsite (na nuvem)</li>
      </ul>
      
      <p>A MAGINF oferece soluções híbridas que combinam o melhor dos dois mundos, garantindo máxima proteção para seus dados.</p>
    `
  },
  'monitoramento-proativo-ti': {
    title: 'Monitoramento Proativo de TI: Por Que é Essencial?',
    date: '2025-11-08',
    author: 'Equipe MAGINF',
    category: 'Monitoramento',
    content: `
      <p>O monitoramento proativo de TI é a diferença entre prevenir problemas e apagar incêndios. Descubra por que sua empresa precisa disso.</p>
      
      <h2>O Que é Monitoramento Proativo?</h2>
      <p>Diferente do monitoramento reativo (que age apenas quando algo quebra), o monitoramento proativo identifica e resolve problemas ANTES que afetem seus usuários.</p>
      
      <h2>Benefícios Principais</h2>
      
      <h3>1. Redução de Downtime</h3>
      <p>Estudos mostram que empresas com monitoramento proativo têm 60% menos tempo de inatividade não planejado.</p>
      
      <h3>2. Economia de Custos</h3>
      <p>Cada hora de downtime pode custar milhares de reais. Prevenir é muito mais barato que remediar.</p>
      
      <h3>3. Melhor Performance</h3>
      <p>Identifique gargalos de performance antes que impactem a produtividade dos usuários.</p>
      
      <h3>4. Planejamento Estratégico</h3>
      <p>Dados históricos ajudam a planejar upgrades e expansões com base em tendências reais.</p>
      
      <h2>O Que Deve Ser Monitorado?</h2>
      <ul>
        <li>Servidores (CPU, memória, disco)</li>
        <li>Rede (largura de banda, latência)</li>
        <li>Aplicações críticas</li>
        <li>Bancos de dados</li>
        <li>Serviços em nuvem</li>
        <li>Segurança (tentativas de invasão, malware)</li>
      </ul>
      
      <h2>Como Funciona na Prática</h2>
      <p>O sistema de monitoramento coleta métricas continuamente e usa inteligência artificial para identificar padrões anormais. Quando detecta algo suspeito, gera alertas automáticos para a equipe técnica.</p>
      
      <h2>Conclusão</h2>
      <p>Monitoramento proativo não é luxo, é necessidade. A MAGINF oferece monitoramento 24/7 com alertas inteligentes e equipe sempre pronta para agir.</p>
    `
  },
  'seguranca-dados-empresas': {
    title: 'Segurança de Dados: Protegendo sua Empresa em 2025',
    date: '2025-11-05',
    author: 'Equipe MAGINF',
    category: 'Segurança',
    content: `
      <p>Em 2025, a segurança de dados não é opcional. Com a LGPD em vigor e ameaças cibernéticas cada vez mais sofisticadas, proteger os dados da sua empresa é crucial.</p>
      
      <h2>Principais Ameaças em 2025</h2>
      
      <h3>1. Ransomware</h3>
      <p>Ataques de ransomware cresceram 150% nos últimos 2 anos. Hackers criptografam seus dados e exigem resgate.</p>
      
      <h3>2. Phishing</h3>
      <p>E-mails falsos que enganam funcionários para revelar senhas ou instalar malware.</p>
      
      <h3>3. Ataques DDoS</h3>
      <p>Sobrecarga de servidores para derrubar sites e serviços.</p>
      
      <h3>4. Vazamento de Dados</h3>
      <p>Exposição acidental ou intencional de informações sensíveis.</p>
      
      <h2>Camadas de Proteção Essenciais</h2>
      
      <h3>1. Firewall de Nova Geração</h3>
      <p>Proteção avançada contra ameaças conhecidas e desconhecidas.</p>
      
      <h3>2. Antivírus e Antimalware</h3>
      <p>Proteção em tempo real contra vírus, trojans e malware.</p>
      
      <h3>3. Backup Automatizado</h3>
      <p>Cópias regulares dos dados em local seguro (nuvem).</p>
      
      <h3>4. Autenticação Multifator (MFA)</h3>
      <p>Camada extra de segurança além da senha.</p>
      
      <h3>5. Treinamento de Funcionários</h3>
      <p>80% das brechas de segurança envolvem erro humano. Treine sua equipe.</p>
      
      <h3>6. Monitoramento 24/7</h3>
      <p>Detecção e resposta rápida a incidentes de segurança.</p>
      
      <h2>Conformidade com LGPD</h2>
      <p>A Lei Geral de Proteção de Dados exige:</p>
      <ul>
        <li>Consentimento explícito para coleta de dados</li>
        <li>Transparência sobre uso dos dados</li>
        <li>Direito de exclusão de dados</li>
        <li>Notificação de vazamentos em até 72h</li>
        <li>Multas de até 2% do faturamento</li>
      </ul>
      
      <h2>Checklist de Segurança</h2>
      <ul>
        <li>✓ Firewall configurado e atualizado</li>
        <li>✓ Antivírus em todas as máquinas</li>
        <li>✓ Backup diário automatizado</li>
        <li>✓ Senhas fortes e MFA ativado</li>
        <li>✓ Atualizações de segurança em dia</li>
        <li>✓ Política de segurança documentada</li>
        <li>✓ Treinamento anual de funcionários</li>
      </ul>
      
      <p>A MAGINF oferece soluções completas de segurança da informação, incluindo firewall, antivírus gerenciado, backup em nuvem e treinamento de equipe.</p>
    `
  },
  'infraestrutura-ti-pequenas-empresas': {
    title: 'Infraestrutura de TI para Pequenas Empresas: Guia Completo',
    date: '2025-11-01',
    author: 'Equipe MAGINF',
    category: 'Infraestrutura',
    content: `
      <p>Montar uma infraestrutura de TI eficiente não precisa custar uma fortuna. Este guia mostra como pequenas empresas podem ter tecnologia de ponta.</p>
      
      <h2>Componentes Essenciais</h2>
      
      <h3>1. Rede e Conectividade</h3>
      <ul>
        <li><strong>Internet empresarial:</strong> Mínimo 100Mbps dedicado</li>
        <li><strong>Roteador profissional:</strong> Com firewall integrado</li>
        <li><strong>Wi-Fi empresarial:</strong> Access points gerenciados</li>
        <li><strong>Cabeamento estruturado:</strong> Cat6 ou superior</li>
      </ul>
      
      <h3>2. Servidores e Armazenamento</h3>
      <p><strong>Opção Cloud (Recomendada):</strong></p>
      <ul>
        <li>Microsoft 365 ou Google Workspace</li>
        <li>Servidores virtuais na AWS ou Azure</li>
        <li>Backup em nuvem</li>
      </ul>
      
      <p><strong>Opção Local:</strong></p>
      <ul>
        <li>Servidor físico para arquivos</li>
        <li>NAS para backup</li>
        <li>Virtualização com Hyper-V ou VMware</li>
      </ul>
      
      <h3>3. Estações de Trabalho</h3>
      <ul>
        <li>Computadores com Windows 11 Pro</li>
        <li>Mínimo 8GB RAM, SSD 256GB</li>
        <li>Monitores duplos para produtividade</li>
      </ul>
      
      <h3>4. Segurança</h3>
      <ul>
        <li>Firewall de borda</li>
        <li>Antivírus corporativo</li>
        <li>VPN para acesso remoto</li>
        <li>Backup automatizado</li>
      </ul>
      
      <h3>5. Comunicação</h3>
      <ul>
        <li>Sistema de telefonia VoIP</li>
        <li>E-mail profissional</li>
        <li>Ferramentas de colaboração (Teams, Slack)</li>
      </ul>
      
      <h2>Custos Estimados</h2>
      
      <h3>Setup Inicial (10 usuários):</h3>
      <ul>
        <li>Rede e cabeamento: R$ 5.000</li>
        <li>Estações de trabalho: R$ 30.000</li>
        <li>Servidor (se local): R$ 15.000</li>
        <li>Total: R$ 50.000</li>
      </ul>
      
      <h3>Custos Mensais:</h3>
      <ul>
        <li>Internet: R$ 500</li>
        <li>Microsoft 365: R$ 600</li>
        <li>Backup em nuvem: R$ 300</li>
        <li>MSP (gerenciamento): R$ 997</li>
        <li>Total: R$ 2.397/mês</li>
      </ul>
      
      <h2>Estratégia de Implementação</h2>
      
      <h3>Fase 1 - Básico (Mês 1):</h3>
      <ul>
        <li>Internet empresarial</li>
        <li>Rede Wi-Fi</li>
        <li>Microsoft 365</li>
        <li>Estações de trabalho</li>
      </ul>
      
      <h3>Fase 2 - Segurança (Mês 2):</h3>
      <ul>
        <li>Firewall</li>
        <li>Antivírus</li>
        <li>Backup em nuvem</li>
      </ul>
      
      <h3>Fase 3 - Otimização (Mês 3+):</h3>
      <ul>
        <li>Monitoramento proativo</li>
        <li>VPN para home office</li>
        <li>Telefonia VoIP</li>
      </ul>
      
      <h2>Dica Final</h2>
      <p>Contratar um MSP como a MAGINF pode economizar até 40% comparado a montar equipe interna, além de garantir expertise especializada e suporte 24/7.</p>
    `
  }
};

export default function BlogArticle() {
  const router = useRouter();
  const { slug } = router.query;
  
  if (!slug || typeof slug !== 'string') {
    return null;
  }

  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-maginf-gray mb-4">Artigo não encontrado</h1>
          <Link href="/blog" className="text-maginf-orange hover:underline">
            Voltar para o blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${article.title} | Blog MAGINF`}
        description={article.content.substring(0, 160).replace(/<[^>]*>/g, '')}
        keywords={`${article.category}, TI, tecnologia, MAGINF`}
        canonical={`https://maginf.com.br/blog/${slug}`}
        ogUrl={`https://maginf.com.br/blog/${slug}`}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Article Header */}
        <div className="bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white py-16">
          <div className="container-max max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o blog
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString('pt-BR')}
              </span>
              <span className="px-2 py-1 bg-maginf-orange rounded text-xs font-semibold">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-2 text-gray-300">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container-max py-16">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-maginf-gray 
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:my-4 prose-li:text-gray-700
                  prose-strong:text-maginf-gray"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-maginf-orange to-orange-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                Gostou do conteúdo?
              </h2>
              <p className="mb-6">
                Entre em contato e descubra como podemos ajudar sua empresa.
              </p>
              <a 
                href="/#contato"
                className="inline-block bg-white text-maginf-orange px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
