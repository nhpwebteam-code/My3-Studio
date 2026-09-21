import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, ArrowRight, User, Mail, Phone, Plus, Check } from 'lucide-react';
import { services } from '../data/services';

export default function BookingModal({ isOpen, onClose, initialPackageData }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(
    initialPackageData?.serviceId || '2days-package'
  );
  const [selectedExtras, setSelectedExtras] = useState(
    initialPackageData?.selectedExtras?.map((e) => e.id) || []
  );
  const [isChangingPackage, setIsChangingPackage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (10:00 AM)',
    notes: '',
  });

  if (!isOpen) return null;

  const currentService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const toggleExtra = (extraId) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const extrasCost = (currentService.extras || [])
    .filter((extra) => selectedExtras.includes(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);

  const totalCalculated = (currentService.basePriceNum || 0) + extrasCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-8">
        {/* Top Header */}
        <div className="bg-[#1E2024] px-6 sm:px-8 py-6 text-white flex items-center justify-between">
          <div>
            <span className="font-script text-coral text-2xl tracking-wide block -mb-1 select-none">
              MY3 Studio Atelier
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight">
              Book Your Official Package
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fade-up">
              <div className="w-16 h-16 mx-auto rounded-full bg-coral-50 flex items-center justify-center text-coral">
                <CheckCircle2 size={38} />
              </div>
              <h4 className="text-2xl font-black text-charcoal-900 font-display">
                Booking Request Confirmed!
              </h4>
              <p className="text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-charcoal-900">{formData.name || 'valued patron'}</strong>. We have received your booking request for the{' '}
                <strong className="text-coral">{currentService.title}</strong>{' '}
                for <span className="font-bold text-charcoal-900">{formData.date || 'your requested date'}</span>. Estimated Total:{' '}
                <strong className="text-charcoal-900 font-black">
                  ₹{totalCalculated.toLocaleString('en-IN')}
                </strong>
                . Our studio concierge will contact you via WhatsApp/Phone shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-9 py-3 rounded-full bg-coral text-white font-bold text-xs uppercase tracking-widest hover:bg-coral-dark transition-all shadow-md shadow-coral/30"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Package Selection: Display only the selected package */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700">
                    Selected Photography Package
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsChangingPackage(!isChangingPackage)}
                    className="text-xs font-semibold text-coral hover:underline focus:outline-none transition-colors"
                  >
                    {isChangingPackage ? 'Close Options' : 'Change Package'}
                  </button>
                </div>

                {!isChangingPackage ? (
                  /* Clean Single Selected Package Card - Only shows the chosen package */
                  <div className="p-4 rounded-2xl border-2 border-coral bg-coral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-fade-in">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-coral/15 text-coral text-[10px] font-black uppercase tracking-wider">
                          {currentService.duration}
                        </span>
                        <span className="text-[11px] font-semibold text-charcoal-500">
                          {currentService.type || 'Official Studio Package'}
                        </span>
                      </div>
                      <h4 className="font-display font-black text-base sm:text-lg text-charcoal-900 leading-tight">
                        {currentService.title}
                      </h4>
                      <p className="text-xs text-charcoal-600 leading-relaxed max-w-md">
                        {currentService.tagline}
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-coral/20">
                      <span className="text-[10px] uppercase font-bold text-charcoal-400 block">
                        Base Investment
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-coral font-display">
                        {currentService.startingPrice}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Alternate packages only show if user explicitly clicks 'Change Package' */
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 animate-fade-in">
                    {services.map((s) => {
                      const isSelected = selectedServiceId === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => {
                            setSelectedServiceId(s.id);
                            setSelectedExtras([]);
                            setIsChangingPackage(false);
                          }}
                          className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-coral bg-coral-50/60 ring-2 ring-coral/20 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <span className="block text-[10px] uppercase font-bold text-coral mb-0.5">
                            {s.duration}
                          </span>
                          <h5 className="font-bold text-xs text-charcoal-900 leading-tight mb-1">
                            {s.title}
                          </h5>
                          <span className="text-sm font-black text-charcoal-900 font-display">
                            {s.startingPrice}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Extras & Add-ons Checklist */}
              {currentService.extras && currentService.extras.length > 0 && (
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 flex items-center gap-1.5">
                      <Plus size={14} className="text-coral" />
                      <span>Optional Add-ons for this package:</span>
                    </span>
                    <span className="text-[11px] font-bold text-coral">
                      +₹{extrasCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {currentService.extras.map((extra) => {
                      const isChecked = selectedExtras.includes(extra.id);
                      return (
                        <label
                          key={extra.id}
                          onClick={() => toggleExtra(extra.id)}
                          className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer border transition-all ${
                            isChecked
                              ? 'bg-white border-coral font-bold text-charcoal-900 shadow-sm'
                              : 'bg-white/80 border-gray-200 text-charcoal-600 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center text-white text-[10px] ${
                                isChecked ? 'bg-coral' : 'border border-gray-300'
                              }`}
                            >
                              {isChecked && <Check size={12} />}
                            </div>
                            <span className="truncate">{extra.name}</span>
                          </div>
                          <span className="text-coral font-bold ml-2 shrink-0">
                            +₹{extra.price.toLocaleString('en-IN')}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Live Price Summary Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-coral to-coral-dark text-white flex items-center justify-between shadow-lg shadow-coral/25">
                <div>
                  <span className="text-[11px] font-semibold text-white/90 block uppercase tracking-wider">
                    Total Estimated Investment
                  </span>
                  <span className="text-xs text-white font-bold">
                    {currentService.title} {selectedExtras.length > 0 ? `+ ${selectedExtras.length} Extras` : ''}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white font-display">
                    ₹{totalCalculated.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* 4. Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Event / Shoot Date *
                  </label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Event Location & Special Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Venue location, event timings, theme preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-coral hover:bg-coral-dark text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-coral/30 flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Confirm Booking for ₹{totalCalculated.toLocaleString('en-IN')}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
