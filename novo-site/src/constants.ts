import type { SiteContent } from './types';
import { enContent } from './content/en';
import { LANGUAGE_OPTIONS } from './content/shared';
import { ptBRContent } from './content/pt-BR';

export { LANGUAGE_OPTIONS } from './content/shared';

export const SITE_CONTENT: Record<'pt-BR' | 'en', SiteContent> = {
  'pt-BR': ptBRContent,
  en: enContent,
};
