import React from 'react';
import dynamic from 'next/dynamic';
import SEO from './components/SEO';
import SchemaMarkup from './components/SchemaMarkup';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesPreview from './components/ServicesPreview';
import PlansPreview from './components/PlansPreview';
import Process from './components/Process';
import AboutPreview from './components/AboutPreview';
import PortfolioPreview from './components/PortfolioPreview';
import BlogPreview from './components/BlogPreview';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const ReadingProgress = dynamic(() => import('./components/ReadingProgress'), {
  ssr: false,
});

const DarkModeToggle = dynamic(() => import('./components/DarkModeToggle'), {
  ssr: false,
});

const Chatbot = dynamic(() => import('./components/Chatbot'), {
  ssr: false,
});

const CampanhaManager = dynamic(() => import('./components/CampanhaManager'), {
  ssr: false,
});

const CookieConsent = dynamic(() => import('./components/CookieConsent'), {
  ssr: false,
});

const ScrollToTop = dynamic(() => import('./components/ScrollToTop'), {
  ssr: false,
});

function App() {
  return (
    <div className="App">
      <SEO />
      <SchemaMarkup />
      <ReadingProgress />
      {/* <CustomCursor /> */}
      <DarkModeToggle />
      <Header />
      <CampanhaManager />
      <Hero />
      <ServicesPreview />
      <Process />
      <PlansPreview />
      <AboutPreview />
      <PortfolioPreview />
      <BlogPreview />
      <FAQ />
      <Footer />
      <CookieConsent />
      
      {/* Floating Buttons */}
      <ScrollToTop />
      <Chatbot />
    </div>
  );
}

export default App;
