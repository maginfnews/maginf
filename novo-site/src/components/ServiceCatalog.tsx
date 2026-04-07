import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Settings, Network, Wifi, Monitor, Shield, Cloud } from 'lucide-react';
import type { Service, ServiceFilterId, ServicesContent } from '../types';

interface ServiceCatalogProps {
  content: ServicesContent;
}

const iconMap: Record<Service['icon'], LucideIcon> = {
  engineering: Settings,
  settings_input_component: Network,
  wifi: Wifi,
  monitoring: Monitor,
  backup: Shield,
  cloud: Cloud,
};

export default function ServiceCatalog({ content }: ServiceCatalogProps) {
  const [filter, setFilter] = useState<ServiceFilterId>('all');

  const filteredServices =
    filter === 'all'
      ? content.items
      : content.items.filter((service) => {
          if (filter === 'infra') {
            return service.category === 'infra' || service.category === 'network';
          }

          if (filter === 'operacoes') {
            return service.category === 'operacoes';
          }

          if (filter === 'seguranca') {
            return service.category === 'seguranca';
          }

          return service.category === filter;
        });

  return (
    <section className="bg-surface py-24" id="servicos">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary">
              {content.eyebrow}
            </span>
            <h2 className="mt-3 font-headline text-3xl font-black tracking-tight text-on-background">
              {content.title}
            </h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-primary">
              {content.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 rounded-lg border border-stone-200 bg-surface-container-low p-1">
            {content.filters.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={filter === category.id}
                className={`rounded-md px-6 py-2 text-[11px] font-bold transition-all ${
                  filter === category.id
                    ? 'border border-stone-200 bg-surface-container-lowest text-on-background shadow-sm'
                    : 'text-stone-500 hover:text-on-background'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 shadow-sm md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const Icon = iconMap[service.icon];

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group flex flex-col justify-between bg-surface-container-lowest p-8 transition-colors hover:bg-surface-container"
                >
                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-stone-100 text-tertiary transition-all duration-300 group-hover:bg-tertiary group-hover:text-white">
                      <Icon size={24} />
                    </div>
                    <h3 className="mb-3 font-headline text-base font-bold text-on-background">
                      {service.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-primary">{service.description}</p>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      {content.categoryLabels[service.category]}
                    </span>
                    <a
                      href="#contato"
                      aria-label={`${content.ctaLabel}: ${service.title}`}
                      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-tertiary transition-transform group-hover:translate-x-1"
                    >
                      {content.ctaLabel}
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
