import React, { useState } from 'react';
import HomeHero from '../components/HomeHero';
import CuratedFramesSection from '../components/CuratedFramesSection';
import HomeDisciplines from '../components/HomeDisciplines';
import ReviewsSection from '../components/ReviewsSection';
import GeoFactsBlock from '../components/GeoFactsBlock';
import FAQSection from '../components/FAQSection';
import BookingModal from '../components/BookingModal';
import VideoReviewModal from '../components/VideoReviewModal';
import SEO from '../components/SEO';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoReviewOpen, setIsVideoReviewOpen] = useState(false);

  return (
    <div className="bg-[#FAF7F2] text-charcoal min-h-screen">
      <SEO
        title="Mythri Studio | Best Photography in Nandyal, Andhra Pradesh"
        description="Mythri Studio (Mythri Studios) — Nandyal's photography studio for weddings, portraits and events. Serving Nandyal and Andhra Pradesh."
        keywords="mythri studio, mythri studios, mythristudios, my3 studio, my3 studios, best photography in nandyal, photography studio nandyal, wedding photography nandyal, portrait photography andhra pradesh"
        canonical="https://www.mythristudios.in/"
      />
      {/* 1. Hero Section ("Home Section") */}
      <HomeHero
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenVideoReviews={() => setIsVideoReviewOpen(true)}
        onScrollToReviews={() => {
          const el = document.getElementById('curated-frames');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Curated Frames Editorial Section (Scroll-driven interactive frames arc) */}
      <CuratedFramesSection onOpenBooking={() => setIsBookingOpen(true)} />

      {/* 3. Core Photography Disciplines (H2s: Wedding Photography · Portrait Sessions · Event Coverage) */}
      <HomeDisciplines onOpenBooking={() => setIsBookingOpen(true)} />

      {/* 4. About / Facts Block — declarative facts for AI/GEO extraction */}
      <div className="py-16 sm:py-20 bg-[#FAF7F2]">
        <GeoFactsBlock />
      </div>

      {/* 5. Inspiring Client Experiences Testimonials */}
      <ReviewsSection />

      {/* 6. FAQ — GEO-optimised Q&As + FAQPage JSON-LD */}
      <div className="py-16 sm:py-20 bg-[#FAF7F2]">
        <FAQSection />
      </div>

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Interactive Video Review Modal */}
      <VideoReviewModal
        isOpen={isVideoReviewOpen}
        onClose={() => setIsVideoReviewOpen(false)}
      />
    </div>
  );
}
