import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { Microscope, ClipboardCheck, Activity, UserCheck, TrendingUp } from 'lucide-react';
import type { FlowContent, FlowStep } from '../types';

interface FlowSectionProps {
  content: FlowContent;
}

const iconMap: Record<FlowStep['icon'], LucideIcon> = {
  biotech: Microscope,
  rule: ClipboardCheck,
  speed: Activity,
  support_agent: UserCheck,
  auto_graph: TrendingUp,
};

export default function FlowSection({ content }: FlowSectionProps) {
  return (
    <section className="bg-surface-container-lowest py-24" id="fluxo">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mb-16 text-center">
          <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-on-background">
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[14px] leading-relaxed text-primary">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {content.steps.map((step, index) => {
            const Icon = iconMap[step.icon];

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border border-transparent bg-stone-50 p-8 transition-all hover:border-stone-200 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition-colors group-hover:bg-tertiary">
                  <Icon className="text-tertiary transition-colors group-hover:text-white" size={20} />
                </div>
                <h4 className="mb-3 font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-on-background">
                  {step.title}
                </h4>
                <p className="text-[12px] leading-relaxed text-primary">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
