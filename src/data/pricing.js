/**
 * Pricing & Investment Packages
 * Configurable tiers with feature lists and session deliverables.
 */
export const pricingTiers = [
  {
    id: "portrait-essential",
    category: "Portraits",
    name: "Editorial Session",
    price: "₹35,000",
    period: "single session",
    tagline: "Perfect for artists, executives, and discerning personal branding.",
    popular: false,
    features: [
      "90-minute studio or daylight location shoot",
      "2 wardrobe / styling variations",
      "Online proofing gallery delivered in 48 hours",
      "10 Master retouched high-res deliverables",
      "Full digital rights for personal & web editorial",
    ],
  },
  {
    id: "wedding-signature",
    category: "Weddings",
    name: "Signature Heirloom",
    price: "₹2,40,000",
    period: "2 days coverage",
    tagline: "Our most coveted wedding collection, balancing candids and regal portraits.",
    popular: true,
    features: [
      "Lead Photographer + 2 Associate Photographers",
      "Up to 16 hours of multi-ceremony coverage",
      "Drone aerial perspective photography (permit permitting)",
      "400+ hand-color graded print-ready digital images",
      "Handcrafted 12x12 Italian fine art linen book",
      "Pre-wedding portrait session included",
    ],
  },
  {
    id: "commercial-campaign",
    category: "Commercial & Fashion",
    name: "Couture Campaign",
    price: "₹1,75,000",
    period: "production day",
    tagline: "Full-scale editorial and commercial visual suite for luxury brands.",
    popular: false,
    features: [
      "Pre-production moodboard & creative direction",
      "Full 8-hour studio cyclorama or approved location",
      "Live tethering monitor for client & art director review",
      "25 high-end retouched lookbook plates",
      "High-res print + digital billboard licensing",
    ],
  },
];
