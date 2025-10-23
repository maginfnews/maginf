// Google Analytics 4 + Search Console

export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Substitua pelo seu ID

// Inicializar Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Rastrear eventos
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Rastrear conversões
export const trackConversion = (conversionId) => {
  trackEvent('conversion', 'lead', conversionId);
};

// Schema para Google Search Console
export const searchConsoleVerification = '<meta name="google-site-verification" content="SEU_CODIGO_AQUI" />';