import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDownToLine,
  ArrowLeft,
  Copy,
  Download,
  Headset,
  LifeBuoy,
  Mail,
  Phone,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import type {
  BrandContent,
  Language,
  NavbarContent,
  SupportContent,
} from '../types';
import BrandMark from './BrandMark';
import LanguageSwitcher from './LanguageSwitcher';

interface SupportPageProps {
  brand: BrandContent;
  nav: NavbarContent;
  support: SupportContent;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

type DownloadState = 'checking' | 'ready' | 'unavailable';

function getActionIcon(icon: 'whatsapp' | 'phone' | 'email') {
  switch (icon) {
    case 'whatsapp':
      return Smartphone;
    case 'email':
      return Mail;
    case 'phone':
    default:
      return Phone;
  }
}

export default function SupportPage({
  brand,
  nav,
  support,
  language,
  onLanguageChange,
}: SupportPageProps) {
  const [downloadState, setDownloadState] = useState<DownloadState>('checking');
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    if (!support.downloadPath.startsWith('/')) {
      setDownloadState('ready');
      return;
    }

    const controller = new AbortController();
    let active = true;

    setDownloadState('checking');

    fetch(support.downloadPath, {
      method: 'HEAD',
      signal: controller.signal,
    })
      .then((response) => {
        if (!active) {
          return;
        }

        setDownloadState(response.ok ? 'ready' : 'unavailable');
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setDownloadState('unavailable');
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [support.downloadPath]);

  const statusLabel =
    downloadState === 'ready'
      ? support.downloadStatusReady
      : downloadState === 'unavailable'
        ? support.downloadStatusUnavailable
        : support.downloadStatusChecking;

  const statusMessage =
    downloadState === 'ready' ? support.readyMessage : support.unavailableMessage;

  const whatsappAction =
    support.quickActions.find((action) => action.icon === 'whatsapp') ?? support.quickActions[0];
  const phoneAction =
    support.quickActions.find((action) => action.icon === 'phone') ?? support.quickActions[1];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        typeof window === 'undefined'
          ? support.downloadPath
          : `${window.location.origin}${support.downloadPath}`,
      );
      setCopyFeedback(true);
      window.setTimeout(() => setCopyFeedback(false), 2200);
    } catch {
      setCopyFeedback(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#050505] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,0,0.25),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#050505_0%,#0d0d0d_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:40px_40px]"
      />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <BrandMark content={brand} href="/" />
          <div className="flex items-center gap-3">
            <LanguageSwitcher
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
              label={nav.languageLabel}
            />
            <a
              href="/"
              className="hidden rounded-sm border border-white/12 bg-white/6 px-4 py-2 font-headline text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 transition-all hover:bg-white/10 md:inline-flex"
            >
              {support.homeLabel}
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-tertiary/30 bg-tertiary/10 px-4 py-2 font-headline text-[10px] font-black uppercase tracking-[0.28em] text-tertiary">
                <LifeBuoy size={14} />
                {support.eyebrow}
              </div>

              <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                {support.title}
                <span className="text-tertiary">{support.highlight}</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
                {support.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {support.downloadMeta.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-white/76"
                  >
                    {item.value}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={downloadState === 'ready' ? support.downloadPath : whatsappAction.href}
                  download={downloadState === 'ready' ? '' : undefined}
                  target={downloadState === 'ready' ? undefined : '_blank'}
                  rel={downloadState === 'ready' ? undefined : 'noreferrer'}
                  className="inline-flex items-center gap-3 rounded-sm bg-tertiary px-8 py-4 font-headline text-[12px] font-black uppercase tracking-[0.22em] text-white shadow-[0_24px_80px_rgba(255,107,0,0.28)] transition-all hover:translate-y-[-1px] hover:brightness-110"
                >
                  <Download size={18} />
                  {support.downloadLabel}
                </a>
                <a
                  href={whatsappAction.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-sm border border-white/12 bg-white/6 px-8 py-4 font-headline text-[12px] font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-white/10"
                >
                  <Headset size={18} />
                  {support.alternativeLabel}
                </a>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-sm px-2 py-4 font-headline text-[11px] font-bold uppercase tracking-[0.18em] text-white/58 transition-colors hover:text-white"
                >
                  <ArrowLeft size={16} />
                  {support.homeLabel}
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-7"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.32),transparent_68%)]"
              />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-headline text-[11px] font-black uppercase tracking-[0.24em] text-white/40">
                      {support.downloadFileName}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-white/72">
                      <ArrowDownToLine className="text-tertiary" size={16} />
                      {statusLabel}
                    </div>
                  </div>
                  <div className="rounded-full border border-white/12 bg-black/30 px-4 py-2 font-headline text-[10px] font-black uppercase tracking-[0.22em] text-white/72">
                    {support.remoteBadge}
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-white/62">{statusMessage}</p>

                <div className="mt-6 rounded-[1.5rem] border border-tertiary/25 bg-tertiary/10 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 text-tertiary" size={18} />
                    <div>
                      <div className="font-headline text-sm font-black uppercase tracking-[0.18em] text-white">
                        {support.launcherTitle}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/68">{support.note}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={downloadState === 'ready' ? support.downloadPath : whatsappAction.href}
                    download={downloadState === 'ready' ? '' : undefined}
                    target={downloadState === 'ready' ? undefined : '_blank'}
                    rel={downloadState === 'ready' ? undefined : 'noreferrer'}
                    className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-5 py-4 font-headline text-[12px] font-black uppercase tracking-[0.22em] text-on-background transition-all hover:brightness-95"
                  >
                    <Download size={18} />
                    {support.downloadLabel}
                  </a>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href={phoneAction.href}
                      className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/12 bg-white/6 px-5 py-3 font-headline text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white/10"
                    >
                      <Phone size={16} />
                      {support.callLabel}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/12 bg-transparent px-5 py-3 font-headline text-[11px] font-black uppercase tracking-[0.2em] text-white/80 transition-all hover:bg-white/8 hover:text-white"
                    >
                      <Copy size={16} />
                      {copyFeedback ? support.copySuccessLabel : support.copyLinkLabel}
                    </button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-14 md:pb-18">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8"
            >
              <div className="font-headline text-[10px] font-black uppercase tracking-[0.26em] text-tertiary">
                {support.stepsTitle}
              </div>
              <h2 className="mt-4 font-headline text-3xl font-black text-white md:text-4xl">
                {support.stepsDescription}
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {support.steps.map((step) => (
                  <div
                    key={step.id}
                    className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tertiary font-headline text-sm font-black text-white">
                      {step.id}
                    </div>
                    <div className="mt-4 font-headline text-lg font-black text-white">{step.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,107,0,0.16),rgba(255,255,255,0.04))] p-6 md:p-8"
            >
              <div className="font-headline text-[10px] font-black uppercase tracking-[0.26em] text-tertiary">
                {support.quickActionsTitle}
              </div>
              <h2 className="mt-4 font-headline text-3xl font-black text-white md:text-4xl">
                {support.supportDeskTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/62">
                {support.supportDeskDescription}
              </p>
              <div className="mt-6 grid gap-4">
                {support.quickActions.map((action) => {
                  const Icon = getActionIcon(action.icon);

                  return (
                    <a
                      key={`${action.label}-${action.value}`}
                      href={action.href}
                      target={action.href.startsWith('http') ? '_blank' : undefined}
                      rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-black/22 px-5 py-4 transition-all hover:border-tertiary/35 hover:bg-black/28"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tertiary text-white">
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="font-headline text-[11px] font-black uppercase tracking-[0.2em] text-white/42">
                            {action.label}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-white">
                            {action.value}
                          </div>
                        </div>
                      </div>
                      <Headset size={18} className="text-white/34" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <div className="pointer-events-none fixed bottom-2 right-3 select-none font-headline text-[18vw] font-black leading-none tracking-[-0.08em] text-white/[0.03] md:bottom-4 md:right-6 md:text-[11vw]">
        SUPPORT
      </div>
    </div>
  );
}
