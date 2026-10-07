import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Sparkles,
  Heart,
  Phone,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Smile,
  Baby,
} from 'lucide-react';
import SEO from '../components/SEO';
import BookingModal from '../components/BookingModal';
import { studioConfig } from '../data/studioConfig';

const PORTRAIT_GALLERY = [
  {
    image: '/takeout-1-001/potraites/1724236212961_copy.webp',
    alt: 'Bridal Saree Grace & Silk portrait in Nandyal - Mythri Studios',
    title: 'Bridal Saree Grace',
    tag: 'Bridal Portrait',
  },
  {
    image: '/takeout-1-001/potraites/DSC00301_copy.jpg.jpg',
    alt: 'Traditional Pelli Koothuru portrait session in Nandyal - Mythri Studios',
    title: 'Traditional Pelli Koothuru',
    tag: 'Heritage Adornment',
  },
  {
    image: '/takeout-1-001/potraites/DSC00333_copy.jpg.jpg',
    alt: 'Fine-art studio lighting portrait in Nandyal - Mythri Studios',
    title: 'Fine-Art Studio Profile',
    tag: 'Studio Lighting',
  },
  {
    image: '/takeout-1-001/potraites/DSC04170.jpg',
    alt: 'Dramatic studio lighting portrait session in Nandyal - Mythri Studios',
    title: 'Dramatic Strobe Portrait',
    tag: 'Editorial Portrait',
  },
];

const SESSIONS = [
  {
    title: 'Bridal Profiles & Traditional Adornments',
    tagline: 'Preserving the radiance of your wedding day look',
    description:
      'Dedicated slow-paced sessions focusing on jewelry details, silk saree draping, mehndi patterns, and expressive closeups before the bustle of the ceremony.',
    features: ['Slow-paced pre-ceremony private shoot', 'Macro jewelry & silk detailing', 'Natural and strobe lighting combination', 'Edited digital portrait master copies'],
    icon: Sparkles,
  },
  {
    title: 'Maternity & Baby Milestone Photography',
    tagline: 'Cherishing new beginnings and growing families',
    description:
      'Warm, comfortable sessions at our dedicated Kid’s Studio branch in Bhagatsingh Colony, Nandyal. Specialized setups for newborn, 6-month, and 1st birthday milestones.',
    features: ['Comfortable climate-controlled studio space', 'Hygienic props, backdrops, and creative themes', 'Baby milestone & cradle ceremony documentation', 'Keepsake miniature lay-flat albums'],
    icon: Baby,
  },
  {
    title: 'Studio Lighting & Fine-Art Portraits',
    tagline: 'Dramatic, editorial portraits with timeless depth',
    description:
      'Sculpted lighting setups designed to bring out individual poise and confidence. Ideal for personal branding, classical dancers, family portraits, and solo creative portfolios.',
    features: ['High-contrast and soft-box lighting options', 'Styling and pose direction with lead photographer', 'Retouched high-definition gallery', 'Fine-art canvas printing availability'],
    icon: Camera,
  },
];

export default function PortraitPhotographyNandyal() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-[#FAF7F2] text-charcoal min-h-screen pt-28 sm:pt-36 pb-24">
      <SEO
        title="Portrait Photography Studio in Nandyal | Mythri Studios"
        description="Professional portrait photography studio in Nandyal. Specialized in bridal portraits, maternity shoots, baby & 1st birthday milestones, and fine-art lighting."
        canonical="https://www.mythristudios.in/portrait-photography-nandyal"
        keywords="portrait photography nandyal, photo studio nandyal, maternity shoot nandyal, baby photoshoot nandyal, bridal portrait nandyal"
      />

      {/* ─── Hero Section with Primary H1 ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral-50 border border-coral/20 text-coral text-xs font-bold uppercase tracking-wider mb-5">
            <Camera size={14} />
            <span>Dedicated Portrait & Kid's Studio in Nandyal</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.12]">
            Portrait Photography Studio in Nandyal, Andhra Pradesh
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Capturing authentic beauty, milestone celebrations, and heartfelt family connections with master lighting and artistic care at Mythri Studios.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3.5 rounded-full bg-coral hover:bg-coral-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-coral/20 active:scale-95 cursor-pointer"
            >
              Book a Portrait Session
            </button>
            <a
              href="https://wa.me/919949395037?text=Hello%20Anji%20garu,%20I%20am%20inquiring%20about%20Portrait%20Photography%20in%20Nandyal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 inline-flex items-center gap-2"
            >
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Curated Portrait Showcase ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-charcoal-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral">Featured Sessions</span>
            <p className="font-display font-black text-2xl sm:text-3xl text-charcoal-900 tracking-tight mt-1">
              Studio & Outdoor Portrait Portfolios
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral hover:text-coral-600"
          >
            <span>Explore All Photos</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTRAIT_GALLERY.map((item, idx) => (
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

      {/* ─── Portrait Pillars with H2s ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-coral">Specializations</span>
          <p className="font-display font-black text-2xl sm:text-4xl text-charcoal-900 tracking-tight mt-1">
            Tailored Portrait Sessions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SESSIONS.map((sess, idx) => {
            const Icon = sess.icon;
            return (
              <article
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-coral-50 text-coral flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-charcoal-900 leading-snug">
                    {sess.title}
                  </h2>
                  <p className="text-xs font-bold text-coral uppercase tracking-wider mt-1 mb-3">
                    {sess.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                    {sess.description}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-charcoal-100 pt-4">
                    {sess.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-charcoal-700">
                        <CheckCircle2 size={14} className="text-coral shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-charcoal-100">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full py-2.5 rounded-full bg-charcoal-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Inquire Session
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─── Studio Locations in Nandyal ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-charcoal-200/80 shadow-md">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-coral">Two Studio Locations in Nandyal</span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal-900 tracking-tight mt-1">
              Visit Us in Nandyal for Your Portrait Shoot
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Equipped with professional backdrops, softbox diffusers, and specialized kid props for all age groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-5 rounded-2xl bg-coral-50/50 border border-coral/20">
              <h4 className="font-bold text-base text-charcoal-900 flex items-center gap-2">
                <MapPin size={18} className="text-coral" />
                <span>Main Studio (Nivarthi Bhavan)</span>
              </h4>
              <p className="text-xs text-charcoal-600 mt-1.5 leading-relaxed">
                Shop No 02, 1st Floor, Nivarthi Bhavan, Opp. National College, Srinivasa Nagar, Nandyal.
              </p>
              <p className="text-xs font-bold text-charcoal-900 mt-2">
                Call: <a href="tel:+919949395037" className="text-coral hover:underline">+91 99493 95037</a>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-coral-50/50 border border-coral/20">
              <h4 className="font-bold text-base text-charcoal-900 flex items-center gap-2">
                <MapPin size={18} className="text-coral" />
                <span>Mythri Kid's Studio</span>
              </h4>
              <p className="text-xs text-charcoal-600 mt-1.5 leading-relaxed">
                Bhagatsingh Colony, Near Noone Palle Flyover, Raithunagar Road, Nandyal.
              </p>
              <p className="text-xs font-bold text-charcoal-900 mt-2">
                Call: <a href="tel:+919848000339" className="text-coral hover:underline">+91 98480 00339</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
