import React from 'react';

export const metadata = {
  title: {
    default: 'PERFRAG',
  },
  description: '노트로 향수를 검색할 수 있는 서비스입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body>{children}</body>
    </html>
  );
}
