import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ContactSuccess({ clientName, onReset }) {
  return (
    <div className="bg-[#14161C] rounded-3xl p-8 sm:p-12 text-center animate-fade-in border border-white/10 shadow-xl">
      <div className="w-16 h-16 rounded-full bg-[#E59A3D]/10 border border-[#E59A3D]/30 text-[#E59A3D] flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 size={32} />
      </div>
      <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mb-3">
        Inquiry Received With Gratitude
      </h3>
      <p className="text-sm text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
        Thank you, <span className="text-[#E59A3D] font-bold">{clientName}</span>. Our studios director will review your vision and connect within 24 business hours.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-gray-200 border border-white/10 transition-colors"
      >
        Send Another Note
      </button>
    </div>
  );
}
