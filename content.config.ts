import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		description: z.string(),
		image: z.object({
			url: z.string(),
			alt: z.string()
		}).optional(),
		tags: z.array(z.string()),
		layout: z.string().optional()
	}),
});

export const collections = { blog };
