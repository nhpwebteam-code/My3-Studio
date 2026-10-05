import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Camera, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const DISCIPLINES = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    tagline: 'Sacred Rituals & Eternal Vows',
    description:
      'From emotional Muhurthams and lively Haldi celebrations to grand receptions, we chronicle your wedding journey with authentic feeling and cinematic color.',
    features: ['Traditional Telugu Muhurthams', 'Haldi & Sangeet Moments', 'Cinematic 4K Highlights', 'Master Lay-Flat Albums'],
    image: '/takeout-1-001/wedding/MY308576.webp',
    alt: 'Best wedding photography in Nandyal - candid couple shot, Mythri Studios',
    link: '/wedding-photography-nandyal',
    accent: 'from-amber-500/10 via-rose-500/5 to-transparent',
    icon: Heart,
  },
  {
    id: 'portrait',
    title: 'Portrait Sessions',
    tagline: 'Artistic Lighting & True Character',
    description:
      'Fine-art bridal profiles, intimate pre-wedding journeys, baby milestone portraits, and editorial studio sessions sculpted with master natural and strobe light.',
    features: ['Bridal Elegance Profiles', 'Pre-Wedding Love Stories', 'Kids & 1st Birthday Sessions', 'Maternity Chronicles'],
    image: '/takeout-1-001/potraites/1724236212961_copy.webp',
    alt: 'Portrait photography studio in Nandyal - bridal & family sessions, Mythri Studios',
    link: '/portrait-photography-nandyal',
    accent: 'from-rose-500/10 via-amber-500/5 to-transparent',
    icon: Camera,
  },
  {
    id: 'event',
    title: 'Event Coverage',
    tagline: 'Milestones & Joyous Gatherings',
    description:
      'Comprehensive multi-camera storytelling for cradle ceremonies, half-saree milestones, anniversaries, and corporate celebrations in Nandyal and beyond.',
    features: ['Cradle & Naming Ceremonies', 'Half-Saree / Dhoti Functions', 'Anniversaries & Gatherings', 'Multi-Cam 4K Live & Reels'],
    image: '/takeout-1-001/prewedding/SAI09694.webp',
    alt: 'Event coverage and celebrations in Nandyal, Mythri Studios',
    link: '/services',
    accent: 'from-orange-500/10 via-yellow-500/5 to-transparent',
    icon: Sparkles,
  },
];

export default function HomeDisciplines({ onOpenBooking }) {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FAF7F2]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-50 border border-coral/20 text-coral text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} />
          <span>Core Disciplines • Mythri Studios</span>
        </div>
        <p className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight leading-tight">
          Photography Crafted with Passion & Precision
        </p>
        <p className="mt-3 text-xs sm:text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
          Serving Nandyal and Andhra Pradesh with dedicated creative coverage tailored for your family's landmark celebrations.
        </p>
      </div>

      {/* 3 Core Discipline Cards with H2s */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {DISCIPLINES.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-charcoal-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl ${item.accent} rounded-full -mr-16 -mt-16 pointer-events-none blur-xl`} />

              <div>
                {/* Visual Thumbnail */}
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-charcoal-100 shadow-inner relative">
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-black/65 backdrop-blur-xs text-white flex items-center justify-center border border-white/20 shadow-sm">
                    <Icon size={18} className="text-coral" />
                  </div>
                </div>

                {/* Subtitle / Tagline */}
                <span className="text-[11px] font-bold uppercase tracking-widest text-coral block mb-1.5">
                  {item.tagline}
                </span>

                {/* Main H2 Heading */}
                <h2 className="font-display font-black text-2xl sm:text-[26px] text-charcoal-900 group-hover:text-coral transition-colors tracking-tight leading-snug">
                  {item.title}
                </h2>

                {/* Narrative description */}
                <p className="mt-2.5 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Bullet Highlights */}
                <ul className="mt-4 space-y-2 border-t border-charcoal-100 pt-4">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-charcoal-700 font-medium">
                      <CheckCircle2 size={14} className="text-coral shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link & Book Trigger */}
              <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 hover:text-coral transition-colors group/link"
                >
                  <span>Explore Details</span>
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
                {onOpenBooking && (
                  <button
                    onClick={onOpenBooking}
                    className="text-[11px] font-bold text-coral hover:text-coral-600 bg-coral-50 hover:bg-coral-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
