import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_SEO, getSEOForPath } from '../data/seoConfig';

function updateMetaTag(attrName, attrValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonical(href) {
  if (!href) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function useDocumentSEO(overrides = {}) {
  const location = useLocation();

  useEffect(() => {
    const routeDefaults = getSEOForPath(location.pathname);
    const seo = {
      ...routeDefaults,
      ...overrides,
    };

    const title = seo.title || DEFAULT_SEO.title;
    const description = seo.description || DEFAULT_SEO.description;
    const keywords = seo.keywords || DEFAULT_SEO.keywords;
    const canonical = seo.canonical || DEFAULT_SEO.canonical;
    const robots = seo.robots || DEFAULT_SEO.robots;
    const ogTitle = seo.ogTitle || title;
    const ogDescription = seo.ogDescription || description;
    const ogImage = seo.ogImage || DEFAULT_SEO.ogImage;
    const ogType = seo.ogType || DEFAULT_SEO.ogType;
    const ogLocale = seo.ogLocale || DEFAULT_SEO.ogLocale || 'en_IN';
    const twitterTitle = seo.twitterTitle || title;
    const twitterDescription = seo.twitterDescription || description;
    const twitterImage = seo.twitterImage || ogImage;

    // 1. Title
    document.title = title;

    // 2. Standard Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'robots', robots);

    // 3. Canonical Link
    updateCanonical(canonical);

    // 4. Open Graph Meta Tags
    updateMetaTag('property', 'og:title', ogTitle);
    updateMetaTag('property', 'og:description', ogDescription);
    updateMetaTag('property', 'og:url', canonical);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:locale', ogLocale);

    // 5. Twitter Meta Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', twitterTitle);
    updateMetaTag('name', 'twitter:description', twitterDescription);
    updateMetaTag('name', 'twitter:image', twitterImage);
  }, [
    location.pathname,
    overrides.title,
    overrides.description,
    overrides.canonical,
    overrides.keywords,
    overrides.robots,
    overrides.ogImage,
    overrides.ogType,
  ]);
}

export default function SEO(props) {
  useDocumentSEO(props);
  return null;
}
