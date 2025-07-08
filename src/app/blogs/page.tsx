import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Post } from '@/app/shared/types/blog';
import Category from '@components/Category';

const getPosts = async (category: string | undefined) => {
  const url = category
    ? `${process.env.NEXT_PUBLIC_API_URL}/postsAll?category=${encodeURIComponent(category)}`
    : `${process.env.NEXT_PUBLIC_API_URL}/postsAll`;

  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let category = (await searchParams).category;
  if (Array.isArray(category)) category = category[0];
  const posts: Post[] = await getPosts(category);

  const filteredPosts = category ? posts.filter((post) => post.category === category) : posts;

  return (
    <main className="p-6">
      <h1 className="sr-only">블로그 게시글 목록</h1>
      {/* 네비게이션 */}
      <Category />
      <ul className="space-y-4">
        <ul className="space-y-4" role="list">
          {filteredPosts.map((post: Post) => (
            <li key={post._id} className="group">
              <Link
                href={`/blogs/${encodeURIComponent(post.slug)}`}
                className="block rounded border-b border-gray-700 p-4 shadow transition-colors duration-200 hover:bg-gray-800"
                aria-labelledby={`post-title-${post._id}`}
              >
                <article className="flex flex-col space-y-2">
                  <time dateTime={post.createdAt} className="text-sm text-brand1">
                    {format(parseISO(post.createdAt), 'yyyy-MM-dd')}
                  </time>
                  <div>
                    <h2 id={`post-title-${post._id}`} className="text-xl font-bold text-white">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-gray-400">{post.subTitle}</p>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </ul>
    </main>
  );
}
