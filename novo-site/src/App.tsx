import { startTransition, useEffect, useState } from 'react';
import { SITE_CONTENT } from './constants';
import type { Language } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesBar from './components/FeaturesBar';
import ChallengesSection from './components/ChallengesSection';
import ServiceCatalog from './components/ServiceCatalog';
import MaturitySection from './components/MaturitySection';
import FlowSection from './components/FlowSection';
import SectorsSection from './components/SectorsSection';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SupportPage from './components/SupportPage';

const LANGUAGE_STORAGE_KEY = 'maginf-language';

function updateMetaContent(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value);
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'pt-BR';
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return storedLanguage === 'en' ? 'en' : 'pt-BR';
}

function isSupportPath() {
  if (typeof window === 'undefined') {
    return false;
  }

  const pathname = window.location.pathname.toLowerCase();
  return pathname === '/suporte' || pathname === '/suporte/' || pathname === '/support' || pathname === '/support/';
}

export default function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const content = SITE_CONTENT[language];
  const pageMeta = isSupportPath() ? content.support.meta : content.meta;

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = pageMeta.title;
    updateMetaContent('meta[name="description"]', pageMeta.description);
    updateMetaContent('meta[property="og:title"]', pageMeta.title);
    updateMetaContent('meta[property="og:description"]', pageMeta.description);
    updateMetaContent('meta[name="twitter:title"]', pageMeta.title);
    updateMetaContent('meta[name="twitter:description"]', pageMeta.description);
  }, [language, pageMeta.description, pageMeta.title]);

  const handleLanguageChange = (nextLanguage: Language) => {
    if (nextLanguage === language) {
      return;
    }

    startTransition(() => setLanguage(nextLanguage));
  };

  if (isSupportPath()) {
    return (
      <SupportPage
        brand={content.brand}
        nav={content.nav}
        support={content.support}
        contact={content.contact}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-surface selection:bg-tertiary/20 selection:text-tertiary">
      <Navbar
        brand={content.brand}
        content={content.nav}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main>
        <Hero content={content.hero} />
        <FeaturesBar content={content.features} />
        <ChallengesSection content={content.challenges} />
        <ServiceCatalog content={content.services} />
        <MaturitySection content={content.maturity} />
        <FlowSection content={content.flow} />
        <SectorsSection content={content.sectors} />
        <CTASection content={content.cta} contact={content.contact} language={language} />
        <ContactSection content={content.contact} />
      </main>
      <Footer brand={content.brand} content={content.footer} navLinks={content.nav.links} />
    </div>
  );
}
