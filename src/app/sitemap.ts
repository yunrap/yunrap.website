import type { MetadataRoute } from 'next';
import { Post } from './shared/types/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${BASE_URL}/postsAll`, {
      // SSR에서 기본적으로 캐시 제어할 수 있음
      next: { revalidate: 60 }, // 60초마다 캐시 재검증
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const data: Post[] = await res.json();

    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL || '',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/blogs`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];

    const postPages: MetadataRoute.Sitemap = data.map((post) => ({
      url: `${BASE_URL}/blogs/${post.slug}`,
      lastModified: new Date(post.createdAt).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...staticPages, ...postPages];
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    return [
      {
        url: BASE_URL || '',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}
