import React, { useState } from 'react';
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
  Sparkles,
} from 'lucide-react';
import ContactForm from './ContactForm';
import InteractiveMap from './InteractiveMap';
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
  const [activeBranch, setActiveBranch] = useState('both');

  const branches = {
    main: {
      id: 'main',
      name: 'Mythri Studio (Main Branch)',
      badge: 'Main Studio Atelier',
      icon: '🏛️',
      address: 'Shop No 02, 1st Floor, Nivarthi Bhavan, near Srinivasa Nagar, Opp. National College, Srinivasa Nagar, Nandyala, Andhra Pradesh 518501',
      landmark: 'Directly opposite National College in Srinivasa Nagar, 1st floor of Nivarthi Bhavan.',
      googleMapsUrl: 'https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Shop+No+02,+1st+Floor,+Mythri+Studio+Nandyal,+NIVARTHI+BHAVAN,+near+Srinivasa+Nagar,+opp.+National+College,+Srinivasa+Nagar,+Nandyala,+Andhra+Pradesh+518501',
      phone: '+919949395037',
      phoneDisplay: '+91 99493 95037',
      contactTitle: 'Call Anji garu',
      perks: [
        'Easy roadside parking available near Nivarthi Bhavan',
        'Sample luxury lay-flat albums, frames, and print finishes on display',
        'Hours: Mon – Sat (9:30 AM – 8:30 PM) | Sun (Shoots)',
      ],
    },
    kids: {
      id: 'kids',
      name: "Mythri Kid's Studio",
      badge: "Kid's & Baby Shoot Atelier",
      icon: '🎈',
      address: 'Bhagatsingh colony, near : Noone palle flyover, Raithunagar Road, Nandyal',
      landmark: 'Near Noone palle flyover, Raithunagar Road, Bhagatsingh Colony, Nandyal.',
      googleMapsUrl: 'https://maps.app.goo.gl/WBiXbYgQa3tuTJQ26?g_st=ac',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=15.455849,78.478631',
      phone: '+919848000339',
      phoneDisplay: '+91 98480 00339',
      contactTitle: "Call Kid's Studio",
      perks: [
        'Dedicated baby, newborn & kids thematic indoor backdrops',
        'Cradle ceremonies, 1st birthdays & joyful cake smash sets',
        'Hours: Mon – Sat (9:30 AM – 8:30 PM) | Sun (Appointments)',
      ],
    },
  };

  const currentBranch = branches[activeBranch] || branches.main;

  return (
    <section id="contact" className="relative py-12 sm:py-16 scroll-mt-24">
      {/* Ambient background soft glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E59A3D]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ─── Centered Header ─── */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E59A3D]/10 text-[#E59A3D] text-xs font-bold uppercase tracking-wider">
            <User size={13} />
            Mythri Studio Nandyal • Contact: Anji
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
            Have an upcoming wedding, ceremony, or portrait shoot? Reach out directly to Anji and the Mythri Studio crew or leave your message below.
          </p>
        </div>

        {/* ─── Centerpiece Master Card Container ─── */}
        <div className="bg-[#14161C] rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 shadow-xl shadow-black/20 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Contact Information Card */}
            <div className="lg:col-span-5 relative rounded-2xl sm:rounded-3xl p-7 sm:p-9 text-white overflow-hidden flex flex-col justify-between bg-gradient-to-br from-[#1C1E26] via-[#15171E] to-[#0D0E12] border border-white/10 shadow-2xl min-h-[460px]">
              {/* Content */}
              <div className="relative z-10 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/logo.png"
                        alt="MY3 Studio"
                        className="w-9 h-9 object-contain rounded-full bg-white/10 p-0.5 border border-white/10"
                      />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#E59A3D] bg-[#E59A3D]/10 border border-[#E59A3D]/20 px-2.5 py-0.5 rounded-full">
                        Studio Lead: Anji
                      </span>
                    </div>
                    <a
                      href="https://www.instagram.com/mythri_studio_ndl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-full transition-colors"
                      title="Follow on Instagram"
                    >
                      <InstagramIcon size={13} className="text-[#E59A3D]" />
                      <span>@mythri_studio_ndl</span>
                    </a>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                    Contact Information
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Connect directly with Anji or our dedicated kid's studio team for date availability and custom shoot packages.
                  </p>
                </div>

                {/* Direct Contact Points with clean icons */}
                <div className="space-y-3 pt-1">
                  {/* Phone 1: Anji Direct & WhatsApp */}
                  <a
                    href="tel:+919949395037"
                    className="flex items-center gap-3 text-xs sm:text-sm text-gray-200 hover:text-[#E59A3D] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#E59A3D]/10 border border-[#E59A3D]/20 flex items-center justify-center shrink-0 group-hover:bg-[#E59A3D] group-hover:text-black transition-colors">
                      <Phone size={15} className="text-[#E59A3D] group-hover:text-black transition-colors" />
                    </div>
                    <div className="leading-tight">
                      <span className="block font-bold text-white group-hover:text-[#E59A3D]">+91 99493 95037</span>
                      <span className="text-[11px] text-gray-400">Main Studio • Anji (WhatsApp)</span>
                    </div>
                  </a>

                  {/* Phone 2: Kid's Studio Desk */}
                  <a
                    href="tel:+919848000339"
                    className="flex items-center gap-3 text-xs sm:text-sm text-gray-200 hover:text-[#E59A3D] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#E59A3D]/10 border border-[#E59A3D]/20 flex items-center justify-center shrink-0 group-hover:bg-[#E59A3D] group-hover:text-black transition-colors">
                      <Phone size={15} className="text-[#E59A3D] group-hover:text-black transition-colors" />
                    </div>
                    <div className="leading-tight">
                      <span className="block font-bold text-white group-hover:text-[#E59A3D]">+91 98480 00339</span>
                      <span className="text-[11px] text-gray-400">Mythri Kid's Studio Desk</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${studioConfig.contact.email}`}
                    className="flex items-center gap-3 text-xs sm:text-sm text-gray-200 hover:text-[#E59A3D] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#E59A3D]/10 border border-[#E59A3D]/20 flex items-center justify-center shrink-0 group-hover:bg-[#E59A3D] group-hover:text-black transition-colors">
                      <Mail size={15} className="text-[#E59A3D] group-hover:text-black transition-colors" />
                    </div>
                    <span className="font-semibold text-white group-hover:text-[#E59A3D] truncate">{studioConfig.contact.email}</span>
                  </a>

                  {/* Main Studio Address */}
                  <a
                    href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-xs text-gray-200 hover:text-[#E59A3D] transition-colors group pt-1"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#E59A3D]/10 border border-[#E59A3D]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#E59A3D] group-hover:text-black transition-colors">
                      <MapPin size={15} className="text-[#E59A3D] group-hover:text-black transition-colors" />
                    </div>
                    <div className="leading-tight">
                      <strong className="block font-bold text-white group-hover:text-[#E59A3D] group-hover:underline">
                        1. Mythri Studio (Main Branch)
                      </strong>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        Shop No 02, Nivarthi Bhavan, Opp. National College, Srinivasa Nagar
                      </span>
                    </div>
                  </a>

                  {/* Kid's Studio Address */}
                  <a
                    href="https://maps.app.goo.gl/WBiXbYgQa3tuTJQ26?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-xs text-gray-200 hover:text-[#E59A3D] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#E59A3D]/10 border border-[#E59A3D]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#E59A3D] group-hover:text-black transition-colors">
                      <MapPin size={15} className="text-[#E59A3D] group-hover:text-black transition-colors" />
                    </div>
                    <div className="leading-tight">
                      <strong className="block font-bold text-white group-hover:text-[#E59A3D] group-hover:underline">
                        2. Mythri Kid's Studio
                      </strong>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        Bhagatsingh colony, near Noone palle flyover, Raithunagar Road
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
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#E59A3D] hover:bg-[#c98028] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Anji Directly</span>
                  </a>
                </div>
              </div>

              {/* Working Hours Status Footer */}
              <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#E59A3D]" />
                  <span>Mon – Sat: 9:30 AM – 8:30 PM</span>
                </div>
                <span className="text-[11px] bg-[#E59A3D]/15 text-[#E59A3D] border border-[#E59A3D]/25 px-2.5 py-0.5 rounded-full font-semibold">
                  Open for Bookings
                </span>
              </div>

              {/* Decorative Corner Orb Shapes */}
              <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-[#E59A3D]/5 pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
            </div>

            {/* Right Column: Lean Minimal Form */}
            <div className="lg:col-span-7 flex flex-col justify-center px-2 sm:px-4 lg:px-6">
              <ContactForm initialService={initialService} />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            STUDIO LOCATIONS & 2 INTERACTIVE MAPS SECTION
        ═══════════════════════════════════════════ */}
        <div id="studio-location" className="space-y-8 pt-4 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E59A3D]/10 text-[#E59A3D] text-xs font-bold uppercase tracking-wider">
              <Compass size={13} />
              2 Studio Locations in Nandyal • Interactive Maps
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Visit Mythri Studio in Nandyal
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
              We proudly welcome you to visit both our locations in Nandyal. Walk in to explore real printed albums, discuss event dates, or experience our dedicated kid's shoot sets.
            </p>
          </div>

          {/* Quick View Mode Switcher */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#14161C] border border-white/10 shadow-sm gap-1.5 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => setActiveBranch('both')}
                className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeBranch === 'both'
                    ? 'bg-[#E59A3D] text-black shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🗺️</span>
                <span>Show Both Studio Maps (2 Maps)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveBranch('main')}
                className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeBranch === 'main'
                    ? 'bg-[#E59A3D] text-black shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🏛️</span>
                <span>Main Branch Map</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveBranch('kids')}
                className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeBranch === 'kids'
                    ? 'bg-[#E59A3D] text-black shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🎈</span>
                <span>Kid's Studio Map</span>
              </button>
            </div>
          </div>

          {/* ─── DUAL MAPS CONTAINER ─── */}
          {(activeBranch === 'both' || activeBranch === 'all') ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* MAP 1: Main Studio */}
              <div className="bg-[#14161C] rounded-3xl sm:rounded-[2rem] border border-white/10 shadow-xl shadow-black/20 overflow-hidden flex flex-col justify-between">
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E59A3D] bg-[#E59A3D]/10 px-2.5 py-1 rounded-full">
                      <Building2 size={13} />
                      1. Main Studio Atelier
                    </span>
                    <span className="text-xs text-gray-500 font-bold">
                      Lead: Anji
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-black text-xl sm:text-2xl text-white leading-tight">
                      Mythri Studio (Main Branch)
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                      Shop No 02, 1st Floor, Nivarthi Bhavan, Opp. National College, Srinivasa Nagar, Nandyal
                    </p>
                  </div>

                  {/* Landmark pill */}
                  <div className="p-3 rounded-xl bg-[#E59A3D]/10 border border-[#E59A3D]/20 text-xs text-gray-200 flex items-start gap-2">
                    <MapPin size={14} className="text-[#E59A3D] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      <strong className="text-white">Landmark:</strong> Directly opposite National College in Srinivasa Nagar
                    </span>
                  </div>

                  {/* Map 1 Component */}
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-[#0D0E12]">
                    <InteractiveMap
                      branchId="main"
                      heightClass="h-[280px] sm:h-[320px]"
                      initialMapType="roadmap"
                    />
                  </div>
                </div>

                {/* Card 1 Action Footer */}
                <div className="p-6 sm:p-7 pt-0 border-t border-white/10 mt-2 space-y-2.5">
                  <a
                    href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#0D0E12] hover:bg-[#1A1C24] border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 group"
                  >
                    <Navigation size={14} className="text-[#E59A3D] group-hover:scale-110 transition-transform" />
                    <span>Open Main Branch in Google Maps</span>
                    <ExternalLink size={13} className="text-gray-400 group-hover:text-white" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Shop+No+02,+1st+Floor,+Mythri+Studio+Nandyal,+NIVARTHI+BHAVAN,+near+Srinivasa+Nagar,+opp.+National+College,+Srinivasa+Nagar,+Nandyala,+Andhra+Pradesh+518501"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0D0E12] border border-white/10 hover:border-[#E59A3D] text-gray-200 hover:text-[#E59A3D] font-bold text-[11px] uppercase tracking-wider transition-all text-center"
                    >
                      <Navigation size={12} className="text-[#E59A3D]" />
                      <span>Directions</span>
                    </a>
                    <a
                      href="tel:+919949395037"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#E59A3D]/10 hover:bg-[#E59A3D] hover:text-black text-[#E59A3D] border border-[#E59A3D]/20 font-bold text-[11px] uppercase tracking-wider transition-all text-center"
                    >
                      <Phone size={12} />
                      <span>Call Anji</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* MAP 2: Kid's Studio */}
              <div className="bg-[#14161C] rounded-3xl sm:rounded-[2rem] border border-white/10 shadow-xl shadow-black/20 overflow-hidden flex flex-col justify-between">
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E59A3D] bg-[#E59A3D]/10 px-2.5 py-1 rounded-full">
                      <Sparkles size={13} />
                      2. Kid's &amp; Baby Atelier
                    </span>
                    <span className="text-xs text-gray-400 font-bold">
                      Baby &amp; Kids Sets
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-black text-xl sm:text-2xl text-white leading-tight">
                      Mythri Kid's Studio
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                      Bhagatsingh colony, near : Noone palle flyover, Raithunagar Road, Nandyal
                    </p>
                  </div>

                  {/* Landmark pill */}
                  <div className="p-3 rounded-xl bg-[#E59A3D]/10 border border-[#E59A3D]/20 text-xs text-gray-200 flex items-start gap-2">
                    <MapPin size={14} className="text-[#E59A3D] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      <strong className="text-white">Landmark:</strong> Near Noone palle flyover, Raithunagar Road, Bhagatsingh Colony
                    </span>
                  </div>

                  {/* Map 2 Component */}
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-[#0D0E12]">
                    <InteractiveMap
                      branchId="kids"
                      heightClass="h-[280px] sm:h-[320px]"
                      initialMapType="roadmap"
                    />
                  </div>
                </div>

                {/* Card 2 Action Footer */}
                <div className="p-6 sm:p-7 pt-0 border-t border-white/10 mt-2 space-y-2.5">
                  <a
                    href="https://maps.app.goo.gl/WBiXbYgQa3tuTJQ26?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#0D0E12] hover:bg-[#1A1C24] border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 group"
                  >
                    <Navigation size={14} className="text-[#E59A3D] group-hover:scale-110 transition-transform" />
                    <span>Open Kid's Studio in Google Maps</span>
                    <ExternalLink size={13} className="text-gray-400 group-hover:text-white" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=15.455849,78.478631"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0D0E12] border border-white/10 hover:border-[#E59A3D] text-gray-200 hover:text-[#E59A3D] font-bold text-[11px] uppercase tracking-wider transition-all text-center"
                    >
                      <Navigation size={12} className="text-[#E59A3D]" />
                      <span>Directions</span>
                    </a>
                    <a
                      href="tel:+919848000339"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#E59A3D]/10 hover:bg-[#E59A3D] hover:text-black text-[#E59A3D] border border-[#E59A3D]/20 font-bold text-[11px] uppercase tracking-wider transition-all text-center"
                    >
                      <Phone size={12} />
                      <span>Call Kid's Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Single Focused Branch View */
            <div className="bg-[#14161C] rounded-3xl sm:rounded-[2.5rem] border border-white/10 shadow-xl shadow-black/20 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Details Column (5 cols) */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#14161C] to-[#0D0E12]">
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E59A3D]">
                      <Building2 size={16} />
                      <span>{currentBranch.badge}</span>
                    </div>

                    <div>
                      <h4 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-2">
                        {currentBranch.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {currentBranch.address}
                      </p>
                    </div>

                    {/* Landmark highlight */}
                    <div className="p-3.5 rounded-2xl bg-[#E59A3D]/10 border border-[#E59A3D]/20 text-xs text-gray-200 space-y-1">
                      <div className="font-bold text-[#E59A3D] flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span>Prominent Landmark</span>
                      </div>
                      <p className="text-gray-300 font-medium">
                        {currentBranch.landmark}
                      </p>
                    </div>

                    {/* Practical Perks */}
                    <div className="space-y-2 text-xs text-gray-400 pt-1">
                      {currentBranch.perks.map((perk, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {i === 0 ? (
                            <Car size={15} className="text-[#E59A3D] shrink-0" />
                          ) : i === 1 ? (
                            <Sparkles size={15} className="text-[#E59A3D] shrink-0" />
                          ) : (
                            <Clock size={15} className="text-[#E59A3D] shrink-0" />
                          )}
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="pt-4 border-t border-white/10 space-y-2.5">
                    <a
                      href={currentBranch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-[#0D0E12] hover:bg-[#1A1C24] border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 group"
                    >
                      <Navigation size={14} className="text-[#E59A3D] group-hover:scale-110 transition-transform" />
                      <span>Open in Google Maps App</span>
                      <ExternalLink size={13} className="text-gray-400 group-hover:text-white" />
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={currentBranch.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0D0E12] border border-white/10 hover:border-[#E59A3D] text-gray-200 hover:text-[#E59A3D] font-bold text-[11px] uppercase tracking-wider transition-all text-center"
                      >
                        <Navigation size={12} className="text-[#E59A3D]" />
                        <span>Directions</span>
                      </a>
                      <a
                        href={`tel:${currentBranch.phone}`}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#E59A3D]/10 hover:bg-[#E59A3D] hover:text-black text-[#E59A3D] border border-[#E59A3D]/20 font-bold text-[11px] uppercase tracking-wider transition-all text-center"
                      >
                        <Phone size={12} />
                        <span>{currentBranch.contactTitle}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Map Column (7 cols) */}
                <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[480px] bg-[#0D0E12] border-t lg:border-t-0 lg:border-l border-white/10 overflow-hidden">
                  <InteractiveMap
                    branchId={activeBranch}
                    heightClass="min-h-[380px] lg:min-h-[480px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
