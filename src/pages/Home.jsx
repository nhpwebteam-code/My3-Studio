import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Play, Award } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import HomeStats from '../components/HomeStats';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import GalleryCard from '../components/GalleryCard';
import LightboxModal from '../components/LightboxModal';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import BookingModal from '../components/BookingModal';
import VideoReviewModal from '../components/VideoReviewModal';
import { galleryItems } from '../data/gallery';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackageData, setSelectedPackageData] = useState(null);
  const [isVideoReviewOpen, setIsVideoReviewOpen] = useState(false);

  // Feature 8 real client photos across weddings, pre-weddings, and birthdays
  const featuredWorks = galleryItems.slice(0, 8);

  const scrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Geometry of Natural Sunlight in Modern Portraiture",
      date: "September 12, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
      excerpt: "How manipulating natural window angles and soft negative fill transforms a simple portrait into a fine-art masterpiece."
    },
    {
      id: 2,
      title: "Why Printed Heirloom Albums Outlast the Digital Cloud",
      date: "August 28, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      excerpt: "In a world of fleeting social media feeds, hand-bound archival cotton rag albums become precious generational heirlooms."
    },
    {
      id: 3,
      title: "Behind the Lens: 3 Days at Paris Couture Week",
      date: "August 14, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
      excerpt: "Pacing high-speed runway lighting, backstage candid captures, and balancing high fashion with authentic human expressions."
    }
  ];

  return (
    <div className="space-y-28 pb-20 bg-white">
      {/* 1. Default Home Hero Section (Linked to by Logo click) */}
      <HomeHero
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenVideoReviews={() => setIsVideoReviewOpen(true)}
        onScrollToReviews={scrollToReviews}
      />

      {/* 2. Studio Figures & Trust Counter */}
      <HomeStats />

      {/* 3. About Us Section (Aligned 2-column layout) */}
      <AboutSection />

      {/* 4. Pricing & Official Client Packages Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-coral block mb-1 select-none">
              Pricing & Packages
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
              Official Photography Packages
            </h2>
          </div>
          <p className="text-sm text-charcoal-500 max-w-md font-medium">
            Select a package below to customize your deliverables and add optional extras (Drone, LED Walls, Cinematic Films, Candid Photography) with real-time price calculation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={(pkg) => {
                setSelectedPackageData(pkg);
                setIsBookingOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* 5. Selected Works & Portfolio Gallery */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
              Portfolio
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
              Selected Works & Memories
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 hover:border-coral text-xs uppercase tracking-wider font-bold text-charcoal-800 hover:text-coral group transition-all"
          >
            <span>View Full Gallery</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWorks.map((item) => (
            <GalleryCard key={item.id} item={item} onSelect={setSelectedImage} />
          ))}
        </div>
      </section>

      {/* 6. Upcoming Events & Calendar */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
              Calendar
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
              Upcoming Events & Exhibitions
            </h2>
          </div>
          <p className="text-sm text-charcoal-500 max-w-md font-medium">
            Join our team for live gallery showcases, seasonal photography walks, and open-house studio sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="rounded-3xl border border-gray-200 overflow-hidden group hover:border-coral/40 transition-all duration-300 flex flex-col sm:flex-row bg-white shadow-sm hover:shadow-xl"
            >
              <div className="sm:w-2/5 relative h-56 sm:h-auto overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase text-coral">
                  {evt.tag}
                </div>
              </div>
              <div className="sm:w-3/5 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-coral mb-2">
                    <Calendar size={13} />
                    <span>{evt.date}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-charcoal-900 mb-2">
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-3">
                    <MapPin size={13} className="text-gray-400" />
                    <span>{evt.location}</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-charcoal-900">Limited Passes</span>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-coral hover:text-coral-dark uppercase tracking-wider group/link"
                  >
                    <span>RSVP Now</span>
                    <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Customer Reviews & Verified Testimonials */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200/80 pb-6">
            <div>
              <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
                Feedback
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
                What Our Clients Say
              </h2>
            </div>

            <button
              onClick={() => setIsVideoReviewOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral hover:bg-coral-dark text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-coral/25 transition-all group"
            >
              <Play size={13} fill="white" className="text-white group-hover:scale-110 transition-transform" />
              <span>Watch Video Reviews</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>

          {/* Social Proof Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-charcoal-600">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-coral" />
              <span>Over 20,000 satisfied clients documented globally</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-coral" />
              <span>Verified Customer Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span>4.9 / 5 Average Client Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions (FAQ Section) */}
      <FAQSection />

      {/* 9. Contact Us & Date Reservation Section */}
      <ContactSection />

      {/* 10. Photography Journal & Tips */}
      <section id="blog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
              Journal
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
              Photography Tips & Stories
            </h2>
          </div>
          <p className="text-sm text-charcoal-500 max-w-md font-medium">
            Helpful tips on preparing for your shoot, lighting secrets, and choosing album layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-gray-200 bg-white overflow-hidden group hover:border-coral/40 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white">
                  {post.readTime}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-coral block mb-2">
                    {post.date}
                  </span>
                  <h3 className="font-display text-lg font-bold text-charcoal-900 group-hover:text-coral transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center text-xs font-bold text-coral group-hover:text-coral-dark">
                  <span>Read Article</span>
                  <ArrowRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 11. Closing Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-coral-50 via-white to-orange-50 border-2 border-coral/30 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-coral/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="font-script text-4xl sm:text-5xl text-coral block select-none">
              MY3 Studio
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal-900 tracking-tight">
              Have a date in mind for your event?
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 font-normal leading-relaxed pt-2 pb-4">
              Whether you're planning a 2-day wedding celebration, birthday shoot, or single-day event, our team is ready to capture your moments. Let's make it unforgettable.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-xs uppercase tracking-widest font-bold bg-coral text-white hover:bg-coral-dark transition-all shadow-xl shadow-coral/30 active:scale-95"
              >
                <span>Book Your Schedule</span>
                <ArrowRight size={15} />
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-xs uppercase tracking-widest font-bold bg-white hover:bg-gray-50 text-charcoal-800 border border-gray-300 hover:border-coral transition-all"
              >
                <span>Contact Studio</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <LightboxModal
          item={selectedImage}
          items={portfolioItems}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      )}

      {/* Interactive Booking Modal */}
      <BookingModal
        key={selectedPackageData ? `${selectedPackageData.serviceId}-${isBookingOpen}` : 'default-modal'}
        isOpen={isBookingOpen}
        initialPackageData={selectedPackageData}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedPackageData(null);
        }}
      />

      {/* Interactive Video Review Modal */}
      <VideoReviewModal
        isOpen={isVideoReviewOpen}
        onClose={() => setIsVideoReviewOpen(false)}
      />
    </div>
  );
}
