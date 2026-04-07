import type { SiteContent } from '../types';
import { SECTOR_BACKGROUNDS } from './shared';

export const enContent: SiteContent = {
  meta: {
    title: 'MAGINF Tecnologia | Managed IT for stable operations',
    description:
      'MAGINF helps companies move away from reactive IT and operate with more stability, visibility and predictability.',
  },
  brand: {
    homeAriaLabel: 'MAGINF Tecnologia, go back to the top',
    logoAlt: 'MAGINF Tecnologia logo',
  },
  nav: {
    languageLabel: 'Language',
    cta: 'Talk to a consultant',
    mobileCta: 'Schedule assessment',
    openMenuLabel: 'Open menu',
    closeMenuLabel: 'Close menu',
    links: [
      { label: 'Home', href: '#inicio' },
      { label: 'Services', href: '#servicos' },
      { label: 'Solutions', href: '#solucoes' },
      { label: 'Sectors', href: '#setores' },
      { label: 'Assessment', href: '#diagnostico' },
      { label: 'Contact', href: '#contato' },
    ],
  },
  hero: {
    eyebrow: 'For companies that cannot stop',
    title: 'MAGINF takes ownership of IT operations so your business gains ',
    highlight: 'stability and predictability',
    description:
      'When technology becomes a bottleneck, teams lose time, productivity and confidence. We step in to organize the environment, reduce incidents and sustain operations through monitoring, routine and technical response.',
    primaryCta: 'Request assessment',
    secondaryCta: 'See deliverables',
    stats: [
      { tag: 'LIVE', value: '99.9%', label: 'Sustained uptime' },
      { tag: '-30%', value: 'Reduction', label: 'Critical incidents' },
      { tag: '+150', value: 'Assets', label: 'Under continuous management' },
      { tag: 'SLA', value: '24/7', label: 'Active monitoring' },
    ],
  },
  features: {
    items: [
      'Less downtime',
      'More predictability',
      'Proactive response',
      'Assisted security',
      'Controlled growth',
    ],
  },
  challenges: {
    eyebrow: 'When IT turns into urgency',
    title: 'The warning signs show up before the outage, but they are usually handled only when they become',
    highlight: ' improvisation',
    description:
      'That is when hidden costs grow: interrupted teams, recurring tickets, operational risk and poor visibility to prioritize what really matters.',
    items: [
      {
        title: 'Repeated issues draining the team',
        description:
          'Users stop for the same root causes, support reacts too late and productive time is lost in avoidable interruptions.',
        impact: 'Impact: slower operations and a sense of disorganization.',
      },
      {
        title: 'Infrastructure growing without standards',
        description:
          'New users, devices and branches are added without a consistent process, which increases technical fragility.',
        impact: 'Impact: more risk, more rework and more dependence on improvisation.',
      },
      {
        title: 'Backup and security treated as side tasks',
        description:
          'Protection, retention and incident response become scattered across tools and incomplete routines.',
        impact: 'Impact: higher exposure to data loss and service disruption.',
      },
      {
        title: 'No visibility to make decisions',
        description:
          'Without reliable monitoring and technical prioritization, every issue feels urgent and no improvement gains traction.',
        impact: 'Impact: the business grows without confidence in its IT foundation.',
      },
    ],
    conclusion:
      'That is exactly where MAGINF comes in: to take IT out of reactive mode, organize the foundation and sustain operations with method.',
  },
  services: {
    eyebrow: 'What changes in practice',
    title: 'Deliverables that reduce operational noise and increase control',
    description:
      'We do not deliver isolated pieces. We organize support, infrastructure, cloud, backup and monitoring to attack the source of problems and restore predictability to operations.',
    ctaLabel: 'Talk to us',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'infra', label: 'Infrastructure' },
      { id: 'suporte', label: 'Support' },
      { id: 'operacoes', label: 'Operations' },
      { id: 'seguranca', label: 'Security' },
      { id: 'cloud', label: 'Cloud' },
    ],
    categoryLabels: {
      infra: 'Infrastructure',
      suporte: 'Support',
      cloud: 'Cloud',
      network: 'Networks',
      operacoes: 'Operations',
      seguranca: 'Security',
    },
    items: [
      {
        id: '1',
        title: 'Support that reduces interruptions',
        description:
          'Managed assistance for users, endpoints and servers focused on consistent resolution and continuity.',
        category: 'suporte',
        icon: 'engineering',
      },
      {
        id: '2',
        title: 'Infrastructure ready to scale',
        description:
          'Architecture, standardization and documentation for environments that are less fragile and more scalable.',
        category: 'infra',
        icon: 'settings_input_component',
      },
      {
        id: '3',
        title: 'Corporate Wi-Fi with reliable coverage',
        description:
          'Wireless design and tuning to keep teams, rooms and branches connected with stability.',
        category: 'network',
        icon: 'wifi',
      },
      {
        id: '4',
        title: 'Monitoring that anticipates failures',
        description:
          '24/7 visibility over assets and services so action happens before issues stop the operation.',
        category: 'operacoes',
        icon: 'monitoring',
      },
      {
        id: '5',
        title: 'Backup and continuity with real discipline',
        description:
          'Protection, retention and recovery routines designed to reduce exposure and accelerate response.',
        category: 'seguranca',
        icon: 'backup',
      },
      {
        id: '6',
        title: 'Microsoft 365 and cloud with governance',
        description:
          'Migration, sustainment and environment control so you can scale without losing visibility.',
        category: 'cloud',
        icon: 'cloud',
      },
    ],
  },
  maturity: {
    eyebrow: 'Why companies call us',
    title: 'The difference is not more tools, but',
    highlight: ' assisted operations',
    description:
      'Once the foundation is organized, IT stops consuming energy through repeated fire-fighting and starts supporting growth, security and productivity.',
    principles: [
      {
        id: '01',
        title: 'Less reaction, more prevention',
        description:
          'Monitoring and technical routines replace the cycle of constant fire-fighting.',
      },
      {
        id: '02',
        title: 'A more standardized environment',
        description:
          'Infrastructure gains documentation, criteria and less dependence on improvised fixes.',
      },
      {
        id: '03',
        title: 'Better clarity for decisions',
        description:
          'Priorities become visible and upcoming changes gain a logical sequence.',
      },
    ],
    metrics: [
      { value: '30%', label: 'Fewer critical incidents', highlight: true },
      { value: '24/7', label: 'Operational visibility' },
      { value: '100%', label: 'Assisted continuity', highlight: true },
      { value: '+150', label: 'Tracked assets' },
    ],
  },
  flow: {
    eyebrow: 'How we lead the change',
    title: 'From assessment to continuous operations',
    description:
      'Our process is designed to build confidence from the start: understand the environment, correct the foundation and sustain evolution without improvisation.',
    steps: [
      {
        id: '01',
        title: '01. Assessment',
        description:
          'We uncover bottlenecks, risks and dependencies that currently affect productivity, security and continuity.',
        icon: 'biotech',
      },
      {
        id: '02',
        title: '02. Standardization',
        description:
          'We correct what is out of standard to reduce operational fragility.',
        icon: 'rule',
      },
      {
        id: '03',
        title: '03. Monitoring',
        description:
          'We bring visibility to assets, services and recurring issues to act before impact happens.',
        icon: 'speed',
      },
      {
        id: '04',
        title: '04. Sustainment',
        description:
          'We take over a recurring technical routine with support, maintenance and response.',
        icon: 'support_agent',
      },
      {
        id: '05',
        title: '05. Evolution',
        description:
          'We prioritize improvements based on risk, capacity and business goals.',
        icon: 'auto_graph',
      },
    ],
  },
  sectors: {
    eyebrow: 'Where this model fits best',
    title: 'Operation profiles that benefit most from managed support',
    description:
      'Communication gets stronger when the visitor recognizes themselves. These are scenarios where MAGINF tends to create value faster.',
    items: [
      {
        ...SECTOR_BACKGROUNDS[0],
        title: 'Corporate offices',
        detail: 'Distributed teams and strong dependence on continuity',
        description:
          'Operations with hybrid teams, meeting rooms, IP telephony and users who need to work without recurring failures.',
      },
      {
        ...SECTOR_BACKGROUNDS[1],
        title: 'Growing companies',
        detail: 'Growth without losing operational control',
        description:
          'Scenarios with new units, more users and the need to standardize the foundation before complexity expands.',
      },
      {
        ...SECTOR_BACKGROUNDS[2],
        title: 'Critical network environments',
        detail: 'Connectivity, visibility and performance',
        description:
          'Operations that depend on stable networking to work, sell, support customers and integrate services without interruption.',
      },
    ],
  },
  cta: {
    eyebrow: 'Next step',
    title: 'Discover your current operational level in a few minutes and move forward with an',
    highlight: ' online assessment',
    description:
      'Visitors answer objective questions, receive an immediate maturity reading and can continue to WhatsApp with a ready-to-send summary for the commercial conversation.',
    startLabel: 'Start assessment',
    progressLabel: 'Assessment progress',
    questionLabel: 'Questions answered',
    nextLabel: 'Next question',
    lastQuestionLabel: 'Continue to contact',
    previousLabel: 'Back',
    answerRequiredMessage: 'Select an answer before continuing.',
    stages: {
      intro: 'Initial reading',
      questions: 'Questionnaire',
      lead: 'Contact details',
      result: 'Result',
    },
    summaryTitle: 'Live summary',
    summaryDescription:
      'The score builds with every answer to signal whether the operation is reactive, being structured or ready to optimize.',
    rangesTitle: 'Maturity ranges',
    deliverables: [
      {
        title: 'Immediate score',
        description:
          'Each answer adds to a score and quickly shows the operational range where the company stands.',
      },
      {
        title: 'Qualified lead',
        description:
          'The final form captures the essential details so the commercial team receives context already filtered.',
      },
      {
        title: 'WhatsApp with context',
        description:
          'The result is ready to continue on WhatsApp with score, level and initial recommendations.',
      },
    ],
    questions: [
      {
        id: 'support',
        prompt: 'How are IT issues and support requests handled today?',
        helper:
          'Look at the real team routine: response time, recurrence and how organized the support flow is.',
        options: [
          {
            label: 'Everything happens through improvisation',
            description:
              'Different people are called every time, with no reliable record or clear priority.',
            score: 0,
          },
          {
            label: 'There is basic support in place',
            description:
              'Some requests are logged, but response still depends heavily on urgency.',
            score: 1,
          },
          {
            label: 'There is a reasonably consistent process',
            description:
              'There is a queue, priorities and follow-up, even with room to improve.',
            score: 2,
          },
          {
            label: 'Support is structured and predictable',
            description:
              'Requests are tracked with SLA, history and continuous learning.',
            score: 3,
          },
        ],
      },
      {
        id: 'visibility',
        prompt: 'How much visibility do you have over assets, failures and performance?',
        helper:
          'Consider servers, links, Wi-Fi, users, devices and any service critical to operations.',
        options: [
          {
            label: 'Almost no visibility',
            description:
              'Most issues are discovered only when someone can no longer work.',
            score: 0,
          },
          {
            label: 'Partial visibility',
            description:
              'Some items are tracked, but there is no consolidated operational view.',
            score: 1,
          },
          {
            label: 'Monitoring exists for key points',
            description:
              'The most sensitive assets are monitored and there is already a basis to act early.',
            score: 2,
          },
          {
            label: 'Monitoring is recurring and proactive',
            description:
              'The operation follows alerts, history and trends with a clear response routine.',
            score: 3,
          },
        ],
      },
      {
        id: 'standardization',
        prompt: 'Does the IT environment grow with standards and documentation?',
        helper:
          'Think about access, hardware, configurations, branches, onboarding and recent changes.',
        options: [
          {
            label: 'Each expansion creates new exceptions',
            description:
              'New users and assets arrive without a standard, increasing dependence on memory and rework.',
            score: 0,
          },
          {
            label: 'There is some organization',
            description:
              'Part of the environment follows a standard, but major documentation gaps remain.',
            score: 1,
          },
          {
            label: 'Most of the environment is already standardized',
            description:
              'There are clear criteria, useful documentation and less improvisation in new demands.',
            score: 2,
          },
          {
            label: 'Growth is controlled and documented',
            description:
              'Changes follow process, technical criteria and updated documentation.',
            score: 3,
          },
        ],
      },
      {
        id: 'security',
        prompt: 'Are backup, access and security under control?',
        helper:
          'Consider data protection, retention, recovery, user permissions and incident response.',
        options: [
          {
            label: 'Security is handled only when a risk appears',
            description:
              'There is no consistent routine for backup, access review or continuity planning.',
            score: 0,
          },
          {
            label: 'There are isolated measures',
            description:
              'Some routines work, but validation, governance and frequency are still missing.',
            score: 1,
          },
          {
            label: 'The essentials are operating',
            description:
              'Backups and the main controls exist, although they still need refinement.',
            score: 2,
          },
          {
            label: 'Security has operational discipline',
            description:
              'Backup, access and continuity follow defined routines, testing and criteria.',
            score: 3,
          },
        ],
      },
      {
        id: 'integration',
        prompt: 'Do departments work with integrated systems and information?',
        helper:
          'Observe whether the company still depends on scattered spreadsheets, manual rework or disconnected information exchange.',
        options: [
          {
            label: 'Processes are highly fragmented',
            description:
              'Teams depend on parallel controls and information stays spread across tools.',
            score: 0,
          },
          {
            label: 'Some integrations exist',
            description:
              'There are attempts to centralize, but rework still happens frequently.',
            score: 1,
          },
          {
            label: 'Integration works across most of the flow',
            description:
              'Core departments can operate with less noise and less duplication.',
            score: 2,
          },
          {
            label: 'Information is connected for operations and decisions',
            description:
              'Data moves between teams through defined processes and low operational friction.',
            score: 3,
          },
        ],
      },
      {
        id: 'governance',
        prompt: 'Can leadership clearly prioritize IT decisions?',
        helper:
          'Consider whether there is enough data, criteria and predictability to know what needs to be solved first.',
        options: [
          {
            label: 'Priorities change according to urgency',
            description:
              'Every problem feels critical and the company reacts without clarity on real impact.',
            score: 0,
          },
          {
            label: 'There is some sense of priority',
            description:
              'There is awareness of what hurts most, but still not enough consistency to decide.',
            score: 1,
          },
          {
            label: 'Decisions already follow some criteria',
            description:
              'Bottlenecks are known and leadership can assess risks with more confidence.',
            score: 2,
          },
          {
            label: 'Governance is guided by visibility',
            description:
              'The company decides using indicators, technical context and a clear evolution plan.',
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
        label: 'Range 1',
        title: 'Reactive operation',
        description:
          'The company still depends heavily on urgency, improvisation and low visibility to sustain day-to-day operations.',
        recommendations: [
          'Standardize the most unstable parts of the environment to reduce repeat incidents.',
          'Create minimum visibility over requests, assets and downtime.',
          'Define an initial support, backup and continuity plan.',
        ],
      },
      {
        id: 'structuring',
        minScore: 7,
        maxScore: 12,
        label: 'Range 2',
        title: 'Operation being structured',
        description:
          'There is already a foundation to evolve, but recurring bottlenecks and dependencies still limit predictability.',
        recommendations: [
          'Consolidate monitoring and documentation for the most sensitive fronts.',
          'Prioritize automation and standardization wherever operational rework still exists.',
          'Turn isolated good practices into a recurring technical routine.',
        ],
      },
      {
        id: 'mature',
        minScore: 13,
        maxScore: 18,
        label: 'Range 3',
        title: 'Mature foundation ready to optimize',
        description:
          'Operations already have enough discipline to move further in capacity, security and efficiency gains.',
        recommendations: [
          'Expand the use of indicators to guide growth and capacity planning.',
          'Review costs, integrations and opportunities for continuous improvement.',
          'Accelerate structural improvements with lower risk of operational disruption.',
        ],
      },
    ],
    leadForm: {
      title: 'Receive the reading and take the summary straight to the commercial team',
      description:
        'After the answers, we only ask for the essential details to register the lead, send the context and open the conversation faster.',
      fields: {
        name: 'Name',
        company: 'Company',
        email: 'Email',
        phone: 'WhatsApp',
        notes: 'Extra context',
      },
      notesPlaceholder:
        'Briefly describe the main issue today: support, network, growth, security or any other relevant point.',
      privacyNote:
        'We use this information only to contact you back about the submitted assessment.',
      submitLabel: 'See result and send lead',
      submittingLabel: 'Sending assessment',
      requiredMessage: 'Fill in name, company, email and WhatsApp before continuing.',
      invalidEmailMessage: 'Enter a valid email address to receive the follow-up.',
    },
    result: {
      title: 'Immediate recommendations',
      description:
        'This result helps the commercial and technical teams start the conversation with maturity context, likely bottlenecks and the suggested next step.',
      scoreLabel: 'Score',
      levelLabel: 'Detected level',
      recommendationsLabel: 'Recommendations',
      answersLabel: 'Answer snapshot',
      whatsappLabel: 'Send via WhatsApp',
      emailLabel: 'Send by email',
      restartLabel: 'Retake assessment',
      successMessage:
        'Lead sent successfully. You can now continue the conversation on WhatsApp with the summary ready.',
      fallbackMessage:
        'The result was generated, but no webhook is configured in this environment. Use WhatsApp or email to forward the summary now.',
      errorMessage:
        'The lead could not be sent automatically. The result remains available and can still be shared through WhatsApp or email.',
    },
  },
  contact: {
    eyebrow: 'Commercial contact',
    title: 'When the conversation needs to move forward, reach the team through',
    highlight: ' direct channels',
    description:
      'If you already recognize this scenario in your company, you can contact us right now through WhatsApp, phone or email. We keep the main channels highly visible to speed up the next step.',
    actions: [
      {
        label: 'Commercial WhatsApp',
        href: 'https://wa.me/5511351429330',
        tone: 'primary',
      },
      {
        label: 'Send email',
        href: 'mailto:contato@maginf.com.br?subject=Technical%20assessment%20MAGINF',
        tone: 'secondary',
      },
      {
        label: 'Call now',
        href: 'tel:+551146106363',
        tone: 'ghost',
      },
    ],
    badges: [
      { value: 'Guarulhos, SP', label: 'Business base' },
      { value: '8:30-17:30', label: 'Commercial hours' },
      { value: '24/7', label: 'Operations monitoring' },
    ],
    cards: [
      {
        label: 'WhatsApp',
        value: '+55 (11) 3514-2933',
        description: 'Fastest channel for an initial assessment and commercial alignment.',
        href: 'https://wa.me/5511351429330',
        icon: 'whatsapp',
        featured: true,
      },
      {
        label: 'Phone',
        value: '+55 (11) 4610-6363',
        description: 'Commercial line available during business hours.',
        href: 'tel:+551146106363',
        icon: 'phone',
      },
      {
        label: 'Email',
        value: 'contato@maginf.com.br',
        description: 'Best for scope discussion, proposals and initial documentation.',
        href: 'mailto:contato@maginf.com.br?subject=Technical%20assessment%20MAGINF',
        icon: 'email',
      },
      {
        label: 'Address',
        value: 'Rua Carmela Antonia Fanganiello Cecchinato, 301',
        description: 'Guarulhos, SP. Business address listed on the official website.',
        href: 'https://maps.google.com/?q=Rua+Carmela+Antonia+Fanganiello+Cecchinato+301+Guarulhos+SP',
        icon: 'location',
      },
      {
        label: 'Hours',
        value: 'Mon-Fri 8:30-17:30',
        description: 'Commercial support during business hours.',
        icon: 'hours',
      },
    ],
    note:
      'This contact block is based on MAGINF public contact channels published on the official website.',
  },
  footer: {
    description:
      'We help companies leave reactive IT behind and operate with more stability, visibility and predictability.',
    cta: 'Talk to a consultant',
    ctaHref: '#contato',
    navigationTitle: 'Navigation',
    groups: [
      {
        title: 'Deliverables',
        items: [
          'Risk-based technical assessment',
          'Prioritized action plan',
          'Continuous monitoring and sustainment',
          'Evolution with capacity visibility',
        ],
      },
      {
        title: 'Coverage',
        items: [
          'Managed IT support',
          'Infrastructure and networking',
          'Corporate Wi-Fi',
          'Microsoft 365 and cloud',
        ],
      },
    ],
    copyright: 'MAGINF Tecnologia. All rights reserved.',
    backToTop: 'Back to top',
  },
};
