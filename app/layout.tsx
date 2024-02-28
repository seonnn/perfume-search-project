import React from 'react';
import '@/app/globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/common/Header';
import Provider from './Provider';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'SURFRAG',
    template: 'SURFRAG | %s',
  },
  description: '노트로 향수를 검색할 수 있는 서비스입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${notoSansKr.variable} font-sans flex justify-center items-center`}>
        <Provider>
          {children}
          {/* <Header /> */}
          <div id="portal"></div>
        </Provider>
      </body>
    </html>
  );
}
