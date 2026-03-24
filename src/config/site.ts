import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  title: 'JustSteveKing',
  description:
    'Developer, speaker, and open-source maintainer writing about PHP, APIs, and software craft.',
  url: 'https://www.juststeveking.com',
  locale: 'en-GB',
  defaultOgImage: '/og/default.webp',

  author: {
    name: 'Steve McDougall',
    bio: 'Developer advocate, open-source maintainer, and conference speaker. I write about PHP, APIs, and building great developer experiences.',
    avatar: 'https://github.com/juststeveking.png',
    email: 'juststevemcdougall@gmail.com',
    socials: [
      {
        platform: 'github',
        url: 'https://github.com/JustSteveKing',
        handle: 'JustSteveKing',
        label: 'GitHub',
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/JustSteveKing',
        handle: '@JustSteveKing',
        label: 'Twitter / X',
      },
      {
        platform: 'bluesky',
        url: 'https://bsky.app/profile/juststeveking.com',
        handle: '@juststeveking.com',
        label: 'Bluesky',
      },
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/juststeveking',
        handle: 'juststeveking',
        label: 'LinkedIn',
      },
      {
        platform: 'youtube',
        url: 'https://www.youtube.com/@JustSteveKing',
        handle: '@JustSteveKing',
        label: 'YouTube',
      },
    ],
  },

  socials: [
    {
      platform: 'github',
      url: 'https://github.com/JustSteveKing',
      handle: 'JustSteveKing',
      label: 'GitHub',
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/JustSteveKing',
      handle: '@JustSteveKing',
      label: 'Twitter / X',
    },
    {
      platform: 'bluesky',
      url: 'https://bsky.app/profile/juststeveking.com',
      handle: '@juststeveking.com',
      label: 'Bluesky',
    },
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/juststeveking',
      handle: 'juststeveking',
      label: 'LinkedIn',
    },
    {
      platform: 'youtube',
      url: 'https://www.youtube.com/@JustSteveKing',
      handle: '@JustSteveKing',
      label: 'YouTube',
    },
    {
      platform: 'rss',
      url: '/rss.xml',
      label: 'RSS Feed',
    },
  ],
};
