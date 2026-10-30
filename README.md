# PULSE FITNESS CLUB — PREMIUM ATHLETIC & HEALTH CLUB WEBSITE

> **A high-performance, conversion-focused digital flagship for an elite fitness and human performance collective.**

---

## 1. Project Overview & Brand Identity

**PULSE FITNESS CLUB** is designed as a modern international athletic brand. Combining heavy barbell strength training, metabolic conditioning (HYROX), sports science coaching, and contrast hydrotherapy (cold plunge and cedar saunas).

### Brand Personality
* **Powerful:** Bold editorial typography with high contrast.
* **Athletic:** Built around real human performance, periodization, and movement mechanics.
* **Modern & Energetic:** Near-black and charcoal surfaces punctuated by electric neon-lime accents.
* **Premium & Motivational:** Clean lines, generous spacing, and zero clutter.

### Color System
| Token | Hex Value | Usage |
|---|---|---|
| **Primary Background (Near-Black)** | `#0B0D0C` | Primary canvas, background, and high-contrast surfaces |
| **Secondary Background (Charcoal)** | `#151816` | Section backgrounds, elevated surface cards |
| **Accent (Neon Lime)** | `#C7FF3D` | Accents, badges, active states, key CTAs, and focal highlights |
| **Text Primary (White)** | `#FFFFFF` | Primary headlines, bold typography, and crisp iconography |
| **Text Secondary (Muted Grey)** | `#A8ADA5` | Readable muted body paragraphs, secondary metadata, and labels |
| **Surface Card** | `#1C201E` | Cards, panels, inputs, and form containers |

### Typography
* **Headings:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — Bold, geometric, uppercase athletic punch.
* **Body:** [Inter](https://fonts.google.com/specimen/Inter) — Clean, legible, modern human interface typography.

---

## 2. Page Directory (12 Complete Pages)

| Page | Filename | Description |
|---|---|---|
| **Home** | [`index.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/index.html) | Flagship 12-section experience with hero, trust stats (members, trainers, programs, experience), about preview, popular workout programs, membership preview, trainers, facilities showcase, community spotlights, live timetable, FAQ, and footer. |
| **About Us** | [`about.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/about.html) | Brand story, the 4-Pillar Human Performance framework, coaching ethics, and equipment standards. |
| **Membership Plans** | [`membership.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/membership.html) | Interactive 3-way billing switcher (Monthly, Quarterly, Annual in INR), transparent inclusions/restrictions, comprehensive comparison matrix, cancellation policies, and prefill inquiry form. |
| **Personal Training** | [`training.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/training.html) | 4 coaching pathways, benefits of 1-on-1 coaching, 5-step scientific periodization protocol, 3 transparent pricing packages, and consultation form with coach prefill. |
| **Group Classes** | [`classes.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/classes.html) | Complete class cards for Yoga, HIIT, Strength Training, Zumba, Cardio, Mobility, and Functional Fitness. Filterable weekly timetable with spots-remaining & waitlist alerts. |
| **Trainers** | [`trainers.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/trainers.html) | Certified coach directory (CSCS, USAW, FRC, NASM) with real-time name/specialty search, category filters, and an interactive full-profile modal. |
| **Facilities** | [`facilities.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/facilities.html) | 18,000 sq ft architectural overview: Olympic drop platforms, 40m sprint turf, group studios, cold plunge tubs, saunas, and an interactive accessible image lightbox gallery. |
| **Contact Us** | [`contact.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/contact.html) | Operating hours, location directions, phone/email, Google Maps directions link, validated contact form, and visitor support FAQs. |
| **Member Login** | [`login.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/login.html) | Clean authentication interface, show/hide password toggle, and one-click demo credentials auto-fill. |
| **Member Signup** | [`signup.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/signup.html) | Onboarding form with full name, email, optional phone, password confirmation, pathway interest, and terms agreement. |
| **404 Error Page** | [`404.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/404.html) | Branded error screen ("404 ERROR // PAGE NOT FOUND") with navigation recovery buttons. |
| **Member Dashboard** | [`dashboard.html`](file:///c:/Users/SWETHA/Desktop/Gym%20&%20Health%20Club/dashboard.html) | Responsive member portal with sidebar: Dashboard, My Membership, Workout Plans (Push/Pull/Legs splits), Class Schedule, Bookings (with demo empty-state toggle), and Profile settings. |

---

## 3. Technology & Architecture

* **HTML5:** Semantic architecture (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
* **CSS3:** Custom design system using CSS Custom Properties (variables), CSS Grid, Flexbox, responsive `clamp()`, and fluid typography. Zero heavy CSS framework dependencies.
* **Vanilla JavaScript (ES6+):** Modular, event-driven, decoupled functionality:
  * `main.js`: Sticky navigation, active links, mobile off-canvas drawer, accessible accordions, toast notifications, modal dialog system, accessible image lightbox, and image fallback handler.
  * `animations.js`: GSAP & ScrollTrigger integration, animated metric counters, reduced-motion awareness, and IntersectionObserver fallbacks.
  * `schedule.js`: Real-time schedule dataset, category filtering, day-of-week switching, spots-remaining calculation, waitlist simulation, and class reservation modal.
  * `forms.js`: Validation engine, URL parameter prefilling (`?plan=` and `?coach=`), 3-way billing calculation, and authentication simulator.
  * `dashboard.js`: Session management, tab navigation, booking cancellation, periodized routine displays, and empty-state toggle.
* **Optimized Imagery:** WebP format delivery with automatic fallback handling via inline SVG placeholders.

---

## 4. Key Interactive Features

1. **Accessible Image Lightbox:** Clicking any facility photo on `facilities.html` opens a full-screen, high-res lightbox with Next/Previous arrows, keyboard arrow navigation, and ESC dismissal.
2. **Trainer Profile Modal & Live Search:** Filter trainers by specialty or search by name in real-time. Click "View Full Bio" to view complete education, credentials, and book a consultation directly.
3. **3-Way Billing Switcher:** Toggling between Monthly, Quarterly (save 10%), and Annual (save 20%) dynamically recalculates prices in INR across all tiers.
4. **Interactive Class Timetable & Waitlist:** Displays real-time capacity. Active sessions trigger the reservation modal, while full classes provide an instant priority waitlist flow.
5. **Interactive Member Dashboard:** Features periodized workout splits (Push, Pull, Legs, Conditioning), live reservation management, profile editing with immediate persistence, and an interactive **Empty-State Toggle**.
6. **Toast Notification System:** Instant user feedback for form submissions, newsletter subscriptions, pass claims, and cancellations.

---

## 5. Local Setup & Deployment

### Run Locally
No build tools or compiler required. Serve the static files with any local server:

```bash
# Using Python:
python -m http.server 8000

# Using Node.js (npx):
npx serve .
```
Then navigate to `http://localhost:8000` in your web browser.

### Deploy to GitHub Pages
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Pulse Fitness Club website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your repository on GitHub, open **Settings** &rarr; **Pages**.
3. Under **Branch**, select `main` and root directory `/`, then click **Save**.
4. All asset and page links use relative paths, ensuring 100% out-of-the-box compatibility with GitHub Pages.

---

## 6. External Integrations Checklist (For Production Launch)

Before connecting live club members:
* [ ] **Authentication:** Replace `localStorage` demo session in `js/forms.js` with an OAuth2/JWT provider (Firebase Auth, Supabase, Auth0).
* [ ] **Payment Gateway:** Connect Stripe or Razorpay API to process recurring membership subscriptions on `membership.html`.
* [ ] **Gym Management API:** Connect `js/schedule.js` to Mindbody, Glofox, or a custom booking database.
* [ ] **Transactional Email:** Hook `contactForm` and `membershipInquiryForm` to SendGrid or AWS SES for instant email dispatch.
