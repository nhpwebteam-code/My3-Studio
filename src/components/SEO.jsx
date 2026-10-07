import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_SEO, SITE_URL, getSEOForPath } from '../data/seoConfig';

function toAbsoluteUrl(url) {
  if (!url) return '';
  if (url.startsWith('https://mythristudios.in')) {
    return url.replace('https://mythristudios.in', 'https://www.mythristudios.in');
  }
  if (url.startsWith('http://mythristudios.in')) {
    return url.replace('http://mythristudios.in', 'https://www.mythristudios.in');
  }
  if (url.startsWith('http://www.mythristudios.in')) {
    return url.replace('http://www.mythristudios.in', 'https://www.mythristudios.in');
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

function formatCanonical(href) {
  if (!href) return `${SITE_URL}/`;
  const absolute = toAbsoluteUrl(href);
  try {
    const urlObj = new URL(absolute);
    if (urlObj.pathname === '/' || urlObj.pathname === '') {
      return `${urlObj.origin}/`;
    }
    if (urlObj.pathname.endsWith('/')) {
      return `${urlObj.origin}${urlObj.pathname.slice(0, -1)}`;
    }
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch {
    return absolute;
  }
}

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
    const canonical = formatCanonical(seo.canonical || DEFAULT_SEO.canonical);
    const robots = seo.robots || DEFAULT_SEO.robots;
    const ogTitle = seo.ogTitle || title;
    const ogDescription = seo.ogDescription || description;
    const ogImage = toAbsoluteUrl(seo.ogImage || DEFAULT_SEO.ogImage);
    const ogType = seo.ogType || DEFAULT_SEO.ogType;
    const ogLocale = seo.ogLocale || DEFAULT_SEO.ogLocale || 'en_IN';
    const twitterTitle = seo.twitterTitle || title;
    const twitterDescription = seo.twitterDescription || description;
    const twitterImage = toAbsoluteUrl(seo.twitterImage || ogImage);

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
