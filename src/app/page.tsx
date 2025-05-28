import Image from "next/image";
import SideNav from "./components/SideNav";
import Header from "./components/header";
import { Button } from "./components/button";

// 기술 스택 데이터
const techStack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Git",
  "Figma",
  "REST API",
];

// 연락처 정보 데이터
const contactInfo = [
  { icon: "📧", text: "dbsdpwl7@gmail.com" },
  { icon: "📍", text: "부천" },
  { icon: "💼", text: "구직중" },
  { icon: "🔗", text: "www.yunrap.com" },
];

// 기술 스택 태그 컴포넌트
const TechTag = ({ tech }: { tech: string }) => (
  <span className="bg-teal-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
    {tech}
  </span>
);

// 연락처 아이템 컴포넌트
const ContactItem = ({ icon, text }: { icon: string; text: string }) => (
  <li className="flex items-center gap-4">
    <span>{icon}</span> {text}
  </li>
);

export default function Page() {
  return (
    <div>
      <div className="hidden xl:block">
        <SideNav />
      </div>
      <Header />
      <section
        id="home"
        className="pt-16 bg-bg1 min-h-screen text-white text-4xl font-bold border-b border-gray-700 px-4 flex items-center justify-center pb-32"
      >
        <div className="3xl:max-w-[102.125rem] flex flex-col xl:flex-row items-center justify-center xl:max-w-[70rem] gap-16">
          {/* 프로필 카드 */}
          <div className="relative w-80 text-white p-6 rounded-[100px_0_100px_0] border-2 border-white mb-16">
            <div className="absolute inset-0 rounded-[100px_0_100px_0] border-2 border-teal-400 z-[-1]" />

            <div className="w-24 h-24 mx-auto rounded-full border-4 border-teal-400 overflow-hidden mb-4">
              <Image
                src=""
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-LogoM font-bold text-center ">윤예지</h1>
            <p className="text-center text-gray-300 mb-8 text-CodeM">
              프론트엔드 개발자
            </p>

            <ul className="space-y-2 text-sm text-CodeM font-bold">
              {contactInfo.map((item, index) => (
                <ContactItem key={index} icon={item.icon} text={item.text} />
              ))}
            </ul>

            <div className="overflow-hidden w-full py-4">
              <div className="whitespace-nowrap animate-scroll flex gap-6">
                {techStack.map((tech, index) => (
                  <TechTag key={index} tech={tech} />
                ))}
                {/* 복사본 추가로 무한루프처럼 보이게 */}
                {techStack.map((tech, index) => (
                  <TechTag key={`clone-${index}`} tech={tech} />
                ))}
              </div>
            </div>
            <a href="/윤예지_이력서.pdf" download>
              <Button variant="white" className="px-8">
                다운로드 이력서
                <span>
                  <Image
                    src="/images/icon-download.svg"
                    alt="logo"
                    width={12}
                    height={12}
                  />
                </span>
              </Button>
            </a>
          </div>

          {/* 소개 섹션 */}
          <div className="flex flex-col mr-8 gap-5">
            <div className="text-left">
              <div className="text-brand2 text-CodeM">{"<h1>"}</div>
              <h1 className="text-H2U text-white pl-4">
                안녕하세요
                <br />
                프론트엔드개발자
                <br />
                <span className="text-brand1">윤예지</span>입니다.
              </h1>
              <div className="text-brand2 text-CodeM">{"</h1>"}</div>
            </div>
            <div className="text-left">
              <div className="text-brand2 text-CodeM">{"<p>"}</div>
              <p className="text-ParaM pl-4">
                코딩 자체를 즐기며, 컴퓨터 앞에서 깊이 있는 몰입을 통해 문제를
                해결하는 개발자입니다.
                <br /> 신기술을 배우는 데 흥미를 느끼며, 빠르게 변화하는 개발
                흐름을 따라가기 위해 꾸준히 학습하고 있습니다.
              </p>
              <div className="text-brand2 text-CodeM">{"</p>"}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
