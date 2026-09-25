import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Heart,
  Crown,
  Sparkles,
  Users,
  Film,
  Cake,
  Focus,
  Aperture,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

/**
 * Curated services offered by MY3 Studio
 * Featuring authentic Telugu and Indian cultural ceremonies & photography styles
 */
const coreServices = [
  {
    id: 'telugu-muhurtham',
    name: 'Traditional Telugu Muhurtham',
    category: 'Sacred Rituals',
    icon: Crown,
    image: '/takeout-1-001/wedding/1.png',
    desc: 'Comprehensive multi-day coverage of sacred Telugu rituals including Pellikoothuru, Muhurtham, Talambralu, and Kanyadaanam captured with rich cultural reverence.',
    deliverables: ['Pellikoothuru & Rituals', 'Talambralu Candid', 'Traditional 4K Video'],
  },
  {
    id: 'candid-wedding',
    name: 'Candid Wedding Cinema',
    category: 'Pure Emotion',
    icon: Sparkles,
    image: '/takeout-1-001/wedding/3.png',
    desc: 'Unscripted family tears, spontaneous laughter, and heartwarming glances between couple and elders, captured with master cinematic lighting and natural warmth.',
    deliverables: ['Unposed Candid Moments', 'Cinematic Teaser Reel', 'Full Color Grading'],
  },
  {
    id: 'pre-wedding',
    name: 'Cinematic Pre-Wedding Shoots',
    category: 'Romantic Escapes',
    icon: Heart,
    image: '/takeout-1-001/prewedding/1.png',
    desc: 'Romantic couple narratives filmed across scenic outdoor landscapes and architectural heritage sites with artistic styling and musical synchronization.',
    deliverables: ['Scenic Locales', '4K Teaser & Music Video', 'Costume & Style Direction'],
  },
  {
    id: 'maternity-cradle',
    name: 'Maternity & Cradle Ceremonies',
    category: 'Family Heritage',
    icon: Users,
    image: '/takeout-1-001/maternity/1.png',
    desc: 'Cherish the journey into parenthood and traditional Seemantham ceremonies with serene studio lighting, comfortable setups, and heartfelt family portraits.',
    deliverables: ['Maternity Studio Themes', 'Traditional Cradle Rituals', 'Keepsake Fine-Art Prints'],
  },
  {
    id: 'birthday-milestones',
    name: 'Birthday & Baby Milestone Shoots',
    category: 'Childhood Joy',
    icon: Cake,
    image: '/takeout-1-001/bday/1.png',
    desc: 'Vibrant 1st birthday celebrations, joyful cake smashes, and 5 to 6 playful indoor baby themes crafted with safe, kid-friendly studio sets.',
    deliverables: ['5-6 Indoor Baby Themes', 'Event Photo & Video', 'Custom Designer Mini-Book'],
  },
  {
    id: 'drone-cinematography',
    name: '4K Aerial Drone & Event Cinema',
    category: 'Grandeur & Scale',
    icon: Film,
    image: '/takeout-1-001/prewedding/6.png',
    desc: 'Breathtaking 4K aerial drone perspectives of grand kalyana mandapams, festive baraat processions, and elaborate stage decor in ultra-high definition.',
    deliverables: ['Licensed 4K Drone Flight', 'Baraat & Stage Coverage', 'Cinematic Highlight Film'],
  },
  {
    id: 'luxury-albums',
    name: 'Luxury Lay-Flat Designer Albums',
    category: 'Heirloom Craft',
    icon: Camera,
    image: '/takeout-1-001/wedding/5.png',
    desc: 'Museum-grade flush mount albums bound in premium metallic, leatherette, or acrylic covers with archival water-resistant and anti-scratch sheets.',
    deliverables: ['60 Sheets Lay-Flat Bind', 'Multi-Photo Designer Spread', 'Complimentary Wall Frames'],
  },
  {
    id: 'portraits-modeling',
    name: 'Portraits & Traditional Modeling',
    category: 'Editorial Grace',
    icon: Focus,
    image: '/takeout-1-001/potraites/4.png',
    desc: 'Magazine-quality bridal portraits, classical dance profiles, and heritage saree showcases with calibrated multi-point studio strobe illumination.',
    deliverables: ['Precision Studio Strobes', 'Fine Editorial Retouching', 'High-Res Digital Delivery'],
  },
  {
    id: 'reception-post-wedding',
    name: 'Reception & Post-Wedding Shoots',
    category: 'Evening Elegance',
    icon: Aperture,
    image: '/takeout-1-001/wedding/2.png',
    desc: 'Glamorous evening reception celebrations, guest candid interactions, and intimate post-ceremony couple portraits under romantic golden hour illumination.',
    deliverables: ['Stage & Guest Coverage', 'Golden Hour Couple Session', 'Fast Preview Edits'],
  },
];

export default function ServicesShowcase() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      id="our-services"
      className="relative py-16 sm:py-24 overflow-hidden scroll-mt-24"
    >
      {/* Background Decorative Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#E59A3D]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[#E59A3D]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <img
              src="/logo.png"
              alt="MY3 Studios"
              className="w-7 h-7 object-contain rounded-full"
            />
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#E59A3D] bg-[#E59A3D]/10 px-4 py-1.5 rounded-full border border-[#E59A3D]/20">
              Professional Photography & Cinematography
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Our Expert Services:{' '}
            <span className="text-[#E59A3D]">Tailored for Your Milestones</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            At MY3 Studios, we provide a wide range of photography and cinematic services designed to elevate your celebrations. From sacred Telugu wedding rituals to modern pre-wedding films, we ensure every moment is preserved with artistic excellence. Explore our core services below.
          </p>
        </div>

        {/* ─── 3-Column Services Card Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreServices.map((service, idx) => {
            const IconComponent = service.icon;
            const isHovered = hoveredId === service.id;
            const isHighlighted = isHovered || (hoveredId === null && idx === 0);

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative bg-[#14161C] rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group ${
                  isHighlighted
                    ? 'border-[#E59A3D] shadow-[0_15px_35px_rgba(229,154,61,0.12)] -translate-y-1.5 ring-1 ring-[#E59A3D]/30'
                    : 'border-white/10 hover:border-[#E59A3D]/50 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top Row: Icon Badge (Left) & Arrow Button (Right) */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isHighlighted
                          ? 'bg-[#E59A3D] text-black shadow-md shadow-[#E59A3D]/30'
                          : 'bg-[#E59A3D]/10 text-[#E59A3D] group-hover:bg-[#E59A3D] group-hover:text-black'
                      }`}
                    >
                      <IconComponent size={22} />
                    </div>

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isHighlighted
                          ? 'bg-[#E59A3D] text-black shadow-md shadow-[#E59A3D]/30 rotate-45'
                          : 'bg-white/5 text-gray-400 group-hover:bg-[#E59A3D] group-hover:text-black group-hover:rotate-45'
                      }`}
                    >
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Photo Showcase */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden my-5 bg-[#0D0E12] border border-white/5 shadow-sm">
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                      {service.category}
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white leading-snug mb-2 group-hover:text-[#E59A3D] transition-colors">
                    {service.name}
                  </h3>

                  {/* Service Description */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5">
                    {service.desc}
                  </p>
                </div>

                {/* Key Deliverables Pill Badges */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {service.deliverables.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/10"
                    >
                      <CheckCircle2 size={11} className="text-[#E59A3D] shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Bottom Centered CTA ─── */}
        <div className="mt-14 sm:mt-18 flex flex-col items-center justify-center text-center">
          <Link
            to="/contact"
            id="services-get-quote-btn"
            className="px-10 py-4 rounded-full bg-[#E59A3D] hover:bg-[#d08a2f] text-black font-bold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-lg shadow-[#E59A3D]/30 hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 group"
          >
            <span>Get a Quote</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <p className="mt-3 text-xs text-gray-500 font-medium">
            Custom wedding dates & multi-day event bundles available • Free consultation with lead artist Anji
          </p>
        </div>

        {/* ─── Bottom Info Strip ─── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#14161C] rounded-2xl p-5 sm:p-6 border border-white/10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E59A3D]/10 text-[#E59A3D] flex items-center justify-center shrink-0">
              <Camera size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                Planning an intimate celebration or destination ceremony?
              </h4>
              <p className="text-xs text-gray-400">
                We travel across Andhra Pradesh & Telangana. Tell us your location and date!
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-[#E59A3D] hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm active:scale-95"
          >
            Request Custom Quote
          </Link>
        </div>

      </div>
    </section>
  );
}
