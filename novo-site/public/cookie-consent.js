(() => {
  'use strict';

  const STORAGE_KEY = 'maginf_cookie_consent_v1';
  const CONSENT_VERSION = 1;
  const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

  function readConsent() {
    try {
      const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
      if (!value || value.version !== CONSENT_VERSION || !Number.isFinite(value.updatedAt)) return null;
      if (Date.now() - value.updatedAt > MAX_AGE_MS) return null;
      return {
        version: CONSENT_VERSION,
        necessary: true,
        analytics: value.analytics === true,
        marketing: value.marketing === true,
        updatedAt: value.updatedAt,
      };
    } catch {
      return null;
    }
  }

  function consentPayload(consent) {
    return {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    };
  }

  const storedConsent = readConsent();
  let hasSavedConsent = Boolean(storedConsent);

  if (storedConsent) {
    window.gtag('consent', 'update', consentPayload(storedConsent));
    window.gtag('set', 'ads_data_redaction', !storedConsent.marketing);
  }

  const copy = {
    'pt-BR': {
      title: 'Sua privacidade importa',
      description: 'Usamos cookies necessários para o funcionamento do site. Com sua autorização, também usamos cookies de análise para entender a navegação e cookies de marketing para medir campanhas.',
      acceptAll: 'Aceitar todos',
      necessaryOnly: 'Somente necessários',
      customize: 'Personalizar',
      settings: 'Configurar cookies',
      modalTitle: 'Preferências de cookies',
      modalDescription: 'Escolha quais categorias podem ser utilizadas. Cookies necessários permanecem ativos para garantir funções essenciais do site.',
      necessaryTitle: 'Necessários',
      necessaryDescription: 'Mantêm recursos essenciais e as preferências de privacidade. Não podem ser desativados.',
      analyticsTitle: 'Análise',
      analyticsDescription: 'Ajudam a entender como o site é utilizado e quais páginas são mais relevantes.',
      marketingTitle: 'Marketing',
      marketingDescription: 'Permitem medir campanhas e criar públicos para anúncios mais relevantes.',
      alwaysActive: 'Sempre ativo',
      save: 'Salvar preferências',
      close: 'Fechar',
    },
    en: {
      title: 'Your privacy matters',
      description: 'We use necessary cookies to operate the website. With your permission, we also use analytics cookies to understand browsing and marketing cookies to measure campaigns.',
      acceptAll: 'Accept all',
      necessaryOnly: 'Necessary only',
      customize: 'Customize',
      settings: 'Cookie settings',
      modalTitle: 'Cookie preferences',
      modalDescription: 'Choose which categories may be used. Necessary cookies remain active to provide essential website functions.',
      necessaryTitle: 'Necessary',
      necessaryDescription: 'Support essential features and privacy preferences. They cannot be disabled.',
      analyticsTitle: 'Analytics',
      analyticsDescription: 'Help us understand how the website is used and which pages are most relevant.',
      marketingTitle: 'Marketing',
      marketingDescription: 'Allow campaign measurement and audience creation for more relevant advertising.',
      alwaysActive: 'Always active',
      save: 'Save preferences',
      close: 'Close',
    },
  };

  const language = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';
  const text = copy[language];
  let currentConsent = storedConsent || {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: Date.now(),
  };
  let lastFocusedElement = null;

  function saveConsent(analytics, marketing) {
    currentConsent = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: analytics === true,
      marketing: marketing === true,
      updatedAt: Date.now(),
    };

    hasSavedConsent = true;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentConsent));
    } catch {
      // Consent still applies to the current page even if storage is unavailable.
    }

    window.gtag('consent', 'update', consentPayload(currentConsent));
    window.gtag('set', 'ads_data_redaction', !currentConsent.marketing);
    window.dataLayer.push({
      event: 'maginf_consent_update',
      consent_analytics: currentConsent.analytics ? 'granted' : 'denied',
      consent_marketing: currentConsent.marketing ? 'granted' : 'denied',
    });

    hideBanner();
    closePreferences();
    showSettingsButton();
  }

  function hideBanner() {
    const banner = document.getElementById('maginf-cookie-banner');
    if (banner) banner.hidden = true;
  }

  function showBanner() {
    const banner = document.getElementById('maginf-cookie-banner');
    if (banner) banner.hidden = false;
  }

  function showSettingsButton() {
    const button = document.getElementById('maginf-cookie-settings');
    if (button) button.hidden = false;
  }

  function openPreferences(trigger) {
    lastFocusedElement = trigger || document.activeElement;
    const modal = document.getElementById('maginf-cookie-modal');
    const analyticsInput = document.getElementById('maginf-consent-analytics');
    const marketingInput = document.getElementById('maginf-consent-marketing');
    if (!modal || !analyticsInput || !marketingInput) return;

    analyticsInput.checked = currentConsent.analytics;
    marketingInput.checked = currentConsent.marketing;
    modal.hidden = false;
    document.documentElement.classList.add('maginf-consent-open');
    window.setTimeout(() => analyticsInput.focus(), 0);
  }

  function closePreferences() {
    const modal = document.getElementById('maginf-cookie-modal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.documentElement.classList.remove('maginf-consent-open');
    if (!hasSavedConsent) showBanner();
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }

  function createInterface() {
    const wrapper = document.createElement('div');
    wrapper.id = 'maginf-cookie-consent-root';
    wrapper.innerHTML = `
      <section id="maginf-cookie-banner" class="maginf-cookie-banner" role="region" aria-labelledby="maginf-cookie-title" ${storedConsent ? 'hidden' : ''}>
        <div class="maginf-cookie-copy">
          <p class="maginf-cookie-eyebrow">MAGINF Tecnologia</p>
          <h2 id="maginf-cookie-title">${text.title}</h2>
          <p>${text.description}</p>
        </div>
        <div class="maginf-cookie-actions">
          <button type="button" class="maginf-cookie-button maginf-cookie-button-primary" data-consent-action="accept-all">${text.acceptAll}</button>
          <button type="button" class="maginf-cookie-button" data-consent-action="necessary-only">${text.necessaryOnly}</button>
          <button type="button" class="maginf-cookie-link-button" data-consent-action="customize">${text.customize}</button>
        </div>
      </section>

      <button id="maginf-cookie-settings" class="maginf-cookie-settings" type="button" aria-haspopup="dialog" ${storedConsent ? '' : 'hidden'}>
        <span aria-hidden="true">◉</span>
        <span>${text.settings}</span>
      </button>

      <div id="maginf-cookie-modal" class="maginf-cookie-modal" role="dialog" aria-modal="true" aria-labelledby="maginf-cookie-modal-title" hidden>
        <div class="maginf-cookie-backdrop" data-consent-action="close"></div>
        <div class="maginf-cookie-panel" role="document">
          <div class="maginf-cookie-panel-header">
            <div>
              <p class="maginf-cookie-eyebrow">MAGINF Tecnologia</p>
              <h2 id="maginf-cookie-modal-title">${text.modalTitle}</h2>
            </div>
            <button type="button" class="maginf-cookie-close" data-consent-action="close" aria-label="${text.close}">×</button>
          </div>
          <p class="maginf-cookie-modal-description">${text.modalDescription}</p>
          <div class="maginf-cookie-options">
            <div class="maginf-cookie-option">
              <div><h3>${text.necessaryTitle}</h3><p>${text.necessaryDescription}</p></div>
              <span class="maginf-cookie-required">${text.alwaysActive}</span>
            </div>
            <label class="maginf-cookie-option" for="maginf-consent-analytics">
              <div><h3>${text.analyticsTitle}</h3><p>${text.analyticsDescription}</p></div>
              <span class="maginf-cookie-switch"><input id="maginf-consent-analytics" type="checkbox"><span aria-hidden="true"></span></span>
            </label>
            <label class="maginf-cookie-option" for="maginf-consent-marketing">
              <div><h3>${text.marketingTitle}</h3><p>${text.marketingDescription}</p></div>
              <span class="maginf-cookie-switch"><input id="maginf-consent-marketing" type="checkbox"><span aria-hidden="true"></span></span>
            </label>
          </div>
          <div class="maginf-cookie-panel-actions">
            <button type="button" class="maginf-cookie-button" data-consent-action="necessary-only">${text.necessaryOnly}</button>
            <button type="button" class="maginf-cookie-button maginf-cookie-button-primary" data-consent-action="save">${text.save}</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);

    wrapper.addEventListener('click', (event) => {
      const target = event.target.closest('[data-consent-action]');
      if (!target) return;
      const action = target.getAttribute('data-consent-action');
      if (action === 'accept-all') saveConsent(true, true);
      if (action === 'necessary-only') saveConsent(false, false);
      if (action === 'customize') openPreferences(target);
      if (action === 'close') closePreferences();
      if (action === 'save') {
        const analyticsInput = document.getElementById('maginf-consent-analytics');
        const marketingInput = document.getElementById('maginf-consent-marketing');
        saveConsent(Boolean(analyticsInput?.checked), Boolean(marketingInput?.checked));
      }
    });

    document.getElementById('maginf-cookie-settings')?.addEventListener('click', (event) => openPreferences(event.currentTarget));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePreferences();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createInterface, { once: true });
  } else {
    createInterface();
  }
})();
