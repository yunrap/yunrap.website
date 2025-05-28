"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Input } from "./input";
import SearchModal from "./searchModal";

export default function Header() {
  const pathname = usePathname();
  const isRootPage = pathname === "/";

  return (
    <div className="h-[10.625rem] bg-bg1 flex items-center justify-between px-6 xl:px-8 2xl:px-[8rem]">
      {/* Logo */}
      <div className="flex items-center 2xl:text-LogoM md:text-MenuM text-MediaM">
        <span className="text-brand1">{`<C/>`}</span>
        <span className="text-white">Yunrap</span>
      </div>

      {/* Navigation and Search */}
      <div className="flex items-center gap-4 sm:gap-16">
        {/* Main Navigation */}
        <ul className="flex items-center gap-4 sm:gap-8">
          <li>
            <Link
              href="/"
              className={`hover:text-brand1 sm:text-MediaM ${
                isRootPage ? "text-brand1" : "text-white"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className="hover:text-brand1 sm:text-MediaM text-white"
            >
              Blogs
            </Link>
          </li>
        </ul>

        {/* Search and Social */}
        <div className="flex items-center gap-16">
          {/* Search Bar */}
          <div className="w-12.75rem relative hidden xl:flex">
            <Input type="text" placeholder="Search" className="w-full pr-10" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              <Image
                src="/images/icon-search.svg"
                alt="search icon"
                width={24}
                height={24}
              />
            </div>
          </div>
          <SearchModal />

          {/* Social Links */}
          <ul className="items-center gap-8 hidden md:flex">
            {/* <li className="flex items-center gap-x-2 text-white cursor-pointer">
              <Image
                src="/images/icon-instagram.svg"
                alt="instagram"
                width={20}
                height={20}
              />
              <span className="hidden 2xl:block">instagram</span>
            </li>
            <li className="flex items-center gap-x-2 text-white cursor-pointer">
              <Image
                src="/images/icon-discord.svg"
                alt="discord"
                width={20}
                height={20}
              />
              <span className="hidden 2xl:block">discord</span>
            </li> */}
            <li className="flex items-center gap-x-2 text-white cursor-pointer">
              <a
                href="https://github.com/yunrap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-x-2 hover:text-brand1"
              >
                <Image
                  src="/images/icon-github.svg"
                  alt="github"
                  width={20}
                  height={20}
                />
                <span className="hidden 2xl:block">github</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
