import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewsSection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll tracking state for scroll-driven movement
  const isUserInteracting = useRef(false);
  const userInteractionTimeout = useRef(null);
  const targetScrollLeft = useRef(0);
  const currentScrollLeft = useRef(0);

  const reviews = [
    {
      id: 1,
      quote:
        "Mythri Studios documented our 3-day wedding with pure cinematic perfection! Anji and his team were so patient with our elders during the rituals and captured every joyful tear and laugh. Our luxury lay-flat album is a treasure our whole family cherishes.",
      author: "Sowmya & Rakesh M.",
      location: "Grand Wedding, Nandyal",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      quote:
        "We booked them for our daughter's 1st birthday and traditional cradle ceremony. The candid moments, lightning-fast album delivery, and humble demeanor blew our entire family away. Best studios in Srinivasa Nagar!",
      author: "Venkatesh Rao",
      location: "Srinivasa Nagar, Nandyal",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      quote:
        "The 4K drone visuals and cinematic teaser video looked like a big-screen movie! Anji garu took extraordinary care with the stage lighting and muhurtham coverage. Highly recommend to anyone planning a wedding across Andhra Pradesh.",
      author: "Anusha & Harish K.",
      location: "Destination Couple, Kurnool",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 4,
      quote:
        "From the early morning Pellikoothuru rituals to the late-night reception, the crew worked tirelessly without ever intruding on personal moments. The raw emotions captured in every frame gave our grandparents goosebumps.",
      author: "Dr. Sneha Reddy",
      location: "Traditional Muhurtham, Nandyal",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 5,
      quote:
        "Our sunset pre-wedding shoot at Gandikota felt like a luxury magazine editorial. Their creative direction, humor, and mastery over golden hour light produced breathtaking photos we will treasure forever.",
      author: "Karthik Varma",
      location: "Pre-Wedding Session, Gandikota",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 6,
      quote:
        "Mythri Studios has captured every milestone in our household for the last five years. Their print fidelity, album binding, and genuine passion for visual storytelling are unmatched in the region.",
      author: "Lakshmi Prasanna",
      location: "Family Heritage Celebrations, Nandyal",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Smooth scroll-driven horizontal card translation (starts only after reaching the reviews section)
  useEffect(() => {
    let animId;

    const handleWindowScroll = () => {
      if (!sectionRef.current || !scrollRef.current || isUserInteracting.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // CRITICAL: Only start AFTER reaching the section place (rect.top <= 0)
      // When rect.top > 0, the section hasn't reached the top of the viewport yet: progress is strictly 0!
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      // Calculate translation distance to shift roughly 2.5 to 3 cards
      const cardEl = scrollRef.current.querySelector('.review-carousel-card');
      const cardWidth = cardEl ? cardEl.offsetWidth : 350;
      const gap = 24;
      const shiftDistance = (cardWidth + gap) * 2.75;

      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      targetScrollLeft.current = Math.min(maxScroll, progress * shiftDistance);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll();

    // Velvety 60fps/120fps lerp loop
    const tick = () => {
      if (scrollRef.current && !isUserInteracting.current) {
        const diff = targetScrollLeft.current - currentScrollLeft.current;
        if (Math.abs(diff) > 0.4) {
          currentScrollLeft.current += diff * 0.085;
          scrollRef.current.scrollLeft = currentScrollLeft.current;
          checkScroll();
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      cancelAnimationFrame(animId);
      if (userInteractionTimeout.current) clearTimeout(userInteractionTimeout.current);
    };
  }, []);

  const handlePointerDown = () => {
    isUserInteracting.current = true;
    if (userInteractionTimeout.current) clearTimeout(userInteractionTimeout.current);
  };

  const handlePointerUp = () => {
    if (scrollRef.current) {
      currentScrollLeft.current = scrollRef.current.scrollLeft;
      targetScrollLeft.current = scrollRef.current.scrollLeft;
    }
    userInteractionTimeout.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 1200);
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      isUserInteracting.current = true;
      if (userInteractionTimeout.current) clearTimeout(userInteractionTimeout.current);

      const firstCard = scrollRef.current.querySelector('.review-carousel-card');
      const scrollStep = firstCard ? firstCard.offsetWidth + 24 : 360;
      const newPos = direction === 'next'
        ? scrollRef.current.scrollLeft + scrollStep
        : scrollRef.current.scrollLeft - scrollStep;

      scrollRef.current.scrollTo({
        left: newPos,
        behavior: 'smooth',
      });
      targetScrollLeft.current = newPos;
      currentScrollLeft.current = newPos;

      userInteractionTimeout.current = setTimeout(() => {
        checkScroll();
        isUserInteracting.current = false;
      }, 750);
    }
  };

  const handleWheel = () => {
    isUserInteracting.current = true;
    if (scrollRef.current) {
      currentScrollLeft.current = scrollRef.current.scrollLeft;
      targetScrollLeft.current = scrollRef.current.scrollLeft;
    }
    if (userInteractionTimeout.current) clearTimeout(userInteractionTimeout.current);
    userInteractionTimeout.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 1200);
  };

  const handleContainerScroll = () => {
    checkScroll();
    if (isUserInteracting.current && scrollRef.current) {
      currentScrollLeft.current = scrollRef.current.scrollLeft;
      targetScrollLeft.current = scrollRef.current.scrollLeft;
    }
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative w-full bg-[#FAF7F2] select-none md:min-h-[175vh] scroll-mt-20"
    >
      {/* ─── Sticky Viewport Container ─── */}
      <div className="md:sticky md:top-0 md:h-screen md:min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden py-8 sm:py-12 pt-16 sm:pt-20">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center my-auto">
          
          {/* ─── Header: Centered Title & Subtitle Matching Image 1 ─── */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#1E2024] tracking-tight">
              Inspiring Client Experiences
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-charcoal-500 font-medium">
              Join us and become our next success story
            </p>
          </div>

          {/* ─── Carousel Track with Scroll-Driven Motion ─── */}
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={handleContainerScroll}
              onWheel={handleWheel}
              onTouchStart={handlePointerDown}
              onTouchEnd={handlePointerUp}
              onMouseDown={handlePointerDown}
              onMouseUp={handlePointerUp}
              className="flex items-stretch gap-6 overflow-x-auto no-scrollbar py-4 px-1 -mx-1 snap-x snap-mandatory md:snap-none scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* 1. Half-Yellow, Half-White Highlight Stat Card */}
              <div className="review-carousel-card w-[290px] sm:w-[330px] md:w-[360px] shrink-0 rounded-3xl overflow-hidden border border-yellow-200/90 shadow-[0_10px_30px_rgba(255,206,38,0.18)] hover:shadow-[0_16px_35px_rgba(255,206,38,0.28)] transition-all duration-300 flex flex-col bg-white snap-center">
              
              {/* TOP HALF: Radiant Golden Yellow */}
              <div className="bg-[#FFCE26] p-6 sm:p-7 flex-1 flex flex-col justify-between relative">
                {/* Official Emblem & Rating Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/15 text-[11px] font-bold uppercase tracking-wider text-black">
                    Verified Clients
                  </span>
                  <img
                    src="/logo.png"
                    alt="MY3 Studios Official Seal"
                    className="w-10 h-10 object-contain rounded-full bg-white/40 p-0.5 border border-black/10 shadow-xs"
                  />
                </div>

                {/* 4.9 Rating Headline */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl sm:text-5xl font-black font-display text-black tracking-tight leading-none">
                      4.9
                    </h3>
                    <span className="text-lg font-bold text-black/50 font-display">/ 5.0</span>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-black/75 mt-1.5">
                    Client Satisfaction Score
                  </p>
                </div>
              </div>

              {/* BOTTOM HALF: Crisp Pristine White */}
              <div className="bg-white p-6 sm:p-7 flex-1 flex flex-col justify-between border-t border-yellow-200/60">
                <p className="text-xs text-charcoal-600 leading-relaxed font-normal mb-5">
                  Over 600+ traditional Telugu weddings and celebratory milestones documented across South India.
                </p>

                {/* Bottom: Overlapping Avatars + 600+ Counter */}
                <div className="flex items-center gap-3.5 pt-1">
                  <div className="flex -space-x-3 items-center">
                    <img
                      src="/takeout-1-001/potraites/2.png"
                      alt="Verified Client"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-xs"
                    />
                    <img
                      src="/takeout-1-001/wedding/6.png"
                      alt="Verified Client"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-xs"
                    />
                    <img
                      src="/takeout-1-001/potraites/7.png"
                      alt="Verified Client"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-xs"
                    />
                  </div>
                  <div>
                    <span className="block text-base sm:text-lg font-black text-[#1E2024] leading-tight font-display">
                      600+
                    </span>
                    <span className="text-[11px] font-semibold text-charcoal-500 block leading-tight">
                      Happy Families
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* 2. Testimonial Cards (White cards with yellow dual quotation marks) */}
            {reviews.map((item) => (
              <div
                key={item.id}
                className="review-carousel-card w-[290px] sm:w-[330px] md:w-[360px] shrink-0 bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-gray-100/90 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 snap-center"
              >
                <div>
                  {/* Yellow Dual Quotation Marks Icon */}
                  <div className="mb-4 text-[#FFCE26]">
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-normal">
                    {item.quote}
                  </p>
                </div>

                {/* Reviewer Meta: Avatar, Name, Location */}
                <div className="flex items-center gap-3.5 mt-8 pt-4 border-t border-gray-100">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-gray-100/80"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm sm:text-[15px] text-[#1E2024] leading-tight">
                      {item.author}
                    </h4>
                    <p className="text-xs text-charcoal-400 font-medium mt-0.5 truncate">
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Centered Navigation Arrows (< >) Matching Image 1 ─── */}
        <div className="flex items-center justify-center gap-3 mt-6 sm:mt-10">
          <button
            type="button"
            onClick={() => handleScroll('prev')}
            disabled={!canScrollLeft}
            aria-label="Previous reviews"
            className="w-10 h-10 rounded-full bg-white border border-gray-200/90 shadow-sm flex items-center justify-center text-charcoal-700 hover:bg-gray-50 hover:border-gray-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('next')}
            disabled={!canScrollRight}
            aria-label="Next reviews"
            className="w-10 h-10 rounded-full bg-white border border-gray-200/90 shadow-sm flex items-center justify-center text-charcoal-700 hover:bg-gray-50 hover:border-gray-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        </div>
      </div>
    </section>
  );
}
