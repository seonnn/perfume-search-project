'use client';
import { getPerfumeList } from '@/apis/home';
import SideFilterMenu from '@/components/common/SideFilterMenu';
import PerfumeCard from '@/components/home/PerfumeCard';
import { queryParamsAtom } from '@/recoil/atom';
import { Perfume } from '@/types';
import { perfumeList } from '@/utils/noteList';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

function Home() {
  const [perfumeListData, setPerfumeListData] = useState<Perfume[] | null>();
  const queryParams = useRecoilValue(queryParamsAtom);

  useEffect(() => {
    getPerfumeList().then((res) => setPerfumeListData(res));
  }, [queryParams]);

  if (!perfumeListData) return <div>Loading...</div>;
  return (
    <div className="flex justify-between my-44 w-full max-w-screen-xl">
      <SideFilterMenu />
      <main>
        <div className="flex flex-col items-center gap-4 mb-4">
          <h2 className="text-2xl text-stone-800 font-bold">향수</h2>
          <div className="text-stone-700">{perfumeList.length}개의 향수가 검색되었습니다.</div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {perfumeListData.map((perfume) => (
            <Link key={perfume.id} href={`/${perfume.id}`}>
              <PerfumeCard brand={perfume.brand} name={perfume.name} imgUrl={perfume.imgUrl} id={perfume.id} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
