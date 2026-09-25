import React, { useState } from 'react';
import PricingCard from '../components/PricingCard';
import BookingModal from '../components/BookingModal';
import FAQSection from '../components/FAQSection';
import { useStudioData } from '../context/StudioDataContext';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle,
  Sparkles,
  PhoneCall,
  Users,
  Heart,
  Crown,
} from 'lucide-react';

export default function Pricing() {
  const { packages } = useStudioData();
  const [selectedPackageData, setSelectedPackageData] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookService = (packageData) => {
    setSelectedPackageData(packageData);
    setIsBookingOpen(true);
  };

  return (
    <div className="pb-24 bg-[#000000] text-white min-h-screen">
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-14 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E59A3D]/10 border border-[#E59A3D]/30 text-[#E59A3D] text-xs font-bold uppercase tracking-wider mb-5">
          <img
            src="/logo.png"
            alt="MY3 Studios"
            className="w-5 h-5 object-contain rounded-full"
          />
          <span>Plan & Pricing • MY3 Studios</span>
        </div>

        {/* Two-Tone Headline */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-[54px] text-white tracking-tight leading-[1.18] mb-4">
          <span className="text-[#E59A3D]">Choose the plan</span> that's <br className="hidden sm:inline" />
          right for you
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
          Complete upfront pricing for multi-day weddings, birthday milestones, and celebratory gatherings with custom album options and 4K cinematography.
        </p>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING CARDS GRID
      ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6 items-stretch">
          {packages.map((service) => (
            <div key={service.id} className="flex">
              <PricingCard
                service={service}
                onBook={handleBookService}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST FOOTER
      ═══════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 text-center">
        <p className="text-xs text-gray-500">
          Prices in INR. Applicable taxes as per local GST norms may apply.
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <ShieldCheck size={14} className="text-[#E59A3D]" />
          <p className="text-xs text-gray-400">
            Secure booking via WhatsApp / Direct Consultation. 64 GB Pen Drive delivery included.
          </p>
        </div>
        <p className="text-[11px] text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
          If you're not fully satisfied with our service, we will re-edit at no
          extra charge. Your memories are our priority.
        </p>
      </section>

      {/* ═══════════════════════════════════════════
          PACKAGE GUARANTEES / STUDIO INCLUSIONS
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-[#14161C]/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/10 shadow-sm relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E59A3D]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#E59A3D]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center max-w-2xl mx-auto mb-12">
            <span className="font-script text-3xl text-[#E59A3D] block -mb-1 select-none">
              Inclusions
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Standard Across Every Package
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-3 leading-relaxed">
              Every MY3 booking includes professional peace-of-mind commitments
              at no extra cost.
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <CheckCircle size={20} />,
                title: 'Dual Memory Cards',
                desc: 'Real-time backup recording during all live rituals so no moment is ever lost.',
              },
              {
                icon: <ShieldCheck size={20} />,
                title: '64 GB Pen Drive',
                desc: 'All raw and edited high-resolution media delivered safely in a high-speed physical drive.',
              },
              {
                icon: <Sparkles size={20} />,
                title: 'Lay-Flat Albums',
                desc: 'Archival non-fade matte paper binding with custom photo spreads and multiple sheets layouts.',
              },
              {
                icon: <PhoneCall size={20} />,
                title: 'Direct Consultation',
                desc: 'Pre-shoot briefing with the lead artist to review schedules, lighting, and rituals.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-[#0D0E12] border border-white/10 hover:border-[#E59A3D]/30 shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E59A3D]/10 text-[#E59A3D] flex items-center justify-center group-hover:bg-[#E59A3D] group-hover:text-black transition-colors duration-300">
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Custom Package CTA */}
          <div className="relative mt-12 pt-8 border-t border-white/10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users size={18} className="text-[#E59A3D]" />
              <p className="text-sm text-gray-300">
                Need a custom multi-destination or multi-event package?
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E59A3D] hover:bg-[#d08a2f] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#E59A3D]/30 hover:shadow-lg hover:shadow-[#E59A3D]/40 active:scale-95"
            >
              <Heart size={14} />
              Contact Us For Custom Package
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPARISON TABLE
      ═══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-10">
          <span className="font-script text-3xl text-[#E59A3D] block -mb-1 select-none">
            At a Glance
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            Quick Package Comparison
          </h3>
        </div>

        <div className="bg-[#14161C] rounded-3xl border border-white/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Features
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">
                    1 Day Event
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E59A3D] text-black text-[10px] font-black uppercase tracking-wider">
                      <Crown size={10} />
                      2 Days Grand
                    </span>
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">
                    Birthday / Baby
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Starting Price', col1: '₹25,000', col2: '₹60,000', col3: '₹25,000' },
                  { feature: 'Coverage Duration', col1: '1 Day', col2: '2 Days', col3: 'Event Day' },
                  { feature: 'Photography', col1: '1 Lead', col2: '1 Lead', col3: '1 Lead' },
                  { feature: 'Videography', col1: '1 Lead', col2: '1 Lead', col3: '1 Lead' },
                  { feature: 'Album Sheets', col1: '30 Sheets', col2: '60 Sheets', col3: '30 Sheets' },
                  { feature: 'Video Editing', col1: 'Full Edit', col2: 'Full + Teaser', col3: 'Full + Highlights' },
                  { feature: 'Calendars', col1: '2', col2: '2', col3: '—' },
                  { feature: 'Display Frame', col1: '—', col2: '12×18"', col3: '—' },
                  { feature: 'Pen Drive', col1: '64 GB', col2: '64 GB', col3: '64 GB' },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-white/5 last:border-0 ${
                      idx % 2 === 0 ? 'bg-[#14161C]' : 'bg-[#0D0E12]'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-gray-200">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 text-center">
                      {row.col1}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#E59A3D] text-center bg-[#E59A3D]/5">
                      {row.col2}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 text-center">
                      {row.col3}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ ACCORDION
      ═══════════════════════════════════════════ */}
      <div className="mt-24">
        <FAQSection />
      </div>

      {/* ═══════════════════════════════════════════
          BOOKING MODAL
      ═══════════════════════════════════════════ */}
      <BookingModal
        key={
          selectedPackageData
            ? `${selectedPackageData.serviceId}-${isBookingOpen}`
            : 'default-pricing-modal'
        }
        isOpen={isBookingOpen}
        initialPackageData={selectedPackageData}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedPackageData(null);
        }}
      />
    </div>
  );
}
