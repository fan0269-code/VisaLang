import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://flowlight.me',
  integrations: [sitemap()],
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
