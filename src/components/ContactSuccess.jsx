import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ContactSuccess({ clientName, onReset }) {
  return (
    <div className="glass-card rounded-2xl p-8 sm:p-12 text-center animate-fade-in border border-gold/40">
      <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 size={32} />
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl text-studio-50 font-medium mb-3">
        Inquiry Received With Gratitude
      </h3>
      <p className="text-sm text-studio-300 max-w-md mx-auto mb-6 leading-relaxed">
        Thank you, <span className="text-gold font-medium">{clientName}</span>. Our studio director will review your vision and connect within 24 business hours.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-studio-850 hover:bg-studio-800 text-studio-200 border border-studio-700 transition-colors"
      >
        Send Another Note
      </button>
    </div>
  );
}
