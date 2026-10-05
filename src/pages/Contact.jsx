import React from 'react';
import { useLocation } from 'react-router-dom';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';

export default function Contact() {
  const location = useLocation();
  const initialService = location.state?.selectedService || '';

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-28 bg-[#FAF7F2] text-charcoal min-h-screen">
      <SEO
        title="Contact Mythri Studios | Book a Shoot in Nandyal"
        description="Contact Mythri Studios in Nandyal, Andhra Pradesh. Get in touch to check date availability, request pricing quotes, or book your photography session today."
        canonical="https://mythristudios.in/contact"
      />
      <ContactSection initialService={initialService} />
    </div>
  );
}
