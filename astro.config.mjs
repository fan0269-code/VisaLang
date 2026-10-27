import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const noindexSitemapPaths = [
  '/affiliate-disclosure/',
  '/cookie-policy/',
  '/editorial-policy/',
  '/privacy-policy/',
  '/terms/',
  '/partners/',
  '/pricing/',
  '/products/a1-family-reunion-pack/',
  '/products/a1-practice-pack/',
  '/route-review/',
  '/guides/yki-finnish-citizenship/',
  '/guides/category/uk/',
  '/guides/category/finland/',
  '/guides/category/portugal/',
  '/zh/404/',
  '/404/',
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
  vite: {
    server: {
      proxy: {
        '/api/purpose-suggestion/': 'http://127.0.0.1:8011',
      },
    },
  },
  build: {
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
