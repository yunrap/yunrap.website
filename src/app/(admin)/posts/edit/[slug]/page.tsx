'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useRouter } from 'next/navigation';
import { PostForm } from '@/app/shared/types/blog';
import { useRequireAuth } from '@/app/shared/hooks/useRequireAuth';
import { Category } from '@/app/shared/types/category';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function EditPostPage({ params }: { params: { slug: string } }) {
  useRequireAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<PostForm>({
    id: '',
    title: '',
    subTitle: '',
    slug: '',
    content: '',
    category: '',
  });
  const [categories, setCategories] = useState<{ id: number; label: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    const { id, title, subTitle, content, slug, category } = formData;
    if (!title || !subTitle || !content || !category) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          subTitle,
          slug,
          body: content,
          category: category,
        }),
      });

      if (!res.ok) {
        throw new Error('Post update failed');
      }

      alert('수정 성공');
      router.push(`/blogs/${formData.slug}`);
    } catch (error) {
      console.error('Post update failed:', error);
      alert('수정 실패');
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.slug}`);

        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await res.json();

        setFormData({
          id: data._id,
          title: data.title,
          subTitle: data.subTitle,
          slug: data.slug || '',
          content: data.body,
          category: data.category,
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        const allChildLabels = data.flatMap((category: Category, idx: number) =>
          category.child.map((item) => ({ label: item.label, id: idx })),
        );
        setCategories(allChildLabels);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, [params.slug, router]);

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
      <div>
        <label htmlFor="category-select">카테고리 선택:</label>
        <select
          id="category-select"
          value={formData.category}
          onChange={handleChange}
          name="category"
        >
          <option value="">-- 선택하세요 --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.label}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
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
