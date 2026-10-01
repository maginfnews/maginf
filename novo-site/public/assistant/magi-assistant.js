(() => {
  'use strict';

  if (window.__MAGI_ASSISTANT_LOADED__) return;
  window.__MAGI_ASSISTANT_LOADED__ = true;

  const API_PATH = '/api/chat';
  const WHATSAPP_URL = 'https://wa.me/5511351429330';
  const MAX_USER_MESSAGES = 8;
  const MAX_MESSAGE_LENGTH = 600;
  const REQUEST_TIMEOUT_MS = 15000;
  const MOBILE_BREAKPOINT = 720;

  const COPY = {
    'pt-BR': {
      name: 'MAGI', role: 'Guia virtual MAGINF', online: 'Online',
      open: 'Conversar com a guia virtual da MAGINF', close: 'Fechar guia virtual',
      greeting: 'Olá! Eu sou a MAGI, guia virtual da MAGINF. Posso explicar nossos serviços, conduzir você pelo site, orientar o diagnóstico online ou conectar você à equipe. Como posso ajudar?',
      placeholder: 'Digite sua pergunta…', send: 'Enviar mensagem', thinking: 'Analisando sua pergunta…',
      error: 'Não consegui responder agora. Você pode tentar novamente ou falar diretamente com a equipe MAGINF.',
      limit: 'Para continuar com segurança e atenção ao seu cenário, fale com um especialista da MAGINF ou inicie o diagnóstico online.',
      privacy: 'Não envie senhas ou dados sensíveis. As mensagens podem ser processadas por IA.',
      diagnosis: 'Fazer diagnóstico', whatsapp: 'Falar no WhatsApp', quickTitle: 'Você pode perguntar:',
      quick: ['Quais serviços vocês oferecem?', 'Como reduzir problemas recorrentes de TI?', 'Como funciona o diagnóstico online?'],
      stops: {
        inicio: ['Eu acompanho você. Posso mostrar como a MAGINF organiza a operação de TI.', 'Conhecer serviços', '#servicos'],
        'outubro-rosa': ['Outubro Rosa: informação confiável também faz parte do cuidado. Posso mostrar os canais oficiais do INCA.', 'Ver campanha', '#outubro-rosa'],
        servicos: ['Aqui estão as frentes que reduzem interrupções e devolvem previsibilidade.', 'Ver soluções', '#solucoes'],
        solucoes: ['Nosso método começa pelo cenário real e evolui para uma rotina técnica contínua.', 'Ver setores', '#setores'],
        setores: ['Se sua empresa depende de disponibilidade, o diagnóstico ajuda a priorizar o próximo passo.', 'Ir ao diagnóstico', '#diagnostico'],
        diagnostico: ['Responda seis perguntas e receba uma leitura imediata da maturidade da operação.', 'Começar agora', '#diagnostico'],
        contato: ['Quer conversar com uma pessoa? Eu conecto você agora à equipe MAGINF.', 'Abrir conversa', 'chat'],
        page: ['Posso explicar esta solução e ajudar você a encontrar o próximo passo.', 'Conversar comigo', 'chat'],
      },
    },
    en: {
      name: 'MAGI', role: 'MAGINF virtual guide', online: 'Online',
      open: 'Chat with the MAGINF virtual guide', close: 'Close virtual guide',
      greeting: 'Hi! I am MAGI, MAGINF’s virtual guide. I can explain our services, guide you through the site, help with the online assessment or connect you with the team. How can I help?',
      placeholder: 'Type your question…', send: 'Send message', thinking: 'Reviewing your question…',
      error: 'I could not answer right now. You can try again or contact the MAGINF team directly.',
      limit: 'To continue with proper attention to your scenario, talk to a MAGINF specialist or start the online assessment.',
      privacy: 'Do not send passwords or sensitive data. Messages may be processed by AI.',
      diagnosis: 'Start assessment', whatsapp: 'Chat on WhatsApp', quickTitle: 'You can ask:',
      quick: ['Which services do you provide?', 'How can we reduce recurring IT problems?', 'How does the online assessment work?'],
      stops: {
        inicio: ['I can guide you through how MAGINF structures reliable IT operations.', 'Explore services', '#servicos'],
        'outubro-rosa': ['Pink October is a reminder that reliable information is part of care. I can show the official INCA resources.', 'See campaign', '#outubro-rosa'],
        servicos: ['These capabilities reduce interruptions and improve operational predictability.', 'See solutions', '#solucoes'],
        solucoes: ['Our method starts with your real environment and evolves into continuous operations.', 'See sectors', '#setores'],
        setores: ['If your business depends on availability, the assessment helps prioritize the next step.', 'Go to assessment', '#diagnostico'],
        diagnostico: ['Answer six questions and receive an immediate view of your operational maturity.', 'Start now', '#diagnostico'],
        contato: ['Would you like to talk to a person? I can connect you with the MAGINF team.', 'Open chat', 'chat'],
        page: ['I can explain this solution and help you identify the best next step.', 'Chat with me', 'chat'],
      },
    },
  };

  let language = document.documentElement.lang === 'en' ? 'en' : 'pt-BR';
  let copy = COPY[language];
  let messages = [{ role: 'assistant', content: copy.greeting }];
  let userMessageCount = 0;
  let isLoading = false;
  let openedOnce = false;
  let currentStop = null;
  let currentStopIndex = 0;
  let guideObserver = null;
  let guideRetryTimer = 0;
  let teaserTimer = 0;
  let walkTimer = 0;
  const announcedStops = new Set();

  function track(eventName, properties = {}) {
    if (typeof window.maginfTrack === 'function') {
      window.maginfTrack(eventName, { assistant_name: 'magi', ...properties });
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, assistant_name: 'magi', page_path: window.location.pathname, ...properties });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function createMarkup() {
    const root = document.createElement('div');
    root.id = 'magi-assistant-root';
    root.innerHTML = `
      <button type="button" class="magi-teaser" data-visible="false" hidden>
        <span class="magi-teaser-label">${copy.name}</span>
        <span class="magi-teaser-text"></span>
        <span class="magi-teaser-cta"></span>
      </button>
      <section class="magi-panel" role="dialog" aria-label="${copy.role}" aria-hidden="true" hidden>
        <header class="magi-header">
          <div class="magi-header-avatar"><img src="/assistant/magi-avatar.webp" width="56" height="56" alt=""></div>
          <div class="magi-header-copy">
            <div class="magi-name-row"><h2 class="magi-name">${copy.name}</h2><span class="magi-spark" aria-hidden="true">✦</span></div>
            <p class="magi-role">${copy.role}</p>
            <span class="magi-online">${copy.online}</span>
          </div>
          <button type="button" class="magi-close" aria-label="${copy.close}">✕</button>
        </header>
        <div class="magi-messages" aria-live="polite"></div>
        <footer class="magi-footer">
          <div class="magi-actions">
            <button type="button" class="magi-action magi-diagnosis" data-primary="true">${copy.diagnosis} →</button>
            <a class="magi-action magi-whatsapp" href="${WHATSAPP_URL}" target="_blank" rel="noreferrer">${copy.whatsapp}</a>
          </div>
          <form class="magi-form">
            <label for="magi-message" class="magi-visually-hidden">${copy.placeholder}</label>
            <textarea id="magi-message" class="magi-input" rows="1" maxlength="${MAX_MESSAGE_LENGTH}" placeholder="${copy.placeholder}"></textarea>
            <button type="submit" class="magi-send" aria-label="${copy.send}" disabled>➤</button>
          </form>
          <p class="magi-privacy">${copy.privacy}</p>
        </footer>
      </section>
      <button type="button" class="magi-launcher" aria-label="${copy.open}" aria-expanded="false" data-direction="left">
        <span class="magi-guide-character"><img class="magi-guide-image" src="/assistant/magi-guide.webp" width="447" height="900" alt=""></span>
        <span class="magi-guide-shadow" aria-hidden="true"></span>
        <span class="magi-status-dot" aria-hidden="true"></span>
        <span class="magi-message-icon" aria-hidden="true">◉</span>
      </button>`;
    document.body.appendChild(root);
    return root;
  }

  const root = createMarkup();
  const panel = root.querySelector('.magi-panel');
  const launcher = root.querySelector('.magi-launcher');
  const teaser = root.querySelector('.magi-teaser');
  const closeButton = root.querySelector('.magi-close');
  const messagesContainer = root.querySelector('.magi-messages');
  const form = root.querySelector('.magi-form');
  const input = root.querySelector('.magi-input');
  const sendButton = root.querySelector('.magi-send');
  const diagnosisButton = root.querySelector('.magi-diagnosis');
  const whatsappLink = root.querySelector('.magi-whatsapp');
  const inputLabel = root.querySelector('label[for="magi-message"]');
  const teaserText = root.querySelector('.magi-teaser-text');
  const teaserCta = root.querySelector('.magi-teaser-cta');

  function stopDefinition(id) {
    const details = copy.stops[id] || copy.stops.page;
    return { id, text: details[0], cta: details[1], target: details[2] };
  }

  function renderMessages() {
    const messageMarkup = messages.map((message) => `
      <div class="magi-message-row" data-role="${message.role}">
        <div class="magi-message">${escapeHtml(message.content)}</div>
      </div>`).join('');
    const quickMarkup = messages.length === 1 ? `
      <p class="magi-quick-title">${copy.quickTitle}</p>
      <div class="magi-quick-actions">${copy.quick.map((action) => `<button type="button" class="magi-chip" data-question="${escapeHtml(action)}">${escapeHtml(action)}</button>`).join('')}</div>` : '';
    const thinkingMarkup = isLoading ? `<div class="magi-thinking">${copy.thinking}</div>` : '';
    messagesContainer.innerHTML = messageMarkup + quickMarkup + thinkingMarkup;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    messagesContainer.querySelectorAll('.magi-chip').forEach((button) => {
      button.addEventListener('click', () => sendMessage(button.dataset.question || ''));
    });
  }

  function applyLanguage(nextLanguage) {
    const normalizedLanguage = nextLanguage === 'en' ? 'en' : 'pt-BR';
    if (normalizedLanguage === language && root.dataset.languageReady === 'true') return;
    language = normalizedLanguage;
    copy = COPY[language];
    root.dataset.languageReady = 'true';
    root.querySelector('.magi-teaser-label').textContent = copy.name;
    root.querySelector('.magi-name').textContent = copy.name;
    root.querySelector('.magi-role').textContent = copy.role;
    root.querySelector('.magi-online').textContent = copy.online;
    panel.setAttribute('aria-label', copy.role);
    closeButton.setAttribute('aria-label', copy.close);
    launcher.setAttribute('aria-label', panel.getAttribute('data-open') === 'true' ? copy.close : copy.open);
    diagnosisButton.textContent = `${copy.diagnosis} →`;
    whatsappLink.textContent = copy.whatsapp;
    input.placeholder = copy.placeholder;
    inputLabel.textContent = copy.placeholder;
    sendButton.setAttribute('aria-label', copy.send);
    root.querySelector('.magi-privacy').textContent = copy.privacy;
    if (messages.length === 1 && messages[0].role === 'assistant') messages = [{ role: 'assistant', content: copy.greeting }];
    if (currentStop) updateTeaser(stopDefinition(currentStop.id));
    renderMessages();
  }

  function setOpen(open) {
    window.clearTimeout(teaserTimer);
    teaser.hidden = true;
    teaser.setAttribute('data-visible', 'false');
    if (open) {
      panel.hidden = false;
      panel.setAttribute('aria-hidden', 'false');
      launcher.setAttribute('aria-expanded', 'true');
      launcher.setAttribute('aria-label', copy.close);
      root.dataset.chatOpen = 'true';
      requestAnimationFrame(() => panel.setAttribute('data-open', 'true'));
      setTimeout(() => input.focus(), 240);
      if (!openedOnce) { track('assistant_opened'); openedOnce = true; }
      return;
    }
    panel.setAttribute('data-open', 'false');
    panel.setAttribute('aria-hidden', 'true');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', copy.open);
    root.dataset.chatOpen = 'false';
    setTimeout(() => { panel.hidden = true; launcher.focus(); }, 240);
  }

  function updateTeaser(stop) {
    teaserText.textContent = stop.text;
    teaserCta.textContent = `${stop.cta} →`;
    teaser.dataset.target = stop.target;
  }

  function moveGuide(stop, index) {
    currentStop = stop;
    currentStopIndex = index;
    const compact = window.innerWidth <= MOBILE_BREAKPOINT || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const guideWidth = compact ? 78 : 170;
    const margin = compact ? 10 : 22;
    const rightSide = compact || index % 2 === 0;
    const nextX = rightSide ? Math.max(margin, window.innerWidth - guideWidth - margin) : 118;
    const previousX = Number.parseFloat(launcher.style.left || `${window.innerWidth - guideWidth - margin}`);
    launcher.dataset.direction = nextX < previousX ? 'left' : 'right';
    launcher.style.left = `${nextX}px`;
    root.dataset.guideSide = rightSide ? 'right' : 'left';
    launcher.dataset.walking = compact ? 'false' : 'true';
    window.clearTimeout(walkTimer);
    walkTimer = window.setTimeout(() => { launcher.dataset.walking = 'false'; }, compact ? 10 : 1050);
  }

  function announceStop(stop, index, force = false) {
    moveGuide(stop, index);
    updateTeaser(stop);
    if (panel.getAttribute('data-open') === 'true') return;
    if (!force && announcedStops.has(stop.id)) return;
    announcedStops.add(stop.id);
    window.clearTimeout(teaserTimer);
    teaser.hidden = false;
    requestAnimationFrame(() => teaser.setAttribute('data-visible', 'true'));
    teaserTimer = window.setTimeout(() => {
      teaser.setAttribute('data-visible', 'false');
      setTimeout(() => { teaser.hidden = true; }, 230);
    }, 6200);
    track('assistant_guide_stop', { guide_section: stop.id });
  }

  function setupGuide() {
    window.clearTimeout(guideRetryTimer);
    guideObserver?.disconnect();
    const ids = ['inicio', 'outubro-rosa', 'servicos', 'solucoes', 'setores', 'diagnostico', 'contato'];
    const available = ids.map((id) => ({ element: document.getElementById(id), stop: stopDefinition(id) })).filter((item) => item.element);
    if (!available.length) {
      guideRetryTimer = window.setTimeout(setupGuide, 500);
      return;
    }
    guideObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = available.findIndex((item) => item.element === visible.target);
      if (index < 0 || currentStop?.id === available[index].stop.id) return;
      announceStop(available[index].stop, index);
    }, { rootMargin: '-20% 0px -58% 0px', threshold: [0, 0.01, 0.15] });
    available.forEach((item) => guideObserver.observe(item.element));
    window.setTimeout(() => {
      if (!currentStop) announceStop(available[0].stop, 0);
    }, 1300);
  }

  async function requestReply(nextMessages) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(API_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, messages: nextMessages.slice(-10) }),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.reply) throw new Error(payload.error || `HTTP ${response.status}`);
      return payload;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  async function sendMessage(rawMessage) {
    const content = String(rawMessage || '').trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!content || isLoading) return;
    if (userMessageCount >= MAX_USER_MESSAGES) {
      messages.push({ role: 'assistant', content: copy.limit });
      renderMessages();
      return;
    }
    messages.push({ role: 'user', content });
    userMessageCount += 1;
    input.value = '';
    sendButton.disabled = true;
    isLoading = true;
    renderMessages();
    track('assistant_message_sent', { message_number: userMessageCount });
    try {
      const payload = await requestReply(messages.map(({ role, content: messageContent }) => ({ role, content: messageContent })));
      messages.push({ role: 'assistant', content: payload.reply });
      track('assistant_reply_received', { reply_source: payload.source || 'unknown' });
    } catch (error) {
      console.error('Virtual assistant request failed', error);
      messages.push({ role: 'assistant', content: copy.error });
      track('assistant_request_failed');
    } finally {
      isLoading = false;
      input.disabled = userMessageCount >= MAX_USER_MESSAGES;
      sendButton.disabled = !input.value.trim() || userMessageCount >= MAX_USER_MESSAGES;
      renderMessages();
    }
  }

  launcher.addEventListener('click', () => setOpen(panel.getAttribute('data-open') !== 'true'));
  teaser.addEventListener('click', () => {
    const target = teaser.dataset.target || 'chat';
    track('assistant_guide_action', { guide_section: currentStop?.id || 'page' });
    if (target === 'chat') { setOpen(true); return; }
    const destination = document.querySelector(target);
    if (destination) destination.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    else window.location.href = `/${target}`;
  });
  closeButton.addEventListener('click', () => setOpen(false));
  form.addEventListener('submit', (event) => { event.preventDefault(); sendMessage(input.value); });
  input.addEventListener('input', () => { sendButton.disabled = isLoading || !input.value.trim() || userMessageCount >= MAX_USER_MESSAGES; });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); form.requestSubmit(); }
  });
  diagnosisButton.addEventListener('click', () => {
    setOpen(false);
    setTimeout(() => {
      const assessment = document.querySelector('#diagnostico');
      if (assessment) assessment.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      else window.location.href = '/#diagnostico';
    }, 100);
    track('assistant_diagnosis_click');
  });
  whatsappLink.addEventListener('click', () => track('assistant_handoff_click', { handoff_channel: 'whatsapp' }));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && panel.getAttribute('data-open') === 'true') setOpen(false); });
  window.addEventListener('resize', () => { if (currentStop) moveGuide(currentStop, currentStopIndex); });

  applyLanguage(document.documentElement.lang);
  new MutationObserver(() => applyLanguage(document.documentElement.lang)).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  renderMessages();
  setupGuide();
})();
