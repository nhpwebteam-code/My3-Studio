import React from 'react';
import { Play, Camera, MapPin } from 'lucide-react';

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

export default function HomeHero({ onOpenBooking, onOpenVideoReviews, onScrollToReviews }) {
  return (
    <section
      id="home"
      className="relative w-full min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14 bg-[#000000] text-white overflow-hidden select-none scroll-mt-24"
    >
      {/* ─── Ambient Warm Golden Spotlight Glow behind center photographer (Matching Reference) ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 58% at 50% 55%, rgba(229, 154, 61, 0.22) 0%, rgba(35, 22, 10, 0.45) 42%, rgba(0, 0, 0, 0.9) 70%, #000000 100%)',
        }}
      />

      {/* ─── 1. Giant Headline: "PHOTO" in White, "GRAPHY" in Golden Amber ─── */}
      <div className="w-full text-center relative z-10 pointer-events-none mb-[-12px] sm:mb-[-35px] md:mb-[-55px] overflow-visible px-1 sm:px-0">
        <h1 className="font-display font-black uppercase text-[8.8vw] min-[360px]:text-[9.4vw] min-[400px]:text-[10vw] sm:text-[13vw] md:text-[13.5vw] lg:text-[142px] xl:text-[162px] leading-[1.02] sm:leading-[0.88] tracking-tight sm:tracking-[-0.03em] flex items-center justify-center gap-1 sm:gap-3 whitespace-nowrap">
          <span className="text-white">PHOTO</span>
          <span className="text-[#E59A3D]">GRAPHY</span>
        </h1>
      </div>

      {/* ─── 2. Centerpiece: Left "1000+", Center Photographer, Right Rotating Badge ─── */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center my-1 sm:my-3">
        
        {/* Top-Left Floating Badge: "1000+" & Vertical Gold Bar (Exact Reference Match) */}
        <div className="absolute top-2 sm:top-4 md:top-6 lg:top-8 left-4 sm:left-8 md:left-14 lg:left-20 xl:left-28 z-20 pointer-events-auto">
          <div className="flex flex-col items-start">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-sans font-extrabold text-[#E59A3D] leading-none tracking-tight flex items-baseline select-none">
              <span>1000</span>
              <span className="text-[0.82em] font-bold ml-0.5 text-[#E59A3D]">+</span>
            </div>
            <div className="flex items-stretch gap-2.5 sm:gap-3 mt-2 sm:mt-2.5">
              {/* Vertical Gold Divider Bar - Exactly matches the 2-line text height */}
              <div className="w-[2px] bg-[#E59A3D] rounded-full shrink-0" />
              <div className="flex flex-col justify-center leading-snug">
                <span className="text-xs sm:text-[13px] md:text-sm font-bold text-white tracking-wide">
                  Weddings &amp; Events
                </span>
                <span className="text-[11px] sm:text-xs text-gray-300 font-medium tracking-normal mt-0.5">
                  Across South India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Central Cutout Master Photographer smoothly masked at bottom */}
        <div className="relative z-10 w-full max-w-[280px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[590px] xl:max-w-[650px] mx-auto flex justify-center">
          <img
            src="/photographer-bw.png"
            alt="MY3 Studios Master Photographer"
            className="w-full max-h-[460px] sm:max-h-[590px] md:max-h-[660px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] pointer-events-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
            }}
          />
        </div>

        {/* Top-Right Circular Rotating "PRODUCT REVIEWS" Stamp (Exact Reference Match) */}
        <div className="absolute top-2 sm:top-4 md:top-6 lg:top-8 right-4 sm:right-8 md:right-14 lg:right-20 xl:right-28 z-20">
          <button
            id="product-reviews-stamp"
            onClick={onOpenVideoReviews}
            className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-black/90 border border-white/20 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group overflow-hidden cursor-pointer"
            aria-label="View our product reviews"
          >
            {/* Optional Looping Client Video Preview inside */}
            <video
              src="/takeout-1-001/vedio/vedio.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
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

            {/* Inner Gold Play Button */}
            <div className="relative z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 border border-[#E59A3D]/40 text-[#E59A3D] flex items-center justify-center transition-colors shadow-inner group-hover:border-[#E59A3D]">
              <Play size={17} fill="#E59A3D" className="text-[#E59A3D] ml-0.5" />
            </div>
          </button>
        </div>
      </div>

      {/* ─── 3. Bottom Layered Interactive Controls (Exact Reference Match) ─── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-end justify-between pt-2">
        
        {/* Bottom-Left: Circular Camera Button + Timeline Strip */}
        <div className="flex flex-col space-y-3">
          {/* Circular Camera Button with Gold Border */}
          <button
            onClick={onOpenBooking}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black border border-[#E59A3D] hover:bg-[#E59A3D] text-white hover:text-black flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg group cursor-pointer"
            aria-label="Book a Photography Session"
            title="Book a Session"
          >
            <Camera size={19} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Timeline & Social Links Row */}
          <div className="flex items-center gap-2.5 text-xs text-gray-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#E59A3D] inline-block animate-pulse" />
            <button
              onClick={onScrollToReviews}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Timeline
            </button>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2 text-gray-400">
              <a
                href="https://www.instagram.com/mythri_studio_ndl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E59A3D] transition-colors"
                title="Instagram: @mythri_studio_ndl"
                aria-label="Instagram"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href="https://youtube.com/@mythristudio8857?si=5szrcmSiVDF_36an"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E59A3D] transition-colors"
                title="YouTube Channel"
                aria-label="YouTube"
              >
                <YoutubeIcon size={14} />
              </a>
              <a
                href="/contact#studio-location"
                className="hover:text-[#E59A3D] transition-colors"
                title="View Studio Locations & Maps"
                aria-label="Studio Maps"
              >
                <MapPin size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom-Right: Circular WhatsApp Quick Contact Button (Gold Border & Gold Icon) */}
        <div>
          <a
            href={HERO_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black border border-[#E59A3D] hover:bg-[#E59A3D] text-[#E59A3D] hover:text-black flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg group cursor-pointer"
            aria-label="Direct WhatsApp Chat with MY3 Studios"
            title="Chat with Anji on WhatsApp (+91 99493 95037)"
          >
            <WhatsAppIcon size={20} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
