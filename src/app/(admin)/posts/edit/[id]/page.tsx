"use client";

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${params.id}`);
        setTitle(data.title);
        setSubTitle(data.subTitle);
        setContent(data.body);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        alert("게시글을 불러오는데 실패했습니다.");
        router.push("/posts");
      }
    };

    fetchPost();
  }, [params.id, router]);

  const handleSubmit = async () => {
    if (!title || !subTitle || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await api.put(`/posts/${params.id}`, {
        title,
        subTitle,
        body: content,
      });

      alert("수정 성공");
      router.push("/posts");
    } catch (error) {
      console.error("Post update failed:", error);
      alert("수정 실패");
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
      <input
        type="text"
        placeholder="부제목"
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
      <MDEditor value={content} onChange={setContent} height={400} />
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          수정
        </button>
        <button
          onClick={() => router.push("/posts")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          취소
        </button>
      </div>
    </div>
  );
}
