'use client';
import NoteList from '@/components/detail/NoteList';
import { perfumeList } from '@/utils/noteList';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

function PerfumeDetail() {
  const pathname = usePathname();
  const item = perfumeList.find((perfume) => pathname && perfume.id === +pathname?.slice(1));

  if (!item) return <div>Loading...</div>;
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="box-border w-full max-w-7xl flex justify-start gap-24">
        <Image src={item.imgUrl} alt={item.name} width={500} height={500} className="bg-stone-50" />
        <div className="h-125">
          <div className="flex flex-col gap-4">
            <h3 className="text-stone-600 text-xl">{item.brand}</h3>
            <h2 className="text-stone-800 font-bold text-3xl">{item.name}</h2>
          </div>
          <div className="flex flex-col w-full mt-6 gap-4">
            <NoteList noteList={item.topNote} position="top" />
            <NoteList noteList={item.heartNote} position="middle" />
            <NoteList noteList={item.baseNote} position="base" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfumeDetail;
