'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NoteBadges from '@/components/detail/NoteBadges';
import { PerfumeDetail } from '@/types';
import { getPerfumeDetail } from '@/utils/supabase/getPerfumeDetail';

function PerfumeDetail({ params }: { params: { id: string } }) {
  const [perfume, setPerfume] = useState<PerfumeDetail | null>();
  console.log(perfume);

  const fetchPerfumeDetail = async () => {
    const { name, imgUrl, brandName, perfumeNoteList } = await getPerfumeDetail(params.id);
    setPerfume({ name, imgUrl, brandName, perfumeNoteList });
  };

  useEffect(() => {
    fetchPerfumeDetail();
  }, []);

  if (!perfume) return <div>Loading...</div>;
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="box-border w-full max-w-7xl flex justify-start gap-24">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/${perfume.imgUrl}`}
          alt={perfume.name}
          width={500}
          height={500}
          className="bg-stone-50"
        />
        <div className="h-125">
          <div className="flex flex-col gap-4">
            <h3 className="text-stone-600 text-xl">{perfume.brandName}</h3>
            <h2 className="text-stone-800 font-bold text-3xl">{perfume.name}</h2>
          </div>
          <div className="flex flex-col w-full mt-6 gap-4">
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
