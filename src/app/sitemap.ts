import type { MetadataRoute } from 'next';
import { api } from './shared/lib/axios';
import { Post } from './shared/types/blog';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://yunrap-website.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data } = await api.get('/postsAll');

    // 기본 페이지
    const routes = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/blogs`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];

    // 블로그 포스트 페이지
    const posts = data.map((post: Post) => ({
      url: `${BASE_URL}/blogs/${post.slug}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...routes, ...posts];
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}
