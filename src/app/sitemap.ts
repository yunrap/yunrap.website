import type { MetadataRoute } from 'next';
import { api } from './shared/lib/axios';
import { Post } from './shared/types/blog';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://yunrap-website.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data } = await api.get('/postsAll');

    // 기본 페이지와 블로그 목록 페이지
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
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

    // 블로그 포스트 페이지들
    const postPages: MetadataRoute.Sitemap = data.map((post: Post) => ({
      url: `${BASE_URL}/blogs/${post.slug}`,
      lastModified: new Date(post.createdAt).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...staticPages, ...postPages];
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    // 에러 시 기본 페이지만 반환
    return [
      {
        url: BASE_URL,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}
