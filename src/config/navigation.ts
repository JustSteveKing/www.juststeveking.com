import type { NavGroup, NavItem } from '@/types';

export const mainNav: NavItem[] = [
  { label: 'Start Here', href: '/start-here', variant: 'highlight' },
  {
    label: 'Insights',
    href: '/articles',
    items: [
      { label: 'Articles', href: '/articles' },
      { label: 'Resources', href: '/resources' },
      { label: 'Career Framework', href: '/career-framework' },
      { label: 'API Guides', href: '/api-guides' },
      { label: 'Videos', href: '/videos' },
      { label: 'Talks', href: '/talks' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Newsletter', href: '/newsletter' },
    ],
  },
  { label: 'Services', href: '/services' },
  {
    label: 'Projects',
    href: '/projects',
    items: [
      { label: 'Projects', href: '/projects' },
      { label: 'Packages', href: '/packages' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Book a Call', href: '/contact', variant: 'cta' },
];

/**
 * Footer navigation — grouped by topic.
 */
export const footerNav: NavGroup[] = [
  {
    label: 'Conversion',
    items: [
      { label: 'Services', href: '/services' },
      { label: 'Resources', href: '/resources' },
      { label: 'Contact', href: '/contact' },
      { label: 'Newsletter', href: '/newsletter' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Articles', href: '/articles' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Talks', href: '/talks' },
      { label: 'Videos', href: '/videos' },
      { label: 'Series', href: '/articles/series' },
    ],
  },
  {
    label: 'Proof',
    items: [
      { label: 'Projects', href: '/projects' },
      { label: 'Packages', href: '/packages' },
      { label: 'About', href: '/about' },
      { label: 'Start Here', href: '/start-here' },
    ],
  },
  {
    label: 'Library',
    items: [
      { label: 'Career Framework', href: '/career-framework' },
      { label: 'API Guides', href: '/api-guides' },
      { label: 'Podcasts', href: '/podcasts' },
      { label: 'RSS Feed', href: '/rss.xml' },
    ],
  },
];

/** Breadcrumb root — used as the first crumb on every page. */
export const homeCrumb: NavItem = { label: 'Home', href: '/' };
