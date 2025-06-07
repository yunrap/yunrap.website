import Image from 'next/image';
import SideNav from './components/SideNav';
import { Button } from './components/button';

// 기술 스택 데이터
const techStack = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Git',
  'Figma',
  'REST API',
];

// 연락처 정보 데이터
const contactInfo = [
  { icon: '📧', text: 'dbsdpwl7@gmail.com', label: '이메일' },
  { icon: '🏠', text: 'bucheon', label: '사는곳' },
];

// 기술 스택 태그 컴포넌트
const TechTag = ({ tech }: { tech: string }) => (
  <span className="rounded-full bg-teal-400 px-3 py-1 text-xs font-semibold text-black">
    {tech}
  </span>
);

export default function Page() {
  return (
    <div>
      <SideNav />
      <main>
        <section
          id="home"
          className="flex min-h-screen items-center justify-center border-b border-gray-700 bg-bg1 px-4 pb-32 pt-16 text-4xl font-bold text-white"
        >
          <div className="flex flex-col items-center justify-center gap-16 xl:max-w-[70rem] xl:flex-row 3xl:max-w-[102.125rem]">
            {/* 프로필 카드 */}
            <div className="relative mb-16 w-80 rounded-[100px_0_100px_0] border-2 border-white p-6 text-white">
              <div
                className="absolute inset-0 z-[-1] rounded-[100px_0_100px_0] border-2 border-teal-400"
                aria-hidden="true"
              />

              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-teal-400">
                <Image
                  priority
                  src="/images/profile.jpg"
                  alt="프론트엔드 개발자 윤예지의 프로필 사진"
                  className="h-full w-full object-cover"
                  width={96}
                  height={96}
                />
              </div>

              <h1 className="text-center text-LogoM font-bold">yunrap</h1>
              <p className="mb-8 text-center text-CodeM text-gray-300">Frontend developer</p>

              <ul className="space-y-2 text-CodeM text-sm font-bold">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-center gap-4" aria-label={item.label}>
                    <span>{item.icon}</span> {item.text}
                  </li>
                ))}
              </ul>

              <div className="w-full overflow-hidden py-4" aria-label="기술 스택">
                <div className="flex animate-scroll gap-6 whitespace-nowrap">
                  {techStack.map((tech, index) => (
                    <TechTag key={index} tech={tech} />
                  ))}
                  {/* 복사본 추가로 무한루프처럼 보이게 */}
                  {techStack.map((tech, index) => (
                    <TechTag key={`clone-${index}`} tech={tech} />
                  ))}
                </div>
              </div>
              <a href="/윤예지_이력서.pdf" download aria-label="이력서 다운로드">
                <Button variant="white" className="px-8">
                  resume
                  <span>
                    <Image src="/images/icon-download.svg" alt="logo" width={12} height={12} />
                  </span>
                </Button>
              </a>
            </div>

            {/* 소개 섹션 */}
            <div className="mr-8 flex flex-col gap-5">
              <div className="text-left">
                <div className="text-CodeM text-brand2">{'<h1>'}</div>
                <h1 className="pl-4 text-H2U text-white">
                  안녕하세요
                  <br />
                  프론트엔드개발자
                  <br />
                  <span className="text-brand1">윤예지</span>입니다.
                </h1>
                <div className="text-CodeM text-brand2">{'</h1>'}</div>
              </div>
              <div className="text-left">
                <div className="text-CodeM text-brand2">{'<p>'}</div>
                <p className="pl-4 text-ParaM">
                  컴포넌트 개발과 공통 코드 작성에 관심이 많아 재사용성과 유지보수성을 높이는 코딩에
                  집중하고 있습니다. <br />
                  사용자 경험과 성능 향상을 위해 꾸준히 기술을 배우며, <br />
                  만든 서비스로 사용자에게 좋은 첫인상을 남길 수 있도록 항상 성장하고
                  발전하겠습니다.
                </p>
                <div className="text-CodeM text-brand2">{'</p>'}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
