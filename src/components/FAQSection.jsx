import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How do we lock in our date and book a package?",
    answer: "You can book directly by clicking 'Book Your Schedule' or contacting us via phone/WhatsApp with your event date. A nominal booking advance secures our photography and cinematography crew exclusively for your dates."
  },
  {
    question: "What is included in the physical album delivery?",
    answer: "Our 2-day package includes a luxury 60-sheets album with custom layout design, 2 calendars, and a 12x18 inch display frame. The 1-day event and birthday packages include a 30-sheets album and 2 calendars. All albums use premium archival lustre paper with lay-flat binding."
  },
  {
    question: "Can we add optional extras like Drone, LED screens, or Candid coverage later?",
    answer: "Yes, absolutely! You can customize your package anytime before the event date. Popular add-ons include 4K Aerial Drone (₹7,000), Live LED Walls (₹7,000), Candid / Candy Photography (₹10,000), and Cinematic 4K Film Production (₹15,000 - ₹16,000)."
  },
  {
    question: "Can we order additional album sheets?",
    answer: "Yes! If you have more favorite photos that you would like included, you can add extra album sheets for just ₹500 per sheet during the album layout design review."
  },
  {
    question: "What is the delivery turnaround time for videos and albums?",
    answer: "We deliver a teaser highlight video and initial photo previews within 3 to 5 days. Full video editing and album design drafts are shared within 3 to 4 weeks. Once you approve the album layout, printing and hand-delivery takes 7 to 10 days."
  },
  {
    question: "Do you deliver all raw photos and high-resolution files?",
    answer: "Yes, all high-resolution edited photos and full-length edited videos are handed over on a complimentary high-speed 64 GB Pen Drive along with a secure cloud backup link."
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
      {/* Header Aligned with other sections */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
            Common Inquiries
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-sm text-charcoal-500 max-w-md font-medium">
          Everything you need to know about our event packages, album specifications, extras, and delivery timelines.
        </p>
      </div>

      {/* Accordion List Container with Impeccable Alignment */}
      <div className="max-w-4xl mx-auto space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-gray-50/80 border-coral/50 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 select-none group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${isOpen ? 'bg-coral text-white' : 'bg-gray-100 text-charcoal-500'}`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? 'text-charcoal-900' : 'text-charcoal-800 group-hover:text-coral'}`}>
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-coral text-white rotate-180' : 'bg-gray-100 text-charcoal-600 group-hover:bg-gray-200'
                  }`}
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal animate-fade-in border-t border-gray-100/60 mt-1">
                  <p className="pl-9">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Still Have Questions Bar */}
      <div className="mt-12 text-center bg-gray-50 rounded-2xl p-6 border border-gray-200 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-full bg-coral-50 text-coral flex items-center justify-center shrink-0">
            <HelpCircle size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-charcoal-900">Have more questions?</h4>
            <p className="text-xs text-charcoal-500">Our studio concierge is always happy to assist.</p>
          </div>
        </div>

        <a
          href="#contact"
          className="px-6 py-2.5 rounded-full bg-coral hover:bg-coral-dark text-white text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-md shadow-coral/25 active:scale-95"
        >
          Ask Us Directly
        </a>
      </div>
    </section>
  );
}
