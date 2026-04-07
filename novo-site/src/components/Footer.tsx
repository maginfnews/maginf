import type { BrandContent, FooterContent, NavLink } from '../types';
import BrandMark from './BrandMark';

interface FooterProps {
  brand: BrandContent;
  content: FooterContent;
  navLinks: NavLink[];
}

export default function Footer({ brand, content, navLinks }: FooterProps) {
  return (
    <footer className="bg-stone-100 pb-10 pt-20">
      <div className="mx-auto mb-16 grid max-w-[1440px] grid-cols-1 gap-16 px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-6">
          <BrandMark tone="light" content={brand} />
          <p className="max-w-sm text-[13px] leading-relaxed text-stone-500">
            {content.description}
          </p>
          <a
            href={content.ctaHref}
            className="inline-flex rounded-sm bg-on-background px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.26em] text-white transition-all hover:brightness-110"
          >
            {content.cta}
          </a>
        </div>

        <div>
          <h5 className="mb-8 font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-on-background">
            {content.navigationTitle}
          </h5>
          <ul className="space-y-4 text-[13px] font-medium text-stone-500">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-tertiary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {content.groups.map((group) => (
          <div key={group.title}>
            <h5 className="mb-8 font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-on-background">
              {group.title}
            </h5>
            <ul className="space-y-4 text-[13px] font-medium text-stone-500">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 border-t border-stone-200 px-6 pt-8 text-[11px] font-bold uppercase tracking-widest text-stone-400 md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {content.copyright}
        </p>
        <a href="#inicio" className="text-tertiary transition-colors hover:text-on-background">
          {content.backToTop}
        </a>
      </div>
    </footer>
  );
}
