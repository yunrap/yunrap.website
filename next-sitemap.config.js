import fetch from 'node-fetch';

async function fetchDynamicPaths() {
  const res = await fetch(`https://yunrap-backend.onrender.com/postsAll`);
  const posts = await res.json();

  return posts.map((post) => ({
    loc: `/blogs/${post.slug}`,
    lastmod: post.createdAt,
  }));
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://yunrap-backend.onrender.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  additionalPaths: async (config) => {
    const BASE_URL = config.siteUrl;

    const staticPages = [
      {
        loc: BASE_URL,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        loc: `${BASE_URL}/blogs`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8,
      },
    ];

    const dynamicPaths = await fetchDynamicPaths();

    return [
      ...staticPages,
      ...dynamicPaths.map(({ loc, lastmod }) => ({
        loc: `${BASE_URL}${loc}`,
        lastmod,
        changefreq: 'weekly',
        priority: 0.6,
      })),
    ];
  },
};

export default config;
