import React from 'react';
import { services } from '../data/services';

export default function FormFields({ formData, onChange }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-studio-300 mb-1.5">Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={onChange}
            placeholder="e.g. Maya Iyer"
            className="w-full px-4 py-2.5 rounded-xl bg-studio-900 border border-studio-800 focus:border-gold focus:outline-none text-sm text-studio-100 placeholder-studio-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-studio-300 mb-1.5">Email Address *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={onChange}
            placeholder="maya@example.com"
            className="w-full px-4 py-2.5 rounded-xl bg-studio-900 border border-studio-800 focus:border-gold focus:outline-none text-sm text-studio-100 placeholder-studio-600 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-studio-300 mb-1.5">Phone / WhatsApp</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="+91 98765 00000"
            className="w-full px-4 py-2.5 rounded-xl bg-studio-900 border border-studio-800 focus:border-gold focus:outline-none text-sm text-studio-100 placeholder-studio-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-studio-300 mb-1.5">Photography Discipline</label>
          <select
            name="service"
            value={formData.service}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl bg-studio-900 border border-studio-800 focus:border-gold focus:outline-none text-sm text-studio-100 transition-colors"
          >
            <option value="">Select an experience</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
            <option value="other">Bespoke Commission / Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-studio-300 mb-1.5">Target Date or Month</label>
          <input
            type="text"
            name="eventDate"
            value={formData.eventDate}
            onChange={onChange}
            placeholder="e.g. Nov 2026 or DD/MM/YYYY"
            className="w-full px-4 py-2.5 rounded-xl bg-studio-900 border border-studio-800 focus:border-gold focus:outline-none text-sm text-studio-100 placeholder-studio-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-studio-300 mb-1.5">Estimated Budget</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl bg-studio-900 border border-studio-800 focus:border-gold focus:outline-none text-sm text-studio-100 transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="under-50k">₹35,000 – ₹60,000</option>
            <option value="60k-150k">₹60,000 – ₹1,50,000</option>
            <option value="150k-300k">₹1,50,000 – ₹3,00,000</option>
            <option value="above-300k">₹3,00,000+</option>
          </select>
        </div>
      </div>
    </>
  );
}
