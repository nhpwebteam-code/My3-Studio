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

  const frames = [
    {
      id: 1,
      title: 'Traditional Muhurtham',
      tag: 'Sacred Rituals',
      image:
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      title: 'Cinematic Grandeur',
      tag: 'Couple Royal Portrait',
      image:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      title: 'Candid Haldi Joy',
      tag: 'Pure Emotion',
      image:
        'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      title: 'Golden Hour Story',
      tag: 'Sunset Shoot',
      image:
        'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      title: 'Editorial Elegance',
      tag: 'Groom & Saree',
      image:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 6,
      title: 'Aerial 4K Drone',
      tag: 'Venue & Baraat',
      image:
        'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 7,
      title: 'Baby Milestone',
      tag: '1st Birthday Joy',
      image:
        'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 8,
      title: 'Pre-Wedding Romance',
      tag: 'Cinematic Love',
      image:
        'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
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

  // 1. Scroll tracking with sticky pinning
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable > 0) {
        // -rect.top is how much has scrolled into the sticky container
        const currentScroll = -rect.top;
        const progress = currentScroll / totalScrollable;
        targetProgress.current = Math.max(0, Math.min(1, progress));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Step button handlers (Prev / Next)
  const handleStep = (direction) => {
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
      className="relative w-full bg-[#FF6548] text-black select-none"
      style={{ minHeight: '230vh' }}
    >
      {/* ═══════════════════════════════════════════
          STICKY FULL-SCREEN VIEWPORT CONTAINER
      ═══════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-6 sm:py-10">
        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ═══════════════════════════════════════════
                LEFT: SEMI-CIRCLE ARC & SCROLL-DRIVEN FRAMES
            ═══════════════════════════════════════════ */}
            <div
              className="lg:col-span-7 relative flex items-center justify-center w-full"
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
            >
              {/* Aspect-Square Container guarantees 1:1 coordinate symmetry with zero distortion */}
              <div className="relative w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[680px] aspect-square">
                
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
                      className="absolute w-24 sm:w-32 lg:w-40 aspect-[4/5] bg-black p-1 sm:p-1.5 rounded-sm sm:rounded-md shadow-[0_20px_40px_rgba(0,0,0,0.45)] cursor-pointer group will-change-transform"
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

                {/* Scroll-Driven Status Badge with Progress Indicator */}
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-40 flex items-center gap-2.5 bg-black/90 backdrop-blur-md text-white py-1.5 px-3.5 rounded-full shadow-2xl border border-white/15 text-xs">
                  <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
                  <span className="text-[11px] font-bold tracking-wider uppercase">
                    Scroll to Rotate
                  </span>
                  <span className="text-white/50 text-[10px]">
                    • Frame {activeIndex + 1} of {frames.length}
                  </span>
                </div>
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
