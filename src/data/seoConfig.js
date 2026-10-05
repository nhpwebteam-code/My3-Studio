export const SITE_URL = 'https://mythristudios.in';

export const DEFAULT_SEO = {
  title: 'Mythri Studios | Best Photography Studio in Nandyal, Andhra Pradesh',
  description:
    "Mythri Studios - Nandyal's photography studio for weddings, portraits and events. Creative, detail-focused photography serving Nandyal and Andhra Pradesh.",
  keywords:
    'mythri studios, mythristudios, my3 studios, best photography in nandyal, photography studio nandyal, wedding photography nandyal, portrait photography andhra pradesh',
  canonical: `${SITE_URL}/`,
  robots: 'index, follow',
  ogTitle: 'Mythri Studios | Best Photography in Nandyal',
  ogDescription: 'Wedding, portrait and event photography in Nandyal, Andhra Pradesh.',
  ogImage: `${SITE_URL}/og-cover.jpg`,
  ogType: 'website',
  ogLocale: 'en_IN',
  twitterTitle: 'Mythri Studios | Photography in Nandyal',
  twitterImage: `${SITE_URL}/og-cover.jpg`,
};

export const PAGE_SEO = {
  '/': DEFAULT_SEO,
  '/wedding-photography-nandyal': {
    title: 'Best Wedding Photography in Nandyal | Mythri Studios',
    description:
      'Looking for the best wedding photography in Nandyal? Mythri Studios captures candid moments, traditional Telugu rituals, pre-wedding shoots, and luxury albums.',
    canonical: `${SITE_URL}/wedding-photography-nandyal`,
    keywords:
      'wedding photography nandyal, best wedding photographer nandyal, candid wedding photography nandyal, telugu wedding photos nandyal, mythri studios wedding',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/og-cover.jpg`,
    ogType: 'website',
  },
  '/portrait-photography-nandyal': {
    title: 'Portrait Photography Studio in Nandyal | Mythri Studios',
    description:
      'Professional portrait photography studio in Nandyal. Specialized in bridal portraits, maternity shoots, baby & 1st birthday milestones, and fine-art lighting.',
    canonical: `${SITE_URL}/portrait-photography-nandyal`,
    keywords:
      'portrait photography nandyal, photo studio nandyal, maternity shoot nandyal, baby photoshoot nandyal, bridal portrait nandyal',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/og-cover.jpg`,
    ogType: 'website',
  },
  '/gallery': {
    title: 'Photography Portfolio | Mythri Studios Nandyal',
    description:
      'Explore the photography portfolio of Mythri Studios in Nandyal. Discover our creative captures across weddings, portraits, traditional ceremonies, and special events.',
    canonical: `${SITE_URL}/gallery`,
    keywords:
      'photography portfolio nandyal, wedding photography gallery, portrait shoots nandyal, mythri studios photos',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/services': {
    title: 'Wedding, Portrait & Event Photography | Mythri Studios',
    description:
      'Comprehensive photography services by Mythri Studios in Nandyal, Andhra Pradesh. Specializing in wedding photography, candid shoots, portraits, events, and luxury albums.',
    canonical: `${SITE_URL}/services`,
    keywords:
      'wedding photography nandyal, portrait photography services, candid event shoots, luxury album printing nandyal',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/about': {
    title: 'About Mythri Studios | Photography Studio in Nandyal',
    description:
      "About Mythri Studios - Nandyal's trusted photography studio. Learn about our story, experienced team, and commitment to capturing authentic emotions and timeless memories.",
    canonical: `${SITE_URL}/about`,
    keywords:
      'about mythri studios, photographers in nandyal, professional photo studio andhra pradesh, mythri studios team',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/pricing': {
    title: 'Photography Packages & Pricing | Mythri Studios',
    description:
      'Transparent photography packages and pricing from Mythri Studios in Nandyal. Tailored packages for weddings, birthdays, outdoor shoots, and premium album design.',
    canonical: `${SITE_URL}/pricing`,
    keywords:
      'photography packages nandyal, wedding shoot pricing, studio rates nandyal, photo package cost andhra pradesh',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/contact': {
    title: 'Contact Mythri Studios | Book a Shoot in Nandyal',
    description:
      'Contact Mythri Studios in Nandyal, Andhra Pradesh. Get in touch to check date availability, request pricing quotes, or book your photography session today.',
    canonical: `${SITE_URL}/contact`,
    keywords:
      'contact mythri studios, book photographer nandyal, photography studio phone number nandyal, hire wedding photographer',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/login': {
    title: 'Admin Login | Mythri Studios',
    description: 'Mythri Studios studio portal and administrative management.',
    canonical: `${SITE_URL}/login`,
    robots: 'noindex, nofollow',
  },
  '/admin': {
    title: 'Studio Dashboard | Mythri Studios',
    description: 'Mythri Studios administrative portal.',
    canonical: `${SITE_URL}/admin`,
    robots: 'noindex, nofollow',
  },
};

export function getSEOForPath(pathname) {
  // Normalize trailing slash if path is not root
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (PAGE_SEO[cleanPath]) {
    return PAGE_SEO[cleanPath];
  }

  // Handle /gallery/:photoSlug
  if (cleanPath.startsWith('/gallery/')) {
    return {
      title: 'Featured Photograph | Mythri Studios Nandyal',
      description: 'View featured photograph from Mythri Studios in Nandyal, Andhra Pradesh.',
      canonical: `${SITE_URL}${cleanPath}`,
      keywords: DEFAULT_SEO.keywords,
      robots: 'index, follow',
      ogImage: `${SITE_URL}/logo.png`,
      ogType: 'article',
    };
  }

  return DEFAULT_SEO;
}
