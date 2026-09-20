import React from 'react';
import PageHeader from '../components/PageHeader';
import ServicesShowcase from '../components/ServicesShowcase';

export default function Services() {
  return (
    <div className="pb-24 bg-[#FAF7F2] text-charcoal min-h-screen">
      <PageHeader
        kicker="What We Do"
        title="Our Photoshoot Services"
        subtitle="From intimate portraits to grand destination weddings — Mythri Studio covers every photographic occasion with cinematic precision and heartfelt storytelling."
      />

      <ServicesShowcase />
    </div>
  );
}
