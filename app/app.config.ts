export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://github.com/juststeveking.png',
      light: 'https://github.com/juststeveking.png',
      alt: 'Me giving a talk at API Platform Conference 2024'
    },
    meetingLink: 'https://juststeveking.link/cal',
    email: 'juststeveking@proton.me',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
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
    credits: `Copyright © 2019 - ${new Date().getFullYear()} JustSteveKing. All rights reserved.`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-x',
      'to': 'https://juststeveking.link/x',
      'target': '_blank',
      'aria-label': 'JustSteveKing on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://juststeveking.link/gh',
      'target': '_blank',
      'aria-label': 'JustSteveKing on GitHub'
    }, {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://juststeveking.link/linkedin',
      'target': '_blank',
      'aria-label': 'Steve McDougall on LinkedIn'
    }, {
      'icon': 'i-simple-icons-bluesky',
      'to': 'https://juststeveking.link/bsky',
      'target': '_blank',
      'aria-label': 'JustSteveKing on Bluesky'
    }, {
      'icon': 'i-simple-icons-mastodon',
      'to': 'https://juststeveking.link/phpc',
      'target': '_blank',
      'aria-label': 'JustSteveKing on Mastodon'
    }, {
      'icon': 'i-simple-icons-youtube',
      'to': 'https://juststeveking.link/tube',
      'target': '_blank',
      'aria-label': 'JustSteveKing on YouTube'
    }, {
      'icon': 'i-simple-icons-devdotto',
      'to': 'https://juststeveking.link/dev',
      'target': '_blank',
      'aria-label': 'JustSteveKing on Dev.to'
    }, {
      'icon': 'i-simple-icons-caldotcom',
      'to': 'https://juststeveking.link/cal',
      'target': '_blank',
      'aria-label': 'Book a meeting with JustSteveKing'
    }, {
      'icon': 'i-simple-icons-warp',
      'to': 'https://juststeveking.link/warp',
      'target': '_blank',
      'aria-label': 'JustSteveKing on Warp'
    }]
  }
})
