import React from 'react';
import { Star, ShieldCheck, ExternalLink } from 'lucide-react';

/**
 * ReviewsSection — Redesigned to match the reference composition:
 * 1. Top: Arched curved wave collage of rounded photography pill cards
 * 2. Center: 'Testimonials' pill badge + Two-tone headline
 * 3. Bottom: Clean 3-column testimonial cards with 5 stars, quote, avatar, and role
 * 4. Justdial verified rating badge
 */
export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      stars: 5,
      quote:
        "Mythri Studio documented our 3-day wedding with pure cinematic perfection! Anji and his team were so patient with our elders during the rituals and captured every joyful tear and laugh. Our lay-flat album is a treasure.",
      author: "Sowmya & Rakesh M.",
      role: "Bride & Groom — Grand Wedding, Nandyal",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      stars: 5,
      quote:
        "We booked them for our daughter's 1st birthday and traditional cradle ceremony. The candid moments, lightning-fast album delivery, and humble demeanor blew our entire family away. Best studio in Srinivasa Nagar!",
      author: "Venkatesh Rao",
      role: "Parent — 1st Birthday & Cradle Ceremony",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      stars: 5,
      quote:
        "The 4K drone visuals and cinematic teaser video looked like a big-screen movie! Anji garu took extraordinary care with the stage lighting and muhurtham coverage. Highly recommend to everyone in Andhra Pradesh.",
      author: "Anusha & Harish K.",
      role: "Destination Couple & Reception",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section
      id="reviews"
      className="relative py-20 sm:py-28 bg-white overflow-hidden scroll-mt-24"
    >
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-coral/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* ═══════════════════════════════════════════
            1. TOP: ARCHED CURVED PHOTO COLLAGE
        ═══════════════════════════════════════════ */}
        <div className="w-full overflow-x-auto no-scrollbar pb-2 pt-1">
          <div className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3.5 lg:gap-4 min-w-[780px] sm:min-w-0 mx-auto px-2">
            
            {/* Column 1 (Far Left, 2 stacked rounded cards) */}
            <div className="w-24 sm:w-28 lg:w-32 flex flex-col gap-2.5 sm:gap-3.5 shrink-0 self-center">
              <div className="h-28 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80"
                  alt="South Indian Traditional Wedding Rituals"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="h-28 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
                  alt="Wedding Reception Warm Lighting"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 2 (Middle Left, 3 stacked small cards) */}
            <div className="w-20 sm:w-24 lg:w-28 flex flex-col gap-2.5 sm:gap-3.5 shrink-0 self-center">
              <div className="h-20 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?auto=format&fit=crop&w=300&q=80"
                  alt="Candid Haldi Laughs"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=300&q=80"
                  alt="Bridal Hands & Mehendi Art"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="h-20 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=300&q=80"
                  alt="Baby Milestone Birthday Portrait"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 3 (Left-Center, Medium Tall Capsule Card) */}
            <div className="w-28 sm:w-36 lg:w-40 h-[300px] sm:h-[350px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md shrink-0 self-center group">
              <img
                src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=400&q=80"
                alt="Emotional Candid Bride Portrait"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Column 4 (CENTER APEX: Tallest Vertical Capsule Card) */}
            <div className="w-32 sm:w-40 lg:w-48 h-[360px] sm:h-[410px] lg:h-[450px] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg shrink-0 self-center group ring-2 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80"
                alt="Grand Couple Cinematic Wedding Portrait"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Column 5 (Right-Center, Tall Capsule Card) */}
            <div className="w-28 sm:w-36 lg:w-40 h-[320px] sm:h-[370px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md shrink-0 self-center group">
              <img
                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=400&q=80"
                alt="Romantic Sunset Post Wedding Shoot"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Column 6 (Middle Right, Medium Tall Vertical Card) */}
            <div className="w-24 sm:w-32 lg:w-36 h-[260px] sm:h-[300px] lg:h-[330px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm shrink-0 self-center group">
              <img
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&q=80"
                alt="Aerial 4K Drone Wedding Perspective"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Column 7 (Far Right, Stacked rounded cards) */}
            <div className="w-24 sm:w-28 lg:w-32 flex flex-col gap-2.5 sm:gap-3.5 shrink-0 self-center">
              <div className="h-28 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80"
                  alt="Groom & Fashion Editorial Portrait"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="h-28 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80"
                  alt="Celebration Joy and Event Videography"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════
            2. CENTER: PILL BADGE & TWO-TONE HEADLINE
        ═══════════════════════════════════════════ */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
          {/* Testimonials Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-semibold text-charcoal-700 shadow-xs">
            <span>Testimonials</span>
          </div>

          {/* Two-Tone Headline matching reference */}
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-charcoal-900 tracking-tight">
            Trusted by families and couples
            <span className="block font-normal text-charcoal-400 mt-1">
              from Nandyal & across South India
            </span>
          </h2>
        </div>

        {/* ═══════════════════════════════════════════
            3. BOTTOM: 3 CLEAN TESTIMONIAL COLUMNS
        ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between space-y-5 p-2"
            >
              <div className="space-y-3">
                {/* 5 Amber Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-charcoal-700 font-normal">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-xs"
                />
                <div className="leading-tight">
                  <h4 className="text-sm font-bold text-charcoal-900 font-display">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-charcoal-400 font-normal mt-0.5">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════
            4. JUSTDIAL VERIFIED RATING FOOTER
        ═══════════════════════════════════════════ */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-600" />
            <span className="font-semibold text-charcoal-800">
              4.7 / 5.0 Rating Index
            </span>
            <span className="text-charcoal-400">•</span>
            <span>Based on 15 verified reviews across the web</span>
          </div>

          <a
            href="https://www.justdial.com/Nandyal/Mythri-Studio-Nandyal/9999P8514-8514-181022124920-M7R5_BZDET/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-coral hover:text-coral-dark transition-colors"
          >
            <span>Read All 15 Reviews on Justdial.com</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
