import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

export const metadata: Metadata = {
  title: 'Yunrap 기술 사이트',
  description: 'Yunrap 개발성장 사이트입니다.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Yunrap 기술 사이트',
    description: 'Yunrap 개발성장 사이트입니다.',
    url: 'https://yunrap-website.vercel.app',
    siteName: 'Yunrap 기술 블로그',
    images: [
      {
        url: 'https://yunrap-website.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Yunrap 기술 사이트 썸네일',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  metadataBase: new URL('https://yunrap-website.vercel.app'),
};

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} bg-black antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
