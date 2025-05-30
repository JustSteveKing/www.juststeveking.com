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
    '@nuxthub/core'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://www.juststeveking.com',
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
  }
})
