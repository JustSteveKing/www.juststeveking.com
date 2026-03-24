import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config';

export async function GET(context: any) {
  const articles = await getCollection('articles');
  
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: `/articles/${article.id}/`,
    })),
    customData: `<language>${siteConfig.locale ?? 'en-GB'}</language>`,
  });
}
