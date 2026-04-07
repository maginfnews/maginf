export type Language = 'pt-BR' | 'en';

export type ServiceCategory =
  | 'infra'
  | 'suporte'
  | 'cloud'
  | 'network'
  | 'operacoes'
  | 'seguranca';

export type ServiceIcon =
  | 'engineering'
  | 'settings_input_component'
  | 'wifi'
  | 'monitoring'
  | 'backup'
  | 'cloud';

export type FlowIcon =
  | 'biotech'
  | 'rule'
  | 'speed'
  | 'support_agent'
  | 'auto_graph';

export type ServiceFilterId =
  | 'all'
  | 'infra'
  | 'suporte'
  | 'operacoes'
  | 'seguranca'
  | 'cloud';

export interface LanguageOption {
  code: Language;
  label: string;
  shortLabel: string;
}

export interface MetaContent {
  title: string;
  description: string;
}

export interface BrandContent {
  homeAriaLabel: string;
  logoAlt: string;
}

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface NavbarContent {
  links: NavLink[];
  cta: string;
  mobileCta: string;
  languageLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

export interface HeroStat {
  tag: string;
  value: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  stats: HeroStat[];
}

export interface FeaturesContent {
  items: string[];
}

export interface ChallengeItem {
  title: string;
  description: string;
  impact: string;
}

export interface ChallengesContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  items: ChallengeItem[];
  conclusion: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  icon: ServiceIcon;
}

export interface FilterOption {
  id: ServiceFilterId;
  label: string;
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  description: string;
  filters: FilterOption[];
  categoryLabels: Record<ServiceCategory, string>;
  ctaLabel: string;
  items: Service[];
}

export interface Principle {
  id: string;
  title: string;
  description: string;
}

export interface MetricCard {
  value: string;
  label: string;
  highlight?: boolean;
}

export interface MaturityContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  principles: Principle[];
  metrics: MetricCard[];
}

export interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: FlowIcon;
}

export interface FlowContent {
  eyebrow: string;
  title: string;
  description: string;
  steps: FlowStep[];
}

export interface Sector {
  title: string;
  description: string;
  detail: string;
  span: string;
  background: string;
}

export interface SectorsContent {
  eyebrow: string;
  title: string;
  description: string;
  items: Sector[];
}

export interface Deliverable {
  title: string;
  description: string;
}

export interface AssessmentOption {
  label: string;
  description: string;
  score: number;
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  helper: string;
  options: AssessmentOption[];
}

export interface AssessmentRange {
  id: string;
  minScore: number;
  maxScore: number;
  label: string;
  title: string;
  description: string;
  recommendations: string[];
}

export interface AssessmentStages {
  intro: string;
  questions: string;
  lead: string;
  result: string;
}

export interface AssessmentLeadFields {
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

export interface AssessmentLeadForm {
  title: string;
  description: string;
  fields: AssessmentLeadFields;
  notesPlaceholder: string;
  privacyNote: string;
  submitLabel: string;
  submittingLabel: string;
  requiredMessage: string;
  invalidEmailMessage: string;
}

export interface AssessmentResultContent {
  title: string;
  description: string;
  scoreLabel: string;
  levelLabel: string;
  recommendationsLabel: string;
  answersLabel: string;
  whatsappLabel: string;
  emailLabel: string;
  restartLabel: string;
  successMessage: string;
  fallbackMessage: string;
  errorMessage: string;
}

export interface CTAContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  deliverables: Deliverable[];
  startLabel: string;
  progressLabel: string;
  questionLabel: string;
  nextLabel: string;
  lastQuestionLabel: string;
  previousLabel: string;
  answerRequiredMessage: string;
  stages: AssessmentStages;
  summaryTitle: string;
  summaryDescription: string;
  rangesTitle: string;
  questions: AssessmentQuestion[];
  ranges: AssessmentRange[];
  leadForm: AssessmentLeadForm;
  result: AssessmentResultContent;
}

export interface FooterGroup {
  title: string;
  items: string[];
}

export type ContactCardIcon = 'phone' | 'whatsapp' | 'email' | 'location' | 'hours';

export type ContactActionTone = 'primary' | 'secondary' | 'ghost';

export interface ContactAction {
  label: string;
  href: string;
  tone: ContactActionTone;
}

export interface ContactBadge {
  value: string;
  label: string;
}

export interface ContactCard {
  label: string;
  value: string;
  description: string;
  href?: string;
  icon: ContactCardIcon;
  featured?: boolean;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  actions: ContactAction[];
  badges: ContactBadge[];
  cards: ContactCard[];
  note: string;
}

export interface FooterContent {
  description: string;
  cta: string;
  ctaHref: string;
  navigationTitle: string;
  groups: FooterGroup[];
  copyright: string;
  backToTop: string;
}

export interface SiteContent {
  meta: MetaContent;
  brand: BrandContent;
  nav: NavbarContent;
  hero: HeroContent;
  features: FeaturesContent;
  challenges: ChallengesContent;
  services: ServicesContent;
  maturity: MaturityContent;
  flow: FlowContent;
  sectors: SectorsContent;
  cta: CTAContent;
  contact: ContactContent;
  footer: FooterContent;
}
