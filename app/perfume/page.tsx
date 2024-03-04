import React from 'react';
import SideFilterMenu from '@/components/home/SideFilterMenu';
import FilteredPerfumeCards from '@/components/home/FilteredPerfumeCards';
import DefaultPerfumeCards from '@/components/home/DefaultPerfumeCards';
import SearchedPerfumeCards from '@/components/home/SearchedPerfumeCards';
import Loading from '@/components/common/Loading';

function Page({ searchParams }: { searchParams: { note: string; brand: string; keyword: string } }) {
  return (
    <div className="flex gap-11 my-44 w-full max-w-screen-xl max-xs:my-32">
      <React.Suspense fallback={<Loading />}>
        <SideFilterMenu />
        <main className="w-full">
          {searchParams.keyword ? (
            <SearchedPerfumeCards
              keyword={searchParams.keyword}
              notes={searchParams.note || ''}
              brands={searchParams.brand || ''}
            />
          ) : searchParams.brand || searchParams.note ? (
            <FilteredPerfumeCards notes={searchParams.note || ''} brands={searchParams.brand || ''} />
          ) : (
            <DefaultPerfumeCards />
          )}
        </main>
      </React.Suspense>
    </div>
  );
}

export default Page;
