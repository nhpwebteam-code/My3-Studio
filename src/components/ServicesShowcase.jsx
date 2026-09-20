import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Plane,
  Image,
  Aperture,
  Users,
  Heart,
  Cake,
  Crown,
  Star,
  Film,
  Palette,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

/**
 * Full photoshoot service types offered by Mythri Studio
 * as listed on Justdial.
 */
const photoshootTypes = [
  {
    name: 'Destination Wedding Shoot',
    icon: <Plane size={22} />,
    desc: 'Dreamy destination ceremonies captured across scenic locales.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    accent: 'from-coral to-rose-500',
  },
  {
    name: 'Portfolio',
    icon: <Image size={22} />,
    desc: 'Professional portfolio shoots for models, actors, and artists.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
    accent: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Black & White Wedding Shoot',
    icon: <Aperture size={22} />,
    desc: 'Timeless monochrome artistry for classic wedding moments.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
    accent: 'from-gray-700 to-gray-900',
  },
  {
    name: 'Drone Shoot',
    icon: <Film size={22} />,
    desc: '4K aerial perspectives for grand venue and baraat coverage.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80',
    accent: 'from-sky-500 to-blue-600',
  },
  {
    name: 'Modeling Shoot',
    icon: <Star size={22} />,
    desc: 'Fashion-forward shoots with creative direction and styling.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    accent: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Post Wedding Shoot',
    icon: <Heart size={22} />,
    desc: 'Romantic post-ceremony outdoor and cinematic couple shoots.',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80',
    accent: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Wedding Anniversary',
    icon: <Crown size={22} />,
    desc: 'Celebrate milestones with beautifully styled anniversary sessions.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Traditional Wedding Shoot',
    icon: <Camera size={22} />,
    desc: 'Complete multi-day traditional ceremony photo & video coverage.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    accent: 'from-coral to-orange-500',
  },
  {
    name: 'Freelance Shoot',
    icon: <Palette size={22} />,
    desc: 'Custom freelance sessions tailored to your creative vision.',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=600&q=80',
    accent: 'from-indigo-500 to-blue-600',
  },
  {
    name: 'Candid Photography',
    icon: <Sparkles size={22} />,
    desc: 'Natural, unposed moments that tell your authentic story.',
    image: 'https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?auto=format&fit=crop&w=600&q=80',
    accent: 'from-yellow-500 to-amber-600',
  },
  {
    name: 'Birthday & Baby Shoot',
    icon: <Cake size={22} />,
    desc: 'Themed birthday celebrations and adorable baby milestone captures.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80',
    accent: 'from-fuchsia-500 to-pink-600',
  },
  {
    name: 'Event Videography',
    icon: <Film size={22} />,
    desc: 'Full 4K cinematic video production with teasers and highlights.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
    accent: 'from-red-500 to-coral',
  },
];

export default function ServicesShowcase() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section
      id="our-services"
      className="relative py-20 sm:py-28 overflow-hidden scroll-mt-24"
    >
      {/* Background Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-[#EAE4D9]" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-coral/[0.03] rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-orange-50/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Top CTA ─── */}
        <div className="flex justify-end mb-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral hover:bg-coral-dark text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-coral/30 hover:shadow-lg active:scale-95 whitespace-nowrap"
          >
            Book a Session
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* ─── Services Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photoshootTypes.map((service, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#EAE4D9] hover:border-transparent transition-all duration-500"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                transform: hoveredIdx === idx ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end min-h-[200px] sm:min-h-[220px]">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.accent} text-white flex items-center justify-center mb-3 shadow-lg opacity-90 group-hover:opacity-100 transition-opacity`}
                >
                  {service.icon}
                </div>

                {/* Name */}
                <h3 className="text-white font-display font-bold text-base sm:text-lg leading-tight mb-1 group-hover:text-white transition-colors">
                  {service.name}
                </h3>

                {/* Description — visible on mobile, smooth expand on desktop hover */}
                <p className="text-white/80 text-xs leading-relaxed mt-1 sm:mt-0 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:group-hover:max-h-20 sm:group-hover:opacity-100 transition-all duration-500">
                  {service.desc}
                </p>
              </div>

              {/* Hover Ring Effect */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-white/20 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* ─── Bottom Info Strip ─── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE4D9] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral flex items-center justify-center">
              <Camera size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal-900">
                Custom shoot not listed?
              </h4>
              <p className="text-xs text-charcoal-500">
                We handle any photographic occasion. Tell us your vision!
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm active:scale-95"
          >
            Request Custom Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
