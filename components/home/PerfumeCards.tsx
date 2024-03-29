'use client';
import React from 'react';
import Link from 'next/link';
import PerfumeCard from './PerfumeCard';
import FilterButton from './FilterButton';
import { Perfume } from '@/types';

interface PerfumeCardsProps {
  data?: Perfume[];
}

function PerfumeCards({ data }: PerfumeCardsProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-4 relative">
        <h2 className="text-2xl text-stone-800 font-bold max-xs:text-xl">향수</h2>
        <FilterButton />
        <div className="text-stone-700 max-xs:text-sm">
          {data?.length ? `${data.length}개의 향수가 검색되었습니다.` : '검색 결과가 없습니다.'}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 max-xl:px-5 max-lg:grid-cols-3 max-md:grid-cols-2 max">
        {data?.map((perfume) => (
          <Link key={perfume.id} href={`/perfume/${perfume.id}`}>
            <PerfumeCard brand={perfume.brand} name={perfume.name} imgUrl={perfume.imgUrl} id={perfume.id} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default PerfumeCards;
