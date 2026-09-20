import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  Camera,
  Crown,
  Sparkles,
  Plus,
} from 'lucide-react';

export default function PricingCard({ service, isPopular, onBook }) {
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const toggleExtra = (extraId) => {
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

  // Icon for each tier
  const tierIcons = {
    '1day-event': <Camera size={20} />,
    '2days-package': <Crown size={20} />,
    'birthday-shoot': <Sparkles size={20} />,
  };

  const icon = tierIcons[service.id] || <Camera size={20} />;

  return (
    <div
      className={`pricing-card relative flex flex-col rounded-[28px] transition-all duration-500 overflow-visible group
        ${
          isPopular
            ? 'bg-charcoal-900 text-white shadow-2xl shadow-charcoal-950/40 scale-[1.03] z-10 border-2 border-coral/40'
            : 'bg-white text-charcoal-900 shadow-lg shadow-charcoal-200/30 border border-[#EAE4D9] hover:border-coral/40 hover:shadow-xl'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isPopular
          ? `scale(1.03) translateY(${isHovered ? '-8px' : '0px'})`
          : `translateY(${isHovered ? '-6px' : '0px'})`,
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.12em] bg-gradient-to-r from-coral to-orange-500 text-white shadow-lg shadow-coral/40 whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      {/* Card Header */}
      <div className="px-7 pt-8 pb-0">
        {/* Icon */}
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5
          ${isPopular ? 'bg-coral/20 text-coral' : 'bg-coral-50 text-coral'}`}
        >
          {icon}
        </div>

        {/* Title & Tagline */}
        <h3
          className={`font-display text-xl font-black mb-1 tracking-tight
          ${isPopular ? 'text-white' : 'text-charcoal-900'}`}
        >
          {service.title}
        </h3>
        <p
          className={`text-xs mb-5 leading-relaxed
          ${isPopular ? 'text-gray-400' : 'text-charcoal-500'}`}
        >
          {service.tagline}
        </p>

        {/* Pricing Row */}
        <div className="flex items-baseline gap-3 mb-2">
          <span
            className={`text-4xl font-black font-display tracking-tight
            ${isPopular ? 'text-white' : 'text-charcoal-900'}`}
          >
            {service.startingPrice}
          </span>
        </div>
        <p
          className={`text-[11px] font-semibold uppercase tracking-wider mb-6
          ${isPopular ? 'text-gray-500' : 'text-charcoal-400'}`}
        >
          {service.duration}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleBookClick}
          className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.97]
            ${
              isPopular
                ? 'bg-gradient-to-r from-coral to-orange-500 text-white shadow-lg shadow-coral/30 hover:shadow-xl hover:shadow-coral/40 hover:brightness-110'
                : 'bg-charcoal-900 text-white hover:bg-charcoal-800 shadow-md shadow-charcoal-900/20'
            }
          `}
        >
          <span>
            Book This Package
            {selectedExtras.length > 0
              ? ` (₹${totalCalculated.toLocaleString('en-IN')})`
              : ''}
          </span>
          <ArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>

      {/* Divider */}
      <div className="mx-7 my-6">
        <div
          className={`h-px ${isPopular ? 'bg-white/10' : 'bg-gray-200'}`}
        />
      </div>

      {/* Category Badge */}
      <div className="px-7 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider
          ${isPopular ? 'text-coral' : 'text-coral'}`}
        >
          <Camera size={12} />
          {service.category}
        </span>
      </div>

      {/* Deliverables List */}
      <div className="px-7 pb-2 flex-grow">
        <ul className="space-y-3">
          {service.deliverables.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5
                ${isPopular ? 'bg-coral/20 text-coral' : 'bg-coral-50 text-coral'}`}
              >
                <Check size={11} strokeWidth={3} />
              </div>
              <span
                className={`text-[13px] leading-relaxed
                ${isPopular ? 'text-gray-300' : 'text-charcoal-600'}`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Configurable Extras */}
      {service.extras && service.extras.length > 0 && (
        <div className="px-7 pb-7 pt-4">
          <div className="mx-0 my-0 mb-4">
            <div
              className={`h-px ${isPopular ? 'bg-white/10' : 'bg-gray-200'}`}
            />
          </div>

          <button
            className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-3 cursor-default
              ${isPopular ? 'text-coral' : 'text-coral'}`}
          >
            <Plus size={12} />
            Customize with Add-ons
          </button>

          <div className="space-y-2">
            {service.extras.map((extra) => {
              const isSelected = selectedExtras.includes(extra.id);
              return (
                <label
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer border transition-all select-none
                    ${
                      isPopular
                        ? isSelected
                          ? 'bg-coral/15 border-coral/50 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 font-medium'
                        : isSelected
                          ? 'bg-coral-50 border-coral text-charcoal-900 font-bold'
                          : 'bg-gray-50 border-gray-200 text-charcoal-600 hover:border-gray-300 font-medium'
                    }
                  `}
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
                  <span
                    className={`font-bold ml-2 ${isPopular ? 'text-coral' : 'text-coral'}`}
                  >
                    +₹{extra.price.toLocaleString('en-IN')}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Live Total */}
          {selectedExtras.length > 0 && (
            <div
              className={`mt-3 pt-3 flex items-center justify-between
              ${isPopular ? 'border-t border-white/10' : 'border-t border-gray-200'}`}
            >
              <span
                className={`text-xs font-bold ${isPopular ? 'text-gray-400' : 'text-charcoal-600'}`}
              >
                Your Estimated Total:
              </span>
              <span className="text-base font-black text-coral font-display">
                ₹{totalCalculated.toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
