'use client';
import SideFilterMenu from '@/components/common/SideFilterMenu';
import PerfumeCard from '@/components/home/PerfumeCard';
import { queryParamsAtom } from '@/recoil/atom';
import { BrandList, NoteList, Perfume } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

function Home() {
  const [perfumeListData, setPerfumeListData] = useState<Perfume[]>();
  const [noteList, setNoteList] = useState<NoteList[]>([]);
  const [brandList, setBrandList] = useState<BrandList[]>([]);
  const queryParams = useRecoilValue(queryParamsAtom);

  const fetchPerfumeList = async () => {
    const perfumeListData =
      queryParams.note.length || queryParams.brand.length
        ? await fetch(`/api/filteredPerfumeList?notes=${queryParams.note}&brands=${queryParams.brand}`, {
            cache: 'no-store',
          }).then((res) => res.json())
        : await fetch('/api/perfumeList', { next: { revalidate: 3600 } }).then((res) => res.json());

    setPerfumeListData(perfumeListData);
  };

  useEffect(() => {
    Promise.all([
      fetch('/api/noteList', { next: { revalidate: 3600 } }),
      fetch('/api/brandList', { next: { revalidate: 3600 } }),
    ]).then(async ([noteResponse, brandResponse]) => {
      const [notes, brands] = await Promise.all([noteResponse.json(), brandResponse.json()]);
      setNoteList(notes);
      setBrandList(brands);
    });
  }, []);

  useEffect(() => {
    fetchPerfumeList();
  }, [queryParams.brand, queryParams.note]);

  if (!perfumeListData || !noteList.length || !brandList.length) return <div>Loading...</div>;
  return (
    <div className="flex gap-11 my-44 w-full max-w-screen-xl">
      <SideFilterMenu noteList={noteList} brandList={brandList} />
      <main className="w-full">
        <div className="flex flex-col items-center gap-4 mb-4">
          <h2 className="text-2xl text-stone-800 font-bold">향수</h2>
          <div className="text-stone-700">
            {perfumeListData.length ? `${perfumeListData.length}개의 향수가 검색되었습니다.` : '검색 결과가 없습니다.'}
          </div>
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
