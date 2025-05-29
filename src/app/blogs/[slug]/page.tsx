import { api } from "@/shared/lib/axios";
import { markdownToHtml } from "@/shared/lib/markdown";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post?.title || "게시글 제목",
    description: post?.subTitle || "게시글 내용",
  };
}

async function getPost(id: string) {
  try {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  } catch (error) {
    console.error("fetch error:", error);
    return null;
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  const htmlContent = await markdownToHtml(post?.body || "");

  if (!post) {
    return <div className="text-white">Post not found</div>;
  }

  return (
    <>
      <article className="p-6">
        <Head>
          <title>{post.title || "게시글 제목"}</title>
        </Head>
        <Link
          href="/blogs"
          className="text-gray-400 hover:text-white mb-4 inline-block"
        >
          ← Back to posts
        </Link>
        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-4 text-brand1">{post.title}</h1>
          <div className="text-gray-400 mb-2">
            {format(parseISO(post.createdAt), "yyyy-MM-dd")}
          </div>
          <div
            className="prose prose-invert max-w-none mt-4 text-white"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </article>
    </>
  );
}
