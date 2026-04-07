import { LANGUAGE_OPTIONS } from '../constants';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  label: string;
  tone?: 'dark' | 'light';
  expanded?: boolean;
  className?: string;
}

export default function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
  label,
  tone = 'dark',
  expanded = false,
  className = '',
}: LanguageSwitcherProps) {
  const isDark = tone === 'dark';
  const wrapperClass = isDark
    ? 'border-white/10 bg-white/5'
    : 'border-stone-300 bg-stone-200/70';
  const activeClass = isDark
    ? 'bg-tertiary text-white'
    : 'bg-on-background text-white';
  const inactiveClass = isDark
    ? 'text-white/55 hover:text-white'
    : 'text-stone-500 hover:text-on-background';

  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <span
        className={`font-headline text-[9px] font-bold uppercase tracking-[0.24em] ${
          isDark ? 'text-white/45' : 'text-stone-500'
        }`}
      >
        {label}
      </span>
      <div
        role="group"
        aria-label={label}
        className={`flex items-center rounded-full border p-1 ${wrapperClass}`}
      >
        {LANGUAGE_OPTIONS.map((option) => {
          const isActive = option.code === currentLanguage;

          return (
            <button
              key={option.code}
              type="button"
              title={option.label}
              onClick={() => onLanguageChange(option.code)}
              className={`rounded-full px-3 py-1.5 font-headline text-[10px] font-bold uppercase tracking-[0.22em] transition-all ${
                isActive ? activeClass : inactiveClass
              }`}
              aria-pressed={isActive}
            >
              {expanded ? option.label : option.shortLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
