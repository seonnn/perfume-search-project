import Image from 'next/image';
import React from 'react';
import NoteBadges from './NoteBadges';
import { PerfumeNoteList } from '@/types';

interface DetailContentsProps {
  name: string;
  imgUrl: string;
  brandName: string;
  perfumeNoteList: PerfumeNoteList;
}

const DetailContents = ({ name, imgUrl, brandName, perfumeNoteList }: DetailContentsProps) => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="box-border w-full max-w-7xl flex justify-start gap-24">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/${imgUrl}`}
          alt={name}
          width={500}
          height={500}
          className="bg-stone-50"
          priority
        />
        <div className="h-125">
          <div className="flex flex-col gap-4">
            <h3 className="text-stone-600 text-xl">{brandName}</h3>
            <h2 className="text-stone-800 font-bold text-3xl">{name}</h2>
          </div>
          <div className="flex flex-col w-full mt-6 gap-4">
            <NoteBadges list={perfumeNoteList.topNote} position="top" />
            <NoteBadges list={perfumeNoteList.middleNote} position="middle" />
            <NoteBadges list={perfumeNoteList.baseNote} position="base" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailContents;
