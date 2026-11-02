/**
 * STACKLY FITNESS CLUB — INTERACTIVE SCHEDULE MODULE
 * Day of week filtering, Category filtering, Class Booking Modal Flow
 */

(function () {
  'use strict';

  // Demo Schedule Dataset
  const scheduleData = [
    // MONDAY
    { id: 1, day: 'monday', timeOfDay: 'morning', name: 'HYROX Athletic Conditioning', category: 'cardio', time: '06:30 - 07:30', trainer: 'Marcus Stone', level: 'Intermediate / Advanced', zone: 'Functional Turf', spots: 4 },
    { id: 2, day: 'monday', timeOfDay: 'morning', name: 'Barbell Strength & Hypertrophy', category: 'strength', time: '08:00 - 09:15', trainer: 'Dmitri Volkov', level: 'All Levels', zone: 'Lifting Zone', spots: 6 },
    { id: 3, day: 'monday', timeOfDay: 'afternoon', name: 'Dynamic Vinyasa Flow (Yoga)', category: 'mobility', time: '12:00 - 13:00', trainer: 'Elena Rostova', level: 'All Levels', zone: 'Studio A', spots: 8 },
    { id: 4, day: 'monday', timeOfDay: 'evening', name: 'Stackly Zumba & Rhythm Cardio', category: 'zumba', time: '17:30 - 18:30', trainer: 'Priya Sharma', level: 'All Levels', zone: 'Studio B', spots: 0 },
    { id: 5, day: 'monday', timeOfDay: 'evening', name: 'High-Impact Boxing & Striking', category: 'combat', time: '18:45 - 19:45', trainer: 'Tariq Vance', level: 'Intermediate', zone: 'Combat Ring', spots: 5 },
    { id: 6, day: 'monday', timeOfDay: 'evening', name: 'Metabolic Inferno (HIIT)', category: 'cardio', time: '20:00 - 21:00', trainer: 'Sarah Jenkins', level: 'Advanced', zone: 'Studio B', spots: 2 },

    // TUESDAY
    { id: 7, day: 'tuesday', timeOfDay: 'morning', name: 'Olympic Weightlifting Technique', category: 'strength', time: '07:00 - 08:30', trainer: 'Dmitri Volkov', level: 'Intermediate', zone: 'Lifting Platforms', spots: 3 },
    { id: 8, day: 'tuesday', timeOfDay: 'morning', name: 'Functional Longevity & Mobility', category: 'mobility', time: '09:00 - 10:00', trainer: 'Elena Rostova', level: 'All Levels', zone: 'Studio A', spots: 7 },
    { id: 9, day: 'tuesday', timeOfDay: 'afternoon', name: 'Cardio Sprint & Assault Engine', category: 'cardio', time: '12:30 - 13:15', trainer: 'Marcus Stone', level: 'All Levels', zone: 'Cardio Loft', spots: 5 },
    { id: 10, day: 'tuesday', timeOfDay: 'evening', name: 'Functional Kettlebell & Core', category: 'functional', time: '18:00 - 19:00', trainer: 'Sarah Jenkins', level: 'All Levels', zone: 'Functional Turf', spots: 4 },
    { id: 11, day: 'tuesday', timeOfDay: 'evening', name: 'Stackly Dance & Zumba Cardio', category: 'zumba', time: '19:15 - 20:15', trainer: 'Priya Sharma', level: 'All Levels', zone: 'Studio B', spots: 3 },

    // WEDNESDAY
    { id: 12, day: 'wednesday', timeOfDay: 'morning', name: 'Full Body Power & Pull', category: 'strength', time: '06:30 - 07:45', trainer: 'Dmitri Volkov', level: 'All Levels', zone: 'Lifting Zone', spots: 2 },
    { id: 13, day: 'wednesday', timeOfDay: 'morning', name: 'Combat Conditioning & Sparring', category: 'combat', time: '08:30 - 09:30', trainer: 'Tariq Vance', level: 'Advanced', zone: 'Combat Ring', spots: 0 },
    { id: 14, day: 'wednesday', timeOfDay: 'afternoon', name: 'Deep Hip & Spine Restoration (Yoga)', category: 'mobility', time: '12:00 - 13:00', trainer: 'Elena Rostova', level: 'All Levels', zone: 'Studio A', spots: 9 },
    { id: 15, day: 'wednesday', timeOfDay: 'evening', name: 'HYROX Team Relay Simulation', category: 'cardio', time: '18:30 - 19:45', trainer: 'Marcus Stone', level: 'Advanced', zone: 'Functional Turf', spots: 3 },

    // THURSDAY
    { id: 16, day: 'thursday', timeOfDay: 'morning', name: 'Squat & Lower Body Mechanics', category: 'strength', time: '07:00 - 08:15', trainer: 'Dmitri Volkov', level: 'Intermediate', zone: 'Lifting Zone', spots: 4 },
    { id: 17, day: 'thursday', timeOfDay: 'morning', name: 'MetCon Endurance Challenge', category: 'cardio', time: '08:30 - 09:30', trainer: 'Sarah Jenkins', level: 'All Levels', zone: 'Studio B', spots: 6 },
    { id: 18, day: 'thursday', timeOfDay: 'evening', name: 'Breathwork & Active Recovery', category: 'mobility', time: '17:00 - 18:00', trainer: 'Elena Rostova', level: 'All Levels', zone: 'Hydro & Recovery', spots: 8 },
    { id: 19, day: 'thursday', timeOfDay: 'evening', name: 'Zumba High-Energy Fiesta', category: 'zumba', time: '18:15 - 19:15', trainer: 'Priya Sharma', level: 'All Levels', zone: 'Studio B', spots: 5 },
    { id: 20, day: 'thursday', timeOfDay: 'evening', name: 'Muay Thai Fundamentals', category: 'combat', time: '19:30 - 20:30', trainer: 'Tariq Vance', level: 'All Levels', zone: 'Combat Ring', spots: 3 },

    // FRIDAY
    { id: 21, day: 'friday', timeOfDay: 'morning', name: 'Friday Barbell Pump & Power', category: 'strength', time: '07:00 - 08:00', trainer: 'Dmitri Volkov', level: 'All Levels', zone: 'Lifting Zone', spots: 5 },
    { id: 22, day: 'friday', timeOfDay: 'afternoon', name: 'Row & Ski Erg Engine Builder', category: 'cardio', time: '12:00 - 13:00', trainer: 'Marcus Stone', level: 'Intermediate', zone: 'Cardio Loft', spots: 4 },
    { id: 23, day: 'friday', timeOfDay: 'evening', name: 'Total Body HIIT Burn', category: 'cardio', time: '17:30 - 18:30', trainer: 'Sarah Jenkins', level: 'All Levels', zone: 'Studio B', spots: 2 },
    { id: 24, day: 'friday', timeOfDay: 'evening', name: 'Friday Night Stackly Zumba', category: 'zumba', time: '19:00 - 20:00', trainer: 'Priya Sharma', level: 'All Levels', zone: 'Studio A', spots: 0 },

    // SATURDAY
    { id: 25, day: 'saturday', timeOfDay: 'morning', name: 'Super Saturday Club Challenge', category: 'cardio', time: '08:00 - 09:30', trainer: 'Marcus Stone & Sarah J.', level: 'All Levels', zone: 'Main Arena', spots: 6 },
    { id: 26, day: 'saturday', timeOfDay: 'morning', name: 'Olympic Snatch & Clean Workshop', category: 'strength', time: '10:00 - 11:30', trainer: 'Dmitri Volkov', level: 'Intermediate / Advanced', zone: 'Platforms', spots: 2 },
    { id: 27, day: 'saturday', timeOfDay: 'afternoon', name: 'Yin Yoga & Deep Tissue Stretch', category: 'mobility', time: '12:00 - 13:15', trainer: 'Elena Rostova', level: 'All Levels', zone: 'Studio A', spots: 10 },

    // SUNDAY
    { id: 28, day: 'sunday', timeOfDay: 'morning', name: 'Sunday Mobility Reset & Sauna', category: 'mobility', time: '09:00 - 10:15', trainer: 'Elena Rostova', level: 'All Levels', zone: 'Recovery Lounge', spots: 5 },
    { id: 29, day: 'sunday', timeOfDay: 'morning', name: 'Strongman & Sled Conditioning', category: 'functional', time: '10:30 - 11:45', trainer: 'Marcus Stone', level: 'All Levels', zone: 'Outdoor Turf', spots: 4 }
  ];

  let currentDay = 'monday';
  let currentCategory = 'all';
  let currentTimeOfDay = 'all';

  function renderSchedule() {
    const container = document.querySelector('.schedule-list');
    if (!container) return;

    const filtered = scheduleData.filter((item) => {
      const matchDay = item.day === currentDay;
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const matchTime = currentTimeOfDay === 'all' || item.timeOfDay === currentTimeOfDay;
      return matchDay && matchCat && matchTime;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon"><i class="fa-solid fa-calendar-xmark"></i></div>
          <h4 class="empty-state-title">No Sessions Match Your Filters</h4>
          <p class="empty-state-desc">Try resetting your discipline or time-of-day filters to view available coached sessions for ${currentDay.toUpperCase()}.</p>
          <button class="btn btn-secondary btn-sm" id="btnResetScheduleFilters">Show All Classes</button>
        </div>
      `;

      if (window.PulseApp && typeof window.PulseApp.triggerCurtainAndUnfurl === 'function') {
        window.PulseApp.triggerCurtainAndUnfurl(container);
      }

      document.getElementById('btnResetScheduleFilters')?.addEventListener('click', function () {
        currentCategory = 'all';
        currentTimeOfDay = 'all';
        document.querySelectorAll('.cat-filter-btn').forEach((b) => b.classList.remove('active'));
        document.querySelector('.cat-filter-btn[data-category="all"]')?.classList.add('active');
        renderSchedule();
      });
      return;
    }

    container.innerHTML = filtered
      .map(
        (item) => {
          const isFull = item.spots === 0;
          return `
      <div class="schedule-row" data-id="${item.id}">
        <div class="schedule-time">
          <i class="fa-regular fa-clock"></i>
          <span>${item.time}</span>
        </div>
        <div class="schedule-class-info">
          <div class="schedule-class-name">${item.name}</div>
          <div class="schedule-class-meta">
            <span><i class="fa-solid fa-location-dot text-accent"></i> ${item.zone}</span>
            <span style="margin-left: 10px;">
              ${isFull ? '<strong style="color: var(--color-error);"><i class="fa-solid fa-circle-exclamation"></i> Full (Waitlist Only)</strong>' : `<span style="color: var(--color-accent);"><i class="fa-solid fa-user-check"></i> ${item.spots} spots remaining</span>`}
            </span>
          </div>
        </div>
        <div class="schedule-trainer">
          <i class="fa-solid fa-user-tie text-accent"></i>
          <span>${item.trainer}</span>
        </div>
        <div class="schedule-difficulty">
          <span class="badge ${item.level.includes('Advanced') ? 'badge-outline-lime' : 'badge-outline'}">${item.level}</span>
        </div>
        <div class="schedule-action">
          ${isFull ? `
            <a href="404.html" class="btn btn-secondary btn-sm btn-waitlist-class" data-class-name="${item.name}" data-class-trainer="${item.trainer}">
              <i class="fa-solid fa-clock"></i>
              <span>Join Waitlist</span>
            </a>
          ` : `
            <a href="404.html" class="btn btn-primary btn-sm btn-book-class" data-class-id="${item.id}" data-class-name="${item.name}" data-class-time="${item.time}" data-class-trainer="${item.trainer}" data-class-day="${item.day}">
              <span>Book Spot</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          `}
        </div>
      </div>
    `;
        }
      )
      .join('');

    // Trigger smooth staggered entrance animation on newly rendered schedule items
    if (window.PulseApp && typeof window.PulseApp.animateGridFilter === 'function') {
      window.PulseApp.animateGridFilter(container, '.schedule-row');
    }

    // Attach click listeners to "Book Spot" buttons - redirect to 404 page
    container.querySelectorAll('.btn-book-class').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        try {
          const page = window.location.pathname.split('/').pop() || 'classes.html';
          sessionStorage.setItem('stackly_last_section_url', page + '#timetable');
        } catch (err) {}
        window.location.href = '404.html';
      });
    });

    // Attach click listeners to "Join Waitlist" buttons - redirect to 404 page
    container.querySelectorAll('.btn-waitlist-class').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        try {
          const page = window.location.pathname.split('/').pop() || 'classes.html';
          sessionStorage.setItem('stackly_last_section_url', page + '#timetable');
        } catch (err) {}
        window.location.href = '404.html';
      });
    });
  }

  function openClassBookingModal(session) {
    const modal = document.getElementById('classBookingModal');
    if (!modal) return;

    // Prefill modal fields
    const modalTitle = modal.querySelector('#bookingModalClassName');
    const modalMeta = modal.querySelector('#bookingModalMeta');
    const hiddenNameInput = modal.querySelector('#bookingHiddenClassName');

    if (modalTitle) modalTitle.textContent = session.name;
    if (modalMeta) {
      modalMeta.textContent = `${session.day.toUpperCase()} | ${session.time} | Coach ${session.trainer}`;
    }
    if (hiddenNameInput) hiddenNameInput.value = session.name;

    const app = window.StacklyApp || window.PulseApp;
    if (app?.openModal) {
      app.openModal('classBookingModal');
    }
  }

  function initScheduleControls() {
    // Day buttons
    const dayButtons = document.querySelectorAll('.day-tab-btn');
    dayButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        dayButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentDay = btn.getAttribute('data-day');
        renderSchedule();
      });
    });

    // Category buttons
    const catButtons = document.querySelectorAll('.cat-filter-btn');
    catButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        catButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        renderSchedule();
      });
    });

    // Handle Booking Modal Form Submission
    const bookingForm = document.getElementById('classBookingForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('bookingMemberName');
        const emailInput = document.getElementById('bookingMemberEmail');
        const memberName = nameInput ? nameInput.value.trim() : '';
        const memberEmail = emailInput ? emailInput.value.trim() : '';
        const className = document.getElementById('bookingHiddenClassName')?.value || 'Group Session';

        let isValid = true;
        if (!memberName) {
          if (nameInput) nameInput.classList.add('is-invalid');
          isValid = false;
        } else if (nameInput) {
          nameInput.classList.remove('is-invalid');
        }

        if (!memberEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail)) {
          if (emailInput) emailInput.classList.add('is-invalid');
          isValid = false;
        } else if (emailInput) {
          emailInput.classList.remove('is-invalid');
        }

        const app = window.StacklyApp || window.PulseApp;

        if (!isValid) {
          if (app?.showToast) {
            app.showToast('Please enter your full name and a valid email address.', 'error', 'VALIDATION ERROR');
          }
          return;
        }

        // Save booking to localStorage
        try {
          const raw = localStorage.getItem('stackly_member_bookings') || localStorage.getItem('pulse_member_bookings') || '[]';
          const bookings = JSON.parse(raw);
          bookings.push({
            id: Date.now(),
            name: className,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            status: 'Confirmed'
          });
          localStorage.setItem('stackly_member_bookings', JSON.stringify(bookings));
        } catch (err) {
          console.warn('Storage error:', err);
        }

        if (app?.closeModal) {
          app.closeModal('classBookingModal');
        }
        bookingForm.reset();

        if (app?.showToast) {
          app.showToast(
            `Confirmed! Spot reserved for ${memberName} in ${className}. See you on the training floor.`,
            'success',
            'CLASS RESERVATION'
          );
        }
      });
    }

    // Initial render
    renderSchedule();
  }

  document.addEventListener('DOMContentLoaded', initScheduleControls);
})();
