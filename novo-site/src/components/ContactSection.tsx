import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
} from 'lucide-react';
import type { ContactCard, ContactContent } from '../types';

interface ContactSectionProps {
  content: ContactContent;
}

const iconMap: Record<ContactCard['icon'], LucideIcon> = {
  phone: Phone,
  whatsapp: MessageCircleMore,
  email: Mail,
  location: MapPin,
  hours: Clock3,
};

function isExternalLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export default function ContactSection({ content }: ContactSectionProps) {
  return (
    <section id="contato" className="relative overflow-hidden bg-[#080808] py-28 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,0,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,#0b0b0b_0%,#131313_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:44px_44px]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary"
          >
            {content.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="mt-4 font-headline text-4xl font-black leading-tight md:text-5xl"
          >
            {content.title}
            <span className="text-tertiary">{content.highlight}</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/68"
          >
            {content.description}
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-3">
            {content.actions.map((action, index) => {
              const toneClass =
                action.tone === 'primary'
                  ? 'bg-tertiary text-white shadow-xl shadow-tertiary/20 hover:brightness-110'
                  : action.tone === 'secondary'
                    ? 'border border-white/15 bg-white/8 text-white hover:bg-white/12'
                    : 'border border-white/12 bg-transparent text-white/80 hover:bg-white/8 hover:text-white';

              return (
                <motion.a
                  key={action.href}
                  href={action.href}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + index * 0.08 }}
                  className={`inline-flex items-center gap-2 rounded-sm px-6 py-3 font-headline text-[11px] font-bold uppercase tracking-[0.22em] transition-all ${toneClass}`}
                  target={isExternalLink(action.href) ? '_blank' : undefined}
                  rel={isExternalLink(action.href) ? 'noreferrer' : undefined}
                >
                  {action.label}
                  <ArrowUpRight size={16} />
                </motion.a>
              );
            })}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {content.badges.map((badge, index) => (
              <motion.div
                key={`${badge.label}-${badge.value}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
              >
                <div className="font-headline text-2xl font-black text-white">{badge.value}</div>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                  {badge.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.34 }}
            className="mt-8 text-sm leading-relaxed text-white/45"
          >
            {content.note}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {content.cards.map((card, index) => {
            const Icon = iconMap[card.icon];
            const containerClass = `${card.featured ? 'md:col-span-2' : ''} group rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]`;
            const contentBody = (
              <>
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tertiary/12 text-tertiary">
                    <Icon size={22} />
                  </div>
                  {card.href ? (
                    <ArrowUpRight className="text-white/35 transition-colors group-hover:text-white" size={18} />
                  ) : null}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/42">
                  {card.label}
                </span>
                <h3
                  className={`mt-3 font-headline font-black text-white ${
                    card.featured ? 'text-3xl md:text-[2rem]' : 'text-xl'
                  }`}
                >
                  {card.value}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/62">
                  {card.description}
                </p>
              </>
            );

            if (card.href) {
              return (
                <motion.a
                  key={`${card.label}-${card.value}`}
                  href={card.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  target={isExternalLink(card.href) ? '_blank' : undefined}
                  rel={isExternalLink(card.href) ? 'noreferrer' : undefined}
                  className={containerClass}
                >
                  {contentBody}
                </motion.a>
              );
            }

            return (
              <motion.div
                key={`${card.label}-${card.value}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={containerClass}
              >
                {contentBody}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
