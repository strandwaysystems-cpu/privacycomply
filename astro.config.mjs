import { defineConfig } from 'astro/config';
import sitemap from './sitemap-integration.mjs';

const site = 'https://privacycomply.io';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap({ site })],
  trailingSlash: 'ignore',
  build: {
    format: 'file', // outputs /page.html not /page/index.html — matches our canonical URLs
    assets: '_assets',
  },
  compressHTML: true,
});
