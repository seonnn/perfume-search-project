import '@/app/globals.css';
import SideFilterMenu from '@/components/common/SideFilterMenu';
import PerfumeCard from '@/components/home/PerfumeCard';
import { perfumeList } from '@/utils/noteList';
import React from 'react';

function Home() {
  return (
    <div className="flex justify-between my-44 w-full max-w-screen-xl">
      <SideFilterMenu />
      <main>
        <div className="flex flex-col items-center gap-4 mb-4">
          <h2 className="text-2xl text-stone-800 font-bold">향수</h2>
          <div className="text-stone-700">{perfumeList.length}개의 향수가 검색되었습니다.</div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {perfumeList.map((perfume) => (
            <PerfumeCard
              key={perfume.id}
              brand={perfume.brand}
              name={perfume.name}
              imgUrl={perfume.imgUrl}
              id={perfume.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
