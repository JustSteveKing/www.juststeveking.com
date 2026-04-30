import { getCollection, getEntry } from 'astro:content';

export async function GET() {
  const articles = await getCollection('articles');
  const talks = await getCollection('talks');
  const videos = await getCollection('videos');
  const packages = await getCollection('packages');
  const resume = await getEntry('resume', 'resume');

  const searchIndex = [
    ...articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      href: `/articles/${a.id}`,
      category: 'Articles',
    })),
    ...talks.map((t) => ({
      title: t.data.title,
      description: t.data.event,
      href: `/talks/${t.id}`,
      category: 'Talks',
    })),
    ...videos.map((v) => ({
      title: v.data.title,
      description: v.data.description,
      href: `/videos/${v.id}`,
      category: 'Videos',
    })),
    ...packages.map((p) => ({
      title: p.data.name,
      description: p.data.description,
      href: `/packages/${p.id}`,
      category: 'Packages',
    })),
    ...(resume?.data.projects ?? []).map((p) => ({
      title: p.name,
      description: p.description,
      href: `/projects`, // Link to projects page since there's no slug
      category: 'Projects',
    })),
    // Static pages
    { title: 'Projects', description: 'Selected work reframed around problem-solving and capability.', href: '/projects', category: 'Page' },
    { title: 'Start Here', description: 'Curated learning paths and practical entry points.', href: '/start-here', category: 'Page' },
    {
      title: 'Career Framework',
      description: 'Engineering career progression framework with IC and manager tracks.',
      href: '/career-framework',
      category: 'Page',
    },
    { title: 'Services', description: 'API audits, reliability fixes, and ongoing advisory.', href: '/services', category: 'Page' },
    { title: 'Work With Me', description: 'Compatibility route for services.', href: '/work-with-me', category: 'Page' },
    { title: 'Resources', description: 'Lead magnets, guides, and checklists.', href: '/resources', category: 'Page' },
    { title: 'Contact', description: 'Book a discovery call or send context about your team.', href: '/contact', category: 'Page' },
    { title: 'About', description: 'Story, philosophy, and proof.', href: '/about', category: 'Page' },
    { title: 'Uses', description: 'Hardware and software I use.', href: '/uses', category: 'Page' },
  ];

  return new Response(JSON.stringify(searchIndex), {
    headers: { 'Content-Type': 'application/json' },
  });
}
