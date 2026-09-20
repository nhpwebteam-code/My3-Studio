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
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 space-y-4 border border-gray-200 shadow-sm">
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <FormFields formData={formData} onChange={handleChange} />

      <div>
        <label className="block text-xs uppercase tracking-wider text-charcoal-700 font-bold mb-1.5">
          Your Vision & Details *
        </label>
        <textarea
          name="message"
          required
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about the shoot, venue, desired mood, or questions..."
          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none text-sm text-charcoal-900 placeholder-gray-400 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold bg-coral text-white hover:bg-coral-dark transition-all shadow-md shadow-coral/30 active:scale-95"
      >
        <span>Submit Booking Inquiry</span>
        <Send size={15} />
      </button>
    </form>
  );
}
