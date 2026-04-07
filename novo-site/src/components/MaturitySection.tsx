import { motion } from 'motion/react';
import type { MaturityContent } from '../types';

interface MaturitySectionProps {
  content: MaturityContent;
}

export default function MaturitySection({ content }: MaturitySectionProps) {
  const [firstMetric, secondMetric, thirdMetric, fourthMetric] = content.metrics;

  return (
    <section className="bg-surface-container-low py-24" id="solucoes">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary">
              {content.eyebrow}
            </span>
            <h2 className="mb-8 mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-on-background">
              {content.title}
              <span className="text-tertiary">{content.highlight}</span>.
            </h2>
            <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-primary">
              {content.description}
            </p>

            <div className="space-y-6">
              {content.principles.map((principle, index) => (
                <motion.div
                  key={principle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-6 rounded-xl border-l-4 border-tertiary bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="font-headline text-xl font-bold text-stone-300">
                    {principle.id}
                  </div>
                  <div>
                    <h4 className="mb-2 font-headline text-base font-bold">{principle.title}</h4>
                    <p className="text-[14px] leading-relaxed text-primary">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl bg-on-background p-12 shadow-2xl"
          >
            <div className="relative z-10 grid grid-cols-2 gap-12">
              <div className="space-y-12">
                <div className="text-white">
                  <div
                    className={`font-headline text-5xl font-black ${
                      firstMetric.highlight ? 'text-tertiary' : ''
                    }`}
                  >
                    {firstMetric.value}
                  </div>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    {firstMetric.label}
                  </p>
                </div>
                <div className="text-white">
                  <div
                    className={`font-headline text-5xl font-black ${
                      secondMetric.highlight ? 'text-tertiary' : ''
                    }`}
                  >
                    {secondMetric.value}
                  </div>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    {secondMetric.label}
                  </p>
                </div>
              </div>
              <div className="space-y-12">
                <div className="text-white">
                  <div
                    className={`font-headline text-5xl font-black ${
                      thirdMetric.highlight ? 'text-tertiary' : ''
                    }`}
                  >
                    {thirdMetric.value}
                  </div>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    {thirdMetric.label}
                  </p>
                </div>
                <div className="text-white">
                  <div
                    className={`font-headline text-5xl font-black ${
                      fourthMetric.highlight ? 'text-tertiary' : ''
                    }`}
                  >
                    {fourthMetric.value}
                  </div>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    {fourthMetric.label}
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-10 -right-10 select-none font-headline text-[12rem] font-black text-white/[0.03]">
              IT
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
