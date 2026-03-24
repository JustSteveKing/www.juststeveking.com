import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { GITHUB_TOKEN } from 'astro:env/server';
import { githubLoader } from '@/loaders/github';
import { githubJsonLoader } from '@/loaders/github-json';
import { resumeLoader } from '@/loaders/resume';

const OWNER = 'juststeveking';
const REPO = 'content';

function collection(path: string) {
  return githubLoader({ owner: OWNER, repo: REPO, path, token: GITHUB_TOKEN });
}

const apiGuides = defineCollection({
  loader: collection('api-guides'),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string().max(220),
    category: z.string(),
    complexity: z.enum(['intro', 'intermediate', 'advanced']).default('intro'),
    apiStyles: z.array(z.string()).default([]),
    useWhen: z.string(),
    avoidWhen: z.string(),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    publishedDate: z.coerce.date().optional(),
  }),
});

const articles = defineCollection({
  loader: collection('articles'),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    category: z.string().default('Uncategorized'),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    minRead: z.number().optional(),
    draft: z.boolean().default(false).optional(),
    featured: z.boolean().default(false).optional(),
    readingTime: z.number().optional(),
    canonical: z.string().url().optional(),
    sponsor: z
      .object({
        name: z.string(),
        url: z.string().url(),
        logo: z.string().url(),
      })
      .optional(),
    crossPost: z
      .object({
        originalUrl: z.string().url(),
        originalSite: z.string(),
        publishedDate: z.coerce.date(),
        permission: z.boolean(),
      })
      .optional(),
  }),
});

const testimonials = defineCollection({
  loader: collection('testimonials'),
  schema: z.object({
    quote: z.string(),
    author: z.object({
      name: z.string(),
      role: z.string(),
      company: z.string(),
      avatar: z
        .object({
          src: z.string().url(),
        })
        .optional(),
    }),
  }),
});

const videos = defineCollection({
  loader: collection('videos'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    videoId: z.string(),
    publishedDate: z.coerce.date(),
    duration: z.string(),
    views: z.string().optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    type: z.enum(['video', 'shorts', 'livestream']).default('video'),
    featured: z.boolean().default(false),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    transcript: z.boolean().default(false),
  }),
});

const packages = defineCollection({
  loader: collection('packages'),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    packagist: z.string().url().optional(),
    github: z.string().url().optional(),
    link: z.string().url().optional(),
    tech: z.array(z.string()).optional(),
    order: z.number().optional(),
    featured: z.boolean().default(false),
    downloads: z.number().optional(),
    monthlyDownloads: z.number().optional(),
    stars: z.number().optional(),
    version: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const talks = defineCollection({
  loader: collection('talks'),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    location: z.string(),
    date: z.coerce.date(),
    category: z.enum(['conference', 'workshop', 'meetup', 'webinar', 'panel']),
    description: z.string().optional(),
    url: z.string().url().optional(),
    slides: z.string().url().optional(),
    video: z.string().url().optional(),
    featured: z.boolean().default(false),
    upcoming: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const podcasts = defineCollection({
  loader: collection('podcasts'),
  schema: z.object({
    title: z.string(),
    episode: z.string(),
    date: z.coerce.date(),
    url: z.string().url().optional(),
    description: z.string().optional(),
  }),
});

const tools = defineCollection({
  loader: githubJsonLoader({ owner: OWNER, repo: REPO, path: 'tools', token: GITHUB_TOKEN }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    items: z
      .array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          url: z.string().url().optional(),
        }),
      )
      .min(1),
  }),
});

const resume = defineCollection({
  loader: resumeLoader({ owner: OWNER, repo: REPO, path: 'resume.json', token: GITHUB_TOKEN }),
  schema: z.object({
    basics: z.object({
      name: z.string(),
      label: z.string().optional(),
      image: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      url: z.string().optional(),
      summary: z.string().optional(),
      location: z
        .object({
          address: z.string().optional(),
          postalCode: z.string().optional(),
          city: z.string().optional(),
          region: z.string().optional(),
          countryCode: z.string().optional(),
        })
        .optional(),
      profiles: z
        .array(
          z.object({
            network: z.string(),
            username: z.string(),
            url: z.string(),
          }),
        )
        .default([]),
    }),
    work: z
      .array(
        z.object({
          name: z.string(),
          position: z.string(),
          url: z.string().optional(),
          startDate: z.string(),
          endDate: z.string().optional(),
          summary: z.string().optional(),
          highlights: z.array(z.string()).default([]),
          location: z.string().optional(),
          technologies: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    volunteer: z
      .array(
        z.object({
          organization: z.string(),
          position: z.string(),
          url: z.string().optional(),
          startDate: z.string(),
          endDate: z.string().optional(),
          summary: z.string().optional(),
          highlights: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    education: z
      .array(
        z.object({
          institution: z.string(),
          url: z.string().optional(),
          area: z.string(),
          studyType: z.string(),
          startDate: z.string(),
          endDate: z.string().optional(),
          score: z.string().optional(),
          courses: z.array(z.string()).default([]),
          description: z.string().optional(),
        }),
      )
      .default([]),
    awards: z
      .array(
        z.object({
          title: z.string(),
          date: z.string(),
          awarder: z.string(),
          summary: z.string().optional(),
        }),
      )
      .default([]),
    certificates: z
      .array(
        z.object({
          name: z.string(),
          date: z.string(),
          issuer: z.string(),
          url: z.string().optional(),
        }),
      )
      .default([]),
    publications: z
      .array(
        z.object({
          name: z.string(),
          publisher: z.string(),
          releaseDate: z.string(),
          url: z.string().optional(),
          summary: z.string().optional(),
        }),
      )
      .default([]),
    skills: z
      .array(
        z.object({
          name: z.string(),
          level: z.string().optional(),
          keywords: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    languages: z
      .array(
        z.object({
          language: z.string(),
          fluency: z.string(),
        }),
      )
      .default([]),
    interests: z
      .array(
        z.object({
          name: z.string(),
          keywords: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    references: z
      .array(
        z.object({
          name: z.string(),
          reference: z.string(),
        }),
      )
      .default([]),
    projects: z
      .array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          highlights: z.array(z.string()).default([]),
          keywords: z.array(z.string()).default([]),
          startDate: z.string().optional(),
          endDate: z.string().optional(),
          url: z.string().optional(),
          roles: z.array(z.string()).default([]),
          entity: z.string().optional(),
          type: z.string().optional(),
        }),
      )
      .default([]),
  }),
});
export const collections = {
  apiGuides,
  articles,
  resume,
  testimonials,
  tools,
  videos,
  packages,
  talks,
  podcasts,
};

