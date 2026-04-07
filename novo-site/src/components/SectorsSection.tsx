import { motion } from 'motion/react';
import type { SectorsContent } from '../types';

interface SectorsSectionProps {
  content: SectorsContent;
}

export default function SectorsSection({ content }: SectorsSectionProps) {
  return (
    <section className="bg-surface py-24" id="setores">
      <div className="mx-auto max-w-[1440px] px-6">
        <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary">
          {content.eyebrow}
        </span>
        <h2 className="mb-12 mt-4 font-headline text-3xl font-black tracking-tight text-on-background">
          {content.title}
        </h2>
        <p className="mb-12 max-w-3xl text-[14px] leading-relaxed text-primary">
          {content.description}
        </p>

        <div className="grid h-auto grid-cols-1 gap-6 md:h-[500px] md:grid-cols-4">
          {content.items.map((sector) => (
            <motion.article
              key={sector.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${sector.span} group relative h-[300px] overflow-hidden rounded-2xl md:h-full`}
              style={{ backgroundImage: sector.background }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.08)_0%,rgba(17,17,17,0.78)_100%)]" />
              <div className="absolute -right-12 top-12 h-32 w-32 rounded-full border border-white/10 bg-white/5 blur-xl transition-transform duration-700 group-hover:scale-125" />
              <div className="absolute inset-0 flex translate-y-4 flex-col justify-end p-10 transition-transform duration-500 group-hover:translate-y-0">
                <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                  {sector.detail}
                </span>
                <h4 className="mb-2 font-headline text-2xl font-black text-white">
                  {sector.title}
                </h4>
                <p className="text-[13px] font-medium text-white/70 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                  {sector.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
