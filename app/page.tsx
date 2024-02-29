import React from 'react';
import Link from 'next/link';
import SideFilterMenu from '@/components/home/SideFilterMenu';
import PerfumeCard from '@/components/home/PerfumeCard';
import { getPerfumeList, getFilteredPerfumeList } from '@/utils/supabase/getPerfumeList';
import { getNoteList } from '@/utils/supabase/getNoteList';
import { getBrandList } from '@/utils/supabase/getBrandList';
import FilterButton from '@/components/home/FilterButton';

async function Home({ searchParams }: { searchParams: { note: string; brand: string } }) {
  const perfumeList =
    searchParams.note?.length || searchParams.brand?.length
      ? await getFilteredPerfumeList(searchParams.note, searchParams.brand)
      : await getPerfumeList();
  const noteList = await getNoteList();
  const brandList = await getBrandList();

  return (
    <div className="flex gap-11 my-44 w-full max-w-screen-xl max-xs:my-32">
      <SideFilterMenu noteList={noteList} brandList={brandList} />
      <main className="w-full">
        <div className="flex flex-col items-center gap-4 mb-4 relative">
          <h2 className="text-2xl text-stone-800 font-bold max-xs:text-xl">향수</h2>
          <FilterButton noteList={noteList} brandList={brandList} />
          <div className="text-stone-700 max-xs:text-sm">
            {perfumeList.length ? `${perfumeList.length}개의 향수가 검색되었습니다.` : '검색 결과가 없습니다.'}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 max-xl:px-5 max-lg:grid-cols-3 max-md:grid-cols-2 max">
          {perfumeList.map((perfume) => (
            <Link key={perfume.id} href={`/perfume/${perfume.id}`}>
              <PerfumeCard brand={perfume.brand} name={perfume.name} imgUrl={perfume.imgUrl} id={perfume.id} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
