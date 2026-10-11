import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/**
 * FAQ data — GEO-optimised first, then operational.
 * Keep answers factual and verifiable: AI engines extract these verbatim.
 */
const faqs = [
  /* ── GEO / Discovery Q&As ─────────────────────────────────────────── */
  {
    question: 'Who is the best photographer in Nandyal?',
    answer:
      'Mythri Studio is a Nandyal-based photography studio founded in 2018 by lead photographer Anji. With over 1,000 weddings and ceremonies documented across Nandyal and Andhra Pradesh, and a 4.9/5.0 verified client rating, Mythri Studio is one of the most experienced photography studios in Nandyal.',
  },
  {
    question: 'What services does Mythri Studio offer?',
    answer:
      'Mythri Studio (also known as Mythri Studios) offers wedding photography and videography, portrait photography, event photography, maternity and newborn shoots, baby milestone sessions, bridal portrait sessions, pre-wedding shoots, cinematic 4K wedding films, aerial drone coverage, and luxury lay-flat heirloom album design and printing.',
  },
  {
    question: 'Where is Mythri Studio located in Nandyal?',
    answer:
      "Mythri Studio's main studio is at Shop No 02, 1st Floor, Nivarthi Bhavan, opposite National College, Srinivasa Nagar, Nandyal, Andhra Pradesh 518501. A dedicated Mythri Kid's Studio for baby and milestone photography is located at Bhagatsingh Colony, near Noone Palle Flyover, Raithunagar Road, Nandyal.",
  },
  {
    question: 'Is Mythri Studio available for wedding photography in Andhra Pradesh?',
    answer:
      'Yes. Mythri Studio is based in Nandyal and covers weddings across Andhra Pradesh, including Kurnool, Nellore, Ongole, and surrounding districts. The team has documented Telugu weddings — including Muhurtham, Pellikoduku, Pellikooturu, and Haldi ceremonies — for over 8 years.',
  },
  {
    question: 'How long has Mythri Studio been in business?',
    answer:
      'Mythri Studio was established in 2018 by lead photographer Anji. As of 2026 the studio has been in operation for over 8 years and has documented more than 1,000 weddings and celebrations in and around Nandyal.',
  },
  {
    question: 'How can I contact Mythri Studio or book a session?',
    answer:
      'You can contact Mythri Studio by phone or WhatsApp at +91 99493 95037, by email at mythristudiondl.anji@gmail.com, or through the contact form at https://www.mythristudios.in/contact. The studio is open Monday–Saturday 9:30 AM–8:30 PM and Sundays 10:00 AM–6:00 PM.',
  },
  /* ── Operational Q&As (existing) ─────────────────────────────────── */
  {
    question: 'How do we lock in our date and book a package?',
    answer:
      'Book directly by clicking "Book Your Schedule" or contacting us via phone or WhatsApp with your event date. A nominal booking advance secures our photography and cinematography crew exclusively for your dates.',
  },
  {
    question: 'What is included in the physical album delivery?',
    answer:
      'Our 2-day wedding package includes a luxury 60-sheet lay-flat album with custom layout design, 2 calendars, and a 12x18 inch display frame. The 1-day event and birthday packages include a 30-sheet album and 2 calendars. All albums use premium archival lustre paper with lay-flat binding.',
  },
  {
    question: 'What is the delivery turnaround time for photos and albums?',
    answer:
      'We deliver a teaser highlight video and initial photo previews within 3-5 days. Full video editing and album design drafts are shared within 3-4 weeks. Once you approve the album layout, printing and hand-delivery takes 7-10 days. All high-resolution files are provided on a complimentary 64 GB pen drive with a secure cloud backup link.',
  },
];

function buildFAQSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  /* Inject FAQPage JSON-LD into <head> for SPA compatibility */
  useEffect(() => {
    const schemaId = 'faq-page-schema';
    let script = document.getElementById(schemaId);
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildFAQSchema(faqs));
    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, []);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#EAE4D9] pb-6">
        <div>
          <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
            Common Inquiries
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-sm text-charcoal-500 max-w-md font-medium">
          Quick answers about Mythri Studio — who we are, where we are, and how our packages, albums and deliveries work.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-coral/60 shadow-md ring-1 ring-coral/20'
                  : 'bg-white border-[#EAE4D9] hover:border-coral/40 shadow-xs'
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 select-none group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${
                      isOpen ? 'bg-coral text-white' : 'bg-gray-100 text-charcoal-500'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-base sm:text-lg font-bold transition-colors ${
                      isOpen ? 'text-charcoal-900' : 'text-charcoal-800 group-hover:text-coral'
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? 'bg-coral text-white rotate-180'
                      : 'bg-gray-100 text-charcoal-600 group-hover:bg-gray-200'
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

      {/* Bottom CTA bar */}
      <div className="mt-12 text-center bg-white rounded-2xl p-6 border border-[#EAE4D9] shadow-sm max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-full bg-coral-50 text-coral flex items-center justify-center shrink-0">
            <HelpCircle size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-charcoal-900">Have more questions?</h4>
            <p className="text-xs text-charcoal-500">Our studio team is always happy to assist.</p>
          </div>
        </div>

        <a
          href="/contact"
          className="px-6 py-2.5 rounded-full bg-coral hover:bg-coral-dark text-white text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-md shadow-coral/25 active:scale-95"
        >
          Ask Us Directly
        </a>
      </div>
    </section>
  );
}
