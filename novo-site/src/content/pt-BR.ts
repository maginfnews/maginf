import type { SiteContent } from '../types';
import { SECTOR_BACKGROUNDS } from './shared';

export const ptBRContent: SiteContent = {
  meta: {
    title: 'MAGINF Tecnologia | TI gerenciada para operação estável',
    description:
      'A MAGINF ajuda empresas a tirar a TI do modo reativo e operar com mais estabilidade, visibilidade e previsibilidade.',
  },
  brand: {
    homeAriaLabel: 'MAGINF Tecnologia, voltar ao início',
    logoAlt: 'Logotipo da MAGINF Tecnologia',
  },
  nav: {
    languageLabel: 'Idioma',
    cta: 'Falar com consultor',
    mobileCta: 'Agendar diagnóstico',
    openMenuLabel: 'Abrir menu',
    closeMenuLabel: 'Fechar menu',
    links: [
      { label: 'Início', href: '#inicio' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Soluções', href: '#solucoes' },
      { label: 'Setores', href: '#setores' },
      { label: 'Diagnóstico', href: '#diagnostico' },
      { label: 'Contato', href: '#contato' },
    ],
  },
  hero: {
    eyebrow: 'Para empresas que não podem parar',
    title: 'A MAGINF assume a operação de TI para sua empresa ganhar ',
    highlight: 'estabilidade e previsibilidade',
    description:
      'Quando a tecnologia vira gargalo, a equipe perde tempo, produtividade e confiança. Entramos para organizar o ambiente, reduzir incidentes e sustentar a operação com monitoramento, rotina e resposta técnica.',
    primaryCta: 'Solicitar diagnóstico',
    secondaryCta: 'Ver entregas',
    stats: [
      { tag: 'LIVE', value: '99,9%', label: 'Uptime sustentado' },
      { tag: '-30%', value: 'Redução', label: 'Incidentes críticos' },
      { tag: '+150', value: 'Ativos', label: 'Sob gestão contínua' },
      { tag: 'SLA', value: '24/7', label: 'Monitoramento ativo' },
    ],
  },
  features: {
    items: [
      'Menos parada',
      'Mais previsibilidade',
      'Resposta proativa',
      'Segurança assistida',
      'Crescimento com controle',
    ],
  },
  challenges: {
    eyebrow: 'Quando a TI vira urgência',
    title: 'Os sinais aparecem antes da parada, mas costumam ser tratados só quando viram',
    highlight: ' improviso',
    description:
      'E aí que surgem custos invisíveis: equipe interrompida, chamados recorrentes, risco operacional e falta de clareza para priorizar o que realmente importa.',
    items: [
      {
        title: 'Chamados repetidos consumindo a equipe',
        description:
          'Usuários param pela mesma causa, o suporte reage tarde e o time perde tempo produtivo em interrupções evitáveis.',
        impact: 'Impacto: operação mais lenta e percepção de desorganização.',
      },
      {
        title: 'Infraestrutura crescendo sem padrão',
        description:
          'Novos acessos, equipamentos e filiais são adicionados sem processo consistente, aumentando fragilidade técnica.',
        impact: 'Impacto: mais risco, mais retrabalho e mais dependência de improviso.',
      },
      {
        title: 'Backup e segurança tratados como tarefa paralela',
        description:
          'Proteção, retenção e resposta a incidentes ficam dispersas entre ferramentas e rotinas incompletas.',
        impact: 'Impacto: maior exposição a perda de dados e indisponibilidade.',
      },
      {
        title: 'Falta de visibilidade para decidir',
        description:
          'Sem monitoramento confiável e priorização técnica, cada problema parece urgente e nenhuma melhoria ganha sequência.',
        impact: 'Impacto: o negócio cresce sem confiança na base de TI.',
      },
    ],
    conclusion:
      'A MAGINF entra justamente nesse ponto: para tirar a TI do modo reativo, organizar a base e sustentar a operação com método.',
  },
  services: {
    eyebrow: 'O que muda na prática',
    title: 'Entregas que reduzem ruído operacional e aumentam controle',
    description:
      'Não entregamos peças soltas. Organizamos suporte, infraestrutura, cloud, backup e monitoramento para atacar a causa dos problemas e devolver previsibilidade para a operação.',
    ctaLabel: 'Conversar',
    filters: [
      { id: 'all', label: 'Todos' },
      { id: 'infra', label: 'Infra' },
      { id: 'suporte', label: 'Suporte' },
      { id: 'operacoes', label: 'Operações' },
      { id: 'seguranca', label: 'Segurança' },
      { id: 'cloud', label: 'Cloud' },
    ],
    categoryLabels: {
      infra: 'Infraestrutura',
      suporte: 'Suporte',
      cloud: 'Cloud',
      network: 'Redes',
      operacoes: 'Operações',
      seguranca: 'Segurança',
    },
    items: [
      {
        id: '1',
        title: 'Suporte que reduz interrupções',
        description:
          'Atendimento gerenciado para usuários, endpoints e servidores com foco em resolução consistente e continuidade.',
        category: 'suporte',
        icon: 'engineering',
      },
      {
        id: '2',
        title: 'Infraestrutura pronta para crescer',
        description:
          'Arquitetura, padronização e documentação para ambientes menos frágeis e mais escaláveis.',
        category: 'infra',
        icon: 'settings_input_component',
      },
      {
        id: '3',
        title: 'Wi-Fi corporativo com cobertura confiável',
        description:
          'Projeto e ajuste de rede sem fio para manter equipes, salas e filiais conectadas com estabilidade.',
        category: 'network',
        icon: 'wifi',
      },
      {
        id: '4',
        title: 'Monitoramento que antecipa falhas',
        description:
          'Visibilidade 24/7 sobre ativos e serviços para agir antes que o problema pare a operação.',
        category: 'operacoes',
        icon: 'monitoring',
      },
      {
        id: '5',
        title: 'Backup e continuidade com rotina séria',
        description:
          'Proteção, retenção e recuperação desenhadas para reduzir exposição e acelerar resposta.',
        category: 'seguranca',
        icon: 'backup',
      },
      {
        id: '6',
        title: 'Microsoft 365 e cloud com governança',
        description:
          'Migração, sustentação e controle de ambiente para escalar sem perder visibilidade.',
        category: 'cloud',
        icon: 'cloud',
      },
    ],
  },
  maturity: {
    eyebrow: 'Por que as empresas nos chamam',
    title: 'A diferença não está em mais ferramenta, mas em',
    highlight: ' operação assistida',
    description:
      'Quando a base é organizada, a TI deixa de consumir energia em incêndios recorrentes e passa a apoiar crescimento, segurança e produtividade.',
    principles: [
      {
        id: '01',
        title: 'Menos reação, mais prevenção',
        description:
          'Monitoramento e rotina técnica substituem o ciclo de apagar incêndio.',
      },
      {
        id: '02',
        title: 'Ambiente mais padronizado',
        description:
          'A infraestrutura ganha documentação, critério e menos dependência de soluções improvisadas.',
      },
      {
        id: '03',
        title: 'Decisão com mais clareza',
        description:
          'Prioridades ficam visíveis e as próximas mudanças passam a ter sequência lógica.',
      },
    ],
    metrics: [
      { value: '30%', label: 'Menos incidentes críticos', highlight: true },
      { value: '24/7', label: 'Visibilidade operacional' },
      { value: '100%', label: 'Continuidade assistida', highlight: true },
      { value: '+150', label: 'Ativos acompanhados' },
    ],
  },
  flow: {
    eyebrow: 'Como conduzimos a mudança',
    title: 'Do diagnóstico à operação contínua',
    description:
      'Nosso processo existe para gerar confiança logo no início: entender o cenário, corrigir a base e sustentar a evolução sem improviso.',
    steps: [
      {
        id: '01',
        title: '01. Diagnóstico',
        description:
          'Levantamos gargalos, riscos e dependências que hoje afetam produtividade, segurança e continuidade.',
        icon: 'biotech',
      },
      {
        id: '02',
        title: '02. Padronização',
        description:
          'Ajustamos o que está fora de padrão para reduzir fragilidade operacional.',
        icon: 'rule',
      },
      {
        id: '03',
        title: '03. Monitoramento',
        description:
          'Colocamos visibilidade sobre ativos, serviços e recorrências para agir antes do impacto.',
        icon: 'speed',
      },
      {
        id: '04',
        title: '04. Sustentação',
        description:
          'Assumimos uma rotina técnica recorrente com suporte, manutenção e resposta.',
        icon: 'support_agent',
      },
      {
        id: '05',
        title: '05. Evolução',
        description:
          'Priorizamos melhorias com base em risco, capacidade e objetivos do negócio.',
        icon: 'auto_graph',
      },
    ],
  },
  sectors: {
    eyebrow: 'Onde esse modelo faz mais sentido',
    title: 'Perfis de operação que ganham mais com suporte gerenciado',
    description:
      'A comunicação fica mais forte quando o visitante se reconhece. Estes são cenários em que a MAGINF tende a gerar valor mais rápido.',
    items: [
      {
        ...SECTOR_BACKGROUNDS[0],
        title: 'Escritórios corporativos',
        detail: 'Equipes distribuídas e alta dependência de continuidade',
        description:
          'Ambientes com operação híbrida, salas, telefonia IP e usuários que precisam trabalhar sem parar por falhas recorrentes.',
      },
      {
        ...SECTOR_BACKGROUNDS[1],
        title: 'Empresas em expansão',
        detail: 'Crescimento sem perder controle operacional',
        description:
          'Cenários com novas unidades, mais usuários e necessidade de padronizar a base antes que a complexidade aumente.',
      },
      {
        ...SECTOR_BACKGROUNDS[2],
        title: 'Ambientes críticos de rede',
        detail: 'Conectividade, visibilidade e desempenho',
        description:
          'Operações que dependem de rede estável para trabalhar, vender, atender e integrar serviços sem interrupção.',
      },
    ],
  },
  cta: {
    eyebrow: 'Próximo passo',
    title: 'Descubra em poucos minutos o nível atual da sua operação e avance com um',
    highlight: ' diagnóstico online',
    description:
      'O visitante responde perguntas objetivas, recebe uma leitura imediata da maturidade operacional e já pode seguir para o WhatsApp com um resumo pronto para conversa comercial.',
    startLabel: 'Iniciar diagnóstico',
    progressLabel: 'Andamento do diagnóstico',
    questionLabel: 'Perguntas respondidas',
    nextLabel: 'Próxima pergunta',
    lastQuestionLabel: 'Continuar para contato',
    previousLabel: 'Voltar',
    answerRequiredMessage: 'Selecione uma resposta para continuar.',
    stages: {
      intro: 'Leitura inicial',
      questions: 'Questionário',
      lead: 'Dados de contato',
      result: 'Resultado',
    },
    summaryTitle: 'Resumo em tempo real',
    summaryDescription:
      'A pontuação vai se formando a cada resposta para sinalizar se a operação está reativa, em estruturação ou pronta para otimizar.',
    rangesTitle: 'Faixas de maturidade',
    deliverables: [
      {
        title: 'Pontuação imediata',
        description:
          'Cada resposta soma um score e mostra rapidamente em qual faixa operacional a empresa se encontra.',
      },
      {
        title: 'Lead qualificado',
        description:
          'O formulário final captura os dados essenciais para o comercial receber o contexto já filtrado.',
      },
      {
        title: 'WhatsApp com contexto',
        description:
          'O resultado já sai pronto para seguir no WhatsApp com score, nível e recomendações iniciais.',
      },
    ],
    questions: [
      {
        id: 'support',
        prompt: 'Como os chamados e problemas de TI são tratados hoje?',
        helper:
          'Olhe para a rotina real da equipe: tempo de resposta, recorrência e nível de organização do atendimento.',
        options: [
          {
            label: 'Tudo acontece no improviso',
            description:
              'A equipe aciona pessoas diferentes, sem registro confiável nem prioridade clara.',
            score: 0,
          },
          {
            label: 'Existe um atendimento básico',
            description:
              'Os chamados são registrados em alguns casos, mas o retorno ainda depende muito de urgência.',
            score: 1,
          },
          {
            label: 'Já há processo com certa consistência',
            description:
              'Existe fila, prioridades e acompanhamento, mesmo com pontos de melhoria.',
            score: 2,
          },
          {
            label: 'Atendimento estruturado e previsível',
            description:
              'Os chamados são acompanhados com SLA, histórico e aprendizado contínuo.',
            score: 3,
          },
        ],
      },
      {
        id: 'visibility',
        prompt: 'Qual é o nível de visibilidade sobre ativos, falhas e desempenho?',
        helper:
          'Considere servidores, links, Wi-Fi, usuários, equipamentos e qualquer serviço crítico da operação.',
        options: [
          {
            label: 'Quase nenhuma visibilidade',
            description:
              'Normalmente o problema só aparece quando alguém para de trabalhar.',
            score: 0,
          },
          {
            label: 'Visibilidade parcial',
            description:
              'Alguns itens são acompanhados, mas não existe uma visão consolidada do ambiente.',
            score: 1,
          },
          {
            label: 'Monitoramento em pontos importantes',
            description:
              'Os ativos mais sensíveis são monitorados e já existe base para agir antes do impacto.',
            score: 2,
          },
          {
            label: 'Monitoramento recorrente e proativo',
            description:
              'A operação acompanha alertas, histórico e tendências com rotina clara de resposta.',
            score: 3,
          },
        ],
      },
      {
        id: 'standardization',
        prompt: 'O ambiente de TI cresce com padrão e documentação?',
        helper:
          'Pense em acessos, equipamentos, configurações, filiais, onboarding e mudanças recentes.',
        options: [
          {
            label: 'Cada expansão cria exceções',
            description:
              'Novos acessos e ativos entram sem padrão, o que aumenta dependência de memória e retrabalho.',
            score: 0,
          },
          {
            label: 'Existe alguma organização',
            description:
              'Parte do ambiente segue padrão, mas ainda há lacunas grandes de documentação.',
            score: 1,
          },
          {
            label: 'Boa parte do ambiente já é padronizada',
            description:
              'Há critérios definidos, documentação útil e menos improviso em novas demandas.',
            score: 2,
          },
          {
            label: 'Crescimento controlado e documentado',
            description:
              'Mudanças seguem processo, critério técnico e documentação atualizada.',
            score: 3,
          },
        ],
      },
      {
        id: 'security',
        prompt: 'Backup, acesso e segurança estão sob controle?',
        helper:
          'Considere proteção de dados, retenção, recuperação, permissão de usuários e resposta a incidentes.',
        options: [
          {
            label: 'A segurança é tratada quando aparece um risco',
            description:
              'Não há rotina consistente de backup, revisão de acesso ou plano claro de continuidade.',
            score: 0,
          },
          {
            label: 'Existem medidas isoladas',
            description:
              'Algumas rotinas funcionam, mas ainda faltam validação, governança e frequência.',
            score: 1,
          },
          {
            label: 'O essencial está em operação',
            description:
              'Backups e controles principais existem, embora ainda precisem de refinamento.',
            score: 2,
          },
          {
            label: 'Segurança com disciplina operacional',
            description:
              'Backup, acesso e continuidade seguem rotina, teste e critério definidos.',
            score: 3,
          },
        ],
      },
      {
        id: 'integration',
        prompt: 'Os setores trabalham com sistemas e informações integrados?',
        helper:
          'Observe se a empresa depende de planilhas soltas, retrabalho manual ou troca de informação desconectada.',
        options: [
          {
            label: 'Processos muito fragmentados',
            description:
              'As equipes dependem de controles paralelos e a informação fica espalhada.',
            score: 0,
          },
          {
            label: 'Algumas integrações existem',
            description:
              'Existem tentativas de centralização, mas o retrabalho ainda é frequente.',
            score: 1,
          },
          {
            label: 'Integração funcional na maior parte do fluxo',
            description:
              'Os setores principais conseguem operar com menos ruído e menos duplicidade.',
            score: 2,
          },
          {
            label: 'Informação conectada para operar e decidir',
            description:
              'Os dados circulam entre áreas com processo definido e baixa fricção operacional.',
            score: 3,
          },
        ],
      },
      {
        id: 'governance',
        prompt: 'A liderança consegue decidir o que priorizar na TI?',
        helper:
          'Considere se existem dados, critérios e previsibilidade para saber o que precisa ser resolvido primeiro.',
        options: [
          {
            label: 'As prioridades mudam conforme a urgência',
            description:
              'Cada problema parece crítico e a empresa reage sem clareza do impacto real.',
            score: 0,
          },
          {
            label: 'Há alguma noção de prioridade',
            description:
              'Existe percepção do que incomoda mais, mas ainda falta consistência para decidir.',
            score: 1,
          },
          {
            label: 'As decisões já seguem algum critério',
            description:
              'Os gargalos são conhecidos e a liderança consegue avaliar riscos com mais segurança.',
            score: 2,
          },
          {
            label: 'A governança é orientada por visibilidade',
            description:
              'A empresa decide com base em indicadores, contexto técnico e plano claro de evolução.',
            score: 3,
          },
        ],
      },
    ],
    ranges: [
      {
        id: 'reactive',
        minScore: 0,
        maxScore: 6,
        label: 'Faixa 1',
        title: 'Operação reativa',
        description:
          'A empresa ainda depende muito de urgência, improviso e baixa visibilidade para sustentar a rotina.',
        recommendations: [
          'Padronizar os pontos mais instáveis do ambiente para reduzir reincidência.',
          'Criar visibilidade mínima sobre chamados, ativos e indisponibilidades.',
          'Definir um plano inicial de suporte, backup e continuidade.',
        ],
      },
      {
        id: 'structuring',
        minScore: 7,
        maxScore: 12,
        label: 'Faixa 2',
        title: 'Operação em estruturação',
        description:
          'Já existe base para evoluir, mas ainda há gargalos recorrentes e dependências que limitam a previsibilidade.',
        recommendations: [
          'Consolidar monitoramento e documentação das frentes mais sensíveis.',
          'Priorizar automação e padronização onde ainda existe retrabalho operacional.',
          'Transformar práticas isoladas em rotina técnica recorrente.',
        ],
      },
      {
        id: 'mature',
        minScore: 13,
        maxScore: 18,
        label: 'Faixa 3',
        title: 'Base madura para otimizar',
        description:
          'A operação já tem disciplina suficiente para avançar em ganho de capacidade, segurança e eficiência.',
        recommendations: [
          'Expandir o uso de indicadores para orientar crescimento e capacidade.',
          'Revisar custos, integrações e oportunidades de ganho contínuo.',
          'Acelerar melhorias estruturais com menor risco de ruptura operacional.',
        ],
      },
    ],
    leadForm: {
      title: 'Receba a leitura e leve o resumo direto para o comercial',
      description:
        'Depois das respostas, pedimos apenas os dados essenciais para registrar o lead, enviar o contexto e abrir a conversa com mais velocidade.',
      fields: {
        name: 'Nome',
        company: 'Empresa',
        email: 'E-mail',
        phone: 'WhatsApp',
        notes: 'Contexto adicional',
      },
      notesPlaceholder:
        'Conte rapidamente o principal problema hoje: chamados, rede, suporte, crescimento, segurança ou outro ponto relevante.',
      privacyNote:
        'Usamos essas informações apenas para retorno comercial sobre o diagnóstico enviado.',
      submitLabel: 'Ver resultado e enviar lead',
      submittingLabel: 'Enviando diagnóstico',
      requiredMessage: 'Preencha nome, empresa, e-mail e WhatsApp para continuar.',
      invalidEmailMessage: 'Informe um e-mail válido para receber o retorno.',
    },
    result: {
      title: 'Recomendações imediatas',
      description:
        'Este resultado ajuda a equipe comercial e técnica a entrar na conversa já com contexto de maturidade, gargalos e próximo passo sugerido.',
      scoreLabel: 'Pontuação',
      levelLabel: 'Nível identificado',
      recommendationsLabel: 'Recomendações',
      answersLabel: 'Leitura das respostas',
      whatsappLabel: 'Enviar pelo WhatsApp',
      emailLabel: 'Enviar por e-mail',
      restartLabel: 'Refazer diagnóstico',
      successMessage:
        'Lead enviado com sucesso. Agora você pode continuar a conversa pelo WhatsApp com o resumo pronto.',
      fallbackMessage:
        'O resultado foi gerado, mas nenhum webhook está configurado neste ambiente. Use o WhatsApp ou o e-mail para encaminhar o resumo agora.',
      errorMessage:
        'Não foi possível enviar o lead automaticamente. O resultado continua disponível e pode ser compartilhado pelo WhatsApp ou por e-mail.',
    },
  },
  support: {
    meta: {
      title: 'MAGINF Suporte | Baixe o cliente remoto oficial',
      description:
        'Central de suporte MAGINF para download do cliente remoto, WhatsApp técnico e e-mail suporte@maginf.com.br.',
    },
    eyebrow: 'Central de suporte',
    title: 'Baixe o cliente remoto e receba',
    highlight: ' suporte assistido em minutos',
    description:
      'Baixe o cliente, execute no equipamento que precisa de suporte e fale com a equipe técnica da MAGINF pelo canal oficial.',
    downloadLabel: 'Baixar cliente remoto',
    alternativeLabel: 'Falar com o suporte',
    homeLabel: 'Voltar ao site',
    copyLinkLabel: 'Copiar link',
    copySuccessLabel: 'Link copiado',
    callLabel: 'Ligar para o suporte',
    remoteBadge: 'Acesso remoto',
    launcherTitle: 'Cliente de Suporte MAGINF',
    downloadPath: '/downloads/maginf-cliente-remoto.exe',
    downloadFileName: 'maginf-cliente-remoto.exe',
    downloadStatusChecking: 'Verificando disponibilidade',
    downloadStatusReady: 'Arquivo pronto para download',
    downloadStatusUnavailable: 'Arquivo aguardando publicação',
    readyMessage:
      'O executável foi encontrado neste domínio. Baixe, execute e informe o código exibido ao analista da MAGINF.',
    unavailableMessage:
      'A página de suporte já está no ar, mas o executável ainda precisa ser publicado nesta URL. Enquanto isso, fale com o suporte técnico.',
    note:
      'Use este cliente apenas durante uma sessão de suporte assistido com a equipe MAGINF.',
    metrics: [
      { value: '24/7', label: 'Janela preparada para suporte monitorado' },
      { value: '< 2 min', label: 'Fluxo pensado para iniciar o atendimento rápido' },
      { value: '1 link', label: 'Distribuição centralizada em um único endereço' },
    ],
    downloadMeta: [
      { label: 'Plataforma', value: 'Windows' },
      { label: 'Formato', value: 'Cliente remoto assistido' },
      { label: 'Entrega', value: 'Domínio oficial MAGINF' },
    ],
    stepsTitle: 'Fluxo rápido de suporte',
    stepsDescription: 'Tudo o que o usuário precisa está em um só lugar.',
    steps: [
      {
        id: '01',
        title: 'Baixe o executável',
        description:
          'Clique no botão principal e baixe o cliente remoto neste domínio oficial.',
      },
      {
        id: '02',
        title: 'Execute o arquivo',
        description:
          'Abra o arquivo no computador que precisa de suporte.',
      },
      {
        id: '03',
        title: 'Fale com o analista',
        description:
          'Envie o código de acesso por WhatsApp, telefone ou e-mail.',
      },
    ],
    quickActionsTitle: 'Canais de suporte',
    quickActions: [
      {
        label: 'WhatsApp técnico',
        value: '+55 (11) 4610-6363',
        href: 'https://wa.me/551146106363',
        icon: 'whatsapp',
      },
      {
        label: 'Telefone',
        value: '+55 (11) 4610-6363',
        href: 'tel:+551146106363',
        icon: 'phone',
      },
      {
        label: 'E-mail',
        value: 'suporte@maginf.com.br',
        href: 'mailto:suporte@maginf.com.br?subject=Suporte%20t%C3%A9cnico%20MAGINF',
        icon: 'email',
      },
    ],
    benefitsTitle: 'Por que usar esta página',
    benefits: [
      {
        title: 'Distribuição oficial',
        description:
          'O download fica concentrado em uma página própria para reduzir dúvidas e evitar o compartilhamento sem contexto.',
      },
      {
        title: 'Sessão guiada',
        description:
          'A experiência foi pensada para levar o usuário do download ao contato com o analista com menos atrito.',
      },
      {
        title: 'Mais confiança',
        description:
          'Canais, orientação e arquivo ficam reunidos em uma interface forte e alinhada à marca MAGINF.',
      },
    ],
    supportDeskTitle: 'Mesa de suporte MAGINF',
    supportDeskDescription:
      'Se o download não iniciar, use um dos canais abaixo e a equipe orienta a sessão imediatamente.',
  },
  contact: {
    eyebrow: 'Contato comercial',
    title: 'Quando a conversa precisa avançar, fale com a equipe por canais',
    highlight: ' diretos',
    description:
      'Se você já identificou esse cenário na sua empresa, pode chamar agora por WhatsApp, telefone ou e-mail. Deixamos os canais principais bem visíveis para acelerar o próximo passo.',
    actions: [
      {
        label: 'WhatsApp comercial',
        href: 'https://wa.me/5511351429330',
        tone: 'primary',
      },
      {
        label: 'Enviar e-mail',
        href: 'mailto:contato@maginf.com.br?subject=Diagn%C3%B3stico%20t%C3%A9cnico%20MAGINF',
        tone: 'secondary',
      },
      {
        label: 'Ligar agora',
        href: 'tel:+551146106363',
        tone: 'ghost',
      },
    ],
    badges: [
      { value: 'Guarulhos, SP', label: 'Base comercial' },
      { value: '8h30-17h30', label: 'Atendimento comercial' },
      { value: '24/7', label: 'Monitoramento de operação' },
    ],
    cards: [
      {
        label: 'WhatsApp',
        value: '+55 (11) 3514-2933',
        description: 'Canal mais rápido para avaliação inicial e alinhamento comercial.',
        href: 'https://wa.me/5511351429330',
        icon: 'whatsapp',
        featured: true,
      },
      {
        label: 'Telefone',
        value: '+55 (11) 4610-6363',
        description: 'Contato comercial durante o horário de atendimento.',
        href: 'tel:+551146106363',
        icon: 'phone',
      },
      {
        label: 'E-mail',
        value: 'contato@maginf.com.br',
        description: 'Ideal para escopo, proposta e documentação inicial.',
        href: 'mailto:contato@maginf.com.br?subject=Diagn%C3%B3stico%20t%C3%A9cnico%20MAGINF',
        icon: 'email',
      },
      {
        label: 'Endereço',
        value: 'Rua Carmela Antonia Fanganiello Cecchinato, 301',
        description: 'Guarulhos, SP. Base comercial divulgada no site institucional.',
        href: 'https://maps.google.com/?q=Rua+Carmela+Antonia+Fanganiello+Cecchinato+301+Guarulhos+SP',
        icon: 'location',
      },
      {
        label: 'Horário',
        value: 'Seg. a Sex. 8h30-17h30',
        description: 'Atendimento comercial em horário útil.',
        icon: 'hours',
      },
    ],
    note:
      'Contato integrado com base nos canais públicos oficiais divulgados pela MAGINF.',
  },
  footer: {
    description:
      'Ajudamos empresas a sair da TI reativa e operar com mais estabilidade, visibilidade e previsibilidade.',
    cta: 'Falar com consultor',
    ctaHref: '#contato',
    navigationTitle: 'Navegação',
    groups: [
      {
        title: 'Entregas',
        items: [
          'Diagnóstico técnico com leitura de risco',
          'Plano de ação priorizado',
          'Monitoramento e sustentação contínua',
          'Evolução com visão de capacidade',
        ],
      },
      {
        title: 'Cobertura',
        items: [
          'Suporte de TI gerenciado',
          'Infraestrutura e redes',
          'Wi-Fi corporativo',
          'Microsoft 365 e cloud',
        ],
      },
    ],
    copyright: 'MAGINF Tecnologia. Todos os direitos reservados.',
    backToTop: 'Voltar ao topo',
  },
};
