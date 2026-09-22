import React, { useState, useEffect } from 'react';

/**
 * IntroLoader — Precise recreation of the reference video intro animation:
 * 
 * 1. 0.0s – 0.7s: Faint technical guides, dashed alignment circle, corner crosshairs,
 *    and vector anchor nodes appear with "Circle" and "Path" callout badges.
 * 2. 0.6s – 1.4s: High-precision stroke path draws itself in with SVG stroke-dashoffset.
 * 3. 1.3s – 1.9s: Guides fade away; solid brand logo fills in with soft ambient glow.
 * 4. 1.8s – 2.4s: Title ("MY3 STUDIO") and tagline ("Capture • Create • Inspire") slide up and fade in.
 * 5. 2.4s – 3.0s: Smooth scale-down & lift toward header, loader fades out to reveal website.
 */
export default function IntroLoader({ onComplete }) {
  // Animation stage: 0 = guides, 1 = stroke draw, 2 = fill/logo, 3 = text, 4 = exit
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Stage 1: Stroke begins drawing
    const t1 = setTimeout(() => setStage(1), 350);

    // Stage 2: Stroke finishes, logo fills & glows
    const t2 = setTimeout(() => setStage(2), 1250);

    // Stage 3: Title and tagline appear
    const t3 = setTimeout(() => setStage(3), 1800);

    // Stage 4: Settle & exit transition toward navbar
    const t4 = setTimeout(() => setStage(4), 2450);

    // Stage 5: Unmount loader
    const t5 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage(4);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 250);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0C0D11] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        stage === 4 ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{ isolation: 'isolate' }}
    >
      {/* ─── Subtle Tech Grid Background ─── */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loader-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loader-grid)" />
        </svg>
      </div>

      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="text-[11px] font-mono tracking-wider text-gray-500 hover:text-white px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
        >
          Skip &rarr;
        </button>
      </div>

      {/* ─── Main Animated Logo Canvas Stage ─── */}
      <div
        className={`relative flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          stage === 4
            ? '-translate-y-16 scale-90'
            : stage >= 2
            ? 'translate-y-0 scale-100'
            : 'scale-95'
        }`}
      >
        {/* Soft Ambient Radial Glow Behind Logo */}
        <div
          className={`absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full transition-all duration-1000 pointer-events-none ${
            stage >= 2
              ? 'opacity-60 bg-radial from-[#FFCE26]/25 via-[#E54F33]/20 to-transparent blur-3xl scale-110'
              : 'opacity-0 scale-50'
          }`}
        />

        {/* ─── Center Box with Construction Guides & Vector Drawing ─── */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
          
          {/* 1. Technical Guide Lines & Circle (Active in Stages 0 & 1, Fading out in Stage 2) */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
              stage <= 1 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <svg className="w-full h-full overflow-visible" viewBox="0 0 240 240">
              {/* Center Crosshair Axes */}
              <line x1="20" y1="120" x2="220" y2="120" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="120" y1="20" x2="120" y2="220" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" strokeDasharray="3 3" />

              {/* 45-degree Angle Construction Guides */}
              <line x1="45" y1="45" x2="195" y2="195" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
              <line x1="195" y1="45" x2="45" y2="195" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />

              {/* Blueprint Dashed Construction Circle */}
              <circle
                cx="120"
                cy="120"
                r="88"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Precise Hairline Crosshair Ticks at 12, 3, 6, 9 o'clock */}
              <line x1="120" y1="24" x2="120" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="120" y1="200" x2="120" y2="216" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="24" y1="120" x2="40" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="200" y1="120" x2="216" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

              {/* Vector Anchor Point Nodes (Hollow circles with center pin, exactly like reference video!) */}
              <circle cx="120" cy="32" r="3.5" fill="#0C0D11" stroke="#FFFFFF" strokeWidth="1.25" />
              <circle cx="208" cy="120" r="3.5" fill="#0C0D11" stroke="#FFFFFF" strokeWidth="1.25" />
              <circle cx="120" cy="208" r="3.5" fill="#0C0D11" stroke="#FFFFFF" strokeWidth="1.25" />
              <circle cx="32" cy="120" r="3.5" fill="#0C0D11" stroke="#FFFFFF" strokeWidth="1.25" />
            </svg>

            {/* "Circle" Callout Tag with Hairline (Top-Left, matching reference video 00:01) */}
            <div className="absolute top-3 -left-4 sm:-left-8 flex items-center gap-1.5 animate-fade-in">
              <span className="px-2 py-0.5 rounded-sm bg-white/10 border border-white/15 text-[10px] font-mono text-white/90 tracking-wide">
                Circle
              </span>
              <div className="w-6 h-[1px] bg-white/30" />
            </div>

            {/* "Path" Callout Tag with Hairline (Bottom-Right, matching reference video 00:01) */}
            <div className="absolute bottom-4 -right-4 sm:-right-8 flex items-center gap-1.5 animate-fade-in">
              <div className="w-6 h-[1px] bg-white/30" />
              <span className="px-2 py-0.5 rounded-sm bg-white/10 border border-white/15 text-[10px] font-mono text-white/90 tracking-wide">
                Path
              </span>
            </div>
          </div>

          {/* 2. SVG Stroke Path Live Drawing Animation (Stage 1) */}
          <svg
            className={`absolute inset-0 w-full h-full overflow-visible transition-opacity duration-500 ${
              stage <= 1 ? 'opacity-100' : 'opacity-0'
            }`}
            viewBox="0 0 240 240"
          >
            {/* Outer Ring Stroke Drawing */}
            <circle
              cx="120"
              cy="120"
              r="84"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeDasharray="528"
              strokeDashoffset={stage === 0 ? '528' : '0'}
              strokeLinecap="round"
              className="transition-all duration-[900ms] ease-out"
            />

            {/* Inner Concentric Rim */}
            <circle
              cx="120"
              cy="120"
              r="76"
              fill="none"
              stroke="#FFCE26"
              strokeWidth="1.5"
              strokeDasharray="478"
              strokeDashoffset={stage === 0 ? '478' : '0'}
              className="transition-all duration-[800ms] delay-100 ease-out"
            />

            {/* Stylized Filmstrip Ribbon Curve */}
            <path
              d="M 55 90 C 75 55, 145 50, 185 85"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset={stage === 0 ? '200' : '0'}
              className="transition-all duration-[750ms] delay-150 ease-out"
            />

            {/* Stylized "my" Curve Contour */}
            <path
              d="M 65 140 L 65 110 C 72 110, 80 105, 88 112 C 96 105, 108 110, 110 140"
              fill="none"
              stroke="#FFCE26"
              strokeWidth="2.5"
              strokeDasharray="140"
              strokeDashoffset={stage === 0 ? '140' : '0'}
              strokeLinecap="round"
              className="transition-all duration-[800ms] delay-200 ease-out"
            />

            {/* Stylized "3" & Camera Aperture Contour */}
            <path
              d="M 120 100 L 170 100 L 142 122 C 160 122, 172 134, 170 152 C 166 172, 142 174, 122 168"
              fill="none"
              stroke="#E54F33"
              strokeWidth="3"
              strokeDasharray="220"
              strokeDashoffset={stage === 0 ? '220' : '0'}
              strokeLinecap="round"
              className="transition-all duration-[850ms] delay-250 ease-out"
            />

            {/* Camera Shutter Iris Ring */}
            <circle
              cx="148"
              cy="150"
              r="16"
              fill="none"
              stroke="#FFCE26"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={stage === 0 ? '100' : '0'}
              className="transition-all duration-[600ms] delay-300 ease-out"
            />
          </svg>

          {/* 3. Solid Brand Logo (Cross-fades in Stage 2 with rich glow) */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              stage >= 2
                ? 'opacity-100 scale-100 filter drop-shadow-[0_10px_35px_rgba(255,206,38,0.35)]'
                : 'opacity-0 scale-90'
            }`}
          >
            <img
              src="/logo.png"
              alt="MY3 Studios Official Emblem"
              className="w-44 h-44 sm:w-52 sm:h-52 object-contain"
            />
          </div>
        </div>

        {/* ─── Typography: Site Name + Tagline (Matching Reference Video 00:03) ─── */}
        <div
          className={`text-center mt-5 transition-all duration-700 ease-out ${
            stage >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Main Title: Bold Sans-Serif (Matching "DailyFlutterUI" in Reference Video) */}
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
            MY3 Studios
          </h1>

          {/* Tagline: Light-gray under title (Matching "A daily dose of beautiful Flutter UI." in Video) */}
          <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1 tracking-normal">
            Capture • Create • Inspire
          </p>
        </div>

      </div>
    </div>
  );
}
