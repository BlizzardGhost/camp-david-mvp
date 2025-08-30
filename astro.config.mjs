// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.campdavidct.com',
  integrations: [
    react(),                     // 👈 add this
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  prefetch: true,
  server: { host: true },
});
