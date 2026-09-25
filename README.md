# Mythri Studio — Photography Studio Platform

> A luxury editorial web experience for **Mythri Studio**, specializing in fine art weddings, high-fashion campaigns, executive portraiture, and architectural visual storytelling.

---

## 📸 Project Overview

This application serves as the primary digital portfolio, service catalog, and booking inquiry portal for Mythri Studio. Designed with an editorial luxury aesthetic, it balances high-resolution visual presentation with rapid client-side interactivity, categorized portfolio filtering, a full-screen image lightbox, and an inquiry workflow.

All copy, offerings, team details, and gallery items are completely decoupled from UI components and stored in modular configuration files within `src/data/`, allowing seamless updates once final client questionnaires and branding assets arrive.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with custom luxury color palette and Google Fonts (*Playfair Display* & *Plus Jakarta Sans*)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting & Code Quality**: Oxlint

---

## 🚀 Quickstart & Local Development

Clone the repository and launch the local development server:

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

The application will be accessible at `http://localhost:5173`.

---

## 📁 Folder Structure & Architecture

The codebase adheres to strict separation of concerns, ensuring that any developer can safely edit, add, or replace components without breaking adjacent logic.

```
my3-studio/
├── public/
│   ├── favicon.svg             # Aperture monogram SVG favicon
│   └── icons.svg
├── src/
│   ├── assets/                 # Brand SVG logos and static assets
│   │   └── logo.svg
│   ├── components/             # Atomic, reusable UI components (<150 lines each)
│   │   ├── AboutProcess.jsx    # 4-stage client experience journey
│   │   ├── ContactForm.jsx     # Booking form orchestration & validation
│   │   ├── ContactSuccess.jsx  # Submission confirmation screen
│   │   ├── Footer.jsx          # Studio coordinates, atelier hours, links
│   │   ├── FormFields.jsx      # Modular booking input fields
│   │   ├── GalleryCard.jsx     # Interactive portfolio item with hover zoom
│   │   ├── HomeHero.jsx        # Editorial hero banner with CTA triggers
│   │   ├── HomeStats.jsx       # Studio metrics & figures strip
│   │   ├── LightboxModal.jsx   # Keyboard-accessible full-res image modal
│   │   ├── Navbar.jsx          # Glassmorphic header & mobile navigation
│   │   ├── PageHeader.jsx      # Standardized inner-page hero banner
│   │   ├── ScrollToTop.jsx     # Route change scroll position reset
│   │   ├── ServiceCard.jsx     # Offering card with deliverables list
│   │   └── TestimonialCard.jsx # Patron quotes & review stars
│   ├── data/                   # Decoupled content layer (update copy without editing JSX)
│   │   ├── portfolio.js        # Categorized gallery data & metadata
│   │   ├── pricing.js          # Investment packages and feature lists
│   │   ├── services.js         # Service descriptions, rates, and deliverables
│   │   ├── studioConfig.js     # Brand info, contact info, hours, socials
│   │   ├── team.js             # Principal photographers & bios
│   │   └── testimonials.js     # Client accolades & reviews
│   ├── pages/                  # Page route components (<150 lines each)
│   │   ├── About.jsx           # Studio story, philosophy, team, and process
│   │   ├── Contact.jsx         # Booking form, atelier location, hours
│   │   ├── Home.jsx            # Hero, stats, featured works, services, testimonials
│   │   └── Portfolio.jsx       # Category tabs, gallery grid, lightbox
│   ├── styles/
│   │   └── index.css           # Global typography, glassmorphism, scrollbar
│   ├── App.jsx                 # Router shell and layout composition
│   └── main.jsx                # Application root entry point
├── tailwind.config.js          # Custom theme tokens (gold palette, typography)
├── postcss.config.js           # PostCSS Tailwind and Autoprefixer config
├── vite.config.js              # Vite bundler configuration
└── package.json
```

---

## 🎨 How to Update Content (No Code Edits Required)

To update studio information or add photos once the client requirements questionnaire is received:

1. **Portfolio Images & Projects**: Edit [src/data/portfolio.js](src/data/portfolio.js) to add or replace image URLs, categories (`weddings`, `portraits`, `fashion`, `commercial`), titles, client names, and camera specs.
2. **Services & Pricing**: Edit [src/data/services.js](src/data/services.js) and [src/data/pricing.js](src/data/pricing.js) to update package offerings, deliverables, or pricing tiers.
3. **Studio Details & Contact Information**: Edit [src/data/studioConfig.js](src/data/studioConfig.js) to update email, phone numbers, atelier address, working hours, and social media links.
4. **Team Members**: Edit [src/data/team.js](src/data/team.js) to add or update photographer profiles, specialties, and headshots.
5. **Client Testimonials**: Edit [src/data/testimonials.js](src/data/testimonials.js) to add new client reviews and quotes.

---

## 🤝 Collaboration Guidelines & Code Standards

- **Component Size**: All components must remain under ~150 lines. Decompose complex cards or forms into modular child components.
- **Styling**: Use utility classes configured in `tailwind.config.js`. Avoid inline styles or hardcoded hex colors when design tokens exist (`studio-*`, `gold-*`).
- **Commits**: Maintain atomic, descriptive commits (e.g. `feat: ...`, `fix: ...`, `docs: ...`).
- **Dependencies**: Keep the bundle lean. Ensure newly added dependencies are vetted and typed if necessary.
