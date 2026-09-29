import { useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalPath?: string;
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  ogImage,
  canonicalPath = '',
  schema,
}) => {
  const { settings } = useSettings();

  useEffect(() => {
    const finalTitle = title
      ? `${title} | ${settings?.agencyName || 'Nexora'}`
      : settings?.defaultSeoTitle || 'Nexora — Digital Experience Design & Development Studio';

    const finalDesc =
      description ||
      settings?.defaultSeoDesc ||
      'Strategy, UI/UX design, custom full-stack web development, and digital growth for ambitious brands and fast-growing modern businesses.';

    const finalImage = ogImage || settings?.defaultOgImage || '/uploads/hero_nexora_showcase_1790138540390.jpg';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${origin}${canonicalPath}`;

    document.title = finalTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDesc);

    // Update OpenGraph
    const setMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('og:title', finalTitle);
    setMeta('og:description', finalDesc);
    setMeta('og:image', finalImage);
    setMeta('og:url', fullUrl);
    setMeta('twitter:title', finalTitle);
    setMeta('twitter:description', finalDesc);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Schema JSON-LD if provided
    let scriptTag: HTMLScriptElement | null = null;
    if (schema) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.id = 'page-schema-ld';
      scriptTag.innerHTML = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    }

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [title, description, ogImage, canonicalPath, schema, settings]);

  return null;
};
