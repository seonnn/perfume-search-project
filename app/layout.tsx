import React from 'react';
import { Nanum_Gothic } from 'next/font/google';
import Header from '@/components/common/Header';

const nanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: false,
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
      <body className={nanumGothic.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
