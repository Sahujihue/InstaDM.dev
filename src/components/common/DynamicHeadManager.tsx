'use client';

import { useEffect } from 'react';

export function DynamicHeadManager() {
  useEffect(() => {
    const updateHeadElements = () => {
      try {
        const stored = localStorage.getItem('instadm_admin_settings');
        if (!stored) return;
        const settings = JSON.parse(stored);

        // Update Favicon
        if (settings.faviconUrl) {
          let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = settings.faviconUrl;
        }

        // Update Document Title
        if (settings.siteTitle) {
          document.title = settings.siteTitle;
        }

        // Update Meta Description
        if (settings.metaDescription) {
          let desc = document.querySelector<HTMLMetaElement>("meta[name='description']");
          if (!desc) {
            desc = document.createElement('meta');
            desc.name = 'description';
            document.head.appendChild(desc);
          }
          desc.content = settings.metaDescription;
        }

        // Update OpenGraph Image
        if (settings.metaBannerUrl) {
          let ogImage = document.querySelector<HTMLMetaElement>("meta[property='og:image']");
          if (!ogImage) {
            ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            document.head.appendChild(ogImage);
          }
          ogImage.content = settings.metaBannerUrl;

          let twImage = document.querySelector<HTMLMetaElement>("meta[name='twitter:image']");
          if (!twImage) {
            twImage = document.createElement('meta');
            twImage.setAttribute('name', 'twitter:image');
            document.head.appendChild(twImage);
          }
          twImage.content = settings.metaBannerUrl;
        }
      } catch {
        // silent fail
      }
    };

    updateHeadElements();
    window.addEventListener('instadm_settings_updated', updateHeadElements);
    window.addEventListener('storage', updateHeadElements);
    return () => {
      window.removeEventListener('instadm_settings_updated', updateHeadElements);
      window.removeEventListener('storage', updateHeadElements);
    };
  }, []);

  return null;
}
