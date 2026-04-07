import { StrictMode, startTransition, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SITE_CONTENT } from './constants';
import SupportPage from './components/SupportPage';
import type { Language } from './types';
import './index.css';

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

function SupportEntry() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const content = SITE_CONTENT[language];

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = content.support.meta.title;
    updateMetaContent('meta[name="description"]', content.support.meta.description);
    updateMetaContent('meta[property="og:title"]', content.support.meta.title);
    updateMetaContent('meta[property="og:description"]', content.support.meta.description);
    updateMetaContent('meta[name="twitter:title"]', content.support.meta.title);
    updateMetaContent('meta[name="twitter:description"]', content.support.meta.description);
  }, [content.support.meta.description, content.support.meta.title, language]);

  const handleLanguageChange = (nextLanguage: Language) => {
    if (nextLanguage === language) {
      return;
    }

    startTransition(() => setLanguage(nextLanguage));
  };

  return (
    <SupportPage
      brand={content.brand}
      nav={content.nav}
      support={content.support}
      language={language}
      onLanguageChange={handleLanguageChange}
    />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SupportEntry />
  </StrictMode>,
);
