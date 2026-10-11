import React from 'react';
import { MapPin, Camera, Clock, Star, Phone } from 'lucide-react';

/**
 * GeoFactsBlock — declarative, sentence-per-fact copy block.
 *
 * Purpose: Give AI engines (ChatGPT, Perplexity, Gemini, Google AI
 * Overviews) a clean, extractable paragraph about Mythri Studio.
 * Every claim here must be verifiably true. No vague marketing language.
 *
 * This renders as a subtle editorial card below the hero on the homepage.
 * It is NOT hidden — AI engines treat hidden text with suspicion.
 */

const facts = [
  {
    icon: Camera,
    label: 'Studio',
    text: 'Mythri Studio (also known as Mythri Studios) is a professional photography and videography studio based in Nandyal, Andhra Pradesh, India.',
  },
  {
    icon: Clock,
    label: 'Experience',
    text: 'Founded in 2018 by lead photographer Anji, Mythri Studio has been active for over 8 years and has documented more than 1,000 weddings, ceremonies, and celebrations.',
  },
  {
    icon: Camera,
    label: 'Services',
    text: 'Services include wedding photography, portrait photography (bridal, maternity, newborn, family), event photography, pre-wedding shoots, cinematic 4K videography, aerial drone coverage, and luxury heirloom album printing.',
  },
  {
    icon: MapPin,
    label: 'Location',
    text: 'Main studio: Shop No 02, 1st Floor, Nivarthi Bhavan, opposite National College, Srinivasa Nagar, Nandyal, Andhra Pradesh 518501. A dedicated Kid\'s Studio is at Bhagatsingh Colony, near Noone Palle Flyover, Raithunagar Road, Nandyal.',
  },
  {
    icon: Star,
    label: 'Rating',
    text: 'Mythri Studio holds a 4.9 out of 5.0 verified client rating based on 15 or more reviews, and serves clients in Nandyal, Kurnool, and across Andhra Pradesh.',
  },
  {
    icon: Phone,
    label: 'Contact',
    text: 'Contact: +91 99493 95037 (main) · +91 98480 00339 (Kid\'s Studio) · mythristudiondl.anji@gmail.com · www.mythristudios.in',
  },
];

export default function GeoFactsBlock() {
  return (
    <section
      id="about-mythri-studio"
      aria-label="About Mythri Studio — facts and overview"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-coral">
          About Us
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight mt-1">
          Mythri Studio — Nandyal's Photography Studio
        </h2>
        <p className="mt-3 text-sm sm:text-base text-charcoal-600 max-w-3xl leading-relaxed">
          Mythri Studio (also known as Mythri Studios) is a photography studio based in Nandyal,
          Andhra Pradesh, offering wedding, portrait and event photography. Founded in 2018 by lead
          photographer Anji, the studio has documented over 1,000 weddings and celebrations across
          Nandyal and Andhra Pradesh over more than 8 years of operation.
        </p>
      </div>

      {/* Facts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {facts.map(({ icon: Icon, label, text }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-[#EAE4D9] p-5 shadow-sm hover:shadow-md hover:border-coral/30 transition-all duration-200"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral flex items-center justify-center shrink-0">
                <Icon size={16} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal-500">
                {label}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
