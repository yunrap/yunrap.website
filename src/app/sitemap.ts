import type { MetadataRoute } from "next";
import { api } from "./shared/lib/axios";
import { Post } from "./shared/types/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await api.get(`/postsAll`);

  return [
    {
      url: "https://yunrap-website.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...data.map((post: Post) => {
      return {
        url: `https://yunrap-website.vercel.app/${post.slug}`,
        lastModified: new Date(post.createdAt),
      };
    }),
  ];
}
