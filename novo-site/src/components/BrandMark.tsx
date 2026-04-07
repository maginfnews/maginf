import logoUrl from '../assets/maginf-logo.svg';
import type { BrandContent } from '../types';

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
  tone?: 'dark' | 'light';
  content: BrandContent;
  href?: string;
}

export default function BrandMark({
  className = '',
  compact = false,
  tone = 'dark',
  content,
  href = '#inicio',
}: BrandMarkProps) {
  const imageHeightClass = compact ? 'h-8 sm:h-9' : 'h-10 sm:h-11';
  const containerClass =
    tone === 'light'
      ? 'rounded-xl bg-[#111111] px-4 py-3 shadow-[0_18px_40px_rgba(28,27,27,0.12)]'
      : '';

  return (
    <a
      href={href}
      aria-label={content.homeAriaLabel}
      className={`inline-flex items-center ${className}`.trim()}
    >
      <span className={`inline-flex items-center ${containerClass}`.trim()}>
        <img
          src={logoUrl}
          alt={content.logoAlt}
          className={`${imageHeightClass} w-auto`}
          decoding="async"
        />
      </span>
    </a>
  );
}
