import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import ContactForm from './ContactForm';
import { studioConfig } from '../data/studioConfig';

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
      {/* Header aligned with other sections */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
            Get In Touch
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
            Contact & Date Reservation
          </h2>
        </div>
        <p className="text-sm text-charcoal-500 max-w-md font-medium">
          Check date availability for your celebration or discuss custom add-ons directly with our team.
        </p>
      </div>

      {/* 2-Column Aligned Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column (5 cols): Studio Information & Working Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="font-display font-black text-2xl text-charcoal-900">
              Studio Location & Direct Lines
            </h3>
            <p className="text-sm text-charcoal-600 font-normal leading-relaxed">
              Visit our daylight studio to view physical sample albums, discuss frame dimensions, or talk through your event day shot list.
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <MapPin size={18} className="text-coral shrink-0 mt-1" />
              <div className="text-xs sm:text-sm text-charcoal-600">
                <strong className="block text-charcoal-900 font-bold mb-0.5">Studio Address</strong>
                42 Heritage Boulevard, Art Quarter, Bengaluru, KA 560001
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <Phone size={18} className="text-coral shrink-0 mt-1" />
              <div className="text-xs sm:text-sm text-charcoal-600">
                <strong className="block text-charcoal-900 font-bold mb-0.5">Phone & WhatsApp</strong>
                <a href={`tel:${studioConfig.contact.phone}`} className="hover:text-coral transition-colors font-semibold">
                  {studioConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <Mail size={18} className="text-coral shrink-0 mt-1" />
              <div className="text-xs sm:text-sm text-charcoal-600">
                <strong className="block text-charcoal-900 font-bold mb-0.5">Email Inquiries</strong>
                <a href={`mailto:${studioConfig.contact.email}`} className="hover:text-coral transition-colors font-semibold">
                  {studioConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours Box */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-coral">
              <Clock size={15} />
              <span>Studio Working Hours</span>
            </div>
            <div className="space-y-2 text-xs text-charcoal-600">
              {studioConfig.contact.hours.map((h, i) => (
                <div key={i} className="flex justify-between border-b border-gray-200/80 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-charcoal-500 font-medium">{h.days}</span>
                  <span className="text-charcoal-900 font-bold text-right">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Message Form */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <span className="font-script text-3xl text-coral block -mb-1 select-none">
              Direct Note
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal-900">
              Send Us a Message
            </h3>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
