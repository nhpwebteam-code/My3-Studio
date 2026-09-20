import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  MessageCircle,
  User,
  Navigation,
  Building2,
  Car,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import ContactForm from './ContactForm';
import { studioConfig } from '../data/studioConfig';

function InstagramIcon({ size = 14, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ContactSection({ initialService = '' }) {
  const googleMapsUrl = "https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Shop+No+02,+1st+Floor,+Mythri+Studio+Nandyal,+NIVARTHI+BHAVAN,+near+Srinivasa+Nagar,+opp.+National+College,+Srinivasa+Nagar,+Nandyala,+Andhra+Pradesh+518501";

  return (
    <section id="contact" className="relative py-12 sm:py-16 scroll-mt-24">
      {/* Ambient background soft glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-coral/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ─── Centered Header matching reference design ─── */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-bold uppercase tracking-wider">
            <User size={13} />
            Mythri Studio Nandyal • Contact: Anji
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-charcoal-500 font-medium leading-relaxed">
            Have an upcoming wedding, ceremony, or portrait shoot? Reach out directly to Anji and the Mythri Studio crew or leave your message below.
          </p>
        </div>

        {/* ─── Centerpiece Master Card Container ─── */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 shadow-xl shadow-charcoal-900/5 border border-[#EAE4D9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Contact Information Card */}
            <div className="lg:col-span-5 relative rounded-2xl sm:rounded-3xl p-7 sm:p-9 text-white overflow-hidden flex flex-col justify-between bg-gradient-to-br from-[#FF6548] to-[#E54F33] shadow-lg shadow-coral/25 min-h-[460px]">
              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/80 bg-white/20 px-2.5 py-0.5 rounded-full">
                      Studio Lead: Anji
                    </span>
                    <a
                      href="https://www.instagram.com/mythri_studio_ndl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-white/90 hover:text-white bg-black/15 hover:bg-black/25 px-2.5 py-1 rounded-full transition-colors"
                      title="Follow on Instagram"
                    >
                      <InstagramIcon size={13} />
                      <span>@mythri_studio_ndl</span>
                    </a>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                    Contact Information
                  </h3>
                  <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-normal">
                    Connect directly with Anji for date availability, photoshoot packages, and custom event documentation.
                  </p>
                </div>

                {/* Direct Contact Points with clean icons */}
                <div className="space-y-3.5 pt-1">
                  {/* Phone 1: Anji Direct & WhatsApp */}
                  <a
                    href="tel:+919949395037"
                    className="flex items-center gap-3.5 text-xs sm:text-sm text-white/95 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                      <Phone size={17} className="text-white" />
                    </div>
                    <div className="leading-tight">
                      <span className="block font-bold">+91 99493 95037</span>
                      <span className="text-[11px] text-white/70">Anji (Primary & WhatsApp)</span>
                    </div>
                  </a>

                  {/* Phone 2: Secondary / Studio Desk */}
                  <a
                    href="tel:+917780181436"
                    className="flex items-center gap-3.5 text-xs sm:text-sm text-white/95 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                      <Phone size={17} className="text-white" />
                    </div>
                    <div className="leading-tight">
                      <span className="block font-bold">+91 77801 81436</span>
                      <span className="text-[11px] text-white/70">Studio Support Desk</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${studioConfig.contact.email}`}
                    className="flex items-center gap-3.5 text-xs sm:text-sm text-white/95 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                      <Mail size={17} className="text-white" />
                    </div>
                    <span className="font-semibold truncate">{studioConfig.contact.email}</span>
                  </a>

                  {/* Address with Clickable Google Maps Link */}
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 text-xs sm:text-sm text-white/95 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white/25 transition-colors">
                      <MapPin size={17} className="text-white" />
                    </div>
                    <div className="leading-tight">
                      <strong className="block font-bold group-hover:underline">
                        Shop No 02, 1st Floor, Nivarthi Bhavan
                      </strong>
                      <span className="text-[11px] text-white/80 block">
                        Opp. National College, Srinivasa Nagar, Nandyal, AP 518501
                      </span>
                      <span className="text-[10px] text-white/90 underline inline-flex items-center gap-1 mt-0.5">
                        Open in Google Maps <ExternalLink size={10} />
                      </span>
                    </div>
                  </a>
                </div>

                {/* Instant WhatsApp Quick Button */}
                <div className="pt-2">
                  <a
                    href={studioConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-coral hover:bg-white/95 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Anji Directly</span>
                  </a>
                </div>
              </div>

              {/* Working Hours Status Footer */}
              <div className="relative z-10 pt-5 mt-5 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-white/80" />
                  <span>Mon – Sat: 9:30 AM – 8:30 PM</span>
                </div>
                <span className="text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                  Open for Bookings
                </span>
              </div>

              {/* ─── Decorative Corner Orb Shape matching reference image ─── */}
              <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-white/20 pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
            </div>

            {/* Right Column: Lean Minimal Form */}
            <div className="lg:col-span-7 flex flex-col justify-center px-2 sm:px-4 lg:px-6">
              <ContactForm initialService={initialService} />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            STUDIO LOCATION & INTERACTIVE MAP SECTION
        ═══════════════════════════════════════════ */}
        <div id="studio-location" className="space-y-6 pt-4 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-coral">
              <Compass size={13} />
              Studio Location & Visit
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal-900 tracking-tight">
              Visit Mythri Studio in Nandyal
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 font-medium leading-relaxed">
              Conveniently situated in Nivarthi Bhavan opposite National College. Walk in to explore real printed albums, discuss event dates, or customize your photoshoot package with Anji.
            </p>
          </div>

          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#EAE4D9] shadow-xl shadow-charcoal-900/5 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Details Column (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between space-y-6 bg-gradient-to-b from-white to-[#FAF7F2]">
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-coral">
                    <Building2 size={16} />
                    <span>Physical Atelier Address</span>
                  </div>

                  <div>
                    <h4 className="font-display font-black text-xl sm:text-2xl text-charcoal-900 leading-tight mb-2">
                      Mythri Studio Nandyal
                    </h4>
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                      Shop No 02, 1st Floor, Nivarthi Bhavan, near Srinivasa Nagar, Opp. National College, Srinivasa Nagar, Nandyala, Andhra Pradesh 518501
                    </p>
                  </div>

                  {/* Landmark highlight */}
                  <div className="p-3.5 rounded-2xl bg-coral-50/70 border border-coral/20 text-xs text-charcoal-800 space-y-1">
                    <div className="font-bold text-coral flex items-center gap-1.5">
                      <MapPin size={14} />
                      <span>Prominent Landmark</span>
                    </div>
                    <p className="text-charcoal-600 font-medium">
                      Directly opposite National College in Srinivasa Nagar, 1st floor of Nivarthi Bhavan.
                    </p>
                  </div>

                  {/* Practical Perks */}
                  <div className="space-y-2 text-xs text-charcoal-600 pt-1">
                    <div className="flex items-center gap-2">
                      <Car size={15} className="text-coral shrink-0" />
                      <span>Easy roadside parking available near Nivarthi Bhavan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-coral shrink-0" />
                      <span>Sample albums, frames, and print finishes on display</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-coral shrink-0" />
                      <span>Hours: Mon – Sat (9:30 AM – 8:30 PM) | Sun (Shoots)</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-4 border-t border-gray-100 space-y-2.5">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <Navigation size={14} className="text-coral" />
                    <span>Open in Google Maps App</span>
                    <ExternalLink size={13} className="text-gray-400" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#EAE4D9] hover:border-coral text-charcoal-800 hover:text-coral font-bold text-[11px] uppercase tracking-wider transition-all text-center"
                    >
                      <Navigation size={12} />
                      <span>Directions</span>
                    </a>
                    <a
                      href="tel:+919949395037"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-coral/10 hover:bg-coral hover:text-white text-coral font-bold text-[11px] uppercase tracking-wider transition-all text-center"
                    >
                      <Phone size={12} />
                      <span>Call Anji</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Interactive Map Embed Column (7 cols) */}
              <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[460px] bg-charcoal-100 border-t lg:border-t-0 lg:border-l border-[#EAE4D9] overflow-hidden group">
                <iframe
                  title="Mythri Studio Nandyal Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=78.4720%2C15.4740%2C78.4960%2C15.4960&layer=mapnik&marker=15.4855%2C78.4840"
                  className="w-full h-full min-h-[360px] lg:min-h-[460px] border-0"
                  loading="lazy"
                />

                {/* Floating Map Pin Badge */}
                <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EAE4D9] shadow-lg flex items-start gap-3 pointer-events-auto">
                  <div className="w-8 h-8 rounded-xl bg-coral text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div className="text-xs leading-tight">
                    <strong className="block text-charcoal-900 font-bold mb-0.5">
                      Mythri Studio Nandyal
                    </strong>
                    <span className="text-charcoal-600 block text-[11px]">
                      Nivarthi Bhavan, Opp. National College
                    </span>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-coral font-bold text-[10px] mt-1 hover:underline uppercase tracking-wide"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink size={9} />
                    </a>
                  </div>
                </div>

                {/* Map Bottom Hint */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-semibold text-charcoal-600 border border-gray-200 shadow-sm pointer-events-none">
                  📍 Srinivasa Nagar, Nandyal, AP 518501
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
