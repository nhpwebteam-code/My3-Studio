import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Camera, MapPin, Phone } from 'lucide-react';

function WhatsAppIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.58 1.96.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.577 4.182 1.583 5.928l-1.683 6.155 6.326-1.659c1.696.927 3.639 1.458 5.707 1.458 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function InstagramIcon({ size = 15, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 15, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

const HERO_WHATSAPP_MSG = encodeURIComponent(
  "Hello Anji garu (MY3 Studios)! I am visiting your website and would like to inquire about photoshoot availability and packages for my upcoming event. Could you please share more details?"
);
const HERO_WHATSAPP_URL = `https://wa.me/919949395037?text=${HERO_WHATSAPP_MSG}`;

const HERO_CYLINDER_PHOTOS = [
  {
    id: 1,
    title: 'Bridal Saree Grace & Silk',
    image: '/takeout-1-001/potraites/1724236212961_copy.jpg',
  },
  {
    id: 2,
    title: 'Classical Temple Adornment',
    image: '/takeout-1-001/potraites/1724236213133.jpg',
  },
  {
    id: 3,
    title: 'Studio Bridal Profile',
    image: '/takeout-1-001/potraites/1724236213624.jpg',
  },
  {
    id: 4,
    title: 'Heritage Gold Radiance',
    image: '/takeout-1-001/potraites/DSC00290_copy.jpg.jpg',
  },
  {
    id: 5,
    title: 'Traditional Pelli Koothuru',
    image: '/takeout-1-001/potraites/DSC00301_copy.jpg.jpg',
  },
  {
    id: 6,
    title: 'Fine-Art Studio Portrait',
    image: '/takeout-1-001/potraites/DSC00333_copy.jpg.jpg',
  },
  {
    id: 7,
    title: 'Dramatic Strobe Lighting Portrait',
    image: '/takeout-1-001/potraites/DSC04170.jpg',
  },
  {
    id: 8,
    title: 'Festive Silk Portrait',
    image: '/takeout-1-001/potraites/DSC04657.jpg',
  },
  {
    id: 9,
    title: 'Cultural Beauty Portrait',
    image: '/takeout-1-001/potraites/DSC05314.jpg',
  },
  {
    id: 10,
    title: 'Master Retouched Studio Portrait',
    image: '/takeout-1-001/potraites/DSC06894_1c.jpg',
  },
  {
    id: 11,
    title: 'Royal Couple Portrait',
    image: '/takeout-1-001/wedding/MY308576.jpg',
  },
  {
    id: 12,
    title: 'First Birthday Milestone Portrait',
    image: '/takeout-1-001/bday/01.jpg',
  },
  {
    id: 13,
    title: 'Maternity Grace Portrait',
    image: '/takeout-1-001/maternity/DSC05912_A.jpg',
  },
  {
    id: 14,
    title: 'Golden Hour Couple Portrait',
    image: '/takeout-1-001/prewedding/1724236212687.jpg',
  },
];

export default function HomeHero({ onOpenBooking, onOpenVideoReviews, onScrollToReviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-advance photos strictly every 3 seconds (3000ms) across laptop and desktop without slow pause
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_CYLINDER_PHOTOS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Touch and drag swipe navigation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 35) {
      // Swiped left -> next photo
      setCurrentIndex((prev) => (prev + 1) % HERO_CYLINDER_PHOTOS.length);
    } else if (distance < -35) {
      // Swiped right -> prev photo
      setCurrentIndex((prev) => (prev - 1 + HERO_CYLINDER_PHOTOS.length) % HERO_CYLINDER_PHOTOS.length);
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen h-[100dvh] max-h-screen max-h-[100dvh] flex flex-col bg-[#FAF7F2] text-charcoal overflow-hidden select-none scroll-mt-20"
    >
      {/* ─── Primary Semantic H1 for SEO ─── */}
      <h1 className="sr-only">Best Photography Studio in Nandyal, Andhra Pradesh</h1>

      {/* ─── Ambient Subtle Warm Spotlight Glow behind hero ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 58% at 50% 55%, rgba(255, 101, 72, 0.08) 0%, rgba(250, 247, 242, 0.5) 45%, #FAF7F2 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE & TABLET LAYOUT (< 768px) — COMPLETELY UNTOUCHED
          ══════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden flex-1 flex flex-col justify-between min-h-0 relative z-10 px-4 sm:px-6 pt-[78px] min-[360px]:pt-[82px] min-[390px]:pt-[86px] sm:pt-22 pb-2 sm:pb-4">

        {/* ─── Centerpiece: Mobile showcase ─── */}
        <div className="relative w-full flex-1 min-h-0 flex flex-col items-center justify-start gap-1.5 sm:gap-3 my-0 py-0">

          {/* ─── Mobile-only: Lead Photographer Badge + PHOTO GRAPHY + (- ANJI) ─── */}
          <div className="w-full flex items-center justify-center gap-2 min-[360px]:gap-2.5 min-[390px]:gap-3 px-2 py-0.5 relative z-10 shrink-0">
            {/* Mobile Lead Photographer Badge beside PHOTOGRAPHY on the left */}
            <div className="w-11 h-11 min-[360px]:w-12 min-[360px]:h-12 min-[390px]:w-13 min-[390px]:h-13 rounded-full overflow-hidden border-2 border-coral shadow-lg bg-charcoal-900 ring-2 ring-white/90 shrink-0 select-none">
              <img
                src="/photographer-badge.png"
                alt="MY3 Lead Photographer Anji"
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="eager"
                fetchPriority="high"
                draggable={false}
              />
            </div>

            {/* Headline + Poet attribution: PHOTOGRAPHY with - ANJI directly down */}
            <div className="flex flex-col items-end shrink-0">
              <div className="font-display font-black uppercase text-[6.2vw] min-[360px]:text-[6.6vw] min-[390px]:text-[7vw] leading-none tracking-tight flex items-center gap-0.5 whitespace-nowrap pointer-events-none select-none">
                <span className="text-[#1E2024]">PHOTO</span>
                <span className="text-coral">GRAPHY</span>
              </div>

              {/* Down of PHOTOGRAPHY: Poet-style author name - ANJI */}
              <p className="text-right mt-0.5 sm:mt-1 pr-0.5 font-serif italic font-semibold text-xs min-[400px]:text-[13px] text-charcoal-700 tracking-wide select-none pointer-events-none">
                - <span className="font-sans font-bold uppercase tracking-wider text-[11px] min-[400px]:text-xs text-[#1E2024]">ANJI</span>
              </p>
              <p className="text-right text-[10px] min-[360px]:text-[11px] font-semibold text-charcoal-500 mt-0.5 max-w-[210px] leading-tight select-none pointer-events-none">
                Best Photography Studio in Nandyal, Andhra Pradesh
              </p>
            </div>
          </div>

          {/* ─── Mobile Right Column: Showcase Card ─── */}
          <div
            className="w-full flex-1 min-h-0 h-[400px] min-[390px]:h-[440px] min-[420px]:h-[480px] sm:h-[500px] max-h-[58vh] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl bg-[#181A1D] border border-charcoal-200/60 cursor-pointer select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => setCurrentIndex((prev) => (prev + 1) % HERO_CYLINDER_PHOTOS.length)}
            title="Tap or swipe to advance photograph"
          >
            {(() => {
              const currentPhoto = HERO_CYLINDER_PHOTOS[currentIndex % HERO_CYLINDER_PHOTOS.length];
              return (
                <div key={currentIndex} className="w-full h-full relative group animate-fade-in">
                  <img
                    src={currentPhoto.image}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover object-[center_28%] filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              );
            })()}

            {/* Top-Right Circular Rotating "PRODUCT REVIEWS" Stamp */}
            <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-30">
              <button
                id="product-reviews-stamp"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenVideoReviews) onOpenVideoReviews();
                }}
                className="relative w-16 h-16 min-[390px]:w-18 min-[390px]:h-18 sm:w-22 sm:h-22 rounded-full bg-[#181A1D]/90 backdrop-blur-xs border-2 border-white/30 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group overflow-hidden cursor-pointer"
                aria-label="View our product reviews"
              >
                {/* Optional Looping Client Video Preview inside */}
                <video
                  src="/takeout-1-001/vedio/vedio.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  webkit-playsinline="true"
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover rounded-full opacity-35 group-hover:opacity-50 transition-opacity pointer-events-none"
                />

                {/* Rotating Curved Text */}
                <svg
                  className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none z-10"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="circlePathHero"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text fill="#FFFFFF" fontSize="9.2" fontWeight="700" letterSpacing="0.22em" className="uppercase font-bold tracking-[0.22em] fill-white drop-shadow">
                    <textPath href="#circlePathHero" xlinkHref="#circlePathHero" startOffset="0%">
                      PRODUCT REVIEWS • PRODUCT REVIEWS •
                    </textPath>
                  </text>
                </svg>

                {/* Inner Coral Play Button */}
                <div className="relative z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-coral/95 group-hover:bg-coral border border-white/40 text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                  <Play size={13} fill="white" className="text-white ml-0.5" />
                </div>
              </button>
            </div>

          </div>

        </div>

        {/* ─── Mobile Bottom Controls ─── */}
        <div className="relative z-30 w-full shrink-0 flex flex-col-reverse sm:flex-row items-center sm:items-end justify-between gap-3 sm:gap-2 pt-2 sm:pt-3">
          
          {/* Bottom-Left: Circular Camera Button + Timeline Strip */}
          <div className="flex flex-col items-center sm:items-start space-y-2 sm:space-y-2.5">
            {/* Circular Camera Button with Coral Border */}
            <div className="h-10 sm:h-11 flex items-center">
              <button
                onClick={onOpenBooking}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1E2024] hover:bg-black border border-coral text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md group cursor-pointer"
                aria-label="Book a Photography Session"
                title="Book a Session"
              >
                <Camera size={17} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Timeline & Social Links Row */}
            <div className="h-8 sm:h-9 flex items-center gap-2 sm:gap-2.5 text-xs text-charcoal-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-coral inline-block animate-pulse" />
              <button
                onClick={onScrollToReviews}
                className="text-charcoal-800 hover:text-coral font-semibold transition-colors cursor-pointer"
              >
                Timeline
              </button>
              <span className="text-charcoal-300">|</span>
              <div className="flex items-center gap-2 sm:gap-2.5 text-charcoal-600">
                <a href="https://www.instagram.com/mythri_studio_ndl" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors p-0.5" title="Instagram: @mythri_studio_ndl" aria-label="Instagram">
                  <InstagramIcon size={14} />
                </a>
                <a href="https://youtube.com/@mythristudio8857?si=5szrcmSiVDF_36an" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors p-0.5" title="YouTube Channel" aria-label="YouTube">
                  <YoutubeIcon size={14} />
                </a>
                <a href="/contact#studio-location" className="hover:text-coral transition-colors p-0.5" title="View Studio Locations & Maps" aria-label="Studio Maps">
                  <MapPin size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom-Right: Booking Lockup */}
          <div className="flex flex-col items-center sm:items-end space-y-2 sm:space-y-2.5">
            {/* Logo + Text Lockup */}
            <div className="h-10 sm:h-11 flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-xs border border-charcoal-200 bg-white shrink-0">
                <img src="/logo.png" alt="MY3 Studio Logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-black text-base sm:text-lg italic tracking-tight leading-tight">
                  <span className="text-charcoal-900">MY</span>
                  <span className="text-[#FA2D66]">3</span>{' '}
                  <span className="text-charcoal-900">Studio</span>
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-charcoal-600 tracking-tight leading-none mt-0.5">
                  Book your schedule
                </p>
              </div>
            </div>

            {/* Action Buttons: LETS TALK & WHATSAPP */}
            <div className="h-8 sm:h-9 flex items-center justify-center sm:justify-end gap-2 sm:gap-2.5">
              <a
                href="tel:+919949395037"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-charcoal-300 hover:border-coral text-charcoal-900 hover:text-coral bg-white hover:bg-coral-50 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
              >
                <Phone size={13} />
                <span>LETS TALK</span>
              </a>
              <a
                href={HERO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md shadow-emerald-500/20"
              >
                <WhatsAppIcon size={14} />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT (≥ 768px) — Full-width immersive hero
          Photographer partially cropped at left edge, showcase fills right
          ══════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-1 min-h-0 relative z-10 pt-[90px] lg:pt-[94px] xl:pt-[98px] pb-0 gap-0">

        {/* ─── Left Column: Photographer partially bleeding off the left viewport edge ─── */}
        <div className="hero-left-photographer shrink-0 relative z-10 flex flex-col h-full min-h-0">
          {/* Title block at top, perfectly proportioned across all laptops and desktops */}
          <div className="shrink-0 pl-5 lg:pl-6 xl:pl-8 2xl:pl-10 pt-1 pb-3 lg:pb-4 relative z-20">
            <div className="w-10 lg:w-11 h-[2.5px] bg-coral rounded-full mb-2" />
<<<<<<< HEAD
            <h1 className="font-display font-black text-2xl lg:text-[28px] xl:text-3xl text-[#1E2024] tracking-wider uppercase leading-none whitespace-nowrap">
              ANJI
            </h1>
            <p className="font-sans font-medium tracking-[0.22em] lg:tracking-[0.24em] xl:tracking-[0.26em] text-[11px] lg:text-xs xl:text-[13px] text-charcoal-700 uppercase mt-1 select-none whitespace-nowrap">
=======
            <div className="font-display font-black text-2xl lg:text-3xl xl:text-4xl text-[#1E2024] tracking-wider uppercase leading-none">
              ANJI
            </div>
            <p className="font-sans font-medium tracking-[0.32em] text-xs lg:text-sm text-charcoal-700 uppercase mt-1 select-none">
>>>>>>> 7f9cf71 (My changes)
              PHOTOGRAPHY
            </p>
            <p className="text-[11px] lg:text-xs font-semibold text-charcoal-500 mt-2 max-w-[200px] leading-tight select-none">
              Best Photography Studio in Nandyal, Andhra Pradesh
            </p>
          </div>

          {/* Photographer cutout — pushed to the far left, intentionally partially cropped */}
          <div className="flex-1 min-h-0 relative overflow-visible pointer-events-none">
            <img
              src="/photographer-cutout.png"
              alt="MY3 Studios Lead Photographer Anji"
              className="hero-photographer-img drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, rgba(0,0,0,0.3) 86%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 70%, rgba(0,0,0,0.3) 86%, transparent 100%)',
              }}
              draggable={false}
            />
          </div>

          {/* Camera button + Timeline pinned at bottom, aligned with title block */}
          <div className="shrink-0 pl-5 lg:pl-6 xl:pl-8 2xl:pl-10 pb-0.5 flex flex-col gap-2 relative z-20">
            <div className="h-10 lg:h-11 flex items-center">
              <button
                onClick={onOpenBooking}
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#1E2024] hover:bg-black border border-coral text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md group cursor-pointer"
                aria-label="Book a Photography Session"
                title="Book a Session"
              >
                <Camera size={17} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="h-7 lg:h-8 flex items-center gap-2 lg:gap-2.5 text-xs text-charcoal-600 font-medium whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-coral inline-block animate-pulse" />
              <button onClick={onScrollToReviews} className="text-charcoal-800 hover:text-coral font-semibold transition-colors cursor-pointer">
                Timeline
              </button>
              <span className="text-charcoal-300">|</span>
              <div className="flex items-center gap-2 lg:gap-2.5 text-charcoal-600">
                <a href="https://www.instagram.com/mythri_studio_ndl" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors p-0.5" title="Instagram" aria-label="Instagram">
                  <InstagramIcon size={14} />
                </a>
                <a href="https://youtube.com/@mythristudio8857?si=5szrcmSiVDF_36an" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors p-0.5" title="YouTube" aria-label="YouTube">
                  <YoutubeIcon size={14} />
                </a>
                <a href="/contact#studio-location" className="hover:text-coral transition-colors p-0.5" title="Studio Locations" aria-label="Studio Maps">
                  <MapPin size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Column: Showcase image + Bottom bar (fills all remaining space) ─── */}
        <div className="hero-showcase-column flex-1 min-w-0 flex flex-col h-full min-h-0 pr-0">

          {/* Showcase Card — fills all available height minus bottom bar */}
          <div
            className="flex-1 min-h-0 rounded-l-2xl lg:rounded-l-3xl xl:rounded-l-[28px] rounded-r-none overflow-hidden relative shadow-2xl bg-[#181A1D] border border-charcoal-200/60 border-r-0 cursor-pointer select-none"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % HERO_CYLINDER_PHOTOS.length)}
            title="Click to advance photograph"
          >
            {(() => {
              const currentPhoto = HERO_CYLINDER_PHOTOS[currentIndex % HERO_CYLINDER_PHOTOS.length];
              return (
                <div key={currentIndex} className="w-full h-full relative group animate-fade-in">
                  <img
                    src={currentPhoto.image}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover object-[center_28%] filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              );
            })()}

            {/* Advance photograph hint badge */}
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-xs text-white/85 text-[11px] font-medium tracking-wide">
                Tap or swipe to advance photograph
              </span>
            </div>

            {/* Top-Right Circular Rotating "PRODUCT REVIEWS" Stamp */}
            <div className="absolute top-3 right-3 lg:top-4 lg:right-4 z-30">
              <button
                id="product-reviews-stamp-desktop"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenVideoReviews) onOpenVideoReviews();
                }}
                className="relative w-20 h-20 lg:w-24 lg:h-24 xl:w-26 xl:h-26 rounded-full bg-[#181A1D]/90 backdrop-blur-xs border-2 border-white/30 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group overflow-hidden cursor-pointer"
                aria-label="View our product reviews"
              >
                <video
                  src="/takeout-1-001/vedio/vedio.mp4"
                  autoPlay loop muted playsInline
                  webkit-playsinline="true"
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover rounded-full opacity-35 group-hover:opacity-50 transition-opacity pointer-events-none"
                />
                <svg className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none z-10" viewBox="0 0 100 100">
                  <defs>
                    <path id="circlePathHeroDesktop" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text fill="#FFFFFF" fontSize="9.2" fontWeight="700" letterSpacing="0.22em" className="uppercase font-bold tracking-[0.22em] fill-white drop-shadow">
                    <textPath href="#circlePathHeroDesktop" xlinkHref="#circlePathHeroDesktop" startOffset="0%">
                      PRODUCT REVIEWS • PRODUCT REVIEWS •
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-20 w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-coral/95 group-hover:bg-coral border border-white/40 text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                  <Play size={13} fill="white" className="text-white ml-0.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Bar: MY3 Studio / Lets Talk / WhatsApp */}
          <div className="shrink-0 pt-2.5 lg:pt-3 pb-2.5 lg:pb-3 pr-4 lg:pr-8 xl:pr-10 flex items-center justify-end">
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Logo + Text Lockup */}
              <div className="flex items-center gap-2.5 lg:gap-3">
                <div className="w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-full overflow-hidden shadow-xs border border-charcoal-200 bg-white shrink-0">
                  <img src="/logo.png" alt="MY3 Studio Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-black text-base lg:text-lg xl:text-xl italic tracking-tight leading-tight">
                    <span className="text-charcoal-900">MY</span>
                    <span className="text-[#FA2D66]">3</span>{' '}
                    <span className="text-charcoal-900">Studio</span>
                  </h3>
                  <p className="text-[11px] lg:text-xs font-semibold text-charcoal-600 tracking-tight leading-none mt-0.5">
                    Book your schedule
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 lg:gap-2.5">
                <a
                  href="tel:+919949395037"
                  className="inline-flex items-center gap-1.5 px-3.5 lg:px-4 py-1.5 lg:py-2 rounded-full border border-charcoal-300 hover:border-coral text-charcoal-900 hover:text-coral bg-white hover:bg-coral-50 font-bold text-[11px] lg:text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <Phone size={13} />
                  <span>LETS TALK</span>
                </a>
                <a
                  href={HERO_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 lg:px-4 py-1.5 lg:py-2 rounded-full bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-[11px] lg:text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md shadow-emerald-500/20"
                >
                  <WhatsAppIcon size={14} />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

