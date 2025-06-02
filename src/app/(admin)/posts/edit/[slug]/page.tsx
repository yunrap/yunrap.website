'use client';

import { api } from '@/app/shared/lib/axios';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useRouter } from 'next/navigation';
import { PostForm } from '@/app/shared/types/blog';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<PostForm>({
    id: '',
    title: '',
    subTitle: '',
    slug: '',
    content: '',
  });

  useEffect(() => {
    console.log('Fetching post with slug:', params.slug);
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${params.slug}`);
        setFormData({
          id: data._id,
          title: data.title,
          subTitle: data.subTitle,
          slug: data.slug || '',
          content: data.body,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        alert('게시글을 불러오는데 실패했습니다.');
        router.push('/posts');
      }
    };

    fetchPost();
  }, [params.slug, router]);

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
    const { id, title, subTitle, content, slug } = formData;
    console.log('Submitting post with data:', formData);
    if (!title || !subTitle || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      await api.put(`/posts/${id}`, {
        title,
        subTitle,
        slug,
        body: content,
      });

      alert('수정 성공');
      router.push('/posts');
    } catch (error) {
      console.error('Post update failed:', error);
      alert('수정 실패');
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">게시글 수정</h1>
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
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          수정
        </button>
        <button
          onClick={() => router.push('/posts')}
          className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          취소
        </button>
      </div>
    </div>
  );
}
