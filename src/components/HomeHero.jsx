import React from 'react';
import { ArrowUpRight, Play, Camera } from 'lucide-react';

function WhatsAppIcon({ size = 18, className = "" }) {
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

const HERO_WHATSAPP_MSG = encodeURIComponent(
  "Hello Anji garu (MY3 Studios)! I am visiting your website and would like to inquire about photoshoot availability and packages for my upcoming event. Could you please share more details?"
);
const HERO_WHATSAPP_URL = `https://wa.me/919949395037?text=${HERO_WHATSAPP_MSG}`;

export default function HomeHero({ onOpenBooking, onOpenVideoReviews, onScrollToReviews }) {
  return (
    <section id="home" className="relative w-full min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-12 bg-[#FAF7F2] overflow-hidden select-none scroll-mt-24">
      
      {/* 1. Giant Headline Across Screen: PHOTO in Charcoal, GRAPHY in Coral */}
      <div className="w-full text-center relative z-10 pointer-events-none mb-[-8px] sm:mb-[-35px] md:mb-[-55px] overflow-visible px-1 sm:px-0">
        <h1 className="font-display font-black uppercase text-[8.6vw] min-[360px]:text-[9.2vw] min-[400px]:text-[9.8vw] sm:text-[13vw] md:text-[13vw] lg:text-[140px] xl:text-[160px] leading-[1.05] sm:leading-[0.88] tracking-tight sm:tracking-[-0.03em] flex items-center justify-center gap-0.5 sm:gap-2 lg:gap-3 whitespace-nowrap">
          <span className="text-[#1E2024]">PHOTO</span>
          <span className="text-coral">GRAPHY</span>
        </h1>
      </div>

      {/* 2. Centerpiece & Floating Badges Container */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center my-2 sm:my-4">
        
        {/* Top-Left Floating Badge: "600+" tilted */}
        <div className="absolute top-1 sm:top-6 left-1 sm:left-6 md:left-12 lg:left-20 z-20 -rotate-6 transform hover:rotate-0 transition-transform duration-300 pointer-events-none sm:pointer-events-auto">
          <div className="flex flex-col">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black text-coral font-display leading-none tracking-tight">
              600+
            </span>
            <span className="text-[11px] sm:text-sm font-semibold text-charcoal-500 max-w-[105px] sm:max-w-[150px] leading-tight mt-0.5 sm:mt-1">
              Weddings & Events Across South India
            </span>
          </div>
        </div>

        {/* Central Backgroundless Cutout Photographer — smoothly masked at bottom so it blends seamlessly */}
        <div className="relative z-10 w-full max-w-[280px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] mx-auto flex justify-center">
          <img
            src="/photographer-bw.png"
            alt="MY3 Studios Master Photographer"
            className="w-full max-h-[440px] sm:max-h-[580px] md:max-h-[640px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)] pointer-events-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, rgba(0,0,0,0.5) 92%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 80%, rgba(0,0,0,0.5) 92%, transparent 100%)',
            }}
          />
        </div>

        {/* Top-Right Circular Rotating Stamp: "view our product reviews" with Play button */}
        <div className="absolute top-2 sm:top-10 right-1 sm:right-8 md:right-16 lg:right-24 z-20">
          <button
            id="product-reviews-stamp"
            onClick={onOpenVideoReviews}
            className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#1F2125] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group overflow-hidden"
            aria-label="View our product reviews"
          >
            {/* Looping Client Video Preview */}
            <video
              src="/takeout-1-001/vedio/vedio.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover rounded-full opacity-35 group-hover:opacity-60 transition-opacity"
            />

            {/* Rotating SVG Curved Text */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none z-10"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[9.2px] uppercase font-bold tracking-[0.22em] fill-white">
                <textPath xlinkHref="#circlePath" startOffset="0%">
                  view our product reviews • view our product reviews •
                </textPath>
              </text>
            </svg>

            {/* Inner Video Preview & Play Icon */}
            <div className="relative z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-coral text-white flex items-center justify-center transition-colors shadow-inner">
              <Play size={16} fill="white" className="ml-0.5" />
            </div>
          </button>
        </div>
      </div>

      {/* 3. Bottom Layered Interactive Controls */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-6 pt-4">
        
        {/* Bottom-Left Block: 4.9/5 Rating, Overlapping Avatars, Copy, and Coral "Click Here" */}
        <div className="max-w-md space-y-4">
          <div className="flex items-center space-x-4">
            {/* Rating Number */}
            <div className="flex items-baseline">
              <span className="text-4xl sm:text-5xl font-black text-[#1E2024] font-display tracking-tight">
                4.9
              </span>
              <span className="text-xl sm:text-2xl font-light text-charcoal-400 ml-0.5">
                /5
              </span>
            </div>

            {/* Overlapping Customer Avatars */}
            <div className="flex -space-x-3 items-center pl-1">
              <img
                src="/takeout-1-001/potraites/2.png"
                alt="Client Reviewer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <img
                src="/takeout-1-001/wedding/6.png"
                alt="Client Reviewer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <img
                src="/takeout-1-001/potraites/7.png"
                alt="Client Reviewer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm"
              />
            </div>
          </div>

          {/* Descriptive text */}
          <p className="text-xs sm:text-sm text-charcoal-500 font-medium leading-relaxed max-w-[340px]">
            Here are important comments of all our customers who have availed services from us.
          </p>

          {/* Action Button: Coral Pill "Click Here" + Circular Arrow Button */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              id="hero-click-here-btn"
              onClick={onScrollToReviews}
              className="px-8 sm:px-9 py-3 rounded-full bg-coral hover:bg-coral-dark text-white text-xs sm:text-sm font-bold tracking-wide uppercase transition-all shadow-md shadow-coral/30 active:scale-95"
            >
              Click Here
            </button>

            <button
              onClick={onScrollToReviews}
              className="w-11 h-11 rounded-full border border-gray-300 hover:border-coral hover:text-coral text-charcoal-800 flex items-center justify-center transition-all group"
              aria-label="View Customer Reviews"
            >
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom-Right Block: Emblem, Cursive "MY3 Studios", "Book your schedule", Outline Pill "Lets Talk" */}
        <div className="flex flex-col md:items-end space-y-3">
          {/* Cursive Signature: MY3 Studios */}
          <div className="flex items-center md:justify-end gap-3.5">
            <img
              src="/logo.png"
              alt="MY3 Studios Emblem"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain filter drop-shadow-md hover:rotate-6 transition-transform"
            />
            <div className="md:text-right">
              <span className="font-script text-5xl sm:text-6xl md:text-7xl text-coral block -mb-2 sm:-mb-3 select-none leading-none">
                MY3 Studios
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E2024] font-display tracking-tight leading-tight">
                Book your schedule
              </h2>
            </div>
          </div>

          {/* Action Buttons: "Lets Talk" + "Chat on WhatsApp" */}
          <div className="pt-2 flex items-center flex-wrap gap-2.5 sm:gap-3">
            <button
              id="hero-lets-talk-btn"
              onClick={onOpenBooking}
              className="px-7 sm:px-9 py-2.5 sm:py-3 rounded-full border-2 border-charcoal-900 hover:bg-charcoal-900 hover:text-white text-charcoal-900 text-xs sm:text-sm font-bold tracking-wide uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Lets Talk
            </button>

            <a
              id="hero-whatsapp-btn"
              href={HERO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold tracking-wide uppercase transition-all shadow-md shadow-[#25D366]/30 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Direct WhatsApp message to MY3 Studios"
              title="Chat with Anji on WhatsApp"
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Bottom-Left Camera Badge */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-30">
        <button
          onClick={onOpenBooking}
          className="w-14 h-14 rounded-full bg-[#2A2B30] hover:bg-black text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group cursor-pointer"
          aria-label="Quick Camera Booking"
        >
          <Camera size={22} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Floating Bottom-Right WhatsApp Quick Contact (Always Accessible in Home Section) */}
      <div className="fixed bottom-6 right-6 z-30">
        <a
          href={HERO_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group border-2 border-white cursor-pointer"
          aria-label="Chat with Anji on WhatsApp"
          title="Direct WhatsApp with MY3 Studios (+91 99493 95037)"
        >
          <WhatsAppIcon size={26} />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
          </span>
        </a>
      </div>

    </section>
  );
}
