import React from 'react';
import { services } from '../data/services';

export default function FormFields({ formData, onChange }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-1.5">Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={onChange}
            placeholder="Jane Doe"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0D0E12] border border-white/10 focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] focus:outline-none text-sm text-white placeholder-gray-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-1.5">Email Address *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={onChange}
            placeholder="jane@example.com"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0D0E12] border border-white/10 focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] focus:outline-none text-sm text-white placeholder-gray-600 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-1.5">Phone / WhatsApp</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0D0E12] border border-white/10 focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] focus:outline-none text-sm text-white placeholder-gray-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-1.5">Photography Discipline</label>
          <select
            name="service"
            value={formData.service}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0D0E12] border border-white/10 focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] focus:outline-none text-sm text-white transition-colors"
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
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-1.5">Target Date or Month</label>
          <input
            type="text"
            name="eventDate"
            value={formData.eventDate}
            onChange={onChange}
            placeholder="e.g. Nov 2026 or DD/MM/YYYY"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0D0E12] border border-white/10 focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] focus:outline-none text-sm text-white placeholder-gray-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-1.5">Estimated Budget</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0D0E12] border border-white/10 focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] focus:outline-none text-sm text-white transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="under-30k">₹25,000 (1 Day / Birthday Shoot)</option>
            <option value="30k-60k">₹25,000 – ₹60,000 (Event + Extras)</option>
            <option value="60k-100k">₹60,000 – ₹1,00,000 (2 Days Grand Event)</option>
            <option value="above-100k">₹1,00,000+ (Grand Production + Full Add-ons)</option>
          </select>
        </div>
      </div>
    </>
  );
}
