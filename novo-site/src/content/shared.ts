import type { LanguageOption, Sector } from '../types';

export const SECTOR_BACKGROUNDS: Sector[] = [
  {
    title: '',
    description: '',
    detail: '',
    span: 'md:col-span-2',
    background:
      'radial-gradient(circle at 20% 20%, rgba(255,107,0,0.22), transparent 0 38%), linear-gradient(135deg, #101010 0%, #252525 100%)',
  },
  {
    title: '',
    description: '',
    detail: '',
    span: 'md:col-span-1',
    background:
      'radial-gradient(circle at 80% 15%, rgba(255,255,255,0.18), transparent 0 30%), linear-gradient(180deg, #FF6B00 0%, #A04100 100%)',
  },
  {
    title: '',
    description: '',
    detail: '',
    span: 'md:col-span-1',
    background:
      'radial-gradient(circle at 50% 0%, rgba(255,107,0,0.28), transparent 0 35%), linear-gradient(160deg, #171717 0%, #2F2F2F 100%)',
  },
];

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'pt-BR', label: 'Portugu\u00eas (Brasil)', shortLabel: 'PT-BR' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
];
