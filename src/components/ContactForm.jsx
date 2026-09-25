import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import ContactSuccess from './ContactSuccess';

export default function ContactForm({ initialService = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: initialService ? `${initialService} Inquiry` : '',
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
      setError('Please provide your name, email address, and message.');
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
      subject: '',
      message: '',
    });
  };

  if (submitted) {
    return <ContactSuccess clientName={formData.fullName} onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 py-2 sm:py-4">
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Row 1: Name & Email - Underline Styling matching reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-wider text-white-400 font-bold">
            Your Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Trangely"
            className="w-full bg-transparent rounded-none border-0 border-b-2 border-white/10 focus:border-[#E59A3D] py-2 px-0 text-sm sm:text-base font-semibold text-white placeholder:text-white-300 placeholder:font-normal focus:outline-none focus:ring-0 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-wider text-white-400 font-bold">
            Your Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="hello@nurency.com"
            className="w-full bg-transparent rounded-none border-0 border-b-2 border-white/10 focus:border-[#E59A3D] py-2 px-0 text-sm sm:text-base font-semibold text-white placeholder:text-white-300 placeholder:font-normal focus:outline-none focus:ring-0 transition-colors"
          />
        </div>
      </div>

      {/* Row 2: Phone & Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-wider text-white-400 font-bold">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full bg-transparent rounded-none border-0 border-b-2 border-white/10 focus:border-[#E59A3D] py-2 px-0 text-sm sm:text-base font-semibold text-white placeholder:text-white-300 placeholder:font-normal focus:outline-none focus:ring-0 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-wider text-white-400 font-bold">
            Your Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="I want to hire you quickly"
            className="w-full bg-transparent rounded-none border-0 border-b-2 border-white/10 focus:border-[#E59A3D] py-2 px-0 text-sm sm:text-base font-semibold text-white placeholder:text-white-300 placeholder:font-normal focus:outline-none focus:ring-0 transition-colors"
          />
        </div>
      </div>

      {/* Row 3: Message - Highlighted label matching reference */}
      <div className="space-y-1">
        <label className="block text-[11px] uppercase tracking-wider text-[#E59A3D] font-bold">
          Message *
        </label>
        <textarea
          name="message"
          required
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Write here your message..."
          className="w-full bg-transparent rounded-none border-0 border-b-2 border-white/10 focus:border-[#E59A3D] py-2 px-0 text-sm sm:text-base font-medium text-white placeholder:text-white-300 placeholder:font-normal focus:outline-none focus:ring-0 transition-colors resize-none"
        />
      </div>

      {/* Row 4: Submit Button - Left-aligned pill matching reference */}
      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl sm:rounded-full bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md shadow-[#E59A3D]/30 hover:shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <span>Send Message</span>
          <Send size={15} />
        </button>
      </div>
    </form>
  );
}
