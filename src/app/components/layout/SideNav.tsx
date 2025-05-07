// src/app/components/layout/SideNav.tsx
"use client";

import Image from "next/image";

const modules = [
  { id: "home", icon: "/images/icon-navi-grid.svg", label: "Home" },
  { id: "about", icon: "/images/icon-navi-user.svg", label: "About" },
  { id: "skills", icon: "/images/icon-navi-code.svg", label: "Skills" },
  { id: "projects", icon: "/images/icon-navi-monitor.svg", label: "Projects" },
  { id: "blog", icon: "/images/icon-navi-edit.svg", label: "Blog" },
  { id: "contact", icon: "/images/icon-navi-mail.svg", label: "Contact" },
];

export default function SideNav() {
  const handleModuleClick = (moduleId: string) => {
    const element = document.getElementById(moduleId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 ">
      <div
        className="border border-white rounded-full flex flex-col items-center py-4 px-2 bg-bg2"
        style={{ minHeight: "64px" }}
      >
        {modules.map((module) => (
          <div key={module.id} className="mb-2 last:mb-0">
            {module.id === "home" ? (
              <button
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-white shadow hover:bg-white/80 transition"
                onClick={() => handleModuleClick(module.id)}
              >
                <Image
                  src={module.icon}
                  alt={module.label}
                  width={24}
                  height={24}
                />
              </button>
            ) : (
              <button
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition"
                onClick={() => handleModuleClick(module.id)}
              >
                <Image
                  src={module.icon}
                  alt={module.label}
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
