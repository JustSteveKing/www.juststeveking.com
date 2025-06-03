import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'About',
    icon: 'i-lucide-user',
    to: '/about'
  },
  {
    label: 'Content',
    icon: 'i-lucide-book-copy',
    children: [
      {
        label: 'Articles & Tutorials',
        description: 'Technical deep-dives and practical guides for modern development.',
        to: '/articles',
        icon: 'i-lucide-book-open'
      },
      {
        label: 'Speaking & Events',
        description: 'Conference presentations and community workshops worldwide.',
        to: '/speaking',
        icon: 'i-lucide-mic'
      }
    ]
  },
  {
    label: 'Projects',
    icon: 'i-lucide-code',
    to: '/projects'
  },
  {
    label: 'More',
    icon: 'i-lucide-ellipsis',
    children: [
      {
        label: 'My Setup',
        description: 'Development tools and workflow optimization.',
        to: '/uses',
        icon: 'i-lucide-laptop'
      },
      {
        label: 'Sponsor',
        description: 'Support open-source development and educational content.',
        to: '/sponsorship',
        icon: 'i-lucide-heart-plus'
      }
    ]
  }
]
