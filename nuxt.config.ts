// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    'nuxt-cloudflare-analytics',
    '@nuxthub/core',
    '@nuxtjs/sitemap',
    'nuxt-llms',
    '@nuxtjs/robots'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://juststeveking.com',
    name: 'JustSteveKing'
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            'php', 'json', 'yaml', 'dockerfile', 'bash', 'go', 'markdown',
            'makefile', 'gherkin', 'html', 'typescript', 'md', 'ini', 'nginx',
            'shell', 'json', 'http', 'dotenv'
          ],
          theme: {
            default: 'github-light',
            dark: 'github-dark',
            sepia: 'github-dark-dimmed'
          }
        },
        rehypePlugins: {},
        remarkPlugins: {},
        toc: {
          depth: 3,
          searchDepth: 3
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  robots: {
    blockNonSeoBots: true,
    blockAiBots: true
  },

  cloudflareAnalytics: {
    token: 'e0adefa2a56b4f0db19819e9c168df4b'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  hub: {
    analytics: true,
    cache: true
  },

  llms: {
    domain: 'https://juststeveking.com',
    title: 'JustSteveKing',
    description: 'I help engineering teams build better APIs, scale developer adoption, and create content that converts.',
    sections: [
      {
        title: 'Content',
        description: 'Explore my articles, tutorials, and guides on API design, developer experience, and more.',
        links: [
          {
            title: 'Technical Writing & Insights',
            description: 'Practical guides on API design, Laravel optimization, and modern development practices that help teams ship better software',
            href: '/articles'
          },
          {
            title: 'Technical Speaking',
            description: 'I help developer communities learn through real-world examples and practical techniques. My talks cover API design patterns, Laravel architecture decisions, and productivity strategies that teams can implement immediately.',
            href: '/speaking'
          }
        ]
      }
    ]
  }
})