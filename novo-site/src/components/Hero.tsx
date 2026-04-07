import { motion } from 'motion/react';
import { Shield, TrendingDown, Server, Activity } from 'lucide-react';
import type { HeroContent } from '../types';

interface HeroProps {
  content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
  const [uptime, reduction, assets, monitoring] = content.stats;

  return (
    <header id="inicio" className="relative overflow-hidden bg-[#111111] pb-20 pt-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,0,0.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_25%),linear-gradient(135deg,#0f0f0f_0%,#1d1d1d_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:42px_42px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-28 top-24 h-72 w-72 rounded-full bg-tertiary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center lg:col-span-5"
          >
            <span className="label-sm text-tertiary">{content.eyebrow}</span>
            <h1 className="mt-4 font-headline text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              {content.title}
              <span className="text-tertiary">{content.highlight}</span>.
            </h1>
            <p className="mb-8 mt-6 max-w-lg text-base leading-relaxed text-stone-400">
              {content.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#diagnostico"
                className="rounded-sm bg-tertiary px-8 py-4 font-headline text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-tertiary/20 transition-all hover:brightness-110"
              >
                {content.primaryCta}
              </a>
              <a
                href="#servicos"
                className="rounded-sm border border-white/20 bg-white/10 px-8 py-4 font-headline text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/20"
              >
                {content.secondaryCta}
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-stone-800 bg-stone-900/50 p-8 backdrop-blur-md"
              >
                <div className="mb-6 flex items-center justify-between">
                  <Activity className="text-tertiary" size={24} />
                  <span className="text-[10px] font-bold tracking-widest text-green-500">
                    {uptime.tag}
                  </span>
                </div>
                <div className="font-headline text-4xl font-black text-white">{uptime.value}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                  {uptime.label}
                </div>
                <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-stone-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '99.9%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-tertiary"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-stone-800 bg-stone-900/50 p-8 backdrop-blur-md"
              >
                <div className="mb-6 flex items-center justify-between">
                  <TrendingDown className="text-tertiary" size={24} />
                  <span className="text-[10px] font-bold tracking-widest text-tertiary">
                    {reduction.tag}
                  </span>
                </div>
                <div className="font-headline text-4xl font-black text-white">
                  {reduction.value}
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                  {reduction.label}
                </div>
                <div className="mt-6 flex h-8 items-end gap-1">
                  <div className="h-1/2 w-1 bg-stone-700" />
                  <div className="h-3/4 w-1 bg-stone-700" />
                  <div className="h-full w-1 bg-tertiary" />
                  <div className="h-2/3 w-1 bg-tertiary" />
                  <div className="h-1/3 w-1 bg-tertiary" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-stone-800 bg-stone-900/50 p-8 backdrop-blur-md"
              >
                <div className="mb-6 flex items-center justify-between">
                  <Server className="text-tertiary" size={24} />
                  <span className="text-[10px] font-bold tracking-widest text-stone-400">
                    {assets.tag}
                  </span>
                </div>
                <div className="font-headline text-4xl font-black text-white">{assets.value}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                  {assets.label}
                </div>
                <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-stone-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className="h-full bg-white/40"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-stone-800 bg-stone-900/50 p-8 backdrop-blur-md"
              >
                <div className="mb-6 flex items-center justify-between">
                  <Shield className="text-tertiary" size={24} />
                  <span className="text-[10px] font-bold tracking-widest text-blue-400">
                    {monitoring.tag}
                  </span>
                </div>
                <div className="font-headline text-4xl font-black text-white">
                  {monitoring.value}
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                  {monitoring.label}
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                    SOC
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
