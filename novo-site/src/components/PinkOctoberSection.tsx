import { ArrowUpRight, HeartHandshake, MessageCircleHeart, ShieldCheck } from 'lucide-react';
import type { Language } from '../types';

interface PinkOctoberSectionProps {
  language: Language;
}

const CONTENT = {
  'pt-BR': {
    eyebrow: 'Outubro Rosa · Informação e prevenção',
    title: 'Cuidar de si também é uma decisão importante.',
    description:
      'Neste Outubro Rosa, a MAGINF reforça a importância de buscar informação confiável, manter o acompanhamento de saúde em dia e conversar com profissionais sobre prevenção e cuidado.',
    primary: 'Informações do INCA',
    secondary: 'Conheça a campanha',
    note: 'Conteúdo informativo. Procure um profissional de saúde para orientações adequadas ao seu caso.',
    cards: [
      ['Informação confiável', 'Conhecimento ajuda a reconhecer a importância do cuidado e da prevenção.', MessageCircleHeart],
      ['Acompanhamento em dia', 'Mantenha suas consultas e exames conforme a orientação dos profissionais que acompanham você.', ShieldCheck],
      ['Cuidado compartilhado', 'Conversar sobre saúde e incentivar o cuidado pode fortalecer redes de apoio.', HeartHandshake],
    ],
  },
  en: {
    eyebrow: 'Pink October · Awareness and prevention',
    title: 'Taking care of yourself is an important decision too.',
    description:
      'This Pink October, MAGINF reinforces the importance of seeking reliable information, keeping health follow-ups up to date and talking to healthcare professionals about prevention and care.',
    primary: 'INCA information',
    secondary: 'Learn about the campaign',
    note: 'Informational content. Talk to a healthcare professional for guidance suited to your situation.',
    cards: [
      ['Reliable information', 'Knowledge helps us recognize the importance of care and prevention.', MessageCircleHeart],
      ['Stay up to date', 'Keep appointments and screenings according to the guidance of your healthcare professionals.', ShieldCheck],
      ['Shared care', 'Talking about health and encouraging care can strengthen support networks.', HeartHandshake],
    ],
  },
} as const;

export default function PinkOctoberSection({ language }: PinkOctoberSectionProps) {
  const content = CONTENT[language];

  return (
    <section id="outubro-rosa" className="relative overflow-hidden bg-[#fff0f5] px-5 py-20 text-[#24151d] sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#f9a8d4]/55 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-36 left-1/4 h-72 w-72 rounded-full bg-[#fbcfe8]/80 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#24151d]/15 bg-white/55 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="h-2 w-2 rounded-full bg-[#db2777]" aria-hidden="true" />
              {content.eyebrow}
            </div>
            <h2 className="max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">{content.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#5b3a49] sm:text-lg">{content.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#24151d] px-5 text-xs font-black uppercase tracking-[0.13em] text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24151d]">
                {content.primary} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="https://www.gov.br/inca/pt-br/assuntos/campanhas" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-xl border border-[#24151d]/25 bg-white/55 px-5 text-xs font-black uppercase tracking-[0.13em] text-[#24151d] transition-colors hover:bg-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24151d]">
                {content.secondary}
              </a>
            </div>
            <p className="mt-4 text-xs text-[#745466]">{content.note}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {content.cards.map(([title, description, Icon]) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-[#24151d]/10 bg-white/65 p-5 backdrop-blur-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#24151d] text-[#f9a8d4]" aria-hidden="true"><Icon size={21} /></span>
                <div>
                  <h3 className="font-black tracking-[-0.02em]">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#745466]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#24151d]/15 pt-5 text-sm font-semibold text-[#5b3a49]">
          <span>Outubro Rosa · informação, prevenção e cuidado</span>
          <a href="https://www.gov.br/inca/pt-br" target="_blank" rel="noreferrer" className="font-black text-[#24151d] underline decoration-[#db2777] decoration-2 underline-offset-4">Acessar INCA</a>
        </div>
      </div>
    </section>
  );
}
