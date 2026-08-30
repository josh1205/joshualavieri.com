import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Frontmatter is schema-validated at build time — a malformed date or a
// missing title fails the build rather than shipping broken pages.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Emoji shown beside the title in listings. */
    icon: z.string().default('📄'),
  }),
})

export const collections = { blog }
