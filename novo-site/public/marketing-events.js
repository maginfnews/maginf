(() => {
  'use strict';

  if (window.__maginfMarketingEventsLoaded) return;
  window.__maginfMarketingEventsLoaded = true;
  window.dataLayer = window.dataLayer || [];

  const language = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';

  function sanitizeProperties(properties) {
    const safe = {};
    if (!properties || typeof properties !== 'object') return safe;

    Object.entries(properties).forEach(([key, value]) => {
      if (!/^[a-z][a-z0-9_]{0,39}$/.test(key)) return;
      if (typeof value === 'string') safe[key] = value.slice(0, 100);
      if (typeof value === 'number' && Number.isFinite(value)) safe[key] = value;
      if (typeof value === 'boolean') safe[key] = value;
    });

    return safe;
  }

  window.maginfTrack = function maginfTrack(eventName, properties) {
    if (!/^[a-z][a-z0-9_]{1,39}$/.test(eventName)) return;
    window.dataLayer.push({
      event: eventName,
      page_path: window.location.pathname,
      page_language: language,
      ...sanitizeProperties(properties),
    });
  };

  function getPlacement(element) {
    const trackedParent = element.closest('[data-tracking-location]');
    if (trackedParent) return trackedParent.getAttribute('data-tracking-location') || 'site';
    const section = element.closest('section[id]');
    return section?.id || 'site';
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const rawHref = link.getAttribute('href') || '';
    const normalizedHref = rawHref.toLowerCase();
    const placement = getPlacement(link);

    if (normalizedHref.startsWith('https://wa.me/') || normalizedHref.includes('api.whatsapp.com')) {
      window.maginfTrack('whatsapp_click', { link_placement: placement });
      return;
    }

    if (normalizedHref.startsWith('mailto:')) {
      window.maginfTrack('email_click', { link_placement: placement });
      return;
    }

    if (normalizedHref.startsWith('tel:')) {
      window.maginfTrack('phone_click', { link_placement: placement });
    }
  }, { capture: true });

  function trackServicePage() {
    const match = window.location.pathname.match(/^\/servicos\/([^/]+)\/?$/);
    if (!match) return;
    window.maginfTrack('service_page_view', { service_slug: match[1] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackServicePage, { once: true });
  } else {
    trackServicePage();
  }
})();
