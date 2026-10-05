import React, { useState } from 'react';
import HomeHero from '../components/HomeHero';
import CuratedFramesSection from '../components/CuratedFramesSection';
import HomeDisciplines from '../components/HomeDisciplines';
import ReviewsSection from '../components/ReviewsSection';
import BookingModal from '../components/BookingModal';
import VideoReviewModal from '../components/VideoReviewModal';
import SEO from '../components/SEO';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoReviewOpen, setIsVideoReviewOpen] = useState(false);

  return (
    <div className="bg-[#FAF7F2] text-charcoal min-h-screen">
      <SEO
        title="Mythri Studios | Best Photography Studio in Nandyal, Andhra Pradesh"
        description="Mythri Studios - Nandyal's photography studio for weddings, portraits and events. Creative, detail-focused photography serving Nandyal and Andhra Pradesh."
        keywords="mythri studios, mythristudios, my3 studios, best photography in nandyal, photography studio nandyal, wedding photography nandyal, portrait photography andhra pradesh"
        canonical="https://mythristudios.in/"
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

      {/* 4. Inspiring Client Experiences Testimonials */}
      <ReviewsSection />

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
