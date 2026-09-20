import React, { useState } from 'react';
import { Check, ArrowRight, Clock, Plus, ShieldCheck } from 'lucide-react';

export default function ServiceCard({ service, onBook }) {
  const [selectedExtras, setSelectedExtras] = useState([]);

  const toggleExtra = (extraId) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  // Calculate live total price with selected extras
  const extrasCost = (service.extras || [])
    .filter((extra) => selectedExtras.includes(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);

  const totalCalculated = (service.basePriceNum || 0) + extrasCost;

  const handleBookClick = () => {
    const extrasList = (service.extras || []).filter((e) =>
      selectedExtras.includes(e.id)
    );
    if (onBook) {
      onBook({
        serviceId: service.id,
        serviceTitle: service.title,
        basePrice: service.startingPrice,
        totalPrice: '₹' + totalCalculated.toLocaleString('en-IN'),
        selectedExtras: extrasList,
      });
    }
  };

  return (
    <div className="flex flex-col rounded-3xl bg-white border border-[#EAE4D9] hover:border-coral/50 transition-all duration-300 overflow-hidden group shadow-sm hover:shadow-2xl">
      {/* Service Cover Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={service.coverImage}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-transparent" />
        
        {/* Top Badge */}
        {service.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-coral text-white shadow-md">
              {service.badge}
            </span>
          </div>
        )}

        {/* Starting Price Pill */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
            <span className="text-[11px] font-bold text-charcoal-500 uppercase tracking-wider block -mb-1">
              Base Investment
            </span>
            <span className="text-xl font-black text-coral font-display">
              {service.startingPrice}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/90 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Clock size={13} className="text-coral" />
            <span className="font-semibold">{service.duration}</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        <h3 className="font-display text-2xl text-charcoal-900 font-black mb-1.5 group-hover:text-coral transition-colors">
          {service.title}
        </h3>

        <p className="text-xs text-charcoal-500 font-semibold mb-3">
          {service.category}
        </p>

        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-6 font-normal">
          {service.description}
        </p>

        {/* Deliverables list */}
        <div className="border-t border-gray-100 pt-5 mb-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-3 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-coral" />
            <span>Guaranteed Deliverables:</span>
          </p>
          <ul className="space-y-2">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-charcoal-700 font-medium">
                <Check size={14} className="text-coral shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Configurable Extras / Add-ons Selector */}
        {service.extras && service.extras.length > 0 && (
          <div className="border-t border-gray-100 pt-5 mb-6 bg-gray-50/70 p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-700 flex items-center gap-1">
                <Plus size={13} className="text-coral" />
                <span>Available Add-ons / Extras:</span>
              </span>
              <span className="text-[10px] text-coral font-bold uppercase">Click to Add</span>
            </div>
            
            <div className="space-y-2">
              {service.extras.map((extra) => {
                const isSelected = selectedExtras.includes(extra.id);
                return (
                  <label
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer border transition-all select-none ${
                      isSelected
                        ? 'bg-coral-50/80 border-coral text-charcoal-900 font-bold'
                        : 'bg-white border-gray-200 text-charcoal-600 hover:border-gray-300 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded text-coral focus:ring-coral w-3.5 h-3.5 accent-coral"
                      />
                      <span>{extra.name}</span>
                    </div>
                    <span className="font-bold text-coral ml-2">
                      +₹{extra.price.toLocaleString('en-IN')}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Live Total Calculation if extras selected */}
            {selectedExtras.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-charcoal-700">Estimated Total:</span>
                <span className="text-base font-black text-coral font-display">
                  ₹{totalCalculated.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Card Footer Action Button */}
        <div className="mt-auto pt-2">
          <button
            onClick={handleBookClick}
            className="w-full inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-coral hover:bg-coral-dark text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-coral/25 group/btn active:scale-95"
          >
            <span>Book This Package {selectedExtras.length > 0 ? `(₹${totalCalculated.toLocaleString('en-IN')})` : ''}</span>
            <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
