import { ShieldCheck, Eye, Cloud, Grid, Network } from 'lucide-react';
import type { FeaturesContent } from '../types';

interface FeaturesBarProps {
  content: FeaturesContent;
}

const featureIcons = [ShieldCheck, Eye, Cloud, Grid, Network];

export default function FeaturesBar({ content }: FeaturesBarProps) {
  return (
    <section className="border-b border-stone-800 bg-on-background py-8">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-8 opacity-80">
          {content.items.map((label, index) => {
            const Icon = featureIcons[index];

            return (
              <div key={label} className="group flex cursor-default items-center gap-3">
                <Icon
                  className="text-tertiary transition-transform group-hover:scale-110"
                  size={18}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors group-hover:text-white">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
