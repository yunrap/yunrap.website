'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { PostForm } from '@/app/shared/types/blog';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function NewPostPage() {
  const [formData, setFormData] = useState<PostForm>({
    id: '',
    title: '',
    subTitle: '',
    slug: '',
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'slug') {
      const slugValue = value.replace(/\s+/g, '-');

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
      content: value || '',
    }));
  };

  const handleSubmit = async () => {
    const { title, subTitle, content, slug } = formData;

    if (!title || !subTitle || !content || !slug) {
      alert('제목과 내용, 슬러그 입력해주세요.');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          subTitle,
          slug,
          body: content,
        }),
      });

      if (!res.ok) {
        throw new Error('등록 실패');
      }

      alert('등록 성공');
      setFormData({
        id: '',
        title: '',
        subTitle: '',
        slug: '',
        content: '',
      });
    } catch (error) {
      console.error('Post creation failed:', error);
      alert('등록 실패');
    }
  };

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold">새 게시글 작성</h1>
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={formData.title}
        onChange={handleChange}
        className="mb-4 w-full rounded border p-2"
      />
      <input
        type="text"
        name="subTitle"
        placeholder="부제목"
        value={formData.subTitle}
        onChange={handleChange}
        className="mb-4 w-full rounded border p-2"
      />
      <input
        type="text"
        name="slug"
        placeholder="슬러그 (선택)"
        value={formData.slug}
        onChange={handleChange}
        className="mb-4 w-full rounded border p-2"
      />
      <MDEditor value={formData.content} onChange={handleEditorChange} height={400} />
      <button
        onClick={handleSubmit}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        등록
      </button>
    </div>
  );
}
