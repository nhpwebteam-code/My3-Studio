import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import BookingModal from '../components/BookingModal';
import FAQSection from '../components/FAQSection';
import { services } from '../data/services';
import { CheckCircle, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [selectedPackageData, setSelectedPackageData] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookService = (packageData) => {
    setSelectedPackageData(packageData);
    setIsBookingOpen(true);
  };

  return (
    <div className="pb-24 space-y-20 bg-[#FAF7F2] text-charcoal min-h-screen">
      <PageHeader
        kicker="Transparent Investments"
        title="Event Packages & Pricing"
        subtitle="Complete upfront pricing for multi-day weddings, birthday milestones, and celebratory gatherings with custom album options and 4K cinematography."
      />

      {/* Main Packages Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={handleBookService}
            />
          ))}
        </div>
      </section>

      {/* Package Guarantees / Studio Inclusions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-[#EAE4D9] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-script text-3xl text-coral block -mb-1 select-none">
              Inclusions
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal-900 tracking-tight">
              Standard Across Every Package
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-2">
              Every MY3 booking includes professional peace-of-mind commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-[#EAE4D9] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral flex items-center justify-center font-bold">
                <CheckCircle size={20} />
              </div>
              <h4 className="font-bold text-sm text-charcoal-900">Dual Memory Cards</h4>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Real-time backup recording during all live rituals so no moment is ever lost.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EAE4D9] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-bold text-sm text-charcoal-900">64 GB Pen Drive</h4>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                All raw and edited high-resolution media delivered safely in a high-speed physical drive.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EAE4D9] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <h4 className="font-bold text-sm text-charcoal-900">Lay-Flat Designer Albums</h4>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Archival non-fade matte paper binding with custom photo spreads and multiple sheets layouts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EAE4D9] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral flex items-center justify-center font-bold">
                <PhoneCall size={20} />
              </div>
              <h4 className="font-bold text-sm text-charcoal-900">Direct Consultation</h4>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Pre-shoot briefing with the lead artist to review schedules, lighting, and rituals.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-[#EAE4D9] text-center">
            <p className="text-sm text-charcoal-600 mb-4">
              Need a custom multi-destination or multi-event package? We are happy to customize.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-coral hover:bg-coral-dark text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-coral/30"
            >
              Contact Us For Custom Package
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FAQSection />

      {/* Interactive Booking Modal */}
      <BookingModal
        key={selectedPackageData ? `${selectedPackageData.serviceId}-${isBookingOpen}` : 'default-pricing-modal'}
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
