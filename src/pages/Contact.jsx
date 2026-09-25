import React from 'react';
import { useLocation } from 'react-router-dom';
import ContactSection from '../components/ContactSection';

export default function Contact() {
  const location = useLocation();
  const initialService = location.state?.selectedService || '';

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-28 bg-[#000000] text-white min-h-screen">
      <ContactSection initialService={initialService} />
    </div>
  );
}
