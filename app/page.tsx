import '@/app/globals.css';
import PerfumeCard from '@/components/home/PerfumeCard';
import React from 'react';

function Home() {
  return (
    <div className="flex justify-between mt-44 w-full max-w-screen-xl border-2">
      <aside className="border-2 w-69 pt-22.5">
        <h3 className="text-xl text-stone-800 font-bold">Note Filter</h3>
      </aside>
      <main>
        <div className="flex flex-col items-center gap-4 mb-4">
          <h2 className="text-2xl text-stone-800 font-bold">향수</h2>
          <div className="text-stone-700">4개의 향수가 검색되었습니다.</div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <PerfumeCard />
          <PerfumeCard />
          <PerfumeCard />
          <PerfumeCard />
        </div>
      </main>
    </div>
  );
}

export default Home;
