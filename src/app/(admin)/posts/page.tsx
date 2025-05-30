"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { api } from "@/app/shared/lib/axios";
import { PostForm } from "@/app/shared/types/blog";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function NewPostPage() {
  const [formData, setFormData] = useState<PostForm>({
    title: "",
    subTitle: "",
    slug: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "slug") {
      const slugValue = value.replace(/\s+/g, "-");

      setFormData((prev) => ({
        ...prev,
        slug: slugValue,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (value?: string) => {
    setFormData((prev) => ({
      ...prev,
      content: value || "",
    }));
  };

  const handleSubmit = async () => {
    const { title, subTitle, content, slug } = formData;

    if (!title || !subTitle || !content || !slug) {
      alert("제목과 내용, 슬러그 입력해주세요.");
      return;
    }

    try {
      const { data } = await api.post("/posts", {
        title,
        subTitle,
        slug,
        body: content,
      });

      alert("등록 성공");
      setFormData({
        title: "",
        subTitle: "",
        slug: "",
        content: "",
      });
    } catch (error) {
      console.error("Post creation failed:", error);
      alert("등록 실패");
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">새 게시글 작성</h1>
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
      />
      <input
        type="text"
        name="subTitle"
        placeholder="부제목"
        value={formData.subTitle}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
      />
      <input
        type="text"
        name="slug"
        placeholder="슬러그 (선택)"
        value={formData.slug}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
      />
      <MDEditor
        value={formData.content}
        onChange={handleEditorChange}
        height={400}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        등록
      </button>
    </div>
  );
}
