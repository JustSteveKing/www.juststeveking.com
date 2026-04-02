// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',

  integrations: [icon(), sitemap()],

  env: {
    schema: {
      GITHUB_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
        default: '',
      }),
      BUTTONDOWN_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      PUBLIC_NEWSLETTER_ACTION: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      NEWSLETTER_USERNAME: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },

  site: 'https://www.juststeveking.com',

  vite: {
    plugins: [tailwindcss()]
  }

});