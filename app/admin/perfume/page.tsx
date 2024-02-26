import React from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';
import PerfumeListTable from '@/components/admin/PerfumeListTable';

function Page() {
  return (
    <main className="w-full flex flex-col justify-start items-center gap-5">
      <h2 className="text-2xl text-stone-800 font-bold">향수 목록 관리</h2>
      <div className="flex w-full justify-end">
        <Link href={'/admin/perfume/add'}>
          <Button text="향수 등록" />
        </Link>
      </div>
      <PerfumeListTable />
    </main>
  );
}

export default Page;
