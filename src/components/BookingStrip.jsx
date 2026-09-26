import React from 'react';
import { Phone } from 'lucide-react';

function WhatsAppIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.58 1.96.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.577 4.182 1.583 5.928l-1.683 6.155 6.326-1.659c1.696.927 3.639 1.458 5.707 1.458 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const WHATSAPP_MSG = encodeURIComponent(
  "Hello Anji garu (MY3 Studio)! I am visiting your website and would like to inquire about photoshoot availability and packages for my upcoming event. Could you please share more details?"
);
const WHATSAPP_URL = `https://wa.me/919949395037?text=${WHATSAPP_MSG}`;

export default function BookingStrip() {
  return (
    <section className="relative w-full bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center text-center">

        {/* Lockup: Logo + Text */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {/* Circular Logo */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-sm border border-gray-200 bg-white shrink-0">
            <img
              src="/logo.png"
              alt="MY3 Studio Logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="text-left">
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-black italic tracking-tight leading-tight">
              MY3 Studio
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-0.5 leading-tight">
              Book your schedule
            </p>
          </div>
        </div>

        {/* Action Buttons: Centered directly below */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-5 flex-wrap">
          {/* Lets Talk Button */}
          <a
            href="tel:+919949395037"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border-2 border-black text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 active:scale-95 shadow-xs"
          >
            <Phone size={15} />
            <span>LETS TALK</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-md"
          >
            <WhatsAppIcon size={17} />
            <span>WHATSAPP</span>
          </a>
        </div>

      </div>
    </section>
  );
}
