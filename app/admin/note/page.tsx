'use client';

import Loading from '@/components/common/Loading';
import { adminTableHeader } from '@/utils/admin';
import { fragranceList } from '@/utils/fragranceList';
import React, { useState } from 'react';
import AdminTableRow from '@/components/admin/AdminTableRow';
import AdminTableRowAdd from '@/components/admin/AdminTableRowAdd';
import { useGetPerfumeNoteBrandList } from '@/hooks/queries/usePerfumeNoteBrandList';

function Page() {
  const [, { data, isLoading }] = useGetPerfumeNoteBrandList();
  const [isNoteAddMode, setIsNoteAddMode] = useState(false);

  if (isLoading) return <Loading />;
  return (
    <main className="w-full flex flex-col justify-start items-center gap-20">
      <h2 className="text-2xl text-stone-800 font-bold">노트 목록 관리</h2>
      <table className="w-full">
        <thead>
          <tr className="border-y-1">
            {adminTableHeader['note'].map((headerName) => (
              <th className="font-normal py-2 px-2" key={headerName}>
                {headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((note) => (
            <AdminTableRow
              key={note.n_id}
              id={note.n_id}
              name={note.n_name}
              fragranceId={note.f_id}
              fragranceName={fragranceList[note.f_id - 1].name}
              isBrand={false}
            />
          ))}
          <AdminTableRowAdd isAddMode={isNoteAddMode} setIsAddMode={setIsNoteAddMode} isBrand={false} />
        </tbody>
      </table>
    </main>
  );
}

export default Page;
