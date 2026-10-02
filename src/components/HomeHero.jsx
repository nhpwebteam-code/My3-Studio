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
      className="relative w-full min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14 bg-[#FAF7F2] text-charcoal overflow-hidden select-none scroll-mt-24"
    >
      {/* ─── Ambient Subtle Warm Spotlight Glow behind center photographer ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 58% at 50% 55%, rgba(255, 101, 72, 0.08) 0%, rgba(250, 247, 242, 0.5) 45%, #FAF7F2 100%)',
        }}
      />

      {/* ─── 1. Giant Headline: "PHOTO" in Charcoal, "GRAPHY" in Coral ─── */}
      <div className="w-full text-center relative z-10 mb-1 sm:mb-2 md:mb-3 overflow-visible px-1 sm:px-0 flex items-center justify-center">
        {/* Mobile-only Lead Photographer Badge beside PHOTOGRAPHY on the left (Red-circled area) */}
        <div className="md:hidden absolute -left-2 min-[380px]:-left-1 sm:left-1 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <div className="w-14 h-14 min-[360px]:w-16 min-[360px]:h-16 min-[400px]:w-18 min-[400px]:h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-coral shadow-xl bg-charcoal-900 ring-2 ring-white/80">
            <img
              src="/photographer-badge.png"
              alt="MY3 Lead Photographer Anji"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="font-display font-black uppercase text-[7.8vw] min-[360px]:text-[8.2vw] min-[400px]:text-[8.5vw] sm:text-[10vw] md:text-[9vw] lg:text-[112px] xl:text-[132px] leading-none tracking-tight sm:tracking-[-0.02em] flex items-center justify-center gap-1 sm:gap-3 whitespace-nowrap pointer-events-none pl-12 min-[360px]:pl-14 min-[400px]:pl-16 md:pl-0">
          <span className="text-[#1E2024]">PHOTO</span>
          <span className="text-coral">GRAPHY</span>
        </h1>
      </div>

      {/* ─── 2. Centerpiece: Mobile has full-width photo; Laptop/Desktop has side-by-side layout with prominent photographer ─── */}
      <div className="relative w-full max-w-[1600px] mx-auto flex-1 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between md:gap-0 my-auto pt-2 pb-1 sm:py-2 md:overflow-hidden">

        {/* ─── Master Photographer (Anji) — Hidden on mobile (green circle removed); On laptop/desktop: big and prominent (untouched) ─── */}
        <div className="hidden md:flex md:relative bottom-0 md:bottom-auto left-0 md:left-auto z-20 pointer-events-none items-end justify-start shrink-0 w-auto md:w-auto md:max-w-[340px] lg:max-w-[420px] xl:max-w-[480px] md:h-[550px] lg:h-[620px] xl:h-[680px] md:overflow-visible md:-ml-6 lg:-ml-10 xl:-ml-12">
          <img
            src="/photographer-cutout.png"
            alt="MY3 Studios Lead Photographer Anji"
            className="w-auto md:max-w-none md:w-auto md:h-full md:max-h-none object-contain md:object-bottom drop-shadow-[0_18px_32px_rgba(0,0,0,0.22)]"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 82%, rgba(0,0,0,0.3) 96%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 82%, rgba(0,0,0,0.3) 96%, transparent 100%)',
            }}
          />
        </div>

        {/* ─── Single-Image Showcase — Covers TOTAL width on mobile; on laptop/desktop fills ALL remaining space edge-to-edge, no white gaps, no border radius on right edge ─── */}
        <div
          className="w-full md:flex-1 h-[390px] min-[390px]:h-[440px] sm:h-[470px] md:h-[550px] lg:h-[620px] xl:h-[680px] rounded-2xl sm:rounded-3xl md:rounded-l-[32px] md:rounded-r-none overflow-hidden relative shadow-2xl bg-[#181A1D] md:border-r-0 border border-charcoal-800 cursor-pointer select-none md:-mr-8 lg:-mr-14"
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
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            );
          })()}
        </div>

        {/* Top-Right Circular Rotating "PRODUCT REVIEWS" Stamp */}
        <div className="absolute top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-8 z-30">
          <button
            id="product-reviews-stamp"
            onClick={onOpenVideoReviews}
            className="relative w-18 h-18 min-[390px]:w-20 min-[390px]:h-20 sm:w-26 sm:h-26 md:w-30 md:h-30 lg:w-32 lg:h-32 rounded-full bg-[#1F2125] border border-white/20 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group overflow-hidden cursor-pointer"
            aria-label="View our product reviews"
          >
            {/* Optional Looping Client Video Preview inside */}
            <video
              src="/takeout-1-001/vedio/vedio.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover rounded-full opacity-25 group-hover:opacity-40 transition-opacity"
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
              <text className="text-[9.2px] uppercase font-bold tracking-[0.24em] fill-white">
                <textPath xlinkHref="#circlePathHero" startOffset="0%">
                  PRODUCT REVIEWS • PRODUCT REVIEWS •
                </textPath>
              </text>
            </svg>

            {/* Inner Coral Play Button */}
            <div className="relative z-20 w-8 h-8 min-[390px]:w-9 min-[390px]:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-coral border border-white/30 text-white flex items-center justify-center transition-colors shadow-inner">
              <Play size={15} fill="white" className="text-white ml-0.5" />
            </div>
          </button>
        </div>

      </div>

      {/* ─── 3. Bottom Layered Interactive Controls ─── */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col-reverse sm:flex-row items-center sm:items-end justify-between gap-5 sm:gap-2 pt-4 sm:pt-2">
        
        {/* Bottom-Left: Circular Camera Button + Timeline Strip */}
        <div className="flex flex-col items-center sm:items-start space-y-2.5 sm:space-y-3">
          {/* Circular Camera Button with Coral Border */}
          <button
            onClick={onOpenBooking}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1E2024] hover:bg-black border border-coral text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg group cursor-pointer"
            aria-label="Book a Photography Session"
            title="Book a Session"
          >
            <Camera size={18} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Timeline & Social Links Row */}
          <div className="flex items-center gap-2.5 text-xs text-charcoal-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-coral inline-block animate-pulse" />
            <button
              onClick={onScrollToReviews}
              className="text-charcoal-700 hover:text-coral transition-colors cursor-pointer"
            >
              Timeline
            </button>
            <span className="text-charcoal-300">|</span>
            <div className="flex items-center gap-2.5 text-charcoal-600">
              <a
                href="https://www.instagram.com/mythri_studio_ndl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-coral transition-colors"
                title="Instagram: @mythri_studio_ndl"
                aria-label="Instagram"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href="https://youtube.com/@mythristudio8857?si=5szrcmSiVDF_36an"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-coral transition-colors"
                title="YouTube Channel"
                aria-label="YouTube"
              >
                <YoutubeIcon size={14} />
              </a>
              <a
                href="/contact#studio-location"
                className="hover:text-coral transition-colors"
                title="View Studio Locations & Maps"
                aria-label="Studio Maps"
              >
                <MapPin size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom-Right: Booking Lockup (Centered on mobile, right-aligned on desktop) */}
        <div className="flex flex-col items-center sm:items-end">
          {/* Logo + Text Lockup */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Circular Logo */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden shadow-md border-2 border-charcoal-200 bg-white shrink-0">
              <img
                src="/logo.png"
                alt="MY3 Studio Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="text-left">
              <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl italic tracking-tight leading-tight">
                <span className="text-charcoal-900">MY</span>
                <span className="text-[#FA2D66]">3</span>{' '}
                <span className="text-charcoal-900">Studio</span>
              </h3>
              <p className="text-xs sm:text-sm font-bold text-charcoal-600 tracking-tight leading-tight mt-0.5">
                Book your schedule
              </p>
            </div>
          </div>

          {/* Action Buttons: LETS TALK & WHATSAPP */}
          <div className="flex items-center justify-center sm:justify-end gap-2.5 sm:gap-2.5 mt-2.5 sm:mt-3">
            {/* Lets Talk Button */}
            <a
              href="tel:+919949395037"
              className="inline-flex items-center gap-1.5 px-4 sm:px-4 py-2 rounded-full border border-charcoal-300 hover:border-coral text-charcoal-800 hover:text-coral bg-white hover:bg-coral-50 font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-xs"
            >
              <Phone size={13} />
              <span>LETS TALK</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={HERO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md"
            >
              <WhatsAppIcon size={14} />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
