import React from 'react';
import ServicesShowcase from '../components/ServicesShowcase';
import SEO from '../components/SEO';

export default function Services() {
  return (
    <div className="pt-20 sm:pt-24 pb-24 bg-[#FAF7F2] text-charcoal min-h-screen">
      <SEO
        title="Wedding, Portrait & Event Photography | Mythri Studios"
        description="Comprehensive photography services by Mythri Studios in Nandyal, Andhra Pradesh. Specializing in wedding photography, candid shoots, portraits, events, and luxury albums."
        canonical="https://mythristudios.in/services"
      />
      <ServicesShowcase />
    </div>
  );
}
