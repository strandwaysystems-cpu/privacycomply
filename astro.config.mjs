import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://privacycomply.io',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'file', // outputs /page.html not /page/index.html — matches our canonical URLs
    assets: '_assets',
  },
  compressHTML: true,
});
