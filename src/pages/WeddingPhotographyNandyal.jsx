import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Camera,
  Sparkles,
  Phone,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
} from 'lucide-react';
import SEO from '../components/SEO';
import BookingModal from '../components/BookingModal';
import { studioConfig } from '../data/studioConfig';

const WEDDING_GALLERY = [
  {
    image: '/takeout-1-001/wedding/MY308576.webp',
    alt: 'Best wedding photography in Nandyal - candid couple shot, Mythri Studios',
    title: 'Royal Telugu Couple',
    tag: 'Muhurtham',
  },
  {
    image: '/takeout-1-001/wedding/SAI09788.webp',
    alt: 'Best wedding photography in Nandyal - candid couple shot, Mythri Studios',
    title: 'Sacred Talambralu',
    tag: 'Sacred Rituals',
  },
  {
    image: '/takeout-1-001/wedding/MY306596.webp',
    alt: 'Traditional Muhurtham wedding rituals in Nandyal - Mythri Studios',
    title: 'Traditional Muhurtham',
    tag: 'Ceremony',
  },
  {
    image: '/takeout-1-001/prewedding/SAI09694.webp',
    alt: 'Cinematic pre-wedding photoshoot in Nandyal - Mythri Studios',
    title: 'Cinematic Pre-Wedding',
    tag: 'Pre-Wedding',
  },
];

const PACKAGES = [
  {
    name: 'Classic Wedding Coverage',
    tagline: 'Essential documentation of sacred rituals',
    highlights: [
      'Full Muhurtham & Reception coverage',
      'Lead Photographer & Candid Assistant',
      '1 Premium Lay-Flat Wedding Album (30 Sheets / 60 Pages)',
      'High-resolution edited digital gallery',
      'Delivery within 15-20 business days',
    ],
  },
  {
    name: 'Royal Heritage Package',
    tagline: 'Most Popular for Telugu Weddings in Nandyal',
    badge: 'Most Popular',
    highlights: [
      'Pellikoduku / Pellikooturu rituals + Muhurtham + Reception',
      '2 Candid Photographers + 2 Traditional Videographers',
      'Cinematic 4K Wedding Film & Instagram Reels',
      '2 Master Lay-Flat Albums with Velvet Acrylic Box',
      'Complimentary Pre-Wedding or Post-Wedding Mini Shoot',
    ],
  },
  {
    name: 'Grand Celebration Atelier',
    tagline: 'Complete multi-day destination wedding documentation',
    highlights: [
      'Full 3-Day coverage: Haldi, Mehendi, Sangeet, Muhurtham & Reception',
      'Multi-camera 4K setup with Drone Aerial Cinematography',
      'Live LED wall broadcasting capabilities',
      '3 Luxury Heirloom Albums + Parent Album Copies',
      'Dedicated art director & same-day teaser edit',
    ],
  },
];

export default function WeddingPhotographyNandyal() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-[#FAF7F2] text-charcoal min-h-screen pt-28 sm:pt-36 pb-24">
      <SEO
        title="Best Wedding Photography in Nandyal | Mythri Studios"
        description="Looking for the best wedding photography in Nandyal? Mythri Studios captures candid moments, traditional Telugu rituals, pre-wedding shoots, and luxury albums."
        canonical="https://mythristudios.in/wedding-photography-nandyal"
        keywords="wedding photography nandyal, best wedding photographer nandyal, candid wedding photography nandyal, telugu wedding photos nandyal, mythri studios wedding"
      />

      {/* ─── Hero Section with Primary H1 ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral-50 border border-coral/20 text-coral text-xs font-bold uppercase tracking-wider mb-5">
            <Heart size={14} className="fill-coral" />
            <span>Nandyal's Premier Wedding Photography Atelier</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.12]">
            Best Wedding Photography in Nandyal, Andhra Pradesh
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Preserving sacred Telugu traditions, spontaneous laughter, and profound emotional vows with timeless colors, candid intimacy, and master lay-flat albums.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3.5 rounded-full bg-coral hover:bg-coral-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-coral/20 active:scale-95 cursor-pointer"
            >
              Check Date Availability
            </button>
            <a
              href="https://wa.me/919949395037?text=Hello%20Anji%20garu,%20I%20am%20inquiring%20about%20Wedding%20Photography%20in%20Nandyal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 inline-flex items-center gap-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Curated Wedding Gallery Grid ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-charcoal-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral">Curated Portfolio</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal-900 tracking-tight mt-1">
              Candid Wedding Stories & Traditional Telugu Muhurthams
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral hover:text-coral-600"
          >
            <span>View Full Gallery</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEDDING_GALLERY.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-charcoal-200/80 group hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden bg-charcoal-100 relative">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                  {item.tag}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-base text-charcoal-900 group-hover:text-coral transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-500 mt-0.5">Mythri Studios • Nandyal</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Packages & Pricing Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-coral">Transparent Rates</span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-charcoal-900 tracking-tight mt-1">
            Wedding Photography Packages in Nandyal
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
            Tailored coverage with premium equipment, backup systems, and master album craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.badge
                  ? 'bg-white border-2 border-coral shadow-xl'
                  : 'bg-white/80 border border-charcoal-200/80 shadow-md hover:shadow-lg'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-coral text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div>
                <h3 className="font-display font-black text-xl text-charcoal-900">{pkg.name}</h3>
                <p className="text-xs text-charcoal-500 mt-1 mb-6">{pkg.tagline}</p>

                <ul className="space-y-3 border-t border-charcoal-100 pt-5">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-charcoal-700">
                      <CheckCircle2 size={15} className="text-coral shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-charcoal-100">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    pkg.badge
                      ? 'bg-coral hover:bg-coral-600 text-white'
                      : 'bg-charcoal-900 hover:bg-black text-white'
                  }`}
                >
                  Book This Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Why Choose Mythri Studios in Nandyal ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-[#1E2024] to-[#121316] text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-coral">Why Choose Us</span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                Why Mythri Studios is Nandyal's Top Choice for Wedding Photography
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                With over {studioConfig.stats[2]?.value || '1000+'} celebrations captured across Nandyal, Kurnool, and Andhra Pradesh, Anji and the Mythri Studios team bring heartfelt respect to your traditions, unobtrusive candid shooting, and artistic excellence that stands the test of time.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="font-display font-black text-2xl text-coral">1000+</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">Weddings Documented</p>
                </div>
                <div>
                  <p className="font-display font-black text-2xl text-coral">4.9 / 5.0</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">Verified Reviews</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-3">
                <MapPin className="text-coral shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-sm text-white">Central Nandyal Studio</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Visit us in person at Nivarthi Bhavan, opposite National College, Srinivasa Nagar, Nandyal.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="text-coral shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-sm text-white">Guaranteed Backup & Archival</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Dual-card camera setups and off-site cloud backups ensure your irreplaceable wedding memories are secure forever.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-3">
                <Phone className="text-coral shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-sm text-white">Direct Lead Photographer Access</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Consult directly with lead photographer Anji garu (+91 99493 95037) for customized timing and rituals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
