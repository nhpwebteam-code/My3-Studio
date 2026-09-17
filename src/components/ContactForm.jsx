import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import ContactSuccess from './ContactSuccess';
import FormFields from './FormFields';

export default function ContactForm({ initialService = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: initialService,
    eventDate: '',
    budget: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, email address, and inquiry message.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      service: '',
      eventDate: '',
      budget: '',
      message: '',
    });
  };

  if (submitted) {
    return <ContactSuccess clientName={formData.fullName} onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 border border-studio-800/80">
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <FormFields formData={formData} onChange={handleChange} />

      <div>
        <label className="block text-xs uppercase tracking-wider text-studio-300 mb-1.5">Your Vision & Details *</label>
        <textarea
          name="message"
          required
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about the celebration, location, inspirations, or questions..."
          className="w-full px-4 py-2.5 rounded-xl bg-studio-900 border border-studio-800 focus:border-gold focus:outline-none text-sm text-studio-100 placeholder-studio-600 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold bg-gold text-studio-950 hover:bg-gold-light transition-all shadow-lg hover:shadow-gold/20"
      >
        <span>Submit Booking Inquiry</span>
        <Send size={15} />
      </button>
    </form>
  );
}
