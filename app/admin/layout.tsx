'use client';
import { withAuth } from '@/components/common/hocs/withAuth';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const adminCategory = [
  { segment: 'perfume', name: '향수 목록 관리' },
  { segment: 'note', name: '노트 목록 관리' },
  { segment: 'brand', name: '브랜드 목록 관리' },
];

function Layout({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex my-44 gap-11 w-full max-w-screen-xl">
      <aside className="flex flex-col shrink-0 w-69 h-full mt-28 border-y-1 p-4 pb-6 gap-5">
        <h3 className="text-xl text-stone-800 font-bold">관리 카테고리</h3>
        <ul className="flex flex-col gap-4 font-bold text-stone-400">
          {adminCategory.map((item) => (
            <Link href={`/admin/${item.segment}`} key={item.name}>
              <li className={`${segment === item.segment ? 'text-stone-600' : ''}`}>{item.name}</li>
            </Link>
          ))}
        </ul>
      </aside>
      {children}
    </div>
  );
}

export default withAuth(Layout);
