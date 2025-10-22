import React from 'react';
import OutubroRosa from './components/OutubroRosa';
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

function App() {
  return (
    <div className="App">
      <OutubroRosa />
      <Header />
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
    </div>
  );
}

export default App;
