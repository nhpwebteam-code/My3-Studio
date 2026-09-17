import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock, MessageSquare } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { studioConfig } from '../data/studioConfig';

export default function Contact() {
  const location = useLocation();
  const initialService = location.state?.selectedService || '';

  return (
    <div className="pb-24 space-y-16">
      <PageHeader
        breadcrumb="Contact & Booking"
        badge="Initiate Dialogue"
        title="Commission Your Vision"
        subtitle="We accept a limited number of commissions each season to ensure uncompromising artistic dedication to every client."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Studio Details & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">
                Atelier Location
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-studio-50 mb-3">
                Visit Mythri Studios
              </h2>
              <p className="text-sm text-studio-400 font-light leading-relaxed">
                Our main daylight studio and post-production suite is located in Bengaluru's cultural quarter. Private consultations are scheduled by prior appointment.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-studio-900/80 border border-studio-800">
                <MapPin size={18} className="text-gold shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-studio-300">
                  <strong className="block text-studio-100 font-medium mb-0.5">Address</strong>
                  {studioConfig.contact.address.street}, {studioConfig.contact.address.city}, {studioConfig.contact.address.state} — {studioConfig.contact.address.zip}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-studio-900/80 border border-studio-800">
                <Mail size={18} className="text-gold shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-studio-300">
                  <strong className="block text-studio-100 font-medium mb-0.5">Email Inquiries</strong>
                  <a href={`mailto:${studioConfig.contact.email}`} className="hover:text-gold transition-colors">
                    {studioConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-studio-900/80 border border-studio-800">
                <Phone size={18} className="text-gold shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-studio-300">
                  <strong className="block text-studio-100 font-medium mb-0.5">Direct Line</strong>
                  <a href={`tel:${studioConfig.contact.phone}`} className="hover:text-gold transition-colors">
                    {studioConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-5 rounded-xl bg-studio-900/60 border border-studio-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-gold">
                <Clock size={15} />
                <span>Operating Hours</span>
              </div>
              <div className="space-y-2 text-xs text-studio-300">
                {studioConfig.contact.hours.map((h, i) => (
                  <div key={i} className="flex justify-between border-b border-studio-800/40 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-studio-400">{h.days}</span>
                    <span className="text-studio-200 text-right">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-1 block">
                Direct Submission
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-studio-50">
                Booking Inquiry Form
              </h2>
            </div>
            <ContactForm initialService={initialService} />
          </div>
        </div>
      </div>
    </div>
  );
}
