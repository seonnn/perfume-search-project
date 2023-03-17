import React from 'react';
import '@/app/globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/common/Header';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata = {
  title: {
    default: 'PERFRAG',
    template: 'PERFRAG | %s',
  },
  description: '노트로 향수를 검색할 수 있는 서비스입니다.',
  icons: {
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head />
      <body className={`${notoSansKr.variable} font-sans flex justify-center items-center`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
