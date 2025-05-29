"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Input } from "./input";
import SearchModal from "./searchModal";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  return (
    <header className="h-[10.625rem] bg-bg1 px-6 xl:px-8 2xl:px-[8rem]">
      <div className="h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center 2xl:text-LogoM md:text-MenuM text-MediaM"
          aria-label="홈으로 이동"
        >
          <span className="text-brand1" aria-hidden="true">{`<C/>`}</span>
          <span className="text-white">Yunrap</span>
        </Link>

        {/* Navigation Area */}
        <nav
          className="flex items-center gap-4 sm:gap-16"
          aria-label="메인 네비게이션"
        >
          {/* Main Navigation */}
          <ul role="list" className="flex items-center gap-4 sm:gap-8">
            <li>
              <Link
                href="/"
                className={`hover:text-brand1 sm:text-MediaM ${
                  isActive("/") ? "text-brand1" : "text-white"
                }`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className={`hover:text-brand1 sm:text-MediaM ${
                  isActive("/blogs") ? "text-brand1" : "text-white"
                }`}
                aria-current={isActive("/blogs") ? "page" : undefined}
              >
                Blogs
              </Link>
            </li>
          </ul>

          {/* Search and Social Section */}
          <div className="flex items-center gap-16">
            {/* Search Bar */}
            <div className="w-12.75rem relative hidden xl:flex">
              <Input
                type="text"
                placeholder="Search"
                className="w-full pr-10"
                aria-label="블로그 검색"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="검색"
              >
                <Image
                  src="/images/icon-search.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </button>
            </div>
            <SearchModal />

            {/* Social Links */}
            <ul
              role="list"
              className="items-center gap-8 hidden md:flex"
              aria-label="소셜 링크"
            >
              <li>
                <a
                  href="https://github.com/yunrap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-2 hover:text-brand1 text-white"
                  aria-label="GitHub 프로필로 이동"
                >
                  <Image
                    src="/images/icon-github.svg"
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                  <span className="hidden 2xl:block">GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
