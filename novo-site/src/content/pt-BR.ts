import type { SiteContent } from '../types';
import { SECTOR_BACKGROUNDS } from './shared';

export const ptBRContent: SiteContent = {
  meta: {
    title: 'MAGINF Tecnologia | TI gerenciada para operacao estavel',
    description:
      'A MAGINF ajuda empresas a tirar a TI do modo reativo e operar com mais estabilidade, visibilidade e previsibilidade.',
  },
  brand: {
    homeAriaLabel: 'MAGINF Tecnologia, voltar ao inicio',
    logoAlt: 'Logotipo da MAGINF Tecnologia',
  },
  nav: {
    languageLabel: 'Idioma',
    cta: 'Falar com consultor',
    mobileCta: 'Agendar diagnostico',
    openMenuLabel: 'Abrir menu',
    closeMenuLabel: 'Fechar menu',
    links: [
      { label: 'Inicio', href: '#inicio' },
      { label: 'Servicos', href: '#servicos' },
      { label: 'Solucoes', href: '#solucoes' },
      { label: 'Setores', href: '#setores' },
      { label: 'Diagnostico', href: '#diagnostico' },
      { label: 'Contato', href: '#contato' },
    ],
  },
  hero: {
    eyebrow: 'Para empresas que nao podem parar',
    title: 'A MAGINF assume a operacao de TI para sua empresa ganhar ',
    highlight: 'estabilidade e previsibilidade',
    description:
      'Quando a tecnologia vira gargalo, a equipe perde tempo, produtividade e confianca. Entramos para organizar o ambiente, reduzir incidentes e sustentar a operacao com monitoramento, rotina e resposta tecnica.',
    primaryCta: 'Solicitar diagnostico',
    secondaryCta: 'Ver entregas',
    stats: [
      { tag: 'LIVE', value: '99,9%', label: 'Uptime sustentado' },
      { tag: '-30%', value: 'Reducao', label: 'Incidentes criticos' },
      { tag: '+150', value: 'Ativos', label: 'Sob gestao continua' },
      { tag: 'SLA', value: '24/7', label: 'Monitoramento ativo' },
    ],
  },
  features: {
    items: [
      'Menos parada',
      'Mais previsibilidade',
      'Resposta proativa',
      'Seguranca assistida',
      'Crescimento com controle',
    ],
  },
  challenges: {
    eyebrow: 'Quando a TI vira urgencia',
    title: 'Os sinais aparecem antes da parada, mas costumam ser tratados so quando viram',
    highlight: ' improviso',
    description:
      'E ai que surgem custos invisiveis: equipe interrompida, chamados recorrentes, risco operacional e falta de clareza para priorizar o que realmente importa.',
    items: [
      {
        title: 'Chamados repetidos consumindo a equipe',
        description:
          'Usuarios param pela mesma causa, o suporte reage tarde e o time perde tempo produtivo em interrupcoes evitaveis.',
        impact: 'Impacto: operacao mais lenta e percepcao de desorganizacao.',
      },
      {
        title: 'Infraestrutura crescendo sem padrao',
        description:
          'Novos acessos, equipamentos e filiais sao adicionados sem processo consistente, aumentando fragilidade tecnica.',
        impact: 'Impacto: mais risco, mais retrabalho e mais dependencia de improviso.',
      },
      {
        title: 'Backup e seguranca tratados como tarefa paralela',
        description:
          'Protecao, retencao e resposta a incidentes ficam dispersas entre ferramentas e rotinas incompletas.',
        impact: 'Impacto: maior exposicao a perda de dados e indisponibilidade.',
      },
      {
        title: 'Falta de visibilidade para decidir',
        description:
          'Sem monitoramento confiavel e priorizacao tecnica, cada problema parece urgente e nenhuma melhoria ganha sequencia.',
        impact: 'Impacto: o negocio cresce sem confianca na base de TI.',
      },
    ],
    conclusion:
      'A MAGINF entra justamente nesse ponto: para tirar a TI do modo reativo, organizar a base e sustentar a operacao com metodo.',
  },
  services: {
    eyebrow: 'O que muda na pratica',
    title: 'Entregas que reduzem ruido operacional e aumentam controle',
    description:
      'Nao entregamos pecas soltas. Organizamos suporte, infraestrutura, cloud, backup e monitoramento para atacar a causa dos problemas e devolver previsibilidade para a operacao.',
    ctaLabel: 'Conversar',
    filters: [
      { id: 'all', label: 'Todos' },
      { id: 'infra', label: 'Infra' },
      { id: 'suporte', label: 'Suporte' },
      { id: 'operacoes', label: 'Operacoes' },
      { id: 'seguranca', label: 'Seguranca' },
      { id: 'cloud', label: 'Cloud' },
    ],
    categoryLabels: {
      infra: 'Infraestrutura',
      suporte: 'Suporte',
      cloud: 'Cloud',
      network: 'Redes',
      operacoes: 'Operacoes',
      seguranca: 'Seguranca',
    },
    items: [
      {
        id: '1',
        title: 'Suporte que reduz interrupcoes',
        description:
          'Atendimento gerenciado para usuarios, endpoints e servidores com foco em resolucao consistente e continuidade.',
        category: 'suporte',
        icon: 'engineering',
      },
      {
        id: '2',
        title: 'Infraestrutura pronta para crescer',
        description:
          'Arquitetura, padronizacao e documentacao para ambientes menos frageis e mais escalaveis.',
        category: 'infra',
        icon: 'settings_input_component',
      },
      {
        id: '3',
        title: 'Wi-Fi corporativo com cobertura confiavel',
        description:
          'Projeto e ajuste de rede sem fio para manter equipes, salas e filiais conectadas com estabilidade.',
        category: 'network',
        icon: 'wifi',
      },
      {
        id: '4',
        title: 'Monitoramento que antecipa falhas',
        description:
          'Visibilidade 24/7 sobre ativos e servicos para agir antes que o problema pare a operacao.',
        category: 'operacoes',
        icon: 'monitoring',
      },
      {
        id: '5',
        title: 'Backup e continuidade com rotina seria',
        description:
          'Protecao, retencao e recuperacao desenhadas para reduzir exposicao e acelerar resposta.',
        category: 'seguranca',
        icon: 'backup',
      },
      {
        id: '6',
        title: 'Microsoft 365 e cloud com governanca',
        description:
          'Migracao, sustentacao e controle de ambiente para escalar sem perder visibilidade.',
        category: 'cloud',
        icon: 'cloud',
      },
    ],
  },
  maturity: {
    eyebrow: 'Por que as empresas nos chamam',
    title: 'A diferenca nao esta em mais ferramenta, mas em',
    highlight: ' operacao assistida',
    description:
      'Quando a base e organizada, a TI deixa de consumir energia em incendios recorrentes e passa a apoiar crescimento, seguranca e produtividade.',
    principles: [
      {
        id: '01',
        title: 'Menos reacao, mais prevencao',
        description:
          'Monitoramento e rotina tecnica substituem o ciclo de apagar incendio.',
      },
      {
        id: '02',
        title: 'Ambiente mais padronizado',
        description:
          'A infraestrutura ganha documentacao, criterio e menos dependencia de solucoes improvisadas.',
      },
      {
        id: '03',
        title: 'Decisao com mais clareza',
        description:
          'Prioridades ficam visiveis e as proximas mudancas passam a ter sequencia logica.',
      },
    ],
    metrics: [
      { value: '30%', label: 'Menos incidentes criticos', highlight: true },
      { value: '24/7', label: 'Visibilidade operacional' },
      { value: '100%', label: 'Continuidade assistida', highlight: true },
      { value: '+150', label: 'Ativos acompanhados' },
    ],
  },
  flow: {
    eyebrow: 'Como conduzimos a mudanca',
    title: 'Do diagnostico a operacao continua',
    description:
      'Nosso processo existe para gerar confianca logo no inicio: entender o cenario, corrigir a base e sustentar a evolucao sem improviso.',
    steps: [
      {
        id: '01',
        title: '01. Diagnostico',
        description:
          'Levantamos gargalos, riscos e dependencias que hoje afetam produtividade, seguranca e continuidade.',
        icon: 'biotech',
      },
      {
        id: '02',
        title: '02. Padronizacao',
        description:
          'Ajustamos o que esta fora de padrao para reduzir fragilidade operacional.',
        icon: 'rule',
      },
      {
        id: '03',
        title: '03. Monitoramento',
        description:
          'Colocamos visibilidade sobre ativos, servicos e recorrencias para agir antes do impacto.',
        icon: 'speed',
      },
      {
        id: '04',
        title: '04. Sustentacao',
        description:
          'Assumimos uma rotina tecnica recorrente com suporte, manutencao e resposta.',
        icon: 'support_agent',
      },
      {
        id: '05',
        title: '05. Evolucao',
        description:
          'Priorizamos melhorias com base em risco, capacidade e objetivos do negocio.',
        icon: 'auto_graph',
      },
    ],
  },
  sectors: {
    eyebrow: 'Onde esse modelo faz mais sentido',
    title: 'Perfis de operacao que ganham mais com suporte gerenciado',
    description:
      'A comunicacao fica mais forte quando o visitante se reconhece. Estes sao cenarios em que a MAGINF tende a gerar valor mais rapido.',
    items: [
      {
        ...SECTOR_BACKGROUNDS[0],
        title: 'Escritorios corporativos',
        detail: 'Equipes distribuidas e alta dependencia de continuidade',
        description:
          'Ambientes com operacao hibrida, salas, telefonia IP e usuarios que precisam trabalhar sem parar por falhas recorrentes.',
      },
      {
        ...SECTOR_BACKGROUNDS[1],
        title: 'Empresas em expansao',
        detail: 'Crescimento sem perder controle operacional',
        description:
          'Cenarios com novas unidades, mais usuarios e necessidade de padronizar a base antes que a complexidade aumente.',
      },
      {
        ...SECTOR_BACKGROUNDS[2],
        title: 'Ambientes criticos de rede',
        detail: 'Conectividade, visibilidade e desempenho',
        description:
          'Operacoes que dependem de rede estavel para trabalhar, vender, atender e integrar servicos sem interrupcao.',
      },
    ],
  },
  cta: {
    eyebrow: 'Proximo passo',
    title: 'Descubra em poucos minutos o nivel atual da sua operacao e avance com um',
    highlight: ' diagnostico online',
    description:
      'O visitante responde perguntas objetivas, recebe uma leitura imediata da maturidade operacional e ja pode seguir para o WhatsApp com um resumo pronto para conversa comercial.',
    startLabel: 'Iniciar diagnostico',
    progressLabel: 'Andamento do diagnostico',
    questionLabel: 'Perguntas respondidas',
    nextLabel: 'Proxima pergunta',
    lastQuestionLabel: 'Continuar para contato',
    previousLabel: 'Voltar',
    answerRequiredMessage: 'Selecione uma resposta para continuar.',
    stages: {
      intro: 'Leitura inicial',
      questions: 'Questionario',
      lead: 'Dados de contato',
      result: 'Resultado',
    },
    summaryTitle: 'Resumo em tempo real',
    summaryDescription:
      'A pontuacao vai se formando a cada resposta para sinalizar se a operacao esta reativa, em estruturacao ou pronta para otimizar.',
    rangesTitle: 'Faixas de maturidade',
    deliverables: [
      {
        title: 'Pontuacao imediata',
        description:
          'Cada resposta soma um score e mostra rapidamente em qual faixa operacional a empresa se encontra.',
      },
      {
        title: 'Lead qualificado',
        description:
          'O formulario final captura os dados essenciais para o comercial receber o contexto ja filtrado.',
      },
      {
        title: 'WhatsApp com contexto',
        description:
          'O resultado ja sai pronto para seguir no WhatsApp com score, nivel e recomendacoes iniciais.',
      },
    ],
    questions: [
      {
        id: 'support',
        prompt: 'Como os chamados e problemas de TI sao tratados hoje?',
        helper:
          'Olhe para a rotina real da equipe: tempo de resposta, recorrencia e nivel de organizacao do atendimento.',
        options: [
          {
            label: 'Tudo acontece no improviso',
            description:
              'A equipe aciona pessoas diferentes, sem registro confiavel nem prioridade clara.',
            score: 0,
          },
          {
            label: 'Existe um atendimento basico',
            description:
              'Os chamados sao registrados em alguns casos, mas o retorno ainda depende muito de urgencia.',
            score: 1,
          },
          {
            label: 'Ja ha processo com certa consistencia',
            description:
              'Existe fila, prioridades e acompanhamento, mesmo com pontos de melhoria.',
            score: 2,
          },
          {
            label: 'Atendimento estruturado e previsivel',
            description:
              'Os chamados sao acompanhados com SLA, historico e aprendizado continuo.',
            score: 3,
          },
        ],
      },
      {
        id: 'visibility',
        prompt: 'Qual e o nivel de visibilidade sobre ativos, falhas e desempenho?',
        helper:
          'Considere servidores, links, Wi-Fi, usuarios, equipamentos e qualquer servico critico da operacao.',
        options: [
          {
            label: 'Quase nenhuma visibilidade',
            description:
              'Normalmente o problema so aparece quando alguem para de trabalhar.',
            score: 0,
          },
          {
            label: 'Visibilidade parcial',
            description:
              'Alguns itens sao acompanhados, mas nao existe uma visao consolidada do ambiente.',
            score: 1,
          },
          {
            label: 'Monitoramento em pontos importantes',
            description:
              'Os ativos mais sensiveis sao monitorados e ja existe base para agir antes do impacto.',
            score: 2,
          },
          {
            label: 'Monitoramento recorrente e proativo',
            description:
              'A operacao acompanha alertas, historico e tendencias com rotina clara de resposta.',
            score: 3,
          },
        ],
      },
      {
        id: 'standardization',
        prompt: 'O ambiente de TI cresce com padrao e documentacao?',
        helper:
          'Pense em acessos, equipamentos, configuracoes, filiais, onboarding e mudancas recentes.',
        options: [
          {
            label: 'Cada expansao cria excecoes',
            description:
              'Novos acessos e ativos entram sem padrao, o que aumenta dependencia de memoria e retrabalho.',
            score: 0,
          },
          {
            label: 'Existe alguma organizacao',
            description:
              'Parte do ambiente segue padrao, mas ainda ha lacunas grandes de documentacao.',
            score: 1,
          },
          {
            label: 'Boa parte do ambiente ja e padronizada',
            description:
              'Ha criterios definidos, documentacao util e menos improviso em novas demandas.',
            score: 2,
          },
          {
            label: 'Crescimento controlado e documentado',
            description:
              'Mudancas seguem processo, criterio tecnico e documentacao atualizada.',
            score: 3,
          },
        ],
      },
      {
        id: 'security',
        prompt: 'Backup, acesso e seguranca estao sob controle?',
        helper:
          'Considere protecao de dados, retencao, recuperacao, permissao de usuarios e resposta a incidentes.',
        options: [
          {
            label: 'A seguranca e tratada quando aparece um risco',
            description:
              'Nao ha rotina consistente de backup, revisao de acesso ou plano claro de continuidade.',
            score: 0,
          },
          {
            label: 'Existem medidas isoladas',
            description:
              'Algumas rotinas funcionam, mas ainda faltam validacao, governanca e frequencia.',
            score: 1,
          },
          {
            label: 'O essencial esta em operacao',
            description:
              'Backups e controles principais existem, embora ainda precisem de refinamento.',
            score: 2,
          },
          {
            label: 'Seguranca com disciplina operacional',
            description:
              'Backup, acesso e continuidade seguem rotina, teste e criterio definidos.',
            score: 3,
          },
        ],
      },
      {
        id: 'integration',
        prompt: 'Os setores trabalham com sistemas e informacoes integrados?',
        helper:
          'Observe se a empresa depende de planilhas soltas, retrabalho manual ou troca de informacao desconectada.',
        options: [
          {
            label: 'Processos muito fragmentados',
            description:
              'As equipes dependem de controles paralelos e a informacao fica espalhada.',
            score: 0,
          },
          {
            label: 'Algumas integracoes existem',
            description:
              'Existem tentativas de centralizacao, mas o retrabalho ainda e frequente.',
            score: 1,
          },
          {
            label: 'Integracao funcional na maior parte do fluxo',
            description:
              'Os setores principais conseguem operar com menos ruido e menos duplicidade.',
            score: 2,
          },
          {
            label: 'Informacao conectada para operar e decidir',
            description:
              'Os dados circulam entre areas com processo definido e baixa friccao operacional.',
            score: 3,
          },
        ],
      },
      {
        id: 'governance',
        prompt: 'A lideranca consegue decidir o que priorizar na TI?',
        helper:
          'Considere se existem dados, criterios e previsibilidade para saber o que precisa ser resolvido primeiro.',
        options: [
          {
            label: 'As prioridades mudam conforme a urgencia',
            description:
              'Cada problema parece critico e a empresa reage sem clareza do impacto real.',
            score: 0,
          },
          {
            label: 'Ha alguma nocao de prioridade',
            description:
              'Existe percepcao do que incomoda mais, mas ainda falta consistencia para decidir.',
            score: 1,
          },
          {
            label: 'As decisoes ja seguem algum criterio',
            description:
              'Os gargalos sao conhecidos e a lideranca consegue avaliar riscos com mais seguranca.',
            score: 2,
          },
          {
            label: 'A governanca e orientada por visibilidade',
            description:
              'A empresa decide com base em indicadores, contexto tecnico e plano claro de evolucao.',
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
        title: 'Operacao reativa',
        description:
          'A empresa ainda depende muito de urgencia, improviso e baixa visibilidade para sustentar a rotina.',
        recommendations: [
          'Padronizar os pontos mais instaveis do ambiente para reduzir reincidencia.',
          'Criar visibilidade minima sobre chamados, ativos e indisponibilidades.',
          'Definir um plano inicial de suporte, backup e continuidade.',
        ],
      },
      {
        id: 'structuring',
        minScore: 7,
        maxScore: 12,
        label: 'Faixa 2',
        title: 'Operacao em estruturacao',
        description:
          'Ja existe base para evoluir, mas ainda ha gargalos recorrentes e dependencias que limitam a previsibilidade.',
        recommendations: [
          'Consolidar monitoramento e documentacao das frentes mais sensiveis.',
          'Priorizar automacao e padronizacao onde ainda existe retrabalho operacional.',
          'Transformar praticas isoladas em rotina tecnica recorrente.',
        ],
      },
      {
        id: 'mature',
        minScore: 13,
        maxScore: 18,
        label: 'Faixa 3',
        title: 'Base madura para otimizar',
        description:
          'A operacao ja tem disciplina suficiente para avancar em ganho de capacidade, seguranca e eficiencia.',
        recommendations: [
          'Expandir o uso de indicadores para orientar crescimento e capacidade.',
          'Revisar custos, integracoes e oportunidades de ganho continuo.',
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
        'Conte rapidamente o principal problema hoje: chamados, rede, suporte, crescimento, seguranca ou outro ponto relevante.',
      privacyNote:
        'Usamos essas informacoes apenas para retorno comercial sobre o diagnostico enviado.',
      submitLabel: 'Ver resultado e enviar lead',
      submittingLabel: 'Enviando diagnostico',
      requiredMessage: 'Preencha nome, empresa, e-mail e WhatsApp para continuar.',
      invalidEmailMessage: 'Informe um e-mail valido para receber o retorno.',
    },
    result: {
      title: 'Recomendacoes imediatas',
      description:
        'Este resultado ajuda a equipe comercial e tecnica a entrar na conversa ja com contexto de maturidade, gargalos e proximo passo sugerido.',
      scoreLabel: 'Pontuacao',
      levelLabel: 'Nivel identificado',
      recommendationsLabel: 'Recomendacoes',
      answersLabel: 'Leitura das respostas',
      whatsappLabel: 'Enviar pelo WhatsApp',
      emailLabel: 'Enviar por e-mail',
      restartLabel: 'Refazer diagnostico',
      successMessage:
        'Lead enviado com sucesso. Agora voce pode continuar a conversa pelo WhatsApp com o resumo pronto.',
      fallbackMessage:
        'O resultado foi gerado, mas nenhum webhook esta configurado neste ambiente. Use o WhatsApp ou o e-mail para encaminhar o resumo agora.',
      errorMessage:
        'Nao foi possivel enviar o lead automaticamente. O resultado continua disponivel e pode ser compartilhado pelo WhatsApp ou por e-mail.',
    },
  },
  support: {
    meta: {
      title: 'MAGINF Suporte | Baixe o cliente remoto oficial',
      description:
        'Central de suporte MAGINF para download do cliente remoto, orientacao rapida e acesso aos canais oficiais de atendimento.',
    },
    eyebrow: 'Central de suporte',
    title: 'Baixe o cliente remoto e entre em',
    highlight: ' atendimento em poucos minutos',
    description:
      'Esta pagina foi pensada para acelerar o suporte assistido. O usuario baixa o cliente remoto, executa o acesso e segue a sessao com a equipe MAGINF pelos canais oficiais.',
    downloadLabel: 'Baixar cliente remoto',
    alternativeLabel: 'Falar com suporte',
    homeLabel: 'Voltar ao site',
    copyLinkLabel: 'Copiar link',
    copySuccessLabel: 'Link copiado',
    callLabel: 'Ligar para suporte',
    remoteBadge: 'Acesso remoto',
    launcherTitle: 'MAGINF Support Launcher',
    downloadPath: '/downloads/maginf-cliente-remoto.exe',
    downloadFileName: 'maginf-cliente-remoto.exe',
    downloadStatusChecking: 'Verificando disponibilidade',
    downloadStatusReady: 'Arquivo pronto para download',
    downloadStatusUnavailable: 'Arquivo em preparacao',
    readyMessage:
      'O executavel foi localizado neste dominio. Baixe, execute e informe o codigo exibido ao analista da MAGINF.',
    unavailableMessage:
      'A central ja esta ativa, mas o executavel ainda precisa ser publicado nesta URL. Enquanto isso, acione o suporte e compartilhe esta pagina.',
    note:
      'O cliente remoto deve ser executado apenas durante o atendimento assistido e enviado sempre pelos canais oficiais da MAGINF.',
    metrics: [
      { value: '24/7', label: 'Janela preparada para suporte monitorado' },
      { value: '< 2 min', label: 'Fluxo pensado para iniciar o atendimento rapido' },
      { value: '1 link', label: 'Distribuicao centralizada em um unico endereco' },
    ],
    downloadMeta: [
      { label: 'Plataforma', value: 'Windows' },
      { label: 'Modelo', value: 'Cliente remoto assistido' },
      { label: 'Entrega', value: 'Dominio oficial MAGINF' },
    ],
    stepsTitle: 'Fluxo rapido de atendimento',
    stepsDescription: 'Seu acesso remoto comeca em tres movimentos simples.',
    steps: [
      {
        id: '01',
        title: 'Baixe o executavel',
        description:
          'Use o botao principal para baixar o cliente remoto a partir deste dominio oficial da MAGINF.',
      },
      {
        id: '02',
        title: 'Execute o arquivo',
        description:
          'Abra o cliente remoto no computador que precisa de suporte e aguarde a tela de conexao ou identificacao.',
      },
      {
        id: '03',
        title: 'Fale com o analista',
        description:
          'Envie o codigo, confirme a sessao por WhatsApp, telefone ou e-mail e siga com o atendimento assistido.',
      },
    ],
    benefitsTitle: 'Por que usar esta central',
    benefits: [
      {
        title: 'Distribuicao oficial',
        description:
          'O download fica concentrado em uma pagina propria para reduzir duvidas e evitar arquivos enviados sem contexto.',
      },
      {
        title: 'Sessao guiada',
        description:
          'A experiencia foi montada para conduzir o usuario do download ao contato com a equipe sem atrito.',
      },
      {
        title: 'Mais confianca',
        description:
          'Contato, orientacao e arquivo ficam reunidos em uma unica interface com identidade visual forte da MAGINF.',
      },
    ],
    supportDeskTitle: 'Mesa de suporte MAGINF',
    supportDeskDescription:
      'Se o download nao iniciar ou o usuario estiver em outro dispositivo, use um dos canais abaixo para receber orientacao imediata.',
  },
  contact: {
    eyebrow: 'Contato comercial',
    title: 'Quando a conversa precisa avancar, fale com a equipe por canais',
    highlight: ' diretos',
    description:
      'Se voce ja identificou esse cenario na sua empresa, pode chamar agora por WhatsApp, telefone ou e-mail. Deixamos os canais principais bem visiveis para acelerar o proximo passo.',
    actions: [
      {
        label: 'WhatsApp comercial',
        href: 'https://wa.me/5511351429330',
        tone: 'primary',
      },
      {
        label: 'Enviar e-mail',
        href: 'mailto:contato@maginf.com.br?subject=Diagnostico%20tecnico%20MAGINF',
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
      { value: '24/7', label: 'Monitoramento de operacao' },
    ],
    cards: [
      {
        label: 'WhatsApp',
        value: '+55 (11) 3514-2933',
        description: 'Canal mais rapido para avaliacao inicial e alinhamento comercial.',
        href: 'https://wa.me/5511351429330',
        icon: 'whatsapp',
        featured: true,
      },
      {
        label: 'Telefone',
        value: '+55 (11) 4610-6363',
        description: 'Contato comercial durante o horario de atendimento.',
        href: 'tel:+551146106363',
        icon: 'phone',
      },
      {
        label: 'E-mail',
        value: 'contato@maginf.com.br',
        description: 'Ideal para escopo, proposta e documentacao inicial.',
        href: 'mailto:contato@maginf.com.br?subject=Diagnostico%20tecnico%20MAGINF',
        icon: 'email',
      },
      {
        label: 'Endereco',
        value: 'Rua Carmela Antonia Fanganiello Cecchinato, 301',
        description: 'Guarulhos, SP. Base comercial divulgada no site institucional.',
        href: 'https://maps.google.com/?q=Rua+Carmela+Antonia+Fanganiello+Cecchinato+301+Guarulhos+SP',
        icon: 'location',
      },
      {
        label: 'Horario',
        value: 'Seg. a Sex. 8h30-17h30',
        description: 'Atendimento comercial em horario util.',
        icon: 'hours',
      },
    ],
    note:
      'Contato integrado com base nos canais publicos oficiais divulgados pela MAGINF.',
  },
  footer: {
    description:
      'Ajudamos empresas a sair da TI reativa e operar com mais estabilidade, visibilidade e previsibilidade.',
    cta: 'Falar com consultor',
    ctaHref: '#contato',
    navigationTitle: 'Navegacao',
    groups: [
      {
        title: 'Entregas',
        items: [
          'Diagnostico tecnico com leitura de risco',
          'Plano de acao priorizado',
          'Monitoramento e sustentacao continua',
          'Evolucao com visao de capacidade',
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
