/**
 * Studio Configuration & Branding Metadata
 * Real details can be updated here without changing component logic.
 */
export const studioConfig = {
  name: "MY3 Studio",
  tagline: "Fine Art, Wedding & Editorial Photography",
  shortBio: "Crafting timeless visual heirlooms with cinematic light, natural emotion, and modern editorial precision.",
  establishedYear: 2018,
  
  contact: {
    email: "inquiries@my3studio.com",
    phone: "+91 98765 43210",
    phoneDisplay: "+91 (0) 98765 43210",
    address: {
      street: "No. 42, Heritage Boulevard, Art District",
      city: "Bengaluru",
      state: "Karnataka",
      zip: "560001",
      country: "India",
      googleMapsUrl: "https://maps.google.com",
    },
    hours: [
      { days: "Tuesday – Saturday", time: "10:00 AM – 7:00 PM" },
      { days: "Sunday", time: "11:00 AM – 5:00 PM (By Appointment)" },
      { days: "Monday", time: "Closed for private shoots & darkroom post-production" },
    ],
  },

  socials: [
    { name: "Instagram", url: "https://instagram.com", handle: "@mythristudios" },
    { name: "Pinterest", url: "https://pinterest.com", handle: "mythristudios" },
    { name: "Vimeo", url: "https://vimeo.com", handle: "mythrifilms" },
    { name: "LinkedIn", url: "https://linkedin.com", handle: "mythri-studios" },
  ],

  stats: [
    { value: "8+", label: "Years of Craft" },
    { value: "520+", label: "Weddings & Editorial Sessions" },
    { value: "14", label: "International Photography Honors" },
    { value: "100%", label: "Bespoke Curation" },
  ],

  navigation: [
    { label: "Home", path: "/" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "About", path: "/about" },
    { label: "Contact & Booking", path: "/contact" },
  ],
};
