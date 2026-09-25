import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, ArrowRight, User, Mail, Phone, Plus, Check } from 'lucide-react';
import { services as defaultServices } from '../data/services';
import { useStudioData } from '../context/StudioDataContext';

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

export default function BookingModal({ isOpen, onClose, initialPackageData }) {
  const { packages: dynamicPackages, addBooking } = useStudioData();
  const services = dynamicPackages && dynamicPackages.length > 0 ? dynamicPackages : defaultServices;

  const [submitted, setSubmitted] = useState(false);
  const [whatsappShareUrl, setWhatsappShareUrl] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(
    initialPackageData?.serviceId || (services[0]?.id || '2days-package')
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
    services.find((s) => s.id === selectedServiceId) || services[0] || defaultServices[0];

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

  const buildWhatsAppBookingUrl = (data, service, extras, total) => {
    const phoneNumber = "919949395037"; // Lead: Anji garu

    const selectedExtrasList = (service.extras || []).filter((extra) =>
      extras.includes(extra.id)
    );
    const extrasText = selectedExtrasList.length > 0
      ? selectedExtrasList.map((e) => `• ${e.title} (+₹${e.price.toLocaleString('en-IN')})`).join('\n')
      : '';

    const message = 
`*NEW BOOKING INQUIRY — MY3 STUDIOS* 📸

👤 *Client Details:*
• *Name:* ${data.name || 'Not provided'}
• *Phone Number:* ${data.phone || 'Not provided'}
• *Email:* ${data.email || 'Not provided'}
• *Event Date:* ${data.date || 'To be scheduled'}
• *Time Slot:* ${data.timeSlot || 'Morning (10:00 AM)'}

📦 *Selected Photography Package:*
• *Package:* ${service.title}
• *Duration / Coverage:* ${service.duration || 'Full Event Coverage'}
• *Starting Price:* ${service.startingPrice || '₹' + service.basePriceNum?.toLocaleString('en-IN')}
${extrasText ? `\n-- *Selected Add-ons:*\n${extrasText}\n` : ''}
💰 *Estimated Total Investment:* ₹${total.toLocaleString('en-IN')}

📝 *Event Location / Special Requirements:*
${data.notes && data.notes.trim() ? data.notes.trim() : 'Standard package inquiry. Looking forward to your confirmation!'}

---
_Sent directly from MY3 Studios Official Booking Portal_`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const waUrl = buildWhatsAppBookingUrl(formData, currentService, selectedExtras, totalCalculated);
    setWhatsappShareUrl(waUrl);
    setSubmitted(true);

    // Automatically record real booking inquiry in StudioDataContext (Zero fake data)
    if (addBooking) {
      addBooking({
        clientName: formData.name ? formData.name.trim() : 'Website Client',
        phone: formData.phone ? formData.phone.trim() : '',
        email: formData.email ? formData.email.trim() : '',
        eventDate: formData.date || new Date().toISOString().split('T')[0],
        packageTitle: currentService.title,
        totalAmount: `₹${totalCalculated.toLocaleString('en-IN')}`,
        status: 'Pending',
      });
    }

    // Automatically open WhatsApp with the pre-filled booking inquiry
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Browser prevented automated window open:', err);
    }
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
      <div className="relative bg-[#14161C] w-full max-w-2xl rounded-3xl shadow-2xl border border-white/5 overflow-hidden z-10 my-8">
        {/* Top Header */}
        <div className="bg-[#1E2024] px-6 sm:px-8 py-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.png"
              alt="MY3 Studios Emblem"
              className="w-12 h-12 object-contain filter drop-shadow-md rounded-full bg-[#14161C]/5 p-0.5 border border-white/10 shrink-0"
            />
            <div>
              <span className="font-script text-[#E59A3D] text-2xl tracking-wide block -mb-1 select-none">
                MY3 Studios Atelier
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                Book Your Official Package
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#14161C]/10 hover:bg-[#14161C]/20 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4 sm:space-y-5 animate-fade-up">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 text-[#128C7E] text-[11px] font-bold uppercase tracking-wider mb-2">
                  <WhatsAppIcon size={14} />
                  Redirecting to WhatsApp
                </span>
                <h4 className="text-2xl font-black text-white font-display tracking-tight">
                  Booking Request Confirmed!
                </h4>
              </div>

              {/* Booking Summary Card */}
              <div className="bg-[#0D0E12]/90 border border-white/10 rounded-2xl p-4 sm:p-5 text-left max-w-md mx-auto text-xs space-y-2.5 shadow-xs">
                <div className="flex justify-between border-b border-white/10/70 pb-2">
                  <span className="text-gray-500 font-medium">Client Name:</span>
                  <span className="font-bold text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10/70 pb-2">
                  <span className="text-gray-500 font-medium">Phone / WhatsApp:</span>
                  <span className="font-bold text-white">{formData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-white/10/70 pb-2">
                  <span className="text-gray-500 font-medium">Selected Package:</span>
                  <span className="font-bold text-[#E59A3D]">{currentService.title}</span>
                </div>
                <div className="flex justify-between border-b border-white/10/70 pb-2">
                  <span className="text-gray-500 font-medium">Event Date:</span>
                  <span className="font-bold text-white">{formData.date || 'Date to be finalized'}</span>
                </div>
                <div className="flex justify-between pt-1 items-center">
                  <span className="text-gray-200 font-bold">Estimated Investment:</span>
                  <span className="font-black text-white-950 text-sm">
                    ₹{totalCalculated.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>! Your inquiry message has been prepared for Anji garu. If WhatsApp didn't open automatically, click below to send it directly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#25D366]/30 active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon size={19} />
                  <span>Send via WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-200 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
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
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300">
                    Selected Photography Package
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsChangingPackage(!isChangingPackage)}
                    className="text-xs font-semibold text-[#E59A3D] hover:underline focus:outline-none transition-colors"
                  >
                    {isChangingPackage ? 'Close Options' : 'Change Package'}
                  </button>
                </div>

                {!isChangingPackage ? (
                  /* Clean Single Selected Package Card - Only shows the chosen package */
                  <div className="p-4 rounded-2xl border-2 border-[#E59A3D] bg-[#E59A3D]/10/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-fade-in">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E59A3D]/15 text-[#E59A3D] text-[10px] font-black uppercase tracking-wider">
                          {currentService.duration}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-500">
                          {currentService.type || 'Official Studio Package'}
                        </span>
                      </div>
                      <h4 className="font-display font-black text-base sm:text-lg text-white leading-tight">
                        {currentService.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                        {currentService.tagline}
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E59A3D]/20">
                      <span className="text-[10px] uppercase font-bold text-white-400 block">
                        Base Investment
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#E59A3D] font-display">
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
                              ? 'border-[#E59A3D] bg-[#E59A3D]/10/60 ring-2 ring-coral/20 shadow-sm'
                              : 'border-white/10 hover:border-gray-300 bg-[#14161C]'
                          }`}
                        >
                          <span className="block text-[10px] uppercase font-bold text-[#E59A3D] mb-0.5">
                            {s.duration}
                          </span>
                          <h5 className="font-bold text-xs text-white leading-tight mb-1">
                            {s.title}
                          </h5>
                          <span className="text-sm font-black text-white font-display">
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
                <div className="p-4 rounded-2xl bg-[#0D0E12] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-200 flex items-center gap-1.5">
                      <Plus size={14} className="text-[#E59A3D]" />
                      <span>Optional Add-ons for this package:</span>
                    </span>
                    <span className="text-[11px] font-bold text-[#E59A3D]">
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
                              ? 'bg-[#14161C] border-[#E59A3D] font-bold text-white shadow-sm'
                              : 'bg-[#14161C]/80 border-white/10 text-gray-400 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center text-white text-[10px] ${
                                isChecked ? 'bg-[#E59A3D]' : 'border border-gray-300'
                              }`}
                            >
                              {isChecked && <Check size={12} />}
                            </div>
                            <span className="truncate">{extra.name}</span>
                          </div>
                          <span className="text-[#E59A3D] font-bold ml-2 shrink-0">
                            +₹{extra.price.toLocaleString('en-IN')}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Live Price Summary Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-coral to-coral-dark text-white flex items-center justify-between shadow-lg shadow-[#E59A3D]/25">
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
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
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
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#0D0E12] border border-white/10 rounded-xl focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-coral transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
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
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#0D0E12] border border-white/10 rounded-xl focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-coral transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
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
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#0D0E12] border border-white/10 rounded-xl focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-coral transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Event / Shoot Date *
                  </label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#0D0E12] border border-white/10 rounded-xl focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-coral transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Event Location & Special Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Venue location, event timings, theme preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#0D0E12] border border-white/10 rounded-xl focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-coral transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#E59A3D]/30 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>Confirm &amp; Send Booking to WhatsApp (₹{totalCalculated.toLocaleString('en-IN')})</span>
                  <ArrowRight size={16} />
                </button>
                <p className="text-[11px] text-center text-white-400 mt-2 flex items-center justify-center gap-1.5 font-medium">
                  <WhatsAppIcon size={14} className="text-[#25D366] shrink-0" />
                  <span>Submits your name, phone &amp; selected package directly to Anji garu via WhatsApp</span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
