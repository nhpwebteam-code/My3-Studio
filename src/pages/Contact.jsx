import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { studioConfig } from '../data/studioConfig';

export default function Contact() {
  const location = useLocation();
  const initialService = location.state?.selectedService || '';

  return (
    <div className="pb-24 space-y-16 bg-white">
      <PageHeader
        kicker="Get In Touch"
        title="Bookings & Inquiries"
        subtitle="Have a date in mind or want to customize a package? Reach out to our team directly or send us a message below."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Studio Details & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-script text-3xl text-coral block -mb-1 select-none">
                Visit Us
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal-900 mb-3">
                MY3 Studio
              </h2>
              <p className="text-sm text-charcoal-600 font-normal leading-relaxed">
                Feel free to visit our daylight studio to look through our sample printed albums, check out physical frame samples, and discuss your event timeline in person.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <MapPin size={18} className="text-coral shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-charcoal-600">
                  <strong className="block text-charcoal-900 font-bold mb-0.5">Address</strong>
                  42 Heritage Boulevard, Art Quarter, Bengaluru, KA 560001
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <Mail size={18} className="text-coral shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-charcoal-600">
                  <strong className="block text-charcoal-900 font-bold mb-0.5">Email</strong>
                  <a href={`mailto:${studioConfig.contact.email}`} className="hover:text-coral transition-colors font-semibold">
                    {studioConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <Phone size={18} className="text-coral shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-charcoal-600">
                  <strong className="block text-charcoal-900 font-bold mb-0.5">Phone & WhatsApp</strong>
                  <a href={`tel:${studioConfig.contact.phone}`} className="hover:text-coral transition-colors font-semibold">
                    {studioConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-coral">
                <Clock size={15} />
                <span>Working Hours</span>
              </div>
              <div className="space-y-2 text-xs text-charcoal-600">
                {studioConfig.contact.hours.map((h, i) => (
                  <div key={i} className="flex justify-between border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                    <span className="text-charcoal-500 font-medium">{h.days}</span>
                    <span className="text-charcoal-900 font-bold text-right">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <span className="font-script text-3xl text-coral block -mb-1 select-none">
                Say Hello
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal-900">
                Send Us a Message
              </h2>
            </div>
            <ContactForm initialService={initialService} />
          </div>
        </div>
      </div>
    </div>
  );
}
