import React, { useState } from 'react';
import HomeHero from '../components/HomeHero';
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
        onScrollToReviews={() => setIsVideoReviewOpen(true)}
      />

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
