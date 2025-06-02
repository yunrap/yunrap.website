'use client';

import Image from 'next/image';

const modules = [
  { id: 'home', icon: '/images/icon-navi-grid.svg', label: '홈으로 이동' },
  {
    id: 'about',
    icon: '/images/icon-navi-user.svg',
    label: '소개 섹션으로 이동',
  },
  {
    id: 'skills',
    icon: '/images/icon-navi-code.svg',
    label: '기술 스택 섹션으로 이동',
  },
  {
    id: 'projects',
    icon: '/images/icon-navi-monitor.svg',
    label: '프로젝트 섹션으로 이동',
  },
  {
    id: 'blog',
    icon: '/images/icon-navi-edit.svg',
    label: '블로그 섹션으로 이동',
  },
  {
    id: 'contact',
    icon: '/images/icon-navi-mail.svg',
    label: '연락처 섹션으로 이동',
  },
];

export default function SideNav() {
  const handleModuleClick = (moduleId: string) => {
    const element = document.getElementById(moduleId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside>
      <nav className="fixed left-8 top-1/2 z-50 -translate-y-1/2" aria-label="페이지 네비게이션">
        <div
          className="flex flex-col items-center rounded-full border border-white bg-bg2 px-2 py-4"
          role="navigation"
        >
          <ul className="flex flex-col gap-2">
            {modules.map((module) => (
              <li key={module.id}>
                <button
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                    module.id === 'home'
                      ? 'border border-white bg-white shadow hover:bg-white/80'
                      : 'hover:bg-white/20'
                  }`}
                  onClick={() => handleModuleClick(module.id)}
                  aria-label={module.label}
                  type="button"
                >
                  <Image src={module.icon} alt="" width={24} height={24} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
