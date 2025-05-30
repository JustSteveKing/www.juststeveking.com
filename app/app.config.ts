export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://github.com/juststeveking.png',
      light: 'https://github.com/juststeveking.png',
      alt: 'Me giving a talk at API Platform Conference 2024',
    },
    meetingLink: 'https://juststeveking.link/cal',
    email: 'juststeveking@proton.me',
    available: true
  },
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },
  uiPro: {
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-nuxtdotjs',
      'to': 'https://nuxt.com',
      'target': '_blank',
      'aria-label': 'Nuxt Website'
    }, {
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.com/invite/ps2h6QT',
      'target': '_blank',
      'aria-label': 'Nuxt UI on Discord'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/nuxt_js',
      'target': '_blank',
      'aria-label': 'Nuxt on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/nuxt/ui',
      'target': '_blank',
      'aria-label': 'Nuxt UI on GitHub'
    }]
  }
})
