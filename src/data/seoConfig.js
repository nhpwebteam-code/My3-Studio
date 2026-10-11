export const SITE_URL = 'https://www.mythristudios.in';

export const DEFAULT_SEO = {
  title: 'Mythri Studio | Best Photography in Nandyal, Andhra Pradesh',
  description:
    "Mythri Studio (Mythri Studios) — Nandyal's photography studio for weddings, portraits and events. Serving Nandyal and Andhra Pradesh.",
  keywords:
    'mythri studio, mythri studios, mythristudios, my3 studio, my3 studios, best photography in nandyal, photography studio nandyal, wedding photography nandyal, portrait photography andhra pradesh',
  canonical: `${SITE_URL}/`,
  robots: 'index, follow',
  ogTitle: 'Mythri Studio | Best Photography in Nandyal',
  ogDescription: 'Wedding, portrait and event photography in Nandyal, Andhra Pradesh. Also known as Mythri Studios.',
  ogImage: `${SITE_URL}/og-cover.jpg`,
  ogType: 'website',
  ogLocale: 'en_IN',
  twitterTitle: 'Mythri Studio | Photography in Nandyal',
  twitterImage: `${SITE_URL}/og-cover.jpg`,
};

export const PAGE_SEO = {
  '/': DEFAULT_SEO,
  '/wedding-photography-nandyal': {
    title: 'Best Wedding Photography in Nandyal | Mythri Studio',
    description:
      'Looking for the best wedding photography in Nandyal? Mythri Studio (also Mythri Studios) captures candid moments, traditional Telugu rituals, pre-wedding shoots, and luxury albums.',
    canonical: `${SITE_URL}/wedding-photography-nandyal`,
    keywords:
      'wedding photography nandyal, best wedding photographer nandyal, candid wedding photography nandyal, telugu wedding photos nandyal, mythri studio wedding, mythri studios wedding',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/og-cover.jpg`,
    ogType: 'website',
  },
  '/portrait-photography-nandyal': {
    title: 'Portrait Photography Studio in Nandyal | Mythri Studio',
    description:
      'Professional portrait photography studio in Nandyal. Mythri Studios specializes in bridal portraits, maternity shoots, baby & 1st birthday milestones, and fine-art lighting.',
    canonical: `${SITE_URL}/portrait-photography-nandyal`,
    keywords:
      'portrait photography nandyal, photo studio nandyal, maternity shoot nandyal, baby photoshoot nandyal, bridal portrait nandyal, mythri studio portrait, mythri studios',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/og-cover.jpg`,
    ogType: 'website',
  },
  '/gallery': {
    title: 'Photography Portfolio | Mythri Studio Nandyal',
    description:
      'Explore the photography portfolio of Mythri Studios in Nandyal. Discover creative captures across weddings, portraits, ceremonies, and special events.',
    canonical: `${SITE_URL}/gallery`,
    keywords:
      'photography portfolio nandyal, wedding photography gallery, portrait shoots nandyal, mythri studio photos, mythri studios photos',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/services': {
    title: 'Wedding, Portrait & Event Photography | Mythri Studio',
    description:
      'Comprehensive photography services by Mythri Studios in Nandyal. Specializing in wedding photography, candid shoots, portraits, events, and luxury albums.',
    canonical: `${SITE_URL}/services`,
    keywords:
      'wedding photography nandyal, portrait photography services, candid event shoots, luxury album printing nandyal, mythri studio services, mythri studios',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/about': {
    title: 'About Mythri Studio | Photography Studio in Nandyal',
    description:
      "About Mythri Studio (Mythri Studios), Nandyal's trusted photo studio. Learn about our story, experienced team, and commitment to capturing authentic emotions and memories.",
    canonical: `${SITE_URL}/about`,
    keywords:
      'about mythri studio, about mythri studios, photographers in nandyal, professional photo studio andhra pradesh, mythri studios team',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/pricing': {
    title: 'Photography Packages & Pricing | Mythri Studio',
    description:
      'Transparent photography packages and pricing from Mythri Studios in Nandyal for weddings, birthdays, outdoor shoots, and premium album design.',
    canonical: `${SITE_URL}/pricing`,
    keywords:
      'photography packages nandyal, wedding shoot pricing, studio rates nandyal, photo package cost andhra pradesh, mythri studio pricing, mythri studios',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/contact': {
    title: 'Contact Mythri Studio | Book a Shoot in Nandyal',
    description:
      'Contact Mythri Studio (Mythri Studios) in Nandyal, Andhra Pradesh. Get in touch to check date availability, request pricing quotes, or book your photography session today.',
    canonical: `${SITE_URL}/contact`,
    keywords:
      'contact mythri studio, contact mythri studios, book photographer nandyal, photography studio phone number nandyal, hire wedding photographer',
    robots: 'index, follow',
    ogImage: `${SITE_URL}/logo.png`,
    ogType: 'website',
  },
  '/login': {
    title: 'Admin Login | Mythri Studio',
    description: 'Mythri Studio studio portal and administrative management.',
    canonical: `${SITE_URL}/login`,
    robots: 'noindex, nofollow',
  },
  '/admin': {
    title: 'Studio Dashboard | Mythri Studio',
    description: 'Mythri Studio administrative portal.',
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
      title: 'Featured Photograph | Mythri Studio Nandyal',
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
