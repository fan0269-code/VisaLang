import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    slug: z.string(),
    publishedDate: z.string(),
    updatedDate: z.string(),
    author: z.string().default('VisaLang'),
    readingTime: z.string().default('5'),
    featured: z.boolean().default(false),
    eyebrow: z.string().optional(),
    route: z.string().optional(),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { guides };
