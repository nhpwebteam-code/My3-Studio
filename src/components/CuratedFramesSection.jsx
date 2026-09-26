import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * CuratedFramesSection — High-impact editorial storytelling section
 * Displays the distinctive curved semi-circle arc with photo frames positioned
 * tangentially along the curved line across BOTH Desktop and Mobile viewports.
 * 
 * Features:
 * 1. Pinned sticky scroll: cards glide smoothly along the curved track as you scroll on all devices
 * 2. 100% mathematically exact tangent alignment: card bottom edges sit flush on the curved line
 * 3. Flowing dynamic line animation with traveling lead pulse bead and tick marks
 * 4. Touch swipe & drag support + Prev/Next step buttons on all screen sizes
 * 5. Perfectly proportioned scaling on mobile screens (360px-430px) without overflow
 */
export default function CuratedFramesSection({ onOpenBooking }) {
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(2);

  // Smooth lerp tracking for jitter-free scroll motion (60fps/120fps)
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const flowTick = useRef(0);
  const [animProgress, setAnimProgress] = useState(0);

  // Drag / Touch interaction state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragStartProgress = useRef(0);

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

  // 1. Scroll tracking with sticky pinning across all screen sizes
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isDragging.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable > 0) {
        const currentScroll = -rect.top;
        const progress = currentScroll / totalScrollable;
        targetProgress.current = Math.max(0, Math.min(1, progress));
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
      // Linear interpolation (lerp) toward target progress
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

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [frames.length]);

  // Direct Drag / Touch Interaction
  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartProgress.current = targetProgress.current;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = startX.current - clientX;
    const sensitivity = window.innerWidth < 768 ? 320 : 450;
    const newProgress = Math.max(0, Math.min(1, dragStartProgress.current + delta / sensitivity));
    targetProgress.current = newProgress;
  };

  const handlePointerUp = () => {
    if (isDragging.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable > 0) {
        const targetScrollY = window.scrollY + rect.top + targetProgress.current * totalScrollable;
        window.scrollTo({ top: targetScrollY, behavior: 'auto' });
      }
    }
    isDragging.current = false;
  };

  // Step button handlers (Prev / Next) - Works smoothly on all devices
  const handleStep = (direction) => {
    const step = 1 / (frames.length - 1);
    const newTarget = Math.max(0, Math.min(1, targetProgress.current + direction * step));
    targetProgress.current = newTarget;

    // Smoothly scroll container to sync page scroll
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable > 0) {
        const targetScrollY = window.scrollY + rect.top + newTarget * totalScrollable;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    }
  };

  // Jump to specific frame on tap/click
  const handleSelectCard = (index) => {
    const step = 1 / (frames.length - 1);
    targetProgress.current = index * step;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable > 0) {
        const targetScrollY = window.scrollY + rect.top + index * step * totalScrollable;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
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
    const scale = Math.max(0.85, 1.08 - distFromFocal * 0.0055);

    const isHovered = hoveredId === frames[index].id;
    const isActive = activeIndex === index;

    return {
      left: `${leftPct}%`,
      top: `${topPct}%`,
      opacity: isHovered ? 1 : opacity,
      zIndex: isHovered ? 60 : isActive ? 40 : Math.round(opacity * 20),
      pointerEvents: opacity > 0.25 ? 'auto' : 'none',
      transform: isHovered
        ? `translate(-50%, -50%) scale(1.16) rotate(${rotation}deg)`
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
      className="relative w-full bg-[#E59A3D] text-black select-none min-h-[175vh] sm:min-h-[200vh] lg:min-h-[230vh]"
    >
      {/* ═══════════════════════════════════════════
          STICKY FULL-SCREEN VIEWPORT ACROSS ALL SCREENS
      ═══════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen min-h-[100dvh] w-full flex items-center justify-center overflow-hidden py-3 sm:py-6 lg:py-10">
        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-center">
            
            {/* ═══════════════════════════════════════════
                LEFT / TOP (MOBILE): SEMI-CIRCLE ARC & SCROLL-DRIVEN FRAMES
            ═══════════════════════════════════════════ */}
            <div
              className="flex flex-col lg:col-span-7 relative items-center justify-center w-full"
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
            >
              {/* Mobile Header Bar (Visible on mobile/tablet < lg) */}
              <div className="block lg:hidden w-full mb-1 sm:mb-2 px-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-black text-base sm:text-xl text-black tracking-tight uppercase">
                      ABOUT THIS PROJECT
                    </h3>
                  </div>
                  {/* Prev / Next Smooth Step Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleStep(-1)}
                      disabled={scrollProgress <= 0.05}
                      aria-label="Previous frame"
                      className="p-1 sm:p-1.5 rounded-full bg-black/10 hover:bg-black hover:text-white disabled:opacity-25 transition-all text-black"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => handleStep(1)}
                      disabled={scrollProgress >= 0.95}
                      aria-label="Next frame"
                      className="p-1 sm:p-1.5 rounded-full bg-black/10 hover:bg-black hover:text-white disabled:opacity-25 transition-all text-black"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Horizontal Directional Arrow */}
                <div className="flex items-center w-full py-0.5">
                  <div className="h-[2px] bg-black flex-grow" />
                  <ArrowRight size={16} className="text-black -ml-1 shrink-0" />
                </div>
              </div>

              {/* Aspect-Square Container guarantees 1:1 coordinate symmetry with zero distortion */}
              <div className="relative w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[680px] aspect-square mx-auto touch-pan-y">
                
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
                      className="absolute w-14 xs:w-16 sm:w-24 md:w-32 lg:w-40 aspect-[4/5] bg-black p-0.5 xs:p-1 sm:p-1.5 rounded-[3px] sm:rounded-md shadow-[0_8px_18px_rgba(0,0,0,0.4)] sm:shadow-[0_15px_30px_rgba(0,0,0,0.45)] cursor-pointer group will-change-transform"
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-[2px] sm:rounded-xs bg-charcoal-950">
                        <img
                          src={frame.image}
                          alt={frame.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105"
                        />
                        {/* Dark inner framing border matching reference */}
                        <div className="absolute inset-0 ring-1 ring-black/75 pointer-events-none" />

                        {/* Highlight if active */}
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-white/50 pointer-events-none" />
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
                RIGHT (DESKTOP) / BOTTOM (MOBILE): EDITORIAL NARRATIVE & ARROW CONNECTORS
            ═══════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-2 sm:space-y-6 lg:space-y-10">
              
              {/* Top Block: Headline + Horizontal Arrow + Paragraph (Desktop Only) */}
              <div className="hidden lg:block space-y-3 sm:space-y-4">
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

              {/* Middle Block: Downward Arrow + Condensed Headline */}
              <div className="space-y-1 sm:space-y-3">
                {/* Downward Vertical Arrow matching reference */}
                <div className="hidden sm:flex flex-col items-start pl-1">
                  <div className="w-[2px] h-6 sm:h-8 lg:h-10 bg-black" />
                  <ArrowDown size={16} className="text-black -mt-1" />
                </div>

                <h2 className="font-display font-black text-lg xs:text-xl sm:text-3xl lg:text-4xl xl:text-5xl text-black leading-[1.05] tracking-tighter uppercase">
                  CURATED WORK THE FRAMES THAT SET THE STANDARD
                </h2>
              </div>

              {/* Bottom Block: Downward Arrow + Narrative Paragraph + Actions */}
              <div className="space-y-2 sm:space-y-4">
                {/* Downward Vertical Arrow matching reference */}
                <div className="hidden sm:flex flex-col items-start pl-1">
                  <div className="w-[2px] h-6 sm:h-8 lg:h-10 bg-black" />
                  <ArrowDown size={16} className="text-black -mt-1" />
                </div>

                <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-black/90 leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-none">
                  We anchor our entire photography philosophy on the concept of "The Frame" — the artistic lens through which your family's heritage is remembered for generations. Utilizing master color grading, 4K aerial cinematography, and museum-grade lay-flat albums, we position every wedding and portrait with undeniable elegance.
                </p>

                {/* Action Buttons */}
                <div className="pt-1 sm:pt-2 flex items-center gap-2 sm:gap-3 flex-wrap">
                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-black hover:bg-black/85 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <span>Explore Gallery</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white/25 hover:bg-white text-black font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all border border-black/40 hover:border-black active:scale-95"
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
