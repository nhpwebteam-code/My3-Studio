import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ContactSuccess({ clientName, onReset }) {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 text-center animate-fade-in border border-gray-200 shadow-xl">
      <div className="w-16 h-16 rounded-full bg-coral-50 border border-coral/30 text-coral flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 size={32} />
      </div>
      <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 font-bold mb-3">
        Inquiry Received With Gratitude
      </h3>
      <p className="text-sm text-charcoal-600 max-w-md mx-auto mb-6 leading-relaxed">
        Thank you, <span className="text-coral font-bold">{clientName}</span>. Our studios director will review your vision and connect within 24 business hours.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-charcoal-800 border border-gray-200 transition-colors"
      >
        Send Another Note
      </button>
    </div>
  );
}
