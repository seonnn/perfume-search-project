import React from 'react';
import Loading from '@/components/common/Loading';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { getPerfumeList } from '@/utils/supabase/getPerfumeList';
import PerfumeListTable from '@/components/admin/PerfumeListTable';

export const dynamic = 'force-dynamic';

async function Page() {
  const perfumeList = await getPerfumeList();

  if (!perfumeList) return <Loading />;
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
