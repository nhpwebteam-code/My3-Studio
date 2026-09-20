import React from 'react';
import { ArrowUpRight, Play, Camera } from 'lucide-react';

export default function HomeHero({ onOpenBooking, onOpenVideoReviews, onScrollToReviews }) {
  return (
    <section id="home" className="relative w-full min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden select-none scroll-mt-24">
      
      {/* 1. Giant Headline Across Screen: PHOTO in Charcoal, GRAPHY in Coral */}
      <div className="w-full text-center relative z-10 pointer-events-none mb-[-20px] sm:mb-[-35px] md:mb-[-55px]">
        <h1 className="font-display font-black tracking-[-0.03em] uppercase text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[140px] xl:text-[160px] leading-[0.88] flex items-center justify-center gap-1 sm:gap-3">
          <span className="text-[#1E2024]">PHOTO</span>
          <span className="text-coral">GRAPHY</span>
        </h1>
      </div>

      {/* 2. Centerpiece & Floating Badges Container */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center my-2 sm:my-4">
        
        {/* Top-Left Floating Badge: "20k+" tilted */}
        <div className="absolute top-2 sm:top-6 left-2 sm:left-6 md:left-12 lg:left-20 z-20 -rotate-6 transform hover:rotate-0 transition-transform duration-300">
          <div className="flex flex-col">
            <span className="text-4xl sm:text-5xl md:text-6xl font-black text-coral font-display leading-none tracking-tight">
              20k+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-charcoal-500 max-w-[130px] sm:max-w-[150px] leading-tight mt-1">
              Customer all over in the world
            </span>
          </div>
        </div>

        {/* Central Backgroundless Cutout Photographer (No background, pure cutout) */}
        <div className="relative z-10 w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] xl:max-w-[680px] mx-auto flex justify-center">
          <img
            src="/photographer-bw.png"
            alt="MY3 Studio Master Photographer"
            className="w-full max-h-[540px] sm:max-h-[600px] md:max-h-[680px] object-contain filter contrast-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] pointer-events-none"
          />
        </div>

        {/* Top-Right Circular Rotating Stamp: "view our product reviews" with Play button */}
        <div className="absolute top-4 sm:top-10 right-2 sm:right-8 md:right-16 lg:right-24 z-20">
          <button
            id="product-reviews-stamp"
            onClick={onOpenVideoReviews}
            className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#1F2125] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group"
            aria-label="View our product reviews"
          >
            {/* Rotating SVG Curved Text */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none"
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-sm group-hover:bg-coral text-white flex items-center justify-center transition-colors shadow-inner">
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
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Client Reviewer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Client Reviewer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
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

        {/* Bottom-Right Block: Cursive "Jackson", "Book your schedule", Outline Pill "Lets Talk" */}
        <div className="flex flex-col md:items-end space-y-3">
          {/* Cursive Signature: MY3 Studio */}
          <div className="md:text-right">
            <span className="font-script text-5xl sm:text-6xl md:text-7xl text-coral block -mb-2 sm:-mb-3 select-none leading-none">
              MY3 Studio
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E2024] font-display tracking-tight leading-tight">
              Book your schedule
            </h2>
          </div>

          {/* Outline Pill Button: "Lets Talk" */}
          <div className="pt-2">
            <button
              id="hero-lets-talk-btn"
              onClick={onOpenBooking}
              className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-full border-2 border-charcoal-900 hover:bg-charcoal-900 hover:text-white text-charcoal-900 text-xs sm:text-sm font-bold tracking-wide uppercase transition-all shadow-sm active:scale-95"
            >
              Lets Talk
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom-Left Camera Badge */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-30">
        <button
          onClick={onOpenBooking}
          className="w-14 h-14 rounded-full bg-[#2A2B30] hover:bg-black text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group"
          aria-label="Quick Camera Booking"
        >
          <Camera size={22} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

    </section>
  );
}
