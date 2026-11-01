/**
 * Cuidar Bem — Enfermagem Domiciliar
 * Interações sutis, acessibilidade e construtor de mensagem para WhatsApp
 */

const WHATSAPP_NUMBER = '554792535087';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initActiveNavHighlight();
  initFaqAccordion();
  initWhatsAppAssistant();
});

/**
 * Efeito sutil de cabeçalho ao rolar a página
 */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const updateHeader = () => {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/**
 * Menu responsivo mobile com suporte a teclado (ESC)
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (!toggleBtn || !mobileMenu) return;

  const setMenuState = (isOpen) => {
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      iconOpen?.classList.add('hidden');
      iconClose?.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      iconOpen?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
    }
  };

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    setMenuState(!isExpanded);
  });

  // Fecha ao clicar em qualquer link de âncora
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  // Fecha com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggleBtn.focus();
    }
  });
}

/**
 * Revelação suave de elementos durante a rolagem
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Destaca o item de navegação correspondente à seção visível
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const isMatch = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('text-[#d8a84e]', isMatch);
            link.classList.toggle('text-[#e6f0f2]', !isMatch);
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -55% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Acordeão acessível de Dúvidas Frequentes (FAQ)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isExpanded = item.getAttribute('aria-expanded') === 'true';

      // Fecha outros itens abertos para manter leitura limpa
      faqItems.forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        const otherBtn = other.querySelector('.faq-trigger');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isExpanded) {
        item.setAttribute('aria-expanded', 'true');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Construtor interativo de mensagem personalizada para o WhatsApp
 */
function initWhatsAppAssistant() {
  const form = document.getElementById('whatsapp-builder-form');
  const careButtons = document.querySelectorAll('[data-care-option]');
  const selectedCareInput = document.getElementById('selected-care-type');
  const previewText = document.getElementById('whatsapp-preview-text');
  const locationInput = document.getElementById('patient-location');
  const detailsInput = document.getElementById('patient-details');

  if (!form || !selectedCareInput) return;

  const buildMessage = () => {
    const careType = selectedCareInput.value || 'Atendimento de enfermagem domiciliar';
    const location = locationInput?.value.trim() || '';
    const details = detailsInput?.value.trim() || '';

    let msg = `Olá, equipe Cuidar Bem! Gostaria de conversar sobre *${careType}*.`;
    if (location) {
      msg += `\n📍 *Local/Bairro:* ${location}`;
    }
    if (details) {
      msg += `\n📝 *Observação:* ${details}`;
    }
    msg += `\n\nPodemos verificar a disponibilidade?`;
    return msg;
  };

  const updatePreview = () => {
    if (previewText) {
      previewText.textContent = buildMessage().replace(/\*/g, '');
    }
  };

  careButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-care-option') || '';
      selectedCareInput.value = value;

      careButtons.forEach((b) => {
        const active = b === btn;
        b.setAttribute('aria-pressed', String(active));
        if (active) {
          b.className =
            'care-chip px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border bg-[#d8a84e] text-[#0f232e] border-[#d8a84e] shadow-sm';
        } else {
          b.className =
            'care-chip px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border bg-white/10 text-white border-white/20 hover:bg-white/15 hover:border-[#d8a84e]/50';
        }
      });

      updatePreview();
    });
  });

  locationInput?.addEventListener('input', updatePreview);
  detailsInput?.addEventListener('input', updatePreview);

  // Botões nos cards de procedimentos que pré-selecionam o cuidado e rolam até o assistente
  document.querySelectorAll('[data-select-procedure]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const procName = trigger.getAttribute('data-select-procedure');
      if (!procName) return;

      const matchingBtn = Array.from(careButtons).find(
        (b) => b.getAttribute('data-care-option') === procName
      );
      if (matchingBtn) {
        e.preventDefault();
        matchingBtn.click();
        const contactSection = document.getElementById('contato');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => detailsInput?.focus(), 650);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = buildMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  updatePreview();
}

