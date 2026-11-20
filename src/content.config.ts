import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One markdown file per story. The body is the blurb shown on the card.
// Cards are sorted by `order`.
const stories = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/stories' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      cover: image(),
      coverAlt: z.string(),
    }),
});

// One markdown file per illustration. `images` holds one or more images (grouped side by side
// on desktop, stacked on mobile). The body is the description shown below them.
// Illustrations are sorted by `order`.
const illustrations = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/illustrations' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      images: z.array(z.object({ src: image(), alt: z.string() })).min(1),
    }),
});

// Free-form page sections (hero tagline, about me). The body is the copy.
const blocks = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blocks' }),
  schema: ({ image }) =>
    z.object({
      heading: z.string().optional(),
      portrait: image().optional(),
      portraitAlt: z.string().optional(),
      email: z.string().email().optional(),
      instagram: z.string().optional(), // username, without the @
    }),
});

export const collections = { stories, illustrations, blocks };
