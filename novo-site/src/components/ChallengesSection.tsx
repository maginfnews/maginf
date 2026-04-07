import { motion } from 'motion/react';
import { AlertTriangle, CircleOff, Radar, ShieldAlert } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ChallengeItem, ChallengesContent } from '../types';

interface ChallengesSectionProps {
  content: ChallengesContent;
}

const icons: LucideIcon[] = [AlertTriangle, CircleOff, ShieldAlert, Radar];

export default function ChallengesSection({ content }: ChallengesSectionProps) {
  return (
    <section id="desafios" className="bg-surface-container-lowest py-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-on-background">
              {content.title}
              <span className="text-tertiary">{content.highlight}</span>.
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-primary">
              {content.description}
            </p>
            <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-[14px] leading-relaxed text-on-background">{content.conclusion}</p>
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {content.items.map((item, index) => {
              const Icon = icons[index % icons.length];

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-tertiary/10 text-tertiary">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-background">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-primary">{item.description}</p>
                  <div className="mt-5 border-l-2 border-tertiary pl-4 text-[12px] font-bold uppercase tracking-[0.18em] text-on-background/70">
                    {item.impact}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
