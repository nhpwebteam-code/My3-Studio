import React, { useState } from 'react';
import HomeHero from '../components/HomeHero';
import CuratedFramesSection from '../components/CuratedFramesSection';
import ReviewsSection from '../components/ReviewsSection';
import JustdialReviews from '../components/JustdialReviews';
import BookingModal from '../components/BookingModal';
import VideoReviewModal from '../components/VideoReviewModal';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoReviewOpen, setIsVideoReviewOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section ("Home Section") - Pure White, High Impact */}
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

      {/* 3. Client Testimonials */}
      <ReviewsSection />

      {/* 3. Justdial Reviews */}
      <JustdialReviews />

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
