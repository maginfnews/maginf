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

export default function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const content = SITE_CONTENT[language];

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = content.meta.title;
    updateMetaContent('meta[name="description"]', content.meta.description);
    updateMetaContent('meta[property="og:title"]', content.meta.title);
    updateMetaContent('meta[property="og:description"]', content.meta.description);
    updateMetaContent('meta[name="twitter:title"]', content.meta.title);
    updateMetaContent('meta[name="twitter:description"]', content.meta.description);
  }, [content.meta.description, content.meta.title, language]);

  const handleLanguageChange = (nextLanguage: Language) => {
    if (nextLanguage === language) {
      return;
    }

    startTransition(() => setLanguage(nextLanguage));
  };

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
