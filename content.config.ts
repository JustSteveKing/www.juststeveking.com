import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

const createSponsorSchema = () => z.object({
  name: z.string(),
  url: z.string().url(),
  logo: z.string().url()
})

const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: createAuthorSchema()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          links: z.array(createButtonSchema()),
          images: z.array(createImageSchema())
        }),
        about: createBaseSchema(),
        experience: createBaseSchema().extend({
          items: z.array(z.object({
            date: z.date(),
            position: z.string(),
            description: z.string(),
            company: z.object({
              name: z.string(),
              url: z.string(),
              logo: z.string().editor({ input: 'icon' }),
              color: z.string()
            })
          }))
        }),
        testimonials: z.array(createTestimonialSchema()),
        articles: createBaseSchema(),
        services: createBaseSchema().extend({
          headline: z.string(),
          services: z.array(z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string()
          }))
        })
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        url: z.string().nonempty(),
        tags: z.array(z.string()),
        date: z.date()
      })
    }),
    articles: defineCollection({
      type: 'page',
      source: 'articles/*.md',
      schema: z.object({
        minRead: z.number(),
        date: z.date(),
        image: z.string().nonempty().editor({ input: 'media' }),
        author: createAuthorSchema(),
        sponsor: createSponsorSchema().optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'articles.yml' }
      ],
      schema: z.object({
        links: z.array(createButtonSchema())
      })
    }),
    speaking: defineCollection({
      type: 'page',
      source: 'speaking.yml',
      schema: z.object({
        links: z.array(createButtonSchema()),
        events: z.array(z.object({
          category: z.enum(['Meetup', 'Conference']),
          title: z.string(),
          date: z.date(),
          location: z.string(),
          url: z.string().optional()
        }))
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        content: z.object({})
      })
    }),
    uses: defineCollection({
      type: 'page',
      source: 'uses.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        hero: z.object({
          title: z.string(),
          description: z.string()
        }),
        hardware: z.object({
          title: z.string(),
          items: z.array(z.object({
            title: z.string(),
            description: z.string()
          }))
        }),
        services: z.object({
          title: z.string(),
          items: z.array(z.object({
            title: z.string(),
            description: z.string(),
            url: z.string().url().optional()
          }))
        }),
        software: z.object({
          title: z.string(),
          items: z.array(z.object({
            title: z.string(),
            description: z.string()
          }))
        })
      })
    }),
    sponsorships: defineCollection({
      type: 'page',
      source: 'sponsorships.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        hero: z.object({
          title: z.string(),
          description: z.string()
        }),
        links: z.array(z.object({
          title: z.string(),
          url: z.string().url()
        })),
        plans: z.object({
          title: z.string(),
          description: z.string(),
          items: z.array(z.object({
            title: z.string(),
            cost: z.string(),
            description: z.string(),
            details: z.object({
              title: z.string(),
              description: z.string(),
              includes: z.array(z.string()),
              excludes: z.array(z.string()).optional(),
              terms: z.array(z.string()),
              deliverables: z.array(z.string()).optional()
            })
          }))
        })
      })
    })
  }
})
