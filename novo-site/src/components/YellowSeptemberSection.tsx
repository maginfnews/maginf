import { ArrowUpRight, HeartHandshake, MessageCircleHeart, ShieldCheck } from 'lucide-react';
import type { Language } from '../types';

interface YellowSeptemberSectionProps {
  language: Language;
}

const CONTENT = {
  'pt-BR': {
    eyebrow: 'Setembro Amarelo · Valorização da vida',
    title: 'Tecnologia que conecta. Pessoas que acolhem.',
    description:
      'Nenhuma operação é mais importante do que as pessoas que fazem tudo acontecer. Neste setembro, a MAGINF reforça a importância de escutar com respeito, reduzir estigmas e buscar apoio quando necessário.',
    primary: 'Conheça o CVV',
    secondary: 'Ver orientações oficiais',
    note: 'Conteúdo informativo. Não substitui atendimento profissional.',
    cards: [
      ['Escutar é estar presente', 'Uma conversa sem julgamentos pode ser um primeiro gesto de cuidado.', MessageCircleHeart],
      ['Apoio com responsabilidade', 'Incentive a busca por profissionais e serviços de saúde quando houver sofrimento.', ShieldCheck],
      ['Ajuda está disponível', 'O CVV atende gratuitamente pelo 188, 24 horas, com sigilo e acolhimento.', HeartHandshake],
    ],
  },
  en: {
    eyebrow: 'Yellow September · Valuing life',
    title: 'Technology connects. People care.',
    description:
      'No operation matters more than the people who make it happen. This September, MAGINF reinforces the importance of listening with respect, reducing stigma and seeking support when needed.',
    primary: 'Visit CVV',
    secondary: 'Official guidance',
    note: 'Informational content. It does not replace professional care.',
    cards: [
      ['Listening means being present', 'A non-judgmental conversation can be a first gesture of care.', MessageCircleHeart],
      ['Support with responsibility', 'Encourage professional and health services when someone is suffering.', ShieldCheck],
      ['Help is available', 'CVV offers free, confidential support in Brazil through 188, 24 hours a day.', HeartHandshake],
    ],
  },
} as const;

export default function YellowSeptemberSection({ language }: YellowSeptemberSectionProps) {
  const content = CONTENT[language];

  return (
    <section id="setembro-amarelo" className="relative overflow-hidden bg-[#fff6b8] px-5 py-20 text-[#171717] sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#facc15]/50 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-36 left-1/4 h-72 w-72 rounded-full bg-[#fde68a]/70 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#171717]/15 bg-white/45 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" aria-hidden="true" />
              {content.eyebrow}
            </div>
            <h2 className="max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">{content.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#3f3f46] sm:text-lg">{content.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://cvv.org.br/" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#171717] px-5 text-xs font-black uppercase tracking-[0.13em] text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717]">
                {content.primary} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/suicidio-prevencao" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-xl border border-[#171717]/25 bg-white/45 px-5 text-xs font-black uppercase tracking-[0.13em] text-[#171717] transition-colors hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717]">
                {content.secondary}
              </a>
            </div>
            <p className="mt-4 text-xs text-[#52525b]">{content.note}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {content.cards.map(([title, description, Icon]) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-[#171717]/10 bg-white/55 p-5 backdrop-blur-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#171717] text-[#fde047]" aria-hidden="true"><Icon size={21} /></span>
                <div>
                  <h3 className="font-black tracking-[-0.02em]">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#52525b]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#171717]/15 pt-5 text-sm font-semibold text-[#3f3f46]">
          <span>CVV 188 · atendimento gratuito e 24 horas</span>
          <a href="tel:188" className="font-black text-[#171717] underline decoration-[#f59e0b] decoration-2 underline-offset-4">Ligue 188</a>
        </div>
      </div>
    </section>
  );
}
