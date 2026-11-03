import { ArrowUpRight, HeartHandshake, MessageCircleHeart, ShieldCheck } from 'lucide-react';
import type { Language } from '../types';

interface BlueNovemberSectionProps {
  language: Language;
}

const CONTENT = {
  'pt-BR': {
    eyebrow: 'Novembro Azul · Informação e cuidado',
    title: 'Cuidar da saúde também é um sinal de força.',
    description:
      'Neste Novembro Azul, a MAGINF reforça a importância de buscar informação confiável, manter o acompanhamento de saúde em dia e conversar com profissionais sobre prevenção e cuidado.',
    primary: 'Informações do INCA',
    secondary: 'Ver campanhas oficiais',
    note: 'Conteúdo informativo. Procure um profissional de saúde para orientações adequadas ao seu caso.',
    cards: [
      ['Informação confiável', 'Conhecimento ajuda a reconhecer a importância do cuidado e a tomar decisões com mais consciência.', MessageCircleHeart],
      ['Acompanhamento em dia', 'Converse com um profissional de saúde sobre sua rotina de cuidados e o que é adequado para você.', ShieldCheck],
      ['Cuidado compartilhado', 'Falar sobre saúde e incentivar o cuidado pode fortalecer redes de apoio e reduzir preconceitos.', HeartHandshake],
    ],
  },
  en: {
    eyebrow: 'Blue November · Awareness and care',
    title: 'Taking care of your health is a sign of strength too.',
    description:
      'This Blue November, MAGINF reinforces the importance of seeking reliable information, keeping health follow-ups up to date and talking to healthcare professionals about prevention and care.',
    primary: 'INCA information',
    secondary: 'Official campaigns',
    note: 'Informational content. Talk to a healthcare professional for guidance suited to your situation.',
    cards: [
      ['Reliable information', 'Knowledge helps us recognize the importance of care and make more informed decisions.', MessageCircleHeart],
      ['Stay up to date', 'Talk to a healthcare professional about your care routine and what is right for you.', ShieldCheck],
      ['Shared care', 'Talking about health and encouraging care can strengthen support networks and reduce stigma.', HeartHandshake],
    ],
  },
} as const;

export default function BlueNovemberSection({ language }: BlueNovemberSectionProps) {
  const content = CONTENT[language];

  return (
    <section id="novembro-azul" className="relative overflow-hidden bg-[#e8f3ff] px-5 py-20 text-[#071a2f] sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#93c5fd]/55 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-36 left-1/4 h-72 w-72 rounded-full bg-[#bfdbfe]/80 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#071a2f]/15 bg-white/60 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="h-2 w-2 rounded-full bg-[#2563eb]" aria-hidden="true" />
              {content.eyebrow}
            </div>
            <h2 className="max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">{content.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#26445f] sm:text-lg">{content.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/prostata" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#071a2f] px-5 text-xs font-black uppercase tracking-[0.13em] text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#071a2f]">
                {content.primary} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="https://www.gov.br/inca/pt-br/assuntos/campanhas" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-xl border border-[#071a2f]/25 bg-white/60 px-5 text-xs font-black uppercase tracking-[0.13em] text-[#071a2f] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#071a2f]">
                {content.secondary}
              </a>
            </div>
            <p className="mt-4 text-xs text-[#41627f]">{content.note}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {content.cards.map(([title, description, Icon]) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-[#071a2f]/10 bg-white/70 p-5 backdrop-blur-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#071a2f] text-[#93c5fd]" aria-hidden="true"><Icon size={21} /></span>
                <div>
                  <h3 className="font-black tracking-[-0.02em]">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#41627f]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#071a2f]/15 pt-5 text-sm font-semibold text-[#26445f]">
          <span>Novembro Azul · informação, prevenção e cuidado</span>
          <a href="https://www.gov.br/inca/pt-br" target="_blank" rel="noreferrer" className="font-black text-[#071a2f] underline decoration-[#2563eb] decoration-2 underline-offset-4">Acessar INCA</a>
        </div>
      </div>
    </section>
  );
}
