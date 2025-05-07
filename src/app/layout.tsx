import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yunrap 기술 사이트",
  description: "Yunrap 개발성장 사이트입니다.",
};

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} antialiased`}>{children}</body>
    </html>
  );
}
