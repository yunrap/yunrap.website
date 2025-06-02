'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Input } from './input';

export default function SearchModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 검색 아이콘과 모달 컨테이너 */}
      <div className="relative z-50 cursor-pointer xl:hidden">
        {/* 검색 아이콘 */}
        <div onClick={() => setOpen(!open)}>
          <Image src="/images/icon-search-wh.svg" alt="search icon" width={24} height={24} />
        </div>

        {/* X 버튼과 검색바 */}
        <AnimatePresence>
          {open && (
            <>
              {/* 뿌연 배경 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />
              {/* X 버튼과 검색바 */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute right-0 top-0 z-50 flex flex-col items-end"
              >
                {/* X 버튼 */}
                <div
                  className="mb-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white"
                  onClick={() => setOpen(false)}
                >
                  <Image src="/images/icon-x.svg" alt="close icon" width={24} height={24} />
                </div>
                {/* 검색 바 */}
                <div className="relative w-64">
                  <Input type="text" placeholder="Search" className="w-full pr-10" autoFocus />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Image src="/images/icon-search.svg" alt="search icon" width={24} height={24} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
