import React from 'react';
import SideFilterMenu from '@/components/home/SideFilterMenu';
import PerfumeCards from '@/components/home/PerfumeCards';
import FilteredPerfumeCards from '@/components/home/FilteredPerfumeCards';

function Page({ searchParams }: { searchParams: { note: string; brand: string } }) {
  return (
    <div className="flex gap-11 my-44 w-full max-w-screen-xl max-xs:my-32">
      <SideFilterMenu />
      <main className="w-full">
        {searchParams.brand || searchParams.note ? (
          <FilteredPerfumeCards notes={searchParams.note || ''} brands={searchParams.brand || ''} />
        ) : (
          <PerfumeCards />
        )}
      </main>
    </div>
  );
}

export default Page;
