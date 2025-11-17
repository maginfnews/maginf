import React from 'react';
import SEO from './components/SEO';
import SchemaMarkup from './components/SchemaMarkup';
import Analytics from './components/Analytics';
import ReadingProgress from './components/ReadingProgress';
// import CustomCursor from './components/CustomCursor';
import DarkModeToggle from './components/DarkModeToggle';
import Chatbot from './components/Chatbot';
import CampanhaManager from './components/CampanhaManager';
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
import CookieConsent from './components/CookieConsent';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App">
      <SEO />
      <SchemaMarkup />
      <Analytics />
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
      <WhatsAppButton />
      <ScrollToTop />
      <Chatbot />
    </div>
  );
}

export default App;
