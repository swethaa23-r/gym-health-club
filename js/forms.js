/**
 * STACKLY FITNESS CLUB — FORM VALIDATION & LOGIC
 * Membership plan pre-selection, Billing switcher, Authentication, Contact forms
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Password Visibility Toggle
     -------------------------------------------------------------------------- */
  function initPasswordToggles() {
    document.querySelectorAll('.password-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const input = btn.closest('.password-field-wrapper')?.querySelector('input');
        if (!input) return;

        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');

        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Pricing Switcher (Monthly, Quarterly, Annual in INR)
     -------------------------------------------------------------------------- */
  function initPricingSwitcher() {
    const prices = {
      monthly: {
        essential: '2,499',
        performance: '4,499',
        elite: '7,999',
        period: '/ month'
      },
      quarterly: {
        essential: '2,249',
        performance: '4,049',
        elite: '7,199',
        period: '/ mo (billed quarterly, save 10%)'
      },
      annual: {
        essential: '1,999',
        performance: '3,599',
        elite: '6,399',
        period: '/ mo (billed annually, save 20%)'
      }
    };

    function setPricingPeriod(period) {
      const mode = prices[period] ? period : 'monthly';

      const essentialEl = document.getElementById('priceEssential');
      const performanceEl = document.getElementById('pricePerformance');
      const eliteEl = document.getElementById('priceElite');
      const periodEls = document.querySelectorAll('.pricing-period');

      if (essentialEl) essentialEl.textContent = prices[mode].essential;
      if (performanceEl) performanceEl.textContent = prices[mode].performance;
      if (eliteEl) eliteEl.textContent = prices[mode].elite;

      if (typeof gsap !== 'undefined') {
        const targetElements = [essentialEl, performanceEl, eliteEl].filter(Boolean);
        if (targetElements.length > 0) {
          gsap.fromTo(
            targetElements,
            { y: -10, opacity: 0.3, scale: 0.92 },
            { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.8)' }
          );
        }
      }

      periodEls.forEach((el) => {
        el.textContent = prices[mode].period;
      });

      // Update 3-way pill buttons
      document.querySelectorAll('.billing-pill-btn').forEach((btn) => {
        if (btn.getAttribute('data-period') === mode) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update toggle switch state if present
      const toggle = document.getElementById('pricingBillingToggle');
      if (toggle) {
        if (mode === 'annual') {
          toggle.classList.add('annual');
        } else {
          toggle.classList.remove('annual');
        }
      }
    }

    // Attach listeners to 3-way pills
    document.querySelectorAll('.billing-pill-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const p = btn.getAttribute('data-period');
        setPricingPeriod(p);
      });
    });

    // Toggle switch support
    const toggle = document.getElementById('pricingBillingToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        const isAnnual = toggle.classList.contains('annual');
        setPricingPeriod(isAnnual ? 'monthly' : 'annual');
      });
    }

    const monthlyLabel = document.getElementById('billingMonthlyLabel');
    const annualLabel = document.getElementById('billingAnnualLabel');
    if (monthlyLabel) monthlyLabel.addEventListener('click', () => setPricingPeriod('monthly'));
    if (annualLabel) annualLabel.addEventListener('click', () => setPricingPeriod('annual'));
  }

  /* --------------------------------------------------------------------------
     3. Pre-select Plan or Coach from URL Parameter (?plan= & ?coach=)
     -------------------------------------------------------------------------- */
  function handleUrlPrefills() {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get('plan');
    if (planParam) {
      const planSelect = document.getElementById('inquiryPlanSelect');
      if (planSelect) {
        const cleanVal = planParam.toLowerCase().trim();
        for (let i = 0; i < planSelect.options.length; i++) {
          if (planSelect.options[i].value.toLowerCase().includes(cleanVal)) {
            planSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    const coachParam = params.get('coach');
    if (coachParam) {
      const coachSelect = document.getElementById('ptCoachSelect');
      if (coachSelect) {
        const cleanCoach = decodeURIComponent(coachParam).toLowerCase().trim();
        for (let i = 0; i < coachSelect.options.length; i++) {
          if (coachSelect.options[i].text.toLowerCase().includes(cleanCoach)) {
            coachSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    // In-page select coach buttons - redirect to 404 page
    document.querySelectorAll('.select-coach-btn').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        window.location.href = '404.html';
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Helper Form Validator
     -------------------------------------------------------------------------- */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(input, isValid, errorMsg = '') {
    const group = input.closest('.form-group');
    let feedback = group ? group.querySelector('.form-feedback') : null;

    if (!isValid) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (feedback) {
        feedback.textContent = errorMsg;
        feedback.className = 'form-feedback error-message';
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (feedback) {
        feedback.textContent = '';
        feedback.className = 'form-feedback';
      }
      return true;
    }
  }

  /* --------------------------------------------------------------------------
     5. Contact Us Form
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let valid = true;
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');
      const consentInput = document.getElementById('contactConsent');

      if (nameInput) {
        if (nameInput.value.trim().length < 2) {
          valid = validateField(nameInput, false, 'Please enter your full name') && valid;
        } else {
          validateField(nameInput, true);
        }
      }

      if (emailInput) {
        if (!validateEmail(emailInput.value.trim())) {
          valid = validateField(emailInput, false, 'Please enter a valid email address') && valid;
        } else {
          validateField(emailInput, true);
        }
      }

      if (subjectInput && !subjectInput.value) {
        valid = validateField(subjectInput, false, 'Please select a topic') && valid;
      } else if (subjectInput) {
        validateField(subjectInput, true);
      }

      if (messageInput) {
        if (messageInput.value.trim().length < 10) {
          valid = validateField(messageInput, false, 'Message must be at least 10 characters') && valid;
        } else {
          validateField(messageInput, true);
        }
      }

      if (consentInput && !consentInput.checked) {
        valid = false;
        window.PulseApp.showToast('Please accept the consent terms to proceed.', 'error');
        return;
      }

      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
        }
        form.reset();
        document.querySelectorAll('.is-valid').forEach((el) => el.classList.remove('is-valid'));

        window.PulseApp.showToast(
          'Thank you. Your inquiry has been received by our membership advisory team.',
          'success',
          'MESSAGE DELIVERED'
        );
      }, 1200);
    });
  }

  /* --------------------------------------------------------------------------
     6. Membership Inquiry Form
     -------------------------------------------------------------------------- */
  function initMembershipInquiryForm() {
    const form = document.getElementById('membershipInquiryForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('inquiryName');
      const emailInput = document.getElementById('inquiryEmail');
      const planSelect = document.getElementById('inquiryPlanSelect');

      let valid = true;

      if (nameInput && nameInput.value.trim().length < 2) {
        valid = validateField(nameInput, false, 'Please enter your name') && valid;
      } else if (nameInput) {
        validateField(nameInput, true);
      }

      if (emailInput && !validateEmail(emailInput.value.trim())) {
        valid = validateField(emailInput, false, 'Please enter a valid email address') && valid;
      } else if (emailInput) {
        validateField(emailInput, true);
      }

      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      }

      const selectedPlan = planSelect ? planSelect.value : 'Performance Plan';

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
        }

        window.PulseApp.showToast(
          `Application received for ${selectedPlan}! Our admissions team will contact you shortly.`,
          'success',
          'MEMBERSHIP INQUIRY'
        );

        form.reset();
        document.querySelectorAll('.is-valid').forEach((el) => el.classList.remove('is-valid'));
      }, 600);
    });
  }

  /* --------------------------------------------------------------------------
     7. Personal Training Consultation Form
     -------------------------------------------------------------------------- */
  function initPTConsultForm() {
    const form = document.getElementById('ptConsultForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('ptName');
      const emailInput = document.getElementById('ptEmail');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';

      let valid = true;
      if (nameInput) {
        if (!name || name.length < 2) {
          valid = validateField(nameInput, false, 'Please enter your full name') && valid;
        } else {
          validateField(nameInput, true);
        }
      }

      if (emailInput) {
        if (!email || !validateEmail(email)) {
          valid = validateField(emailInput, false, 'Please enter a valid email address') && valid;
        } else {
          validateField(emailInput, true);
        }
      }

      const app = window.StacklyApp || window.PulseApp;

      if (!valid) {
        if (app?.showToast) {
          app.showToast('Please enter your full name and a valid email address.', 'error', 'VALIDATION ERROR');
        }
        return;
      }

      // After filling all details, store section and redirect to 404 page
      try {
        sessionStorage.setItem('stackly_last_section_url', 'classes.html#consultation');
      } catch (err) {}
      window.location.href = '404.html';
    });
  }

  /* --------------------------------------------------------------------------
     8. Authentication: Login
     -------------------------------------------------------------------------- */
  function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const roleInput = document.getElementById('loginRole');
      const emailInput = document.getElementById('loginEmail');
      const passwordInput = document.getElementById('loginPassword');

      let valid = true;

      // 1. Role validation (Script-based)
      if (!roleInput || !roleInput.value) {
        valid = validateField(roleInput, false, 'Please select a role (Admin or Member)') && valid;
      } else {
        validateField(roleInput, true);
      }

      // 2. Full Name / Email validation (Script-based)
      const rawInput = emailInput ? emailInput.value.trim() : '';
      if (!rawInput) {
        valid = validateField(emailInput, false, 'Please enter your full name or email') && valid;
      } else {
        validateField(emailInput, true);
      }

      // 3. Password validation (Script-based)
      const passVal = passwordInput ? passwordInput.value : '';
      if (!passVal) {
        valid = validateField(passwordInput, false, 'Please enter your password') && valid;
      } else if (passVal.length < 4) {
        valid = validateField(passwordInput, false, 'Password must be at least 4 characters') && valid;
      } else {
        validateField(passwordInput, true);
      }

      // If invalid, show script error notification
      if (!valid) {
        if (window.PulseApp?.showToast) {
          window.PulseApp.showToast('Please fill in all required fields and select your role.', 'error', 'VALIDATION ERROR');
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Authenticating...</span>';
      }

      const selectedRole = roleInput.value;
      let userName = rawInput;
      if (rawInput.includes('@')) {
        const usernamePart = rawInput.split('@')[0];
        userName = usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1);
      }

      const userSession = {
        name: userName,
        email: rawInput.includes('@') ? rawInput : `${rawInput.toLowerCase().replace(/\s+/g, '')}@stacklyclub.com`,
        role: selectedRole,
        tier: selectedRole === 'admin' ? 'System Administrator' : 'Performance Member',
        memberSince: 'March 2025',
        workoutsThisMonth: 16
      };

      try {
        localStorage.setItem('stackly_active_user', JSON.stringify(userSession));
        localStorage.setItem('pulse_active_user', JSON.stringify(userSession));
      } catch (err) {
        console.warn('Storage error', err);
      }

      window.PulseApp.showToast(
        `Welcome, ${userName}! Accessing ${selectedRole === 'admin' ? 'Admin Management Console' : 'Member Dashboard'}...`,
        'success',
        'ACCESS GRANTED'
      );

      setTimeout(() => {
        if (selectedRole === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      }, 750);
    });
  }

  /* --------------------------------------------------------------------------
     9. Authentication: Signup
     -------------------------------------------------------------------------- */
  function initSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const roleInput = document.getElementById('signupRole');
      const nameInput = document.getElementById('signupName');
      const emailInput = document.getElementById('signupEmail');
      const passInput = document.getElementById('signupPassword');
      const confirmInput = document.getElementById('signupConfirmPassword');
      const termsInput = document.getElementById('signupTerms');

      let valid = true;

      // 1. Role validation (Script-based)
      if (!roleInput || !roleInput.value) {
        valid = validateField(roleInput, false, 'Please select an account role') && valid;
      } else {
        validateField(roleInput, true);
      }

      // 2. Name validation (Script-based)
      if (!nameInput || nameInput.value.trim().length < 2) {
        valid = validateField(nameInput, false, 'Please enter your full legal name') && valid;
      } else {
        validateField(nameInput, true);
      }

      // 3. Email validation (Script-based)
      if (!emailInput || !validateEmail(emailInput.value.trim())) {
        valid = validateField(emailInput, false, 'Please enter a valid email address') && valid;
      } else {
        validateField(emailInput, true);
      }

      // 4. Password validation (Script-based)
      if (!passInput || passInput.value.length < 6) {
        valid = validateField(passInput, false, 'Password must be at least 6 characters') && valid;
      } else {
        validateField(passInput, true);
      }

      // 5. Confirm password
      if (!confirmInput || confirmInput.value !== passInput.value) {
        valid = validateField(confirmInput, false, 'Passwords do not match') && valid;
      } else {
        validateField(confirmInput, true);
      }

      // 6. Terms validation
      if (termsInput && !termsInput.checked) {
        valid = false;
        const toast = window.StacklyApp?.showToast || window.PulseApp?.showToast;
        if (toast) {
          toast('You must accept the Stackly terms and rules to proceed.', 'error', 'TERMS REQUIRED');
        }
      }

      // If any validation failed, stop here
      if (!valid) {
        const toast = window.StacklyApp?.showToast || window.PulseApp?.showToast;
        if (toast) {
          toast('Please fill in all required fields properly.', 'error', 'SIGNUP ERROR');
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Creating Member Account...</span>';
      }

      const userName = nameInput.value.trim();
      const selectedRole = roleInput.value;
      const phoneInput = document.getElementById('signupPhone');
      const userSession = {
        name: userName,
        email: emailInput.value.trim(),
        phone: phoneInput ? phoneInput.value.trim() : '',
        role: selectedRole,
        tier: selectedRole === 'admin' ? 'System Administrator' : 'Performance Member',
        memberSince: 'October 2026',
        workoutsThisMonth: 0
      };

      try {
        localStorage.setItem('stackly_active_user', JSON.stringify(userSession));
        localStorage.setItem('pulse_active_user', JSON.stringify(userSession));
      } catch (err) {
        console.warn('Storage error', err);
      }

      const toast = window.StacklyApp?.showToast || window.PulseApp?.showToast;
      if (toast) {
        toast(
          `Account created for ${userName}! Redirecting to Sign In...`,
          'success',
          'REGISTRATION COMPLETE'
        );
      }

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 900);
    });
  }

  /* --------------------------------------------------------------------------
     10. Newsletter Subscription (Footer)
     -------------------------------------------------------------------------- */
  function initNewsletter() {
    const forms = document.querySelectorAll('#footerNewsletterForm, .footer-newsletter-form');
    if (!forms.length) return;

    forms.forEach(form => {
      form.setAttribute('novalidate', 'true');
      const emailInput = form.querySelector('input[type="email"], input[name="email"]');
      let errorMsg = form.querySelector('.newsletter-error-msg');
      if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'newsletter-error-msg';
        errorMsg.style.cssText = 'color: #FF5252; font-size: 0.8rem; margin-top: 6px; display: none; font-weight: 600; width: 100%;';
        form.appendChild(errorMsg);
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailVal || !emailRegex.test(emailVal)) {
          // Direct click without entering email or invalid format -> Show error message in script
          if (emailInput) {
            emailInput.style.borderColor = '#FF5252';
            emailInput.focus();
          }
          errorMsg.textContent = !emailVal 
            ? 'Please enter your email address to subscribe.' 
            : 'Please enter a valid email address (e.g. name@domain.com).';
          errorMsg.style.display = 'block';

          const toast = window.StacklyApp?.showToast || window.PulseApp?.showToast;
          if (toast) {
            toast(!emailVal ? 'Please enter your email address.' : 'Please enter a valid email address.', 'error', 'SUBSCRIPTION REQUIRED');
          }
          return;
        }

        // Email successfully provided -> Redirect to 404 page
        errorMsg.style.display = 'none';
        if (emailInput) emailInput.style.borderColor = '';
        window.location.href = '404.html';
      });

      if (emailInput) {
        emailInput.addEventListener('input', function () {
          if (errorMsg.style.display === 'block') {
            errorMsg.style.display = 'none';
            emailInput.style.borderColor = '';
          }
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     11. Quick Pass Modal Form
     -------------------------------------------------------------------------- */
  function initQuickPassForm() {
    const form = document.getElementById('quickPassModalForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = document.getElementById('passName');
      const emailInput = document.getElementById('passEmail');
      const toast = window.StacklyApp?.showToast || window.PulseApp?.showToast;

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';

      let valid = true;
      if (!name || name.length < 2) {
        if (nameInput) nameInput.classList.add('is-invalid');
        valid = false;
      } else if (nameInput) {
        nameInput.classList.remove('is-invalid');
      }

      if (!email || !validateEmail(email)) {
        if (emailInput) emailInput.classList.add('is-invalid');
        valid = false;
      } else if (emailInput) {
        emailInput.classList.remove('is-invalid');
      }

      if (!valid) {
        if (toast) {
          toast('Please enter your name and a valid email to claim a free pass.', 'error', 'VALIDATION ERROR');
        }
        return;
      }

      const modalCloser = window.StacklyApp?.closeModal || window.PulseApp?.closeModal;
      if (modalCloser) modalCloser('freePassModal');

      if (toast) {
        toast(
          `Complimentary Day Pass generated for ${name}! Check your email for barcode entry pass.`,
          'success',
          'STACKLY VIP PASS'
        );
      }
      form.reset();
    });
  }

  /* --------------------------------------------------------------------------
     Initializer
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initPasswordToggles();
    initPricingSwitcher();
    handleUrlPrefills();
    initContactForm();
    initMembershipInquiryForm();
    initPTConsultForm();
    initLoginForm();
    initSignupForm();
    initNewsletter();
    initQuickPassForm();
  });
})();
