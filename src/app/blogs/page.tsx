import { api } from '@/app/shared/lib/axios';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Post } from '@/app/shared/types/blog';

const getPosts = async () => {
  try {
    const { data } = await api.get(`/postsAll`);
    return data;
  } catch (error) {
    console.error('fetch error:', error);
    return []; // fallback 값
  }
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="p-6">
      <h1 className="sr-only">블로그 게시글 목록</h1>
      <ul className="space-y-4">
        <ul className="space-y-4" role="list">
          {posts.map((post: Post) => (
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
