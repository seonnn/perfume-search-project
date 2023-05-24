'use client';
import SideFilterMenu from '@/components/home/SideFilterMenu';
import FilterButton from '@/components/home/FilterButton';
import PerfumeCard from '@/components/home/PerfumeCard';
import { BrandList, NoteList, Perfume } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import FilterMenuModal from '@/components/home/FilterMenuModal';

interface HomePageProps {
  searchParams: {
    note: string;
    brand: string;
  };
}

function Home({ searchParams }: HomePageProps) {
  const [perfumeListData, setPerfumeListData] = useState<Perfume[]>();
  const [noteList, setNoteList] = useState<NoteList[]>([]);
  const [brandList, setBrandList] = useState<BrandList[]>([]);
  const filterModal = useModal('filterModal');

  const fetchPerfumeList = async () => {
    const perfumeListData =
      searchParams.note || searchParams.brand
        ? await fetch(
            `/api/filteredPerfumeList?notes=${searchParams.note ? searchParams.note.split('|') : []}&brands=${
              searchParams.brand ? searchParams.brand.split('|') : []
            }`,
            {
              cache: 'no-store',
            }
          ).then((res) => res.json())
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
  }, [searchParams]);

  if (!perfumeListData || !noteList.length || !brandList.length) return <div>Loading...</div>;
  return (
    <div className="flex gap-11 my-44 w-full max-w-screen-xl">
      <SideFilterMenu noteList={noteList} brandList={brandList} />
      {filterModal.isModalOpened && (
        <FilterMenuModal
          noteList={noteList}
          brandList={brandList}
          handleIsModalOpened={filterModal.handleIsModalOpened}
        />
      )}
      <main className="w-full">
        <div className="flex flex-col items-center gap-4 mb-4 relative">
          <h2 className="text-2xl text-stone-800 font-bold">향수</h2>
          <FilterButton handleIsModalOpened={filterModal.handleIsModalOpened} />
          <div className="text-stone-700">
            {perfumeListData.length ? `${perfumeListData.length}개의 향수가 검색되었습니다.` : '검색 결과가 없습니다.'}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 max-xl:px-5 max-lg:grid-cols-3 max-md:grid-cols-2 max">
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
