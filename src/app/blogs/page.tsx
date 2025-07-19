import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Post } from '@/app/shared/types/blog';
import Category from '@components/Category';
import { CategoryType } from '@/app/shared/types/category';

const getCategories = async (): Promise<CategoryType[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: { revalidate: 86499 }, // 24시간마다 새로고침
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};

const getPosts = async (searchParams: { category?: string }): Promise<Post[]> => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/postsAll`);
    if (searchParams.category) {
      url.searchParams.append('category', searchParams.category);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const categories = await getCategories();
  const posts = await getPosts({ category: (await searchParams).category });

  const selectedCategory = (await searchParams).category || null;

  // 카테고리 필터링
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <main className="p-6">
      <h1 className="sr-only">블로그 게시글 목록</h1>
      {/* 네비게이션 */}
      <Category categories={categories} />
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
