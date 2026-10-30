/**
 * STACKLY & PULSE FITNESS CLUB — HIGH-PERFORMANCE GSAP & KINETIC ANIMATION SYSTEM
 * 
 * Interactive Motion Polish:
 * 1. Curtain Reveal for All Headings (h1, h2, h3, h4, h5, h6)
 * 2. Paragraph Unfurl for Every Paragraph (<p>)
 * 3. Coordinated GSAP Timelines & ScrollTrigger reveals
 * 4. AOS (Animate On Scroll) declarative triggers
 * 5. Interactive Custom Kinetic Cursor & Magnetic Ring Follower
 * 6. Button Click Radial Wave Ripples
 * 7. Floating Back to Top Button with Circular SVG Scroll Progress Ring
 * 8. Ambient Athletic Energy Particle Canvas in Heroes
 * 9. Magnetic button physics & 3D Card tilt with dynamic spotlight glow
 * 10. Top dual-tone scroll progress indicator
 * 11. Kinetic metric counter rolling animations
 * 12. Dashboard chart springs & activity flame animations
 * 13. 404 cyber glitch & floating space logo
 * 14. WCAG reduced-motion compliance across all triggers
 */

(function () {
  'use strict';

  // Global namespace reference
  window.StacklyApp = window.PulseApp = window.StacklyApp || window.PulseApp || {};
  const PulseApp = window.StacklyApp;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(hover: none) or (pointer: coarse)').matches;

  /* --------------------------------------------------------------------------
     1. AOS (Animate On Scroll) Initializer
     -------------------------------------------------------------------------- */
  function initAOS() {
    if (typeof AOS === 'undefined') return;

    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40,
      delay: 30,
      disable: prefersReducedMotion
    });
  }

  /* --------------------------------------------------------------------------
     2. Top Dual-Tone Scroll Progress Indicator
     -------------------------------------------------------------------------- */
  function initScrollProgressBar() {
    if (prefersReducedMotion) return;

    let bar = document.querySelector('.scroll-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'scroll-progress-bar';
      bar.setAttribute('aria-hidden', 'true');
      document.body.prepend(bar);
    }

    function updateProgress() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const percentage = (window.scrollY / scrollHeight) * 100;
        bar.style.width = Math.min(Math.max(percentage, 0), 100) + '%';
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* --------------------------------------------------------------------------
     3. Custom Kinetic Cursor Follower & Magnetic Ring
     -------------------------------------------------------------------------- */
  function initCustomCursor() {
    if (prefersReducedMotion || isTouchDevice || window.innerWidth <= 1024) return;

    let dot = document.querySelector('.custom-cursor-dot');
    let ring = document.querySelector('.custom-cursor-ring');

    if (!dot) {
      dot = document.createElement('div');
      dot.className = 'custom-cursor-dot';
      dot.setAttribute('aria-hidden', 'true');
      document.body.appendChild(dot);
    }

    if (!ring) {
      ring = document.createElement('div');
      ring.className = 'custom-cursor-ring';
      ring.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ring);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      if (!isMoving) {
        isMoving = true;
        renderRing();
      }
    }, { passive: true });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

      const diff = Math.hypot(mouseX - ringX, mouseY - ringY);
      if (diff > 0.1) {
        requestAnimationFrame(renderRing);
      } else {
        isMoving = false;
      }
    }

    // Hover effect on interactive elements
    const interactiveSelectors = [
      'a', 'button', '.btn', '.card', '.program-card', '.trainer-card',
      '.pricing-card', '.exp-card', '.philosophy-card', '.day-tab-btn',
      '.cat-filter-btn', '.billing-pill-btn', '.accordion-header',
      '.brand-logo', 'input', 'select', 'textarea', '.schedule-row',
      '.lightbox-nav-btn', '.modal-close-btn'
    ].join(', ');

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactiveSelectors)) {
        ring.classList.add('cursor-hover');
      }
    }, { passive: true });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactiveSelectors)) {
        ring.classList.remove('cursor-hover');
      }
    }, { passive: true });

    document.addEventListener('mousedown', function () {
      ring.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', function () {
      ring.classList.remove('cursor-active');
    });

    document.addEventListener('mouseleave', function () {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

  /* --------------------------------------------------------------------------
     4. Universal Button Click Ripple System
     -------------------------------------------------------------------------- */
  function initButtonRipples() {
    if (prefersReducedMotion) return;

    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn, .plan-select-btn, .day-tab-btn, .cat-filter-btn, .billing-pill-btn');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.className = 'btn-ripple-wave';

      const existingRipple = btn.querySelector('.btn-ripple-wave');
      if (existingRipple) existingRipple.remove();

      btn.appendChild(circle);

      setTimeout(() => {
        if (circle.parentElement) circle.remove();
      }, 700);
    });
  }

  /* --------------------------------------------------------------------------
     5. Floating Back to Top Button (Removed as requested)
     -------------------------------------------------------------------------- */
  function initBackToTopButton() {
    const existing = document.querySelector('.back-to-top-btn');
    if (existing) {
      existing.remove();
    }
  }

  /* --------------------------------------------------------------------------
     6. Ambient Athletic Energy Particle Canvas in Heroes
     -------------------------------------------------------------------------- */
  function initAmbientEnergyCanvas() {
    if (prefersReducedMotion || window.innerWidth <= 768) return;

    const targets = document.querySelectorAll('.hero-section, .page-hero, .auth-page-wrap');
    targets.forEach((section) => {
      if (section.querySelector('.hero-energy-canvas')) return;

      const canvas = document.createElement('canvas');
      canvas.className = 'hero-energy-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      section.prepend(canvas);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = (canvas.width = section.clientWidth);
      let height = (canvas.height = section.clientHeight);
      let isVisible = true;
      let animId;

      const particleCount = 38;
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.8,
          speedY: Math.random() * 0.45 + 0.15,
          speedX: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.5 + 0.2,
          pulse: Math.random() * Math.PI,
          pulseSpeed: Math.random() * 0.03 + 0.01
        });
      }

      function resize() {
        width = canvas.width = section.clientWidth;
        height = canvas.height = section.clientHeight;
      }
      window.addEventListener('resize', resize, { passive: true });

      function draw() {
        if (!isVisible) return;
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          p.y -= p.speedY;
          p.x += p.speedX;
          p.pulse += p.pulseSpeed;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(199, 255, 61, ${currentOpacity})`;
          ctx.shadowColor = 'rgba(199, 255, 61, 0.8)';
          ctx.shadowBlur = 6;
          ctx.fill();
        }

        animId = requestAnimationFrame(draw);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
              cancelAnimationFrame(animId);
              draw();
            } else {
              cancelAnimationFrame(animId);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
    });
  }

  /* --------------------------------------------------------------------------
     7. CURTAIN REVEAL FOR ALL HEADINGS (h1, h2, h3, h4, h5, h6)
     Cinematic theatrical curtain unmasking with luminous neon accent wipe.
     -------------------------------------------------------------------------- */
  function initCurtainRevealHeadings() {
    const headings = document.querySelectorAll(
      'h1:not([data-curtain-init]), h2:not([data-curtain-init]), h3:not([data-curtain-init]), ' +
      'h4:not([data-curtain-init]), h5:not([data-curtain-init]), h6:not([data-curtain-init])'
    );

    headings.forEach((heading) => {
      // Exclude headings in hidden modal overlays initially
      if (heading.closest('.modal-backdrop')) return;

      heading.setAttribute('data-curtain-init', 'true');
      heading.classList.add('curtain-reveal-heading');

      const originalHTML = heading.innerHTML;
      heading.innerHTML = `
        <span class="curtain-text-inner">${originalHTML}</span>
        <span class="curtain-blade" aria-hidden="true"></span>
      `;

      if (prefersReducedMotion) {
        heading.classList.add('curtain-revealed');
        return;
      }

      // If it's the home hero title, let initHeroAnimation coordinate it
      if (heading.classList.contains('hero-title')) return;

      const blade = heading.querySelector('.curtain-blade');
      const textInner = heading.querySelector('.curtain-text-inner');

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            once: true
          }
        });

        tl.fromTo(
          blade,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.38, ease: 'power2.inOut' }
        )
        .set(textInner, { transform: 'translateY(0)', opacity: 1 })
        .to(
          blade,
          { scaleX: 0, transformOrigin: 'right center', duration: 0.38, ease: 'power2.inOut' }
        )
        .call(() => {
          heading.classList.add('curtain-revealed');
          gsap.set(textInner, { clearProps: 'transform,opacity' });
        });
      } else {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                heading.classList.add('css-curtain-play');
                setTimeout(() => {
                  heading.classList.add('curtain-revealed');
                  heading.classList.remove('css-curtain-play');
                }, 400);
                observer.unobserve(heading);
              }
            });
          },
          { threshold: 0.15 }
        );
        observer.observe(heading);
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. PARAGRAPH UNFURL ANIMATION (FOR EVERY <p>)
     Smooth 3D unfolding, soft unblur, and vertical expansion.
     -------------------------------------------------------------------------- */
  function initParagraphUnfurl() {
    const paragraphs = document.querySelectorAll('p:not([data-unfurl-init])');

    paragraphs.forEach((p) => {
      // Exclude paragraphs in hidden modal overlays initially
      if (p.closest('.modal-backdrop')) return;

      p.setAttribute('data-unfurl-init', 'true');
      p.classList.add('paragraph-unfurl');

      if (prefersReducedMotion) {
        p.classList.add('is-unfurled');
        return;
      }

      // If it's the home hero desc, let initHeroAnimation coordinate it
      if (p.classList.contains('hero-desc')) return;

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.fromTo(
          p,
          {
            opacity: 0,
            rotateX: 18,
            y: 22,
            scale: 0.98,
            filter: 'blur(4px)',
            transformOrigin: 'top center'
          },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 92%',
              once: true
            },
            onComplete: () => {
              p.classList.add('is-unfurled');
              gsap.set(p, { clearProps: 'transform,filter,opacity' });
            }
          }
        );
      } else {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                p.classList.add('is-unfurled');
                observer.unobserve(p);
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(p);
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. Header Initial Entrance Animation
     -------------------------------------------------------------------------- */
  function initHeaderAnimation() {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;
    const header = document.querySelector('.site-header');
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      }
    );
  }

  /* --------------------------------------------------------------------------
     10. Home Hero Timeline (Coordinated with Curtain & Unfurl)
     -------------------------------------------------------------------------- */
  function initHeroAnimation() {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;
    const heroTitle = document.querySelector('.hero-title');
    const heroSection = document.querySelector('.hero-section');
    if (!heroTitle || !heroSection) return;

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    heroTl.fromTo('.hero-badge-wrap', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55 }, 0.08);

    // Coordinated Heading Curtain Reveal
    const blade = heroTitle.querySelector('.curtain-blade');
    const textInner = heroTitle.querySelector('.curtain-text-inner');
    if (blade && textInner) {
      heroTl
        .fromTo(blade, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.42, ease: 'power2.inOut' }, 0.18)
        .set(textInner, { transform: 'translateY(0)', opacity: 1 }, 0.6)
        .to(blade, { scaleX: 0, transformOrigin: 'right center', duration: 0.42, ease: 'power2.inOut' }, 0.6)
        .call(() => {
          heroTitle.classList.add('curtain-revealed');
          gsap.set(textInner, { clearProps: 'transform,opacity' });
        });
    } else {
      heroTl.fromTo(heroTitle, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);
    }

    // Coordinated Paragraph Unfurl
    const heroDesc = document.querySelector('.hero-desc');
    if (heroDesc) {
      heroTl.fromTo(
        heroDesc,
        { opacity: 0, rotateX: 18, y: 22, scale: 0.98, filter: 'blur(4px)', transformOrigin: 'top center' },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power3.out',
          onComplete: () => {
            heroDesc.classList.add('is-unfurled');
            gsap.set(heroDesc, { clearProps: 'transform,filter,opacity' });
          }
        },
        0.58
      );
    }

    heroTl
      .fromTo('.hero-cta-group .btn', { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6 }, 0.72)
      .fromTo('.hero-metric-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.55 }, 0.82);

    const heroVisual = document.querySelector('.hero-image-frame');
    if (heroVisual) {
      heroTl.fromTo(heroVisual, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 0.3);
    }

    const floatingCard = document.querySelector('.hero-floating-card');
    if (floatingCard) {
      floatingCard.classList.add('has-border-beam');
      heroTl.fromTo(floatingCard, { opacity: 0, x: -28, scale: 0.92 }, { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: 'back.out(1.4)' }, 0.6);

      // Restrained continuous vertical oscillation (desktop only)
      if (window.innerWidth > 768) {
        gsap.to(floatingCard, {
          y: -10,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.4
        });
      }
    }
  }

  /* --------------------------------------------------------------------------
     11. Inner Page Hero Entrance
     -------------------------------------------------------------------------- */
  function initPageHeroAnimation() {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;
    const pageHero = document.querySelector('.page-hero');
    if (!pageHero) return;

    // Headings and paragraphs are handled by Curtain & Unfurl; animate eyebrows and controls
    const otherElements = pageHero.querySelectorAll('.eyebrow, .hero-cta-group, .hero-metrics-bar, .schedule-category-filters, .billing-pills-nav');
    if (otherElements.length > 0) {
      gsap.fromTo(
        otherElements,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          delay: 0.1
        }
      );
    }
  }

  /* --------------------------------------------------------------------------
     12. Interactive Magnetic Button Physics
     -------------------------------------------------------------------------- */
  function initMagneticButtons() {
    if (typeof gsap === 'undefined' || prefersReducedMotion || isTouchDevice || window.innerWidth <= 768) return;

    const targets = document.querySelectorAll(
      '.btn-primary, .hero-cta-group .btn, .brand-logo, .dash-bell-btn, .mobile-dash-nav-toggle, .back-to-top-btn'
    );

    targets.forEach((btn) => {
      btn.classList.add('btn-magnetic');

      btn.addEventListener('mousemove', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.28,
          y: y * 0.28,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.55,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto'
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     13. Interactive 3D Tilt & Spotlight Glow on Cards
     -------------------------------------------------------------------------- */
  function initCardTiltAndSpotlight() {
    if (typeof gsap === 'undefined' || prefersReducedMotion || isTouchDevice || window.innerWidth <= 768) return;

    const cards = document.querySelectorAll(
      '.card, .philosophy-card, .program-card, .trainer-card, .pricing-card, ' +
      '.exp-card, .stat-card, .dash-stat-card, .why-us-pillar, .gallery-item'
    );

    cards.forEach((card) => {
      card.classList.add('has-spotlight');

      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (x - centerX) / centerX;
        const tiltY = (y - centerY) / centerY;

        gsap.to(card, {
          rotateX: -tiltY * 5,
          rotateY: tiltX * 5,
          transformPerspective: 900,
          scale: 1.015,
          duration: 0.25,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', function () {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     14. Coordinated GSAP ScrollTrigger Reveals Across ALL Pages
     -------------------------------------------------------------------------- */
  function initScrollReveals() {
    if (typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined' || prefersReducedMotion) return;

    // Section Headers non-heading/non-p elements (like eyebrow badges)
    document.querySelectorAll('.section-header').forEach((header) => {
      if (header.hasAttribute('data-aos')) return;
      const elements = Array.from(header.children).filter(el => 
        !el.matches('h1, h2, h3, h4, h5, h6, p, .curtain-reveal-heading, .paragraph-unfurl')
      );
      if (elements.length === 0) return;

      gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Grids of cards without AOS
    const gridSelectors = [
      '.programs-grid', '.philosophy-grid', '.why-us-pillars',
      '.experience-grid', '.trainers-grid', '.pricing-grid', '.dash-stats-grid'
    ];

    gridSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((grid) => {
        const items = Array.from(grid.children).filter((el) => !el.hasAttribute('data-aos'));
        if (items.length === 0) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 32, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: grid,
              start: 'top 86%',
              once: true
            }
          }
        );
      });
    });

    // Parallax background depth on visual image containers
    document.querySelectorAll('.hero-image-frame img, .experience-visual img, .why-us-image-main img').forEach((img) => {
      gsap.to(img, {
        y: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     15. Forms and Dashboard Kinetic Animations
     -------------------------------------------------------------------------- */
  function initFormAndDashboardAnimations() {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;

    // Auth Card entrance (login.html, signup.html)
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
      authCard.classList.add('has-border-beam');
      gsap.fromTo(
        authCard,
        { opacity: 0, y: 28, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        }
      );
    }

    // Dashboard Cards and Chart Bars
    const dashStats = document.querySelectorAll('.dash-stat-card');
    if (dashStats.length > 0) {
      gsap.fromTo(
        dashStats,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        }
      );
    }

    const chartBars = document.querySelectorAll('.chart-bar-fill');
    if (chartBars.length > 0) {
      chartBars.forEach((bar) => {
        const match = bar.getAttribute('style')?.match(/height:\s*([\d%]+)/);
        const targetH = match ? match[1] : '60%';
        gsap.fromTo(
          bar,
          { height: '0%' },
          {
            height: targetH,
            duration: 1,
            ease: 'power3.out',
            delay: 0.35
          }
        );
      });
    }

    const dashPanels = document.querySelectorAll('.dash-panel');
    if (dashPanels.length > 0) {
      gsap.fromTo(
        dashPanels,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          delay: 0.15
        }
      );
    }
  }

  /* --------------------------------------------------------------------------
     16. 404 Error Screen Animation
     -------------------------------------------------------------------------- */
  function initErrorPageAnimation() {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;
    const errorWrap = document.querySelector('.error-page-wrap');
    if (!errorWrap) return;

    const items = errorWrap.querySelectorAll('.error-badge-404, .eyebrow, .error-title, .error-desc, .hero-cta-group');
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 26, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  }

  /* --------------------------------------------------------------------------
     17. Numeric Metric Stat Counters
     -------------------------------------------------------------------------- */
  function initStatCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    if (counterElements.length === 0) return;

    if (prefersReducedMotion) {
      counterElements.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-counter-target'));
        const isFloat = el.getAttribute('data-counter-float') === 'true';
        el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.getAttribute('data-counter-target'));
            const isFloat = el.getAttribute('data-counter-float') === 'true';
            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 4);
              const currentVal = target * ease;

              if (isFloat) {
                el.textContent = currentVal.toFixed(1);
              } else {
                el.textContent = Math.floor(currentVal).toLocaleString();
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
                // Gentle bloom pulse on finish
                if (typeof gsap !== 'undefined') {
                  gsap.fromTo(el, { scale: 1 }, { scale: 1.08, yoyo: true, repeat: 1, duration: 0.22, ease: 'power2.out' });
                }
              }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    counterElements.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     18. Dynamic Trigger Helper for Modals & Tabs (Curtain Reveal + Paragraph Unfurl)
     -------------------------------------------------------------------------- */
  PulseApp.triggerCurtainAndUnfurl = function (container) {
    if (!container) return;

    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      if (!heading.getAttribute('data-curtain-init')) {
        heading.setAttribute('data-curtain-init', 'true');
        heading.classList.add('curtain-reveal-heading');
        const originalContent = heading.innerHTML;
        heading.innerHTML = `
          <span class="curtain-text-inner">${originalContent}</span>
          <span class="curtain-blade" aria-hidden="true"></span>
        `;
      }
      const blade = heading.querySelector('.curtain-blade');
      const textInner = heading.querySelector('.curtain-text-inner');

      if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
        gsap.fromTo(
          blade,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.35, ease: 'power2.inOut', delay: 0.08 }
        );
        gsap.set(textInner, { transform: 'translateY(0)', opacity: 1, delay: 0.43 });
        gsap.to(
          blade,
          {
            scaleX: 0,
            transformOrigin: 'right center',
            duration: 0.35,
            ease: 'power2.inOut',
            delay: 0.43,
            onComplete: () => {
              heading.classList.add('curtain-revealed');
              gsap.set(textInner, { clearProps: 'transform,opacity' });
            }
          }
        );
      } else {
        heading.classList.add('curtain-revealed');
      }
    });

    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach((p, idx) => {
      p.classList.add('paragraph-unfurl');
      if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
        gsap.fromTo(
          p,
          { opacity: 0, rotateX: 18, y: 18, scale: 0.98, filter: 'blur(3px)', transformOrigin: 'top center' },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.65,
            delay: 0.18 + idx * 0.08,
            ease: 'power3.out',
            onComplete: () => {
              p.classList.add('is-unfurled');
              gsap.set(p, { clearProps: 'transform,filter,opacity' });
            }
          }
        );
      } else {
        setTimeout(() => p.classList.add('is-unfurled'), 180 + idx * 80);
      }
    });
  };

  /* --------------------------------------------------------------------------
     19. Grid Filtering Transition Helper
     -------------------------------------------------------------------------- */
  PulseApp.animateGridFilter = function (container, itemSelector = '.schedule-row, .trainer-card, .program-card') {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;
    const parent = typeof container === 'string' ? document.querySelector(container) : container;
    if (!parent) return;

    const items = parent.querySelectorAll(itemSelector);
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 16, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  };

  /* --------------------------------------------------------------------------
     Main Orchestration
     -------------------------------------------------------------------------- */
  function init() {
    initAOS();
    initScrollProgressBar();
    initCustomCursor();
    initButtonRipples();
    initBackToTopButton();
    initAmbientEnergyCanvas();

    // 1. Initialize Curtain Reveal on all headings & Paragraph Unfurl on all paragraphs
    initCurtainRevealHeadings();
    initParagraphUnfurl();

    // 2. Coordinated GSAP Timelines
    if (typeof gsap !== 'undefined') {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }
      initHeaderAnimation();
      initHeroAnimation();
      initPageHeroAnimation();
      initMagneticButtons();
      initCardTiltAndSpotlight();
      initScrollReveals();
      initFormAndDashboardAnimations();
      initErrorPageAnimation();
    }

    initStatCounters();

    // Refresh triggers when all images/fonts are fully ready
    window.addEventListener('load', function () {
      if (typeof AOS !== 'undefined') AOS.refresh();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
