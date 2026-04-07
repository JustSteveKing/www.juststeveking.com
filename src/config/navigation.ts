import type { NavGroup, NavItem } from '@/types';

/**
 * Primary navigation — rendered in the site header.
 * Keep this short; anything secondary belongs in footerNav.
 */
export const mainNav: NavItem[] = [
  { label: 'Start Here', href: '/start-here' },
  { label: 'Articles', href: '/articles' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Projects', href: '/projects' },
  { label: 'Talks', href: '/talks' },
  { label: 'Videos', href: '/videos' },
  { label: 'Work With Me', href: '/work-with-me' },
];

/**
 * Footer navigation — grouped by topic.
 */
export const footerNav: NavGroup[] = [
  {
    label: 'Content',
    items: [
      { label: 'Articles', href: '/articles' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Talks', href: '/talks' },
      { label: 'Videos', href: '/videos' },
      { label: 'Podcasts', href: '/podcasts' },
      { label: 'Series', href: '/articles/series' },
    ],
  },
  {
    label: 'Projects',
    items: [
      { label: 'Projects', href: '/projects' },
      { label: 'Packages', href: '/packages' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'API Guides', href: '/api-guides' },
      { label: 'RSS Feed', href: '/rss.xml' },
    ],
  },
  {
    label: 'Site',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Now', href: '/now' },
      { label: 'Uses', href: '/uses' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Colophon', href: '/colophon' },
    ],
  },
];

/**
 * Breadcrumb root — used as the first crumb on every page.
 */
export const homeCrumb: NavItem = { label: 'Home', href: '/' };
