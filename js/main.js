/**
 * STACKLY FITNESS CLUB — MAIN INTERACTION MODULE
 * Sticky Nav, Mobile Menu Drawer, Dropdowns, Toast System, Modals, Image Fallbacks
 */

(function () {
  'use strict';

  // Global Stackly Application Namespace (Aliased with PulseApp for seamless backward compatibility)
  window.StacklyApp = window.PulseApp = window.StacklyApp || window.PulseApp || {};
  const PulseApp = window.StacklyApp;

  /* --------------------------------------------------------------------------
     1. Sticky Navigation & Scroll State
     -------------------------------------------------------------------------- */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function handleScroll() {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  /* --------------------------------------------------------------------------
     2. Active Link Highlighting
     -------------------------------------------------------------------------- */
  function highlightActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .dropdown-link');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const targetPath = href.split('/').pop().split('?')[0].split('#')[0];

      if (targetPath === currentPath || (currentPath === '' && targetPath === 'index.html')) {
        link.classList.add('active');
        // If it's a dropdown link, also highlight parent Programs dropdown toggle
        const dropdownParent = link.closest('.nav-item-dropdown');
        if (dropdownParent) {
          const parentToggle = dropdownParent.querySelector('.nav-dropdown-toggle');
          if (parentToggle) parentToggle.classList.add('active');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Mobile Navigation Drawer
     -------------------------------------------------------------------------- */
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const overlay = document.querySelector('.drawer-overlay');

    if (!toggleBtn || !drawer) return;

    const closeBtn = drawer.querySelector('.mobile-drawer-close');
    let scrollPosition = 0;

    function openDrawer() {
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
      toggleBtn.classList.add('open');
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');

      // Rigid background scroll lock
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';

      if (typeof gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(
          drawer.querySelectorAll('.mobile-nav-link'),
          { opacity: 0, x: 16 },
          { opacity: 1, x: 0, duration: 0.28, stagger: 0.035, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }
    }

    function closeDrawer() {
      toggleBtn.classList.remove('open');
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');

      // Restore background scroll position cleanly
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollPosition);
    }

    toggleBtn.addEventListener('click', function () {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    if (overlay) {
      overlay.addEventListener('click', closeDrawer);
    }

    // Close on navigation link click
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach((link) => {
      link.addEventListener('click', function () {
        closeDrawer();
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Submenu accordion in mobile drawer (if present)
    const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
    mobileSubmenuToggles.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = btn.closest('.mobile-nav-item');
        if (parent) {
          parent.classList.toggle('open');
          const submenu = parent.querySelector('.mobile-submenu');
          if (submenu) {
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
          }
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. FAQ Accordion Component
     -------------------------------------------------------------------------- */
  function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach((header) => {
      header.addEventListener('click', function () {
        const item = header.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');
        const isOpen = item.classList.contains('active');

        // Optional: close other accordions in the same container
        const parentAccordion = item.closest('.accordion');
        if (parentAccordion && !parentAccordion.classList.contains('allow-multiple')) {
          parentAccordion.querySelectorAll('.accordion-item').forEach((sibling) => {
            if (sibling !== item) {
              sibling.classList.remove('active');
              const sibContent = sibling.querySelector('.accordion-content');
              if (sibContent) sibContent.style.maxHeight = null;
              const sibHeader = sibling.querySelector('.accordion-header');
              if (sibHeader) sibHeader.setAttribute('aria-expanded', 'false');
            }
          });
        }

        if (isOpen) {
          item.classList.remove('active');
          content.style.maxHeight = null;
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Toast Notification System
     -------------------------------------------------------------------------- */
  function ensureToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    return container;
  }

  PulseApp.showToast = function (message, type = 'success', title = 'STACKLY FITNESS CLUB') {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-triangle-exclamation';
    if (type === 'info') iconClass = 'fa-circle-info';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass} toast-icon"></i>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close Notification">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    const closeBtn = toast.querySelector('.toast-close');
    function removeToast() {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    }

    closeBtn.addEventListener('click', removeToast);

    // Auto dismiss after 4.5s
    setTimeout(removeToast, 4500);
  };

  /* --------------------------------------------------------------------------
     6. Modal Dialog System
     -------------------------------------------------------------------------- */
  PulseApp.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Trigger Curtain Reveal and Paragraph Unfurl on modal elements
    if (window.PulseApp && typeof window.PulseApp.triggerCurtainAndUnfurl === 'function') {
      window.PulseApp.triggerCurtainAndUnfurl(modal);
    }

    // Focus on first input or close button
    const focusable = modal.querySelector('input, button, select, textarea');
    if (focusable) focusable.focus();
  };

  PulseApp.closeModal = function (modalId) {
    const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  function initModals() {
    // Backdrop click to close
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
          PulseApp.closeModal(backdrop);
        }
      });

      const closeBtns = backdrop.querySelectorAll('.modal-close-btn, [data-modal-close]');
      closeBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
          PulseApp.closeModal(backdrop);
        });
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-backdrop.open');
        if (openModal) PulseApp.closeModal(openModal);
      }
    });

    // Triggers with [data-modal-target]
    document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        PulseApp.openModal(targetId);
      });
    });

    // Trainer Detail Bio Modal Triggers
    document.querySelectorAll('.btn-view-trainer-bio').forEach((trigger) => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const name = trigger.getAttribute('data-name');
        const spec = trigger.getAttribute('data-spec');
        const cred = trigger.getAttribute('data-cred');
        const img = trigger.getAttribute('data-img');
        const bio = trigger.getAttribute('data-bio');
        const edu = trigger.getAttribute('data-edu');
        const exp = trigger.getAttribute('data-exp');
        const coachParam = trigger.getAttribute('data-coach-param') || name;

        const nameEl = document.getElementById('modalTrainerName');
        const specEl = document.getElementById('modalTrainerSpec');
        const credEl = document.getElementById('modalTrainerCred');
        const imgEl = document.getElementById('modalTrainerImg');
        const bioEl = document.getElementById('modalTrainerBio');
        const eduEl = document.getElementById('modalTrainerEdu');
        const expEl = document.getElementById('modalTrainerExp');
        const ctaEl = document.getElementById('modalTrainerCta');

        if (nameEl) nameEl.textContent = name || 'Performance Specialist';
        if (specEl) specEl.textContent = spec || '';
        if (credEl) credEl.textContent = cred || 'Certified Coach';
        if (imgEl && img) {
          imgEl.src = img;
          imgEl.alt = `${name} - Coach Photo`;
        }
        if (bioEl) bioEl.textContent = bio || '';
        if (eduEl) eduEl.textContent = edu || 'Certified Performance Specialist';
        if (expEl) expEl.textContent = exp || 'Certified Athletic Mentor';
        if (ctaEl) {
          ctaEl.href = `training.html?coach=${encodeURIComponent(coachParam)}`;
        }

        PulseApp.openModal('trainerDetailModal');
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Accessible Lightbox System (for Facilities & Gallery)
     -------------------------------------------------------------------------- */
  let currentLightboxIndex = 0;
  let lightboxItems = [];

  function ensureLightboxBackdrop() {
    let lb = document.getElementById('accessibleLightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'accessibleLightbox';
      lb.className = 'lightbox-backdrop';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.setAttribute('aria-label', 'Image Lightbox Preview');
      lb.innerHTML = `
        <div class="lightbox-dialog">
          <button class="modal-close-btn" id="lightboxCloseBtn" aria-label="Close Lightbox" style="top: -16px; right: -16px;">&times;</button>
          <button class="lightbox-nav-btn lightbox-prev-btn" id="lightboxPrevBtn" aria-label="Previous Image">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <div class="lightbox-media-wrapper">
            <img class="lightbox-img" id="lightboxActiveImg" src="" alt="Enlarged facility image">
          </div>
          <button class="lightbox-nav-btn lightbox-next-btn" id="lightboxNextBtn" aria-label="Next Image">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
          <div class="lightbox-caption" id="lightboxActiveCaption"></div>
          <div class="lightbox-caption-sub" id="lightboxActiveSub"></div>
        </div>
      `;
      document.body.appendChild(lb);

      // Event handlers
      lb.addEventListener('click', function (e) {
        if (e.target === lb) PulseApp.closeLightbox();
      });
      document.getElementById('lightboxCloseBtn')?.addEventListener('click', PulseApp.closeLightbox);
      document.getElementById('lightboxPrevBtn')?.addEventListener('click', () => navigateLightbox(-1));
      document.getElementById('lightboxNextBtn')?.addEventListener('click', () => navigateLightbox(1));

      document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') PulseApp.closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
      });
    }
    return lb;
  }

  PulseApp.openLightbox = function (index = 0) {
    const lb = ensureLightboxBackdrop();
    if (lightboxItems.length === 0) {
      // Gather all gallery items
      document.querySelectorAll('[data-lightbox-src]').forEach((el) => {
        lightboxItems.push({
          src: el.getAttribute('data-lightbox-src') || el.querySelector('img')?.src,
          caption: el.getAttribute('data-lightbox-caption') || el.querySelector('.gallery-title')?.textContent || 'Stackly Facility',
          sub: el.getAttribute('data-lightbox-sub') || el.querySelector('.gallery-sub')?.textContent || 'Engineered Performance Zone'
        });
      });
    }

    if (lightboxItems.length === 0) return;

    currentLightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
    const item = lightboxItems[currentLightboxIndex];

    const img = document.getElementById('lightboxActiveImg');
    const cap = document.getElementById('lightboxActiveCaption');
    const sub = document.getElementById('lightboxActiveSub');

    if (img) img.src = item.src;
    if (cap) cap.textContent = item.caption;
    if (sub) sub.textContent = item.sub;

    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  PulseApp.closeLightbox = function () {
    const lb = document.getElementById('accessibleLightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  function navigateLightbox(direction) {
    if (lightboxItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + direction + lightboxItems.length) % lightboxItems.length;
    const item = lightboxItems[currentLightboxIndex];

    const img = document.getElementById('lightboxActiveImg');
    const cap = document.getElementById('lightboxActiveCaption');
    const sub = document.getElementById('lightboxActiveSub');

    if (img) img.src = item.src;
    if (cap) cap.textContent = item.caption;
    if (sub) sub.textContent = item.sub;
  }

  function initLightboxTriggers() {
    lightboxItems = [];
    document.querySelectorAll('[data-lightbox-src]').forEach((el, index) => {
      lightboxItems.push({
        src: el.getAttribute('data-lightbox-src') || el.querySelector('img')?.src,
        caption: el.getAttribute('data-lightbox-caption') || el.querySelector('.gallery-title')?.textContent || 'Stackly Facility',
        sub: el.getAttribute('data-lightbox-sub') || el.querySelector('.gallery-sub')?.textContent || 'Engineered Performance Zone'
      });

      el.style.cursor = 'pointer';
      el.addEventListener('click', function (e) {
        e.preventDefault();
        PulseApp.openLightbox(index);
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. Image Fallbacks
     -------------------------------------------------------------------------- */
  function initImageFallbacks() {
    const fallbackSvg = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23151816%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%231c201e%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22bold%22%20fill%3D%22%23C7FF3D%22%3ESTACKLY%20FITNESS%20CLUB%3C%2Ftext%3E%3C%2Fsvg%3E`;

    document.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', function () {
        if (!this.getAttribute('data-failed')) {
          this.setAttribute('data-failed', 'true');
          this.src = fallbackSvg;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. Interactive Trainer Filtering & Animated Search
     -------------------------------------------------------------------------- */
  function initTrainerFilter() {
    const filterBtns = document.querySelectorAll('.trainer-filter-btn');
    const searchInput = document.getElementById('trainerSearchInput');
    const trainerCards = document.querySelectorAll('.trainer-card');
    if (filterBtns.length === 0 && !searchInput) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function applyFilter() {
      trainerCards.forEach((card) => {
        const spec = (card.getAttribute('data-specialty') || '').toLowerCase();
        const name = (card.querySelector('.trainer-name')?.textContent || '').toLowerCase();
        const bio = (card.querySelector('.trainer-bio')?.textContent || '').toLowerCase();

        const matchSpec = activeFilter === 'all' || spec.includes(activeFilter);
        const matchSearch = !searchQuery || name.includes(searchQuery) || bio.includes(searchQuery);

        if (matchSpec && matchSearch) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      const directory = document.getElementById('trainersDirectory');
      if (directory && typeof gsap !== 'undefined') {
        const visibleCards = directory.querySelectorAll('.trainer-card:not([style*="display: none"])');
        if (visibleCards.length > 0) {
          gsap.fromTo(
            visibleCards,
            { opacity: 0, y: 15, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out', clearProps: 'transform,opacity' }
          );
        }
      }
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = (btn.getAttribute('data-filter') || 'all').toLowerCase();
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = searchInput.value.trim().toLowerCase();
        applyFilter();
      });
    }
  }

  /* --------------------------------------------------------------------------
     11. Social Media & Legal Links -> 404 Redirect Handler
     -------------------------------------------------------------------------- */
  function initSocialMediaRedirects() {
    const redirectSelectors = '.social-link, [data-social-link], .footer-legal-links a, a[href*="instagram.com"], a[href*="twitter.com"], a[href*="x.com"], a[href*="youtube.com"], a[href*="spotify.com"], a[href*="facebook.com"], a[href*="tiktok.com"], a[href*="linkedin.com"]';
    
    document.querySelectorAll(redirectSelectors).forEach((link) => {
      link.setAttribute('href', '404.html');
      link.removeAttribute('target');
      link.removeAttribute('rel');
    });

    document.addEventListener('click', function (e) {
      const targetLink = e.target.closest(redirectSelectors);
      if (targetLink) {
        e.preventDefault();
        window.location.href = '404.html';
      }
    });
  }

  /* --------------------------------------------------------------------------
     12. Programs Portions Subnav Active Spy & Smooth Scroll
     -------------------------------------------------------------------------- */
  function initProgramsSubnav() {
    const subnav = document.querySelector('.programs-subnav-bar');
    if (!subnav) return;

    const pills = subnav.querySelectorAll('.programs-subnav-pill');
    const portions = document.querySelectorAll('.programs-portion-wrap');

    window.addEventListener('scroll', function () {
      let currentId = '';
      const offset = 220;
      portions.forEach((portion) => {
        const top = portion.getBoundingClientRect().top;
        if (top <= offset) {
          currentId = portion.getAttribute('id');
        }
      });

      if (currentId) {
        pills.forEach((pill) => {
          if (pill.getAttribute('href') === `#${currentId}`) {
            pill.classList.add('active');
          } else {
            pill.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     11. 404 Navigation Section Tracker
     -------------------------------------------------------------------------- */
  function init404NavigationTracking() {
    // Continuously capture current URL + active hash/section before navigating to 404
    document.addEventListener('click', function (e) {
      const el = e.target.closest('a, button');
      if (!el) return;

      const href = el.getAttribute('href') || '';
      const is404Target = href.includes('404.html') ||
                          el.classList.contains('btn-book-class') ||
                          el.classList.contains('btn-waitlist-class') ||
                          el.classList.contains('select-coach-btn');

      if (is404Target) {
        // Find closest identifiable section or fallback to window.location.hash
        const section = el.closest('section[id], div[id], [id]');
        let sectionId = '';
        if (section && section.id && !['main', 'root', 'app', 'themeToggle'].includes(section.id)) {
          sectionId = '#' + section.id;
        } else if (window.location.hash) {
          sectionId = window.location.hash;
        }

        const pageFile = window.location.pathname.split('/').pop() || 'index.html';
        const targetUrl = pageFile + sectionId;
        try {
          sessionStorage.setItem('stackly_last_section_url', targetUrl);
        } catch (err) {}
      }
    }, true);

    // Smooth scroll to target section if returning via hash
    if (window.location.hash) {
      setTimeout(() => {
        try {
          const target = document.querySelector(window.location.hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (err) {}
      }, 150);
    }
  }

  /* --------------------------------------------------------------------------
     10. Contact, Mail & Phone Redirections to 404
     -------------------------------------------------------------------------- */
  function initContactLinksTo404() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const text = (link.textContent || '').trim().toLowerCase();

      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.includes('maps.google') ||
        href.includes('google.com/maps') ||
        text.includes('+91 98200') ||
        text.includes('info@stacklyfitness.com')
      ) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '404.html';
      }
    }, true);
  }

  /* --------------------------------------------------------------------------
     11. DOM Ready Initializer
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    highlightActiveNav();
    initMobileMenu();
    initAccordions();
    initModals();
    initLightboxTriggers();
    initImageFallbacks();
    initTrainerFilter();
    initSocialMediaRedirects();
    initProgramsSubnav();
    init404NavigationTracking();
    initContactLinksTo404();
  });
})();
