import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';
import { resolveRuntimeFeatures } from './src/data/runtime-features.ts';

const runtimeFeatures = resolveRuntimeFeatures(process.env);

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
];

export default defineConfig({
  site: 'https://visalang.org',
  define: {
    __VISALANG_RUNTIME_FEATURES__: JSON.stringify(runtimeFeatures),
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !noindexSitemapPaths.includes(pathname);
      },
    }),
    {
      name: 'visalang-runtime-features-manifest',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await writeFile(new URL('runtime-features.json', dir), `${JSON.stringify(runtimeFeatures, null, 2)}\n`);
        },
      },
    },
  ],
  trailingSlash: 'always',
  vite: {
    server: {
      proxy: runtimeFeatures.purposeSuggestions === 'off' ? {} : {
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
