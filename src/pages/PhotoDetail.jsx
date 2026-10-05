import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  MapPin,
  Calendar,
  Sparkles,
  Phone,
  MessageCircle,
  Share2,
  Check,
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import {
  FEATURED_PHOTO_CONFIG,
  FEATURED_SLUG_BY_ID,
  FEATURED_ID_BY_SLUG,
  galleryItems as defaultGalleryItems,
} from '../data/gallery';
import SEO from '../components/SEO';

export default function PhotoDetail({ onOpenBooking }) {
  const { photoSlug } = useParams();
  const navigate = useNavigate();
  const { gallery } = useStudioData();
  const [copied, setCopied] = React.useState(false);

  // Fallback to default items if context is still hydrating
  const allItems = gallery && gallery.length > 0 ? gallery : defaultGalleryItems;

  // Resolve target item from slug or ID
  const item = useMemo(() => {
    if (!photoSlug) return null;

    // Check if slug maps to an ID in FEATURED_PHOTO_CONFIG
    const mappedId = FEATURED_ID_BY_SLUG[photoSlug];
    if (mappedId) {
      const found = allItems.find((p) => p.id === mappedId);
      if (found) return found;
    }

    // Direct match on slug
    const bySlug = allItems.find((p) => p.slug === photoSlug);
    if (bySlug) return bySlug;

    // Direct match on id
    const byId = allItems.find((p) => p.id === photoSlug);
    if (byId) return byId;

    return null;
  }, [photoSlug, allItems]);

  // Current featured index and prev/next links
  const featuredIndex = useMemo(() => {
    return FEATURED_PHOTO_CONFIG.findIndex(
      (p) => p.slug === photoSlug || (item && p.id === item.id)
    );
  }, [photoSlug, item]);

  const prevFeaturedSlug = useMemo(() => {
    if (featuredIndex === -1) return null;
    const prevIdx =
      (featuredIndex - 1 + FEATURED_PHOTO_CONFIG.length) %
      FEATURED_PHOTO_CONFIG.length;
    return FEATURED_PHOTO_CONFIG[prevIdx].slug;
  }, [featuredIndex]);

  const nextFeaturedSlug = useMemo(() => {
    if (featuredIndex === -1) return null;
    const nextIdx = (featuredIndex + 1) % FEATURED_PHOTO_CONFIG.length;
    return FEATURED_PHOTO_CONFIG[nextIdx].slug;
  }, [featuredIndex]);

  // Other featured photos for bottom gallery explore strip
  const otherFeaturedItems = useMemo(() => {
    return FEATURED_PHOTO_CONFIG.map((config) => {
      const photoItem = allItems.find((p) => p.id === config.id);
      return {
        ...photoItem,
        slug: config.slug,
      };
    }).filter((p) => p.id && (!item || p.id !== item.id));
  }, [allItems, item]);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [photoSlug]);

  // Handle URL share / copy link
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${item?.title || 'Featured Photograph'} | MY3 Studios`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // User cancelled share
    }
  };

  // If photo not found, render elegant fallback
  if (!item) {
    return (
      <div className="w-full min-h-[80vh] bg-[#FAF7F2] text-charcoal flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-coral-50 text-coral flex items-center justify-center mx-auto mb-4">
            <Camera size={28} />
          </div>
          <h2 className="font-display font-black text-2xl text-charcoal-900 tracking-tight">
            Photograph Not Found
          </h2>
          <p className="text-sm text-charcoal-600 mt-2 leading-relaxed">
            The requested photograph could not be found or may have been updated in our curated collection.
          </p>
          <div className="mt-6">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md"
            >
              <ArrowLeft size={16} />
              <span>Return to Gallery</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentFeaturedNumber = featuredIndex !== -1 ? featuredIndex + 1 : null;
  const whatsappInquiryMsg = encodeURIComponent(
    `Hello Anji garu (MY3 Studios)! I am viewing the featured photo "${item.title}" on your website (/gallery/${photoSlug}). Could you please share booking packages and availability for this photography style?`
  );
  const whatsappUrl = `https://wa.me/919949395037?text=${whatsappInquiryMsg}`;

  return (
    <div className="w-full bg-[#FAF7F2] text-charcoal min-h-screen">
      <SEO
        title={`${item.title} | Mythri Studios Nandyal`}
        description={
          item.subtitle ||
          item.description ||
          `View ${item.title} captured by Mythri Studios in Nandyal, Andhra Pradesh.`
        }
        canonical={`https://mythristudios.in/gallery/${photoSlug}`}
        ogImage={item.imageUrl}
        ogType="article"
      />
      {/* ─── 1. Sub-Header Navigation Bar ─── */}
      <section className="pt-24 sm:pt-28 pb-4 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
          {/* Back link */}
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-700 hover:text-coral transition-colors group cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Gallery Collection</span>
          </Link>

          {/* Featured Prev / Next Nav */}
          {featuredIndex !== -1 && (
            <div className="flex items-center gap-3">
              <span className="text-[11px] sm:text-xs font-mono font-bold text-charcoal-500 uppercase tracking-widest hidden sm:inline-block">
                Featured {currentFeaturedNumber} of {FEATURED_PHOTO_CONFIG.length}
              </span>

              <div className="flex items-center gap-1.5 bg-white rounded-full p-1 border border-gray-200 shadow-2xs">
                {prevFeaturedSlug && (
                  <Link
                    to={`/gallery/${prevFeaturedSlug}`}
                    className="p-1.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold text-charcoal-700 hover:text-coral hover:bg-coral-50 transition-all flex items-center gap-1"
                    title="Previous Featured Photo"
                  >
                    <ArrowLeft size={14} />
                    <span className="hidden sm:inline">Prev</span>
                  </Link>
                )}
                <span className="text-gray-300 text-xs px-1">|</span>
                {nextFeaturedSlug && (
                  <Link
                    to={`/gallery/${nextFeaturedSlug}`}
                    className="p-1.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold text-charcoal-700 hover:text-coral hover:bg-coral-50 transition-all flex items-center gap-1"
                    title="Next Featured Photo"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── 2. Main Photo Showcase + Narrative Layout ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: High-Resolution Photo Presentation (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full rounded-3xl overflow-hidden bg-charcoal-900 shadow-2xl border-4 border-white group">
              {/* Photo Display */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto max-h-[80vh] object-contain sm:object-cover mx-auto select-none"
              />

              {/* Watermark Emblem at bottom-center matching Gallery */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center p-0.5 border border-white">
                  <img
                    src="/logo.png"
                    alt="MY3 Studios"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>

              {/* Featured Badge Overlay (Top Left) */}
              <div className="absolute top-4 left-4 z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles size={12} className="text-coral" />
                  <span>Featured Photograph</span>
                </div>
              </div>

              {/* Share Button (Top Right) */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-coral backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                  title="Share this photograph"
                  aria-label="Share photograph"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
                </button>
              </div>
            </div>

            {/* Quick Caption Note */}
            <p className="text-xs text-charcoal-500 font-mono tracking-wide text-center mt-3">
              MY3 Studios Archive • High-Resolution Master Documentation
            </p>
          </div>

          {/* Right Column: Narrative & Editorial Metadata (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Category Pill */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3.5 py-1 rounded-full bg-coral-50 border border-coral/20 text-coral text-xs font-bold uppercase tracking-widest">
                {item.categoryLabel || item.category.toUpperCase()}
              </span>
              <span className="text-xs text-charcoal-400 font-mono">
                {item.year || '2026'}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-charcoal-900 tracking-tight leading-tight">
              {item.title}
            </h1>

            {/* Accent underline */}
            <div className="w-12 h-1 bg-coral mt-3 mb-5 rounded-full" />

            {/* Editorial Description */}
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-sans font-normal">
              {item.description ||
                'Captured with authentic emotion and artistic lighting by MY3 Studios, preserving every heartfelt detail for generations to treasure.'}
            </p>

            {/* Technical & Story Metadata Card */}
            <div className="mt-6 bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 font-mono border-b border-gray-100 pb-2">
                Production Documentation
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-charcoal-400 block text-[11px] font-medium">Location</span>
                  <span className="font-bold text-charcoal-800 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-coral shrink-0" />
                    <span>{item.location || 'Nandyal / Kurnool, AP'}</span>
                  </span>
                </div>

                <div>
                  <span className="text-charcoal-400 block text-[11px] font-medium">Session Year</span>
                  <span className="font-bold text-charcoal-800 flex items-center gap-1 mt-0.5">
                    <Calendar size={12} className="text-coral shrink-0" />
                    <span>{item.year || '2026'}</span>
                  </span>
                </div>

                <div>
                  <span className="text-charcoal-400 block text-[11px] font-medium">Master Optics</span>
                  <span className="font-bold text-charcoal-800 flex items-center gap-1 mt-0.5">
                    <Camera size={12} className="text-coral shrink-0" />
                    <span>{item.camera || 'Sony Alpha 7R V'}</span>
                  </span>
                </div>

                <div>
                  <span className="text-charcoal-400 block text-[11px] font-medium">Atelier Team</span>
                  <span className="font-bold text-charcoal-800 flex items-center gap-1 mt-0.5">
                    <Sparkles size={12} className="text-coral shrink-0" />
                    <span>MY3 Principal Crew</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Booking / Inquiry CTAs */}
            <div className="mt-8 space-y-3">
              <div className="p-4 rounded-2xl bg-coral-50/60 border border-coral/20">
                <h4 className="font-display font-bold text-sm text-charcoal-900">
                  Love this style for your celebration?
                </h4>
                <p className="text-xs text-charcoal-600 mt-1">
                  Connect with lead photographer Anji directly to reserve dates and customize packages.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-3.5">
                  {/* WhatsApp Inquiry */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer active:scale-95"
                  >
                    <MessageCircle size={15} />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  {/* Direct Phone Call */}
                  <a
                    href="tel:+919949395037"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-charcoal-300 hover:border-coral bg-white hover:bg-coral-50 text-charcoal-800 hover:text-coral text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
                  >
                    <Phone size={14} />
                    <span>Call Studio</span>
                  </a>
                </div>

                {onOpenBooking && (
                  <button
                    onClick={onOpenBooking}
                    className="w-full mt-2.5 text-center text-xs font-bold text-charcoal-700 hover:text-coral transition-colors underline cursor-pointer"
                  >
                    Or open interactive booking form &rarr;
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 3. Other Featured Photographs Grid ─── */}
      {otherFeaturedItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-24 border-t border-gray-200/80 mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-coral font-mono">
                Curated Selection
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-charcoal-900 tracking-tight mt-0.5">
                Explore More Featured Photographs
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs font-bold uppercase tracking-wider text-charcoal-700 hover:text-coral transition-colors hidden sm:inline-block"
            >
              View Full Gallery &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {otherFeaturedItems.slice(0, 5).map((featured) => (
              <Link
                key={featured.slug}
                to={`/gallery/${featured.slug}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-charcoal-100 shadow-xs hover:shadow-xl transition-all duration-300 border border-white"
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase text-coral tracking-widest font-mono">
                    {featured.slug.toUpperCase()}
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-1">
                    {featured.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
