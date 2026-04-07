import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '@/lib/og';
import * as staticPages from '@/config/pages';

export const prerender = true;

interface Props {
  title: string;
  description: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [articles, talks, packages, videos, apiGuides, testimonials, podcasts, series, reviews] =
    await Promise.all([
      getCollection('articles'),
      getCollection('talks'),
      getCollection('packages'),
      getCollection('videos'),
      getCollection('apiGuides'),
      getCollection('testimonials'),
      getCollection('podcasts'),
      getCollection('series'),
      getCollection('reviews'),
    ]);

  const dynamicPaths = [
    ...articles.map((e) => ({
      params: { collection: 'articles', id: e.id },
      props: { title: e.data.title, description: e.data.description } satisfies Props,
    })),
    ...series.map((e) => ({
      params: { collection: 'series', id: e.id },
      props: {
        title: e.data.title,
        description: e.data.description ?? '',
      } satisfies Props,
    })),
    ...talks.map((e) => ({
      params: { collection: 'talks', id: e.id },
      props: { title: e.data.title, description: e.data.event } satisfies Props,
    })),
    ...packages.map((e) => ({
      params: { collection: 'packages', id: e.id },
      props: { title: e.data.name, description: e.data.description } satisfies Props,
    })),
    ...videos.map((e) => ({
      params: { collection: 'videos', id: e.id },
      props: { title: e.data.title, description: e.data.description } satisfies Props,
    })),
    ...apiGuides.map((e) => ({
      params: { collection: 'api-guides', id: e.id },
      props: { title: e.data.title, description: e.data.description } satisfies Props,
    })),
    ...testimonials.map((e) => ({
      params: { collection: 'testimonials', id: e.id },
      props: { title: e.data.author.name, description: e.data.quote } satisfies Props,
    })),
    ...podcasts.map((e) => ({
      params: { collection: 'podcasts', id: e.id },
      props: {
        title: e.data.title,
        description: e.data.description ?? '',
      } satisfies Props,
    })),
    ...reviews.map((e) => ({
      params: { collection: 'reviews', id: e.id },
      props: {
        title: e.data.title,
        description: e.data.description,
      } satisfies Props,
    })),
  ];

  const pagePaths = Object.entries(staticPages).map(([id, data]) => ({
    params: { collection: 'pages', id: id.toLowerCase() },
    props: { title: data.title, description: data.description } satisfies Props,
  }));

  return [...dynamicPaths, ...pagePaths];
};

export const GET: APIRoute = async ({ params, props }) => {
  const buffer = await generateOgImage({
    title: props.title,
    description: props.description,
    collection: params.collection!,
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
