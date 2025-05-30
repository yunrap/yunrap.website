import { api } from "@/app/shared/lib/axios";
import { markdownToHtml } from "@/app/shared/lib/markdown";
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
    return (
      <main className="p-6">
        <div role="alert" className="text-white text-center">
          <h1 className="text-xl font-bold mb-2">게시글을 찾을 수 없습니다</h1>
          <Link
            href="/blogs"
            className="text-brand1 hover:underline"
            aria-label="블로그 목록으로 돌아가기"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <article>
        <nav className="mb-8" aria-label="블로그 네비게이션">
          <Link
            href="/blogs"
            className="text-gray-400 hover:text-white inline-flex items-center gap-1"
            aria-label="블로그 목록으로 돌아가기"
          >
            <span aria-hidden="true">←</span> 목록으로
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-brand1">{post.title}</h1>
          <time
            dateTime={post.createdAt}
            className="text-gray-400"
            aria-label="작성일"
          >
            {format(parseISO(post.createdAt), "yyyy년 MM월 dd일")}
          </time>
        </header>

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          aria-label="게시글 본문"
        />
      </article>
    </main>
  );
}
