import { Button } from "@/components/button";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SideNav from "@/components/SideNav";
import Image from "next/image";

export default function TestPage() {
  return (
    <div>
      <div className="hidden xl:block">
        <SideNav />
      </div>
      <Button>Button Text</Button>
      <Button variant="white">Button Text</Button>
      <Button variant="black" outline="default">
        Button Textg
        <Image
          src="/images/icon-check-wh.svg"
          alt="logo"
          width={12}
          height={12}
        />
      </Button>
      <hr />
      <Header />
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gray-800 text-white text-4xl font-bold border-b border-gray-700"
      >
        Home Section
      </section>
      <section
        id="about"
        className="min-h-screen flex items-center justify-center bg-gray-700 text-white text-4xl font-bold border-b border-gray-600"
      >
        About Section
      </section>
      <section
        id="skills"
        className="min-h-screen flex items-center justify-center bg-gray-600 text-white text-4xl font-bold border-b border-gray-500"
      >
        Skills Section
      </section>
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center bg-gray-500 text-white text-4xl font-bold border-b border-gray-400"
      >
        Projects Section
      </section>
      <section
        id="blog"
        className="min-h-screen flex items-center justify-center bg-gray-400 text-white text-4xl font-bold border-b border-gray-300"
      >
        Blog Section
      </section>
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-gray-300 text-gray-900 text-4xl font-bold"
      >
        Contact Section
      </section>
      <Footer />
    </div>
  );
}
