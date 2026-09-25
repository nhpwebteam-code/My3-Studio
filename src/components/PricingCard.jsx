import React, { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';

export default function PricingCard({ service, isSelected, onSelect, onBook }) {
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showAddons, setShowAddons] = useState(false);

  const toggleExtra = (extraId, e) => {
    if (e) e.stopPropagation();
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const extrasCost = (service.extras || [])
    .filter((extra) => selectedExtras.includes(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);

  const totalCalculated = (service.basePriceNum || 0) + extrasCost;

  const handleBookClick = (e) => {
    e.stopPropagation();
    if (onSelect) onSelect();
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

  // Excluded items mapping for clean reference checklist design
  const tierExcluded = {
    '1day-event': [
      'Multi-Day Wedding Coverage',
      '4K Aerial Drone Coverage',
      '12x18 Inch Display Frame',
    ],
    '2days-package': [
      'Live LED Wall Setup',
      '1 Day Candid / Candy Photography',
    ],
    'birthday-shoot': [
      'Multi-Day Wedding Coverage',
      '4K Aerial Drone Coverage',
      '60 Sheets Premium Album',
    ],
  };

  const excludedList = tierExcluded[service.id] || [];

  // Button labels
  const buttonLabels = {
    '1day-event': 'Book 1-Day Event',
    '2days-package': 'Book Grand Event',
    'birthday-shoot': 'Book Birthday Shoot',
  };

  const ctaLabel = buttonLabels[service.id] || 'Book This Package';
  const durationLabel = service.id === '2days-package' ? '/package' : service.id === 'birthday-shoot' ? '/shoot' : '/event';

  // Center package (2days-package) is permanently the featured/recommended tier
  const isFeatured = service.id === '2days-package';

  return (
    <div
      className={`relative rounded-[32px] flex flex-col w-full h-full transition-all duration-300 ease-out select-none ${
        isFeatured
          ? 'p-[2px] bg-gradient-to-b from-[#E59A3D] via-[#D08A2F] to-[#D08A2F]/60 shadow-xl shadow-[#E59A3D]/15 lg:-translate-y-2'
          : 'bg-[#14161C] p-7 sm:p-8 border border-white/10 shadow-sm hover:border-[#E59A3D]/40 hover:shadow-xl'
      }`}
    >
      {/* Permanent Static Top Header Cap for Center Recommended Card */}
      {isFeatured && (
        <div className="bg-gradient-to-r from-[#E59A3D] via-[#D08A2F] to-[#D08A2F] text-black py-2.5 px-4 text-center rounded-t-[30px] flex items-center justify-center gap-1.5 text-xs font-bold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
          <span>Most Recommended</span>
        </div>
      )}

      {/* Card Body */}
      <div
        className={`flex flex-col justify-between flex-grow ${
          isFeatured ? 'bg-[#14161C] rounded-b-[30px] p-7 sm:p-8' : ''
        }`}
      >
        <div>
          {/* Plan Tier Title */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-300 block">
              {service.title}
            </span>
            {isFeatured && (
              <span className="text-[10px] font-bold text-[#E59A3D] bg-[#E59A3D]/10 border border-[#E59A3D]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Popular
              </span>
            )}
          </div>

          {/* Price Row */}
          <div className="flex items-baseline mb-2">
            <span className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight">
              {service.startingPrice}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 ml-1.5 font-normal">
              {durationLabel}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-gray-400 leading-relaxed mb-6 min-h-[42px]">
            {service.tagline}
          </p>

          {/* CTA Button */}
          <button
            onClick={handleBookClick}
            className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              isFeatured
                ? 'bg-[#E59A3D] hover:bg-[#d08a2f] text-black shadow-md shadow-[#E59A3D]/30 hover:shadow-lg'
                : 'bg-[#E59A3D] hover:bg-[#d08a2f] text-black shadow-sm hover:shadow-md'
            }`}
          >
            <span>
              {ctaLabel}
              {selectedExtras.length > 0
                ? ` (₹${totalCalculated.toLocaleString('en-IN')})`
                : ''}
            </span>
            <ArrowRight size={14} />
          </button>

          {/* Features Checklist */}
          <ul className="space-y-3 mt-7">
            {service.deliverables.map((item, idx) => (
              <li key={`inc-${idx}`} className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed">
                <span className="text-[#E59A3D] font-bold shrink-0 text-sm">✓</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}

            {excludedList.map((item, idx) => (
              <li key={`exc-${idx}`} className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed">
                <span className="text-gray-600 font-normal shrink-0 text-sm">✕</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Optional Add-ons Customizer */}
        {service.extras && service.extras.length > 0 && (
          <div
            className={`mt-6 pt-5 border-t ${
              isSelected ? 'border-white/5' : 'border-white/10'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowAddons(!showAddons);
              }}
              className="flex items-center justify-between w-full text-xs font-semibold text-gray-300 hover:text-[#E59A3D] transition-colors py-1"
            >
              <span className="flex items-center gap-1.5">
                <Plus size={13} className={`transform transition-transform duration-200 ${showAddons ? 'rotate-45 text-[#E59A3D]' : ''}`} />
                <span>Customize Add-ons ({service.extras.length})</span>
              </span>
              {selectedExtras.length > 0 && (
                <span className="text-[10px] font-bold text-[#E59A3D] bg-[#E59A3D]/10 border border-[#E59A3D]/20 px-2 py-0.5 rounded-full">
                  +{selectedExtras.length} added
                </span>
              )}
            </button>

            {showAddons && (
              <div className="space-y-2 mt-3 pt-1 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                {service.extras.map((extra) => {
                  const isChecked = selectedExtras.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      onClick={(e) => toggleExtra(extra.id, e)}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer border transition-all select-none ${
                        isChecked
                          ? 'bg-[#E59A3D]/10 border-[#E59A3D] text-white font-bold'
                          : 'bg-[#0D0E12] border-white/10 text-gray-400 hover:border-white/20 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-[#E59A3D] focus:ring-[#E59A3D] w-3.5 h-3.5 accent-[#E59A3D]"
                        />
                        <span>{extra.name}</span>
                      </div>
                      <span className="font-bold text-[#E59A3D] ml-2">
                        +₹{extra.price.toLocaleString('en-IN')}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
