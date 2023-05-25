'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NoteBadges from '@/components/detail/NoteBadges';
import { PerfumeDetail } from '@/types';

export const revalidate = false;

function PerfumeDetail({ params }: { params: { id: string } }) {
  const [perfume, setPerfume] = useState<PerfumeDetail | null>();

  const fetchPerfumeDetail = async () => {
    const perfumeDetailData = await fetch(`/api/perfumeList/${+params.id}`).then((res) => res.json());
    setPerfume(perfumeDetailData);
  };

  useEffect(() => {
    fetchPerfumeDetail();
  }, []);

  if (!perfume) return <div>Loading...</div>;
  return (
    <div className="h-screen w-full flex justify-center items-center max-xl:h-full max-xl:mx-5 max-xl:my-48 max-sm:my-32">
      <div className="box-border w-full max-w-screen-xl flex justify-start gap-24 max-xl:w-auto max-xl:flex-col max-xl:items-center max-xl:gap-8">
        <div className="flex flex-col w-full justify-start gap-4 xl:hidden">
          <h3 className="text-stone-600 text-xl max-sm:text-lg">{perfume.brandName}</h3>
          <h2 className="text-stone-800 font-bold text-3xl max-sm:text-2xl">{perfume.name}</h2>
        </div>
        <div className="relative flex justify-center bg-stone-50 max-xl:w-full">
          <Image
            src={perfume.imgUrl}
            alt={perfume.name}
            width={500}
            height={500}
            className="max-xl:w-3/5 max-xl:h-3/5"
          />
        </div>
        <div>
          <div className="flex flex-col gap-4 max-xl:hidden">
            <h3 className="text-stone-600 text-xl">{perfume.brandName}</h3>
            <h2 className="text-stone-800 font-bold text-3xl">{perfume.name}</h2>
          </div>
          <div className="flex flex-col w-full mt-6 gap-4 max-xl:mt-0">
            <NoteBadges list={perfume.perfumeNoteList.topNote} position="top" />
            <NoteBadges list={perfume.perfumeNoteList.middleNote} position="middle" />
            <NoteBadges list={perfume.perfumeNoteList.baseNote} position="base" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfumeDetail;
