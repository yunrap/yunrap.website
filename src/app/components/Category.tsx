'use client';

import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Category, CategoryItem } from '@/app/shared/types/category';

export default function CategoryMenu() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

        if (!res.ok) {
          throw new Error('Failed to fetch menu');
        }

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="mb-20 hidden w-full justify-center md:flex">
        <PopoverGroup className="flex gap-8">
          {categories.map((category) => (
            <Popover key={category.label}>
              {({ open, close }) => (
                <>
                  <PopoverButton
                    className={clsx(
                      'border-text-brand1 flex items-center gap-2 rounded-lg border p-3 text-brand1',
                      open && '',
                    )}
                  >
                    {category.label}
                    <ChevronDownIcon className={clsx('size-5', open && 'rotate-180')} />
                  </PopoverButton>
                  <PopoverPanel
                    transition
                    anchor="bottom"
                    className="divide-y divide-white/0 rounded-xl bg-black text-sm/6 shadow-lg shadow-cyan-500/50 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                  >
                    {category.child.map((item: CategoryItem) => (
                      <div className="p-3" key={item.label}>
                        <Link
                          className="block rounded-lg px-3 py-2 transition hover:bg-white/5"
                          href={`/blogs?category=${item.label}`}
                          onClick={() => close()}
                        >
                          <p className="font-semibold text-white">{item.label}</p>
                          <p className="text-white/50">{item.desc}</p>
                        </Link>
                      </div>
                    ))}
                  </PopoverPanel>
                </>
              )}
            </Popover>
          ))}
        </PopoverGroup>
      </div>
    </>
  );
}
