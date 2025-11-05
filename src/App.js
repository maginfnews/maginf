import React from 'react';
import SEO from './components/SEO';
import SchemaMarkup from './components/SchemaMarkup';
import Analytics from './components/Analytics';
import ReadingProgress from './components/ReadingProgress';
// import CustomCursor from './components/CustomCursor';
import DarkModeToggle from './components/DarkModeToggle';
import Chatbot from './components/Chatbot';
import NovenbroAzul from './components/NovenbroAzul';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Plans from './components/Plans';
import Process from './components/Process';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
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
      <NovenbroAzul />
      <Header />
      {/* Spacer para compensar navbar fixo */}
      <div className="h-24"></div>
      <Hero />
      <Services />
      <Plans />
      <Process />
      <About />
      <Portfolio />
      <Blog />
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
