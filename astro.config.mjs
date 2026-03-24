// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  output: 'static',

  integrations: [icon()],

  env: {
    schema: {
      GITHUB_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
        default: '',
      }),
    },
  },

  site: 'https://www.juststeveking.com',

  vite: {
    plugins: [tailwindcss()]
  }
});
