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
    { title: 'Projects', description: 'Curated list of projects and applications.', href: '/projects', category: 'Page' },
    { title: 'Start Here', description: 'Practical entry point for new visitors.', href: '/start-here', category: 'Page' },
    {
      title: 'Career Framework',
      description: 'Engineering career progression framework with IC and manager tracks.',
      href: '/career-framework',
      category: 'Page',
    },
    { title: 'Work With Me', description: 'Professional services and coaching.', href: '/work-with-me', category: 'Page' },
    { title: 'About', description: 'A little about who I am.', href: '/about', category: 'Page' },
    { title: 'Uses', description: 'Hardware and software I use.', href: '/uses', category: 'Page' },
  ];

  return new Response(JSON.stringify(searchIndex), {
    headers: { 'Content-Type': 'application/json' },
  });
}
