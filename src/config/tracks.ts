import type { NavItem } from './navigation';

export interface Track {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  items: NavItem[];
}

export const tracks: Track[] = [
  {
    id: 'api-design',
    title: 'API Design Track',
    description: 'For backend and platform teams focusing on consistent contracts and reliable releases.',
    href: '/tracks/api-design',
    icon: 'command',
    items: [
      { label: 'Introduction to API Design', href: '/articles/intro-to-api-design' },
      { label: 'Standardizing Your API Patterns', href: '/articles/standardizing-api-patterns' },
      { label: 'Versioning Strategies', href: '/articles/api-versioning' },
    ],
  },
  {
    id: 'laravel-architecture',
    title: 'Laravel Architecture Track',
    description: 'For product teams looking to modernize delivery patterns and maintainable codebases.',
    href: '/tracks/laravel-architecture',
    icon: 'layout',
    items: [
      { label: 'Thin Controllers, Fat Models?', href: '/articles/thin-controllers' },
      { label: 'Domain Driven Design in Laravel', href: '/articles/ddd-laravel' },
      { label: 'Testing Complex Architectures', href: '/articles/laravel-testing' },
    ],
  },
  {
    id: 'team-enablement',
    title: 'Team Enablement Track',
    description: 'For engineering leaders building onboarding and learning systems that actually work.',
    href: '/tracks/team-enablement',
    icon: 'users',
    items: [
      { label: 'Building a Culture of Learning', href: '/articles/learning-culture' },
      { label: 'Onboarding for Senior Engineers', href: '/articles/senior-onboarding' },
      { label: 'The ROI of Documentation', href: '/articles/documentation-roi' },
    ],
  },
];
