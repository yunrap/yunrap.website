import { api } from "@/shared/lib/axios";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Post } from "@/shared/types/blog";

const getPosts = async () => {
  try {
    const { data } = await api.get(`/postsAll`);
    return data;
  } catch (error) {
    console.error("fetch error:", error);
    return []; // fallback 값
  }
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="p-6">
      <ul className="space-y-4">
        {posts.map((post: Post) => (
          <Link
            key={post._id}
            href={`/blogs/${post.slug}`}
            className="block hover:no-underline"
          >
            <li className="p-4 rounded shadow border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200">
              <div className="flex flex-col  space-y-2">
                <div className="text-brand1 text-sm ">
                  {format(parseISO(post.createdAt), "yyyy-MM-dd")}
                </div>
                <div>
                  <div className="text-xl text-white text-bold">
                    {post.title}
                  </div>
                  <p className="text-gray-400 mt-2 line-clamp-3">
                    {post.subTitle}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
