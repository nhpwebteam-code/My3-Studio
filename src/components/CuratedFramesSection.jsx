import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * CuratedFramesSection — High-impact editorial storytelling section
 * Directly inspired by the reference design with:
 * 1. Pinned sticky scroll-based movement: silky smooth 60fps/120fps lerp
 * 2. 100% mathematically exact tangent alignment: card bottom edges sit flush on the curved line
 * 3. Flowing dynamic line animation with traveling pulse bead and architectural tick notches
 * 4. Symmetrical editorial typography matching the reference
 */
export default function CuratedFramesSection({ onOpenBooking }) {
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(2);

  // Smooth lerp tracking for jitter-free scroll motion
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const flowTick = useRef(0);
  const [animProgress, setAnimProgress] = useState(0);

  // Drag interaction state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragStartProgress = useRef(0);

  // Mobile sideways scroll tracking (mobile responsive only)
  const mobileScrollRef = useRef(null);
  const isMobileInteracting = useRef(false);
  const mobileInteractionTimeout = useRef(null);
  const targetMobileScroll = useRef(0);
  const currentMobileScroll = useRef(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const frames = [
    {
      id: 1,
      title: 'Traditional Muhurtham',
      tag: 'Sacred Rituals',
      image: '/takeout-1-001/wedding/MY306596.jpg',
    },
    {
      id: 2,
      title: 'Royal Telugu Couple',
      tag: 'Wedding Portrait',
      image: '/takeout-1-001/wedding/MY308576.jpg',
    },
    {
      id: 3,
      title: 'Sacred Talambralu',
      tag: 'Muhurtham Moments',
      image: '/takeout-1-001/wedding/SAI09788.jpg',
    },
    {
      id: 4,
      title: 'Cinematic Pre-Wedding',
      tag: 'Romantic Escape',
      image: '/takeout-1-001/prewedding/SAI09694.jpg',
    },
    {
      id: 5,
      title: 'Heritage Bridal Elegance',
      tag: 'Telugu Bride',
      image: '/takeout-1-001/potraites/DSC06581_1a.jpg',
    },
    {
      id: 6,
      title: 'Sunset Golden Hour',
      tag: 'Pre-Wedding Story',
      image: '/takeout-1-001/prewedding/DSC04247.jpg',
    },
    {
      id: 7,
      title: 'Maternity Grace',
      tag: 'Family Milestone',
      image: '/takeout-1-001/maternity/DSC05912_A.jpg',
    },
    {
      id: 8,
      title: 'Birthday Celebration',
      tag: 'Joyful Milestones',
      image: '/takeout-1-001/bday/MY300026.jpg',
    },
  ];

  // Exact circle geometry in 1000x1000 viewBox (fitted precisely from reference)
  const CX = -350;
  const CY = 1150;
  const R = 950;
  // Card center sits radially outside the line so card bottom edge rests right along the line
  const RADIAL_OFFSET = 105;
  const CARD_R = R + RADIAL_OFFSET;
  const FRAME_SPACING = 14.5; // degrees between adjacent frames

  // 1. Scroll tracking with sticky pinning on desktop and sideways motion on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Desktop sticky scroll calculation
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable > 0) {
        const currentScroll = -rect.top;
        const progress = currentScroll / totalScrollable;
        targetProgress.current = Math.max(0, Math.min(1, progress));
      }

      // Mobile: Scroll-driven sideways card movement (< 1024px)
      if (mobileScrollRef.current && window.innerWidth < 1024 && !isMobileInteracting.current) {
        const startY = windowHeight * 0.85;
        const endY = -rect.height * 0.45;
        const totalDist = startY - endY;
        const progress = Math.max(0, Math.min(1, (startY - rect.top) / totalDist));

        const maxScroll = mobileScrollRef.current.scrollWidth - mobileScrollRef.current.clientWidth;
        targetMobileScroll.current = progress * maxScroll;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [frames.length]);

  // 2. Smooth Lerp Animation Loop (60/120fps) for velvet-smooth line and card movement
  useEffect(() => {
    let animId;

    const tick = () => {
      // Linear interpolation (lerp) toward target progress for desktop arc
      const diff = targetProgress.current - smoothProgress.current;
      smoothProgress.current += diff * 0.09;
      flowTick.current += 0.5;

      setAnimProgress(smoothProgress.current);
      setScrollProgress(targetProgress.current);

      // Determine active card near center focal angle (-38 deg)
      const totalSpan = (frames.length - 1) * FRAME_SPACING;
      const currentAngleOffset = smoothProgress.current * totalSpan;
      const closestIdx = Math.round(currentAngleOffset / FRAME_SPACING);
      setActiveIndex(Math.max(0, Math.min(frames.length - 1, closestIdx)));

      // Mobile sideways lerp: smoothly translate cards horizontally as user scrolls page on mobile
      if (mobileScrollRef.current && window.innerWidth < 1024 && !isMobileInteracting.current) {
        const diffMobile = targetMobileScroll.current - currentMobileScroll.current;
        if (Math.abs(diffMobile) > 0.4) {
          currentMobileScroll.current += diffMobile * 0.085;
          mobileScrollRef.current.scrollLeft = currentMobileScroll.current;

          const cardEl = mobileScrollRef.current.querySelector('.mobile-frame-card');
          const cardWidth = cardEl ? cardEl.offsetWidth + 16 : 226;
          const currentIdx = Math.round(currentMobileScroll.current / cardWidth);
          setActiveMobileIdx(Math.max(0, Math.min(frames.length - 1, currentIdx)));
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [frames.length]);

  // Direct Drag Interaction
  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartProgress.current = targetProgress.current;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = startX.current - clientX;
    // Map 400px drag to full progress range
    const newProgress = Math.max(0, Math.min(1, dragStartProgress.current + delta / 450));
    targetProgress.current = newProgress;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Mobile Touch & Sideways Scroll handlers
  const handleMobileTouchStart = () => {
    isMobileInteracting.current = true;
    if (mobileInteractionTimeout.current) clearTimeout(mobileInteractionTimeout.current);
  };

  const handleMobileTouchEnd = () => {
    if (mobileScrollRef.current) {
      currentMobileScroll.current = mobileScrollRef.current.scrollLeft;
      targetMobileScroll.current = mobileScrollRef.current.scrollLeft;
    }
    mobileInteractionTimeout.current = setTimeout(() => {
      isMobileInteracting.current = false;
    }, 1200);
  };

  const handleMobileContainerScroll = () => {
    if (mobileScrollRef.current && isMobileInteracting.current) {
      currentMobileScroll.current = mobileScrollRef.current.scrollLeft;
      targetMobileScroll.current = mobileScrollRef.current.scrollLeft;
      const cardEl = mobileScrollRef.current.querySelector('.mobile-frame-card');
      const cardWidth = cardEl ? cardEl.offsetWidth + 16 : 226;
      const currentIdx = Math.round(mobileScrollRef.current.scrollLeft / cardWidth);
      setActiveMobileIdx(Math.max(0, Math.min(frames.length - 1, currentIdx)));
    }
  };

  const handleSelectMobileDot = (index) => {
    if (mobileScrollRef.current) {
      isMobileInteracting.current = true;
      const cardEl = mobileScrollRef.current.querySelector('.mobile-frame-card');
      const cardWidth = cardEl ? cardEl.offsetWidth + 16 : 226;
      const targetX = index * cardWidth;
      mobileScrollRef.current.scrollTo({
        left: targetX,
        behavior: 'smooth',
      });
      targetMobileScroll.current = targetX;
      currentMobileScroll.current = targetX;
      setActiveMobileIdx(index);
      if (mobileInteractionTimeout.current) clearTimeout(mobileInteractionTimeout.current);
      mobileInteractionTimeout.current = setTimeout(() => {
        isMobileInteracting.current = false;
      }, 700);
    }
  };

  // Step button handlers (Prev / Next)
  const handleStep = (direction) => {
    // Mobile sideways step (Only in mobile responsive)
    if (mobileScrollRef.current && window.innerWidth < 1024) {
      isMobileInteracting.current = true;
      const cardEl = mobileScrollRef.current.querySelector('.mobile-frame-card');
      const cardWidth = cardEl ? cardEl.offsetWidth + 16 : 226;
      const targetX = mobileScrollRef.current.scrollLeft + direction * cardWidth;
      mobileScrollRef.current.scrollTo({
        left: targetX,
        behavior: 'smooth',
      });
      targetMobileScroll.current = targetX;
      currentMobileScroll.current = targetX;
      if (mobileInteractionTimeout.current) clearTimeout(mobileInteractionTimeout.current);
      mobileInteractionTimeout.current = setTimeout(() => {
        isMobileInteracting.current = false;
      }, 700);
      return;
    }

    // Desktop step (Preserved 100%)
    const step = 1 / (frames.length - 1);
    const newTarget = Math.max(0, Math.min(1, targetProgress.current + direction * step));
    targetProgress.current = newTarget;

    // Also smoothly scroll container if needed
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const targetScrollY = window.scrollY + rect.top + newTarget * totalScrollable;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // Jump to specific frame
  const handleSelectCard = (index) => {
    const step = 1 / (frames.length - 1);
    targetProgress.current = index * step;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const targetScrollY = window.scrollY + rect.top + index * step * totalScrollable;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // Compute position and exact tangent rotation for each card along the arc
  const getCardStyle = (index) => {
    // Total angular sweep across all frames
    const totalRotationSpan = (frames.length - 4.5) * FRAME_SPACING;
    const currentScrollOffset = animProgress * totalRotationSpan;

    // Angle theta for this card
    const theta = -68 + index * FRAME_SPACING - currentScrollOffset;

    // Cartesian position in 1000x1000 coordinate space
    const rad = (theta * Math.PI) / 180;
    const cx = CX + CARD_R * Math.cos(rad);
    const cy = CY + CARD_R * Math.sin(rad);

    // Percentage of container (exact 1:1 aspect-square)
    const leftPct = (cx / 10).toFixed(2);
    const topPct = (cy / 10).toFixed(2);

    // Exact mathematical tangent rotation: 90 deg + theta
    // This locks the bottom edge of the card 100% parallel to the arc line
    const rotation = 90 + theta;

    // Opacity fades smoothly when entering at top-left or exiting at bottom
    let opacity = 1;
    if (theta < -76) {
      opacity = Math.max(0, (theta + 88) / 12);
    } else if (theta > -2) {
      opacity = Math.max(0, (14 - theta) / 16);
    }

    // Dynamic focal scaling: card closest to -38 deg (middle of arc) scales up slightly
    const distFromFocal = Math.abs(theta - (-38));
    const scale = Math.max(0.82, 1.06 - distFromFocal * 0.0055);

    const isHovered = hoveredId === frames[index].id;
    const isActive = activeIndex === index;

    return {
      left: `${leftPct}%`,
      top: `${topPct}%`,
      opacity: isHovered ? 1 : opacity,
      zIndex: isHovered ? 60 : isActive ? 40 : Math.round(opacity * 20),
      pointerEvents: opacity > 0.25 ? 'auto' : 'none',
      transform: isHovered
        ? `translate(-50%, -50%) scale(1.18) rotate(${rotation}deg)`
        : `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
      transition: isHovered
        ? 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease'
        : 'opacity 0.2s linear',
    };
  };

  // Active Lead Pulse Bead on the Arc
  const leadAngle = -68 + animProgress * 62;
  const leadRad = (leadAngle * Math.PI) / 180;
  const beadX = CX + R * Math.cos(leadRad);
  const beadY = CY + R * Math.sin(leadRad);

  return (
    <section
      ref={containerRef}
      id="curated-frames"
      className="relative w-full bg-[#E59A3D] text-black select-none py-12 sm:py-16 lg:py-0 lg:min-h-[230vh]"
    >
      {/* ═══════════════════════════════════════════
          STICKY FULL-SCREEN VIEWPORT ON DESKTOP, FLUID ON MOBILE
      ═══════════════════════════════════════════ */}
      <div className="relative lg:sticky lg:top-0 lg:h-screen w-full flex items-center justify-center lg:overflow-hidden py-6 sm:py-10">
        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ═══════════════════════════════════════════
                LEFT: SEMI-CIRCLE ARC & SCROLL-DRIVEN FRAMES
            ═══════════════════════════════════════════ */}
            <div
              className="hidden lg:flex lg:col-span-7 relative items-center justify-center w-full"
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
            >
              {/* Aspect-Square Container guarantees 1:1 coordinate symmetry with zero distortion */}
              <div className="relative w-full max-w-[320px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[680px] aspect-square mx-auto">
                
                {/* ─── The Continuous Flowing Semi-Circle Arc ─── */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                  viewBox="0 0 1000 1000"
                  fill="none"
                >
                  <defs>
                    {/* Linear Gradient for flowing energetic pulse */}
                    <linearGradient id="arcFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#000000" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* 1. Base Architectural Guide Track (Clean Solid Arc) */}
                  <path
                    d="M -100 232 A 950 950 0 0 1 600 1120"
                    stroke="#000000"
                    strokeWidth="3.5"
                    strokeOpacity="0.3"
                    strokeLinecap="round"
                  />

                  {/* 2. Smooth Moving Animated Energy Line with Scroll-Linked Flow */}
                  <path
                    d="M -100 232 A 950 950 0 0 1 600 1120"
                    stroke="url(#arcFlowGradient)"
                    strokeWidth="4"
                    strokeDasharray="22 18"
                    strokeDashoffset={-(animProgress * 750 + flowTick.current)}
                    strokeLinecap="round"
                  />

                  {/* 3. Perpendicular Precision Tick Notches directly under each frame */}
                  {frames.map((_, idx) => {
                    const totalRotationSpan = (frames.length - 4.5) * FRAME_SPACING;
                    const theta = -68 + idx * FRAME_SPACING - animProgress * totalRotationSpan;
                    if (theta < -78 || theta > 0) return null;

                    const rad = (theta * Math.PI) / 180;
                    const innerR = R - 8;
                    const outerR = R + 8;
                    const x1 = CX + innerR * Math.cos(rad);
                    const y1 = CY + innerR * Math.sin(rad);
                    const x2 = CX + outerR * Math.cos(rad);
                    const y2 = CY + outerR * Math.sin(rad);

                    const isCardActive = activeIndex === idx;

                    return (
                      <line
                        key={`tick-${idx}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#000000"
                        strokeWidth={isCardActive ? '3' : '1.5'}
                        strokeOpacity={isCardActive ? '0.95' : '0.4'}
                      />
                    );
                  })}

                  {/* 4. Traveling Lead Indicator Bead gliding along the curve */}
                  <circle
                    cx={beadX}
                    cy={beadY}
                    r="6.5"
                    fill="#000000"
                  />
                  {/* Subtle outer pulse halo */}
                  <circle
                    cx={beadX}
                    cy={beadY}
                    r="13"
                    fill="#000000"
                    fillOpacity="0.2"
                  />
                </svg>

                {/* ─── 8 Photography Frames Positioned Tangentially on the Arc ─── */}
                {frames.map((frame, idx) => {
                  const style = getCardStyle(idx);
                  const isActive = activeIndex === idx;

                  return (
                    <div
                      key={frame.id}
                      onClick={() => handleSelectCard(idx)}
                      onMouseEnter={() => setHoveredId(frame.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={style}
                      className="absolute w-20 sm:w-28 md:w-32 lg:w-40 aspect-[4/5] bg-black p-1 sm:p-1.5 rounded-sm sm:rounded-md shadow-[0_15px_30px_rgba(0,0,0,0.45)] cursor-pointer group will-change-transform"
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-xs bg-charcoal-950">
                        <img
                          src={frame.image}
                          alt={frame.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105"
                        />
                        {/* Dark inner framing border matching reference */}
                        <div className="absolute inset-0 ring-1 ring-black/75 pointer-events-none" />

                        {/* Subtle highlight if active */}
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-white/40 pointer-events-none" />
                        )}
                      </div>

                      {/* Micro caption tooltip on hover */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
                        {frame.title}
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* ═══════════════════════════════════════════
                RIGHT: EDITORIAL NARRATIVE & ARROW CONNECTORS
            ═══════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8 lg:space-y-10">
              
              {/* Top Block: Headline + Horizontal Arrow + Paragraph */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-black tracking-tight uppercase whitespace-nowrap">
                      ABOUT THIS PROJECT
                    </h3>
                  </div>

                  {/* Prev / Next Smooth Step Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleStep(-1)}
                      disabled={scrollProgress <= 0.05}
                      aria-label="Previous frame"
                      className="p-1.5 rounded-full bg-black/10 hover:bg-black hover:text-white disabled:opacity-25 transition-all text-black"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => handleStep(1)}
                      disabled={scrollProgress >= 0.95}
                      aria-label="Next frame"
                      className="p-1.5 rounded-full bg-black/10 hover:bg-black hover:text-white disabled:opacity-25 transition-all text-black"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Horizontal Directional Arrow matching reference */}
                <div className="flex items-center w-full py-1">
                  <div className="h-[2px] bg-black flex-grow" />
                  <ArrowRight size={18} className="text-black -ml-1 shrink-0" />
                </div>

                <p className="text-xs sm:text-sm font-medium text-black/90 leading-relaxed max-w-lg">
                  Every celebration is a living tapestry of sacred rituals, tender family bonds, and fleeting glances. In Nandyal and across South India, our atelier transforms unscripted wedding moments into enduring visual heirlooms. By redefining candid storytelling and cinematic light, we create imagery that doesn't just document your celebration — it commands timeless reverence.
                </p>
              </div>

              {/* ─── Mobile Responsive Only: Sideways Moving Cards in "ABOUT THIS PROJECT" ─── */}
              <div className="block lg:hidden w-full my-2">
                <div
                  ref={mobileScrollRef}
                  onScroll={handleMobileContainerScroll}
                  onTouchStart={handleMobileTouchStart}
                  onTouchEnd={handleMobileTouchEnd}
                  className="flex items-center gap-4 overflow-x-auto no-scrollbar py-3 px-1 -mx-1 snap-x snap-mandatory scroll-smooth"
                  style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {frames.map((frame, idx) => (
                    <div
                      key={frame.id}
                      onClick={() => handleSelectMobileDot(idx)}
                      className="mobile-frame-card w-[210px] sm:w-[250px] shrink-0 aspect-[4/5] bg-black p-1.5 rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.35)] relative overflow-hidden group cursor-pointer transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)] active:scale-[0.97] snap-center"
                      style={{
                        opacity: 0,
                        transform: 'translateY(20px)',
                        animation: `mobileCardEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.08}s forwards`,
                      }}
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-xl bg-charcoal-950">
                        <img
                          src={frame.image}
                          alt={frame.title}
                          loading="lazy"
                          className="w-full h-full object-cover filter contrast-105"
                        />
                        {/* Gradient overlay for legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                        {/* Top tag badge */}
                        <div className="absolute top-2.5 left-2.5">
                          <span className="inline-block bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/20">
                            {frame.tag}
                          </span>
                        </div>

                        {/* Bottom Frame Info */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="text-[10px] font-semibold text-white/70 block uppercase tracking-wider">
                            Frame 0{idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-white font-display leading-tight truncate">
                            {frame.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile indicators (Active dot track) */}
                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  {frames.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectMobileDot(i)}
                      aria-label={`Jump to frame ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeMobileIdx === i
                          ? 'w-6 bg-black'
                          : 'w-1.5 bg-black/30 hover:bg-black/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Middle Block: Downward Arrow + Massive Condensed Headline */}
              <div className="space-y-3 sm:space-y-4">
                {/* Downward Vertical Arrow matching reference */}
                <div className="flex flex-col items-start pl-1">
                  <div className="w-[2px] h-8 sm:h-10 bg-black" />
                  <ArrowDown size={18} className="text-black -mt-1" />
                </div>

                <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-black leading-[1.05] tracking-tighter uppercase">
                  CURATED WORK THE FRAMES THAT SET THE STANDARD
                </h2>
              </div>

              {/* Bottom Block: Downward Arrow + Narrative Paragraph + Actions */}
              <div className="space-y-3 sm:space-y-4">
                {/* Downward Vertical Arrow matching reference */}
                <div className="flex flex-col items-start pl-1">
                  <div className="w-[2px] h-8 sm:h-10 bg-black" />
                  <ArrowDown size={18} className="text-black -mt-1" />
                </div>

                <p className="text-xs sm:text-sm font-medium text-black/90 leading-relaxed max-w-lg">
                  We anchor our entire photography philosophy on the concept of "The Frame" — the artistic lens through which your family's heritage is remembered for generations. Utilizing master color grading, 4K aerial cinematography, and museum-grade lay-flat albums, we position every wedding and portrait with undeniable elegance and heartfelt soul.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3 flex-wrap">
                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black hover:bg-black/85 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <span>Explore Gallery</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/25 hover:bg-white text-black font-bold text-xs uppercase tracking-wider transition-all border border-black/40 hover:border-black active:scale-95"
                  >
                    <span>Reserve Date With Anji</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
