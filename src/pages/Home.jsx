import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import HomeStats from '../components/HomeStats';
import GalleryCard from '../components/GalleryCard';
import LightboxModal from '../components/LightboxModal';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import { portfolioItems } from '../data/portfolio';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  // Pick curated preview images for the home teaser
  const featuredWorks = portfolioItems.slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <HomeHero />

      {/* Studio Figures */}
      <HomeStats />

      {/* Featured Works Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-studio-50">
              Selected Frames & Stories
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-gold hover:text-gold-light group"
          >
            <span>View Complete Archive</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWorks.map((item) => (
            <GalleryCard key={item.id} item={item} onSelect={setSelectedImage} />
          ))}
        </div>
      </section>

      {/* Core Studio Offerings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">
            Bespoke Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-studio-50 mb-3">
            Tailored Photography Experiences
          </h2>
          <p className="text-sm text-studio-400 font-light leading-relaxed">
            Every celebration and editorial production is approached as a distinct fine art narrative with dedicated creative direction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Client Accolades & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">
            Accolades & Trust
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-studio-50">
            Kind Words From Our Patrons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </section>

      {/* Closing Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden border border-gold/30">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold font-semibold mb-3">
              <Sparkles size={13} />
              <span>Commission a Story</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-studio-50 mb-4">
              Let's Create Timeless Art Together
            </h2>
            <p className="text-sm sm:text-base text-studio-300 font-light mb-8 leading-relaxed">
              Whether you are planning a destination celebration, lookbook campaign, or personal portrait suite, we would love to hear your vision.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-gold text-studio-950 hover:bg-gold-light transition-all shadow-xl hover:shadow-gold/20"
            >
              <span>Schedule Atelier Consultation</span>
              <ArrowRight size={15} />
            </Link>
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
    </div>
  );
}
