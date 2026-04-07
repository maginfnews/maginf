import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { BrandContent, Language, NavbarContent } from '../types';
import BrandMark from './BrandMark';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  brand: BrandContent;
  content: NavbarContent;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export default function Navbar({
  brand,
  content,
  language,
  onLanguageChange,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <BrandMark content={brand} />
        </motion.div>

        <div className="hidden items-center gap-8 font-headline text-[11px] font-semibold uppercase tracking-[0.2em] xl:flex">
          {content.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
            label={content.languageLabel}
          />
          <a
            href="#diagnostico"
            className="rounded-sm bg-tertiary px-4 py-2 font-headline text-[10px] font-bold uppercase tracking-[0.28em] text-white transition-all hover:brightness-105"
          >
            {content.cta}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex text-white md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? content.closeMenuLabel : content.openMenuLabel}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="border-b border-white/10 bg-[#050505] px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {content.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="font-headline text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={onLanguageChange}
                label={content.languageLabel}
                expanded
                className="pt-2"
              />
              <a
                href="#diagnostico"
                onClick={closeMenu}
                className="mt-2 inline-flex w-fit rounded-sm bg-tertiary px-4 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.28em] text-white"
              >
                {content.mobileCta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
