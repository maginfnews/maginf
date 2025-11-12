// Otimizações para Core Web Vitals

// 1. Lazy loading de imagens
export const LazyImage = ({ src, alt = '', className, ...props }) => {
  // Validar alt text e adicionar fallback
  const finalAlt = alt || 'Imagem';
  
  if (!alt || alt.trim() === '') {
    console.warn('⚠️ LazyImage sem alt text:', src);
  }
  
  return (
    <img
      src={src}
      alt={finalAlt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

// 2. Preload de recursos críticos
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload fontes
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = '/fonts/inter.woff2';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = '';
    document.head.appendChild(fontLink);
    
    // Preload imagens críticas
    const logoLink = document.createElement('link');
    logoLink.rel = 'preload';
    logoLink.href = '/images/logo-maginf.svg';
    logoLink.as = 'image';
    document.head.appendChild(logoLink);
  }
};

// 3. Otimização de JavaScript
export const optimizeJS = () => {
  // Code splitting automático
  // Tree shaking
  // Minificação
};

// 4. Service Worker para cache
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
};