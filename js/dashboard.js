/**
 * STACKLY FITNESS CLUB — MEMBER & ADMIN DASHBOARD LOGIC
 * Session management, header search validation, dynamic tabs, profile validation, 404 redirections
 */

(function () {
  'use strict';

  function initDashboard() {
    const isDashboardPage = document.querySelector('.dashboard-layout');
    if (!isDashboardPage) return;

    // 1. Load User Session
    let user = {
      name: 'Alex Vance',
      email: 'alex.vance@stacklyclub.com',
      role: 'member',
      tier: 'Performance Tier',
      memberSince: 'March 2025',
      workoutsThisMonth: 16
    };

    try {
      const stored = localStorage.getItem('stackly_active_user') || localStorage.getItem('pulse_active_user');
      if (stored) {
        user = Object.assign(user, JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }

    // Populate user elements across header, banner, and sidebar
    function syncUserData() {
      // 1. Header Profile & Welcome Banner
      const headerProfileName = document.getElementById('headerProfileName');
      if (headerProfileName) {
        headerProfileName.textContent = user.name;
      }

      const headerProfileRole = document.getElementById('headerProfileRole');
      if (headerProfileRole) {
        headerProfileRole.textContent = user.role === 'admin' ? 'Administrator' : 'Member';
      }

      const welcomeUserName = document.getElementById('welcomeUserName');
      if (welcomeUserName) {
        const firstName = (user.name || 'Member').trim().split(' ')[0];
        welcomeUserName.textContent = firstName.toUpperCase();
      }

      const welcomeUserTier = document.getElementById('welcomeUserTier');
      if (welcomeUserTier) {
        welcomeUserTier.textContent = user.role === 'admin' ? 'SYSTEM ADMINISTRATOR' : (user.tier || 'PERFORMANCE TIER').toUpperCase();
      }

      // 2. Sidebar Profile
      const userNameElements = document.querySelectorAll('.dash-user-name');
      userNameElements.forEach((el) => {
        el.textContent = user.name;
      });

      const userTierElements = document.querySelectorAll('.dash-user-badge');
      userTierElements.forEach((el) => {
        el.textContent = user.role === 'admin' ? 'System Administrator' : (user.tier || 'Performance Tier');
      });

      // 3. Form fields
      const nameInput = document.getElementById('profileNameInput');
      const emailInput = document.getElementById('profileEmailInput');
      if (nameInput) nameInput.value = user.name;
      if (emailInput) emailInput.value = user.email;

      const adminNameInput = document.getElementById('adminNameInput');
      const adminEmailInput = document.getElementById('adminEmailInput');
      if (adminNameInput) adminNameInput.value = user.name;
      if (adminEmailInput) adminEmailInput.value = user.email;
    }

    syncUserData();

    // 2. Tab Navigation
    const navItems = document.querySelectorAll('.dash-nav-item[data-tab]');
    const tabPanes = document.querySelectorAll('.dash-tab-pane');

    navItems.forEach((btn) => {
      btn.addEventListener('click', function () {
        const targetTab = btn.getAttribute('data-tab');

        navItems.forEach((item) => {
          item.classList.remove('active');
          item.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        tabPanes.forEach((pane) => {
          if (pane.id === `tab-${targetTab}`) {
            pane.classList.add('active');
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(
                pane,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' }
              );
            }
            if (typeof AOS !== 'undefined') {
              AOS.refresh();
            }
            if (window.PulseApp && typeof window.PulseApp.triggerCurtainAndUnfurl === 'function') {
              window.PulseApp.triggerCurtainAndUnfurl(pane);
            }
          } else {
            pane.classList.remove('active');
          }
        });

        // Close mobile sidebar if open
        if (window.innerWidth <= 1024) {
          closeSidebar();
        }
      });
    });

    // 3. Mobile Sidebar Toggle & Scroll Lock
    const mobileToggle = document.querySelector('.mobile-dash-nav-toggle');
    const sidebar = document.querySelector('.dash-sidebar');
    const overlay = document.querySelector('.dash-sidebar-overlay');

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    function openSidebar() {
      if (sidebar) sidebar.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', function () {
        const isOpen = sidebar.classList.contains('open');
        if (isOpen) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    // Close mobile sidebar on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });

    // 4. Header Search Bar Logic (Script-Based Validation)
    // If empty -> show script error message. If text entered -> redirect to 404.html
    const searchForm = document.getElementById('dashSearchForm');
    const searchInput = document.getElementById('dashSearchInput');

    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = searchInput.value.trim();

        if (!query) {
          searchInput.classList.add('is-invalid');
          if (window.PulseApp?.showToast) {
            window.PulseApp.showToast(
              'Please enter search details before submitting.',
              'error',
              'SEARCH DETAILS REQUIRED'
            );
          } else {
            alert('Please enter search details before submitting.');
          }
          return;
        }

        searchInput.classList.remove('is-invalid');
        window.location.href = '404.html';
      });

      // Clear is-invalid on typing
      searchInput.addEventListener('input', function () {
        if (searchInput.value.trim()) {
          searchInput.classList.remove('is-invalid');
        }
      });
    }

    // 5. Notification Bell Redirection to 404.html
    const bellButtons = document.querySelectorAll('.dash-bell-btn, #dashBellBtn');
    bellButtons.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = '404.html';
      });
    });

    // 6. Subpage Action Buttons Redirection to 404.html
    // All action buttons inside subpage tabs (except form submits and nav items) redirect to 404.html
    const subpageActionButtons = document.querySelectorAll(
      '.dash-main .dash-tab-pane button:not([type="submit"]):not(.modal-close-btn), ' +
      '.dash-main .dash-tab-pane a:not([data-tab]), ' +
      '.dash-header-actions a[href="404.html"], ' +
      '#btnLogWorkout'
    );

    subpageActionButtons.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = '404.html';
      });
    });

    // 7. Member Profile Form (Script-Based Validation)
    const profileForm = document.getElementById('dashProfileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('profileNameInput');
        const emailInput = document.getElementById('profileEmailInput');
        const newName = nameInput ? nameInput.value.trim() : '';
        const newEmail = emailInput ? emailInput.value.trim() : '';

        let isValid = true;

        if (!newName || newName.length < 2) {
          if (nameInput) {
            nameInput.classList.add('is-invalid');
            const feedback = nameInput.closest('.form-group')?.querySelector('.form-feedback');
            if (feedback) feedback.textContent = 'Please enter your full legal name.';
          }
          isValid = false;
        } else if (nameInput) {
          nameInput.classList.remove('is-invalid');
          const feedback = nameInput.closest('.form-group')?.querySelector('.form-feedback');
          if (feedback) feedback.textContent = '';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newEmail || !emailRegex.test(newEmail)) {
          if (emailInput) {
            emailInput.classList.add('is-invalid');
            const feedback = emailInput.closest('.form-group')?.querySelector('.form-feedback');
            if (feedback) feedback.textContent = 'Please enter a valid email address.';
          }
          isValid = false;
        } else if (emailInput) {
          emailInput.classList.remove('is-invalid');
          const feedback = emailInput.closest('.form-group')?.querySelector('.form-feedback');
          if (feedback) feedback.textContent = '';
        }

        if (!isValid) {
          if (window.PulseApp?.showToast) {
            window.PulseApp.showToast(
              'Please provide valid details for all required fields.',
              'error',
              'VALIDATION FAILED'
            );
          }
          return;
        }

        user.name = newName;
        user.email = newEmail;

        try {
          localStorage.setItem('stackly_active_user', JSON.stringify(user));
        } catch (err) {
          console.warn('Storage failed', err);
        }

        syncUserData();

        const toast = window.StacklyApp?.showToast || window.PulseApp?.showToast;
        if (toast) {
          toast('Profile preferences and contact details saved.', 'success', 'PROFILE UPDATED');
        }
      });
    }

    // 8. Admin Profile Form (Script-Based Validation)
    const adminProfileForm = document.getElementById('adminProfileForm');
    if (adminProfileForm) {
      adminProfileForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('adminNameInput');
        const emailInput = document.getElementById('adminEmailInput');
        const newName = nameInput ? nameInput.value.trim() : '';
        const newEmail = emailInput ? emailInput.value.trim() : '';

        let isValid = true;

        if (!newName || newName.length < 2) {
          if (nameInput) {
            nameInput.classList.add('is-invalid');
            const feedback = nameInput.closest('.form-group')?.querySelector('.form-feedback');
            if (feedback) feedback.textContent = 'Please enter admin full name.';
          }
          isValid = false;
        } else if (nameInput) {
          nameInput.classList.remove('is-invalid');
          const feedback = nameInput.closest('.form-group')?.querySelector('.form-feedback');
          if (feedback) feedback.textContent = '';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newEmail || !emailRegex.test(newEmail)) {
          if (emailInput) {
            emailInput.classList.add('is-invalid');
            const feedback = emailInput.closest('.form-group')?.querySelector('.form-feedback');
            if (feedback) feedback.textContent = 'Please enter a valid official email.';
          }
          isValid = false;
        } else if (emailInput) {
          emailInput.classList.remove('is-invalid');
          const feedback = emailInput.closest('.form-group')?.querySelector('.form-feedback');
          if (feedback) feedback.textContent = '';
        }

        if (!isValid) {
          const toast = window.StacklyApp?.showToast || window.PulseApp?.showToast;
          if (toast) {
            toast(
              'Please enter all required administrator credentials.',
              'error',
              'ADMIN CONFIG ERROR'
            );
          }
          return;
        }

        user.name = newName;
        user.email = newEmail;
        user.role = 'admin';

        try {
          localStorage.setItem('stackly_active_user', JSON.stringify(user));
        } catch (err) {
          console.warn('Storage failed', err);
        }

        syncUserData();

        const toast = window.StacklyApp?.showToast || window.PulseApp?.showToast;
        if (toast) {
          toast('Administrator settings and security preferences saved.', 'success', 'SETTINGS UPDATED');
        }
      });
    }

    // 9. Logout Control
    const logoutBtns = document.querySelectorAll('.dash-logout-btn');
    logoutBtns.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('stackly_active_user');
        localStorage.removeItem('pulse_active_user');
        const toast = window.StacklyApp?.showToast || window.PulseApp?.showToast;
        if (toast) {
          toast('You have been safely signed out. See you soon!', 'info', 'SESSION ENDED');
        }
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 800);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initDashboard);
})();
