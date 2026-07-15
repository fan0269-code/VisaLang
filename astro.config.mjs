import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const noindexSitemapPaths = [
  '/affiliate-disclosure/',
  '/cookie-policy/',
  '/editorial-policy/',
  '/privacy-policy/',
  '/terms/',
];

export default defineConfig({
  site: 'https://visalang.org',
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !noindexSitemapPaths.includes(pathname);
      },
    }),
  ],
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
