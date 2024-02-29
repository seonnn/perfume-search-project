'use client';
import { adminTableHeader } from '@/utils/admin';
import React from 'react';
import Image from 'next/image';
import { useGetPerfumeList } from '@/hooks/queries/usePerfumeListQuery';
import Link from 'next/link';
import Loading from '../common/Loading';

const PerfumeListTable = () => {
  const { data, isLoading } = useGetPerfumeList();

  if (isLoading) return <Loading />;
  return (
    <table className="w-full text-stone-800">
      <thead>
        <tr className="border-y-1">
          {adminTableHeader['perfume'].map((headerName) => (
            <th className="font-normal py-2 px-2" key={headerName}>
              {headerName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((perfume) => (
          <tr key={perfume.id} className="border-b-1">
            <td className="text-center">{perfume.id}</td>
            <td className="flex justify-center py-2">
              <Link href={`/admin/perfume/edit/${perfume.id}`}>
                <Image
                  src={process.env.NEXT_PUBLIC_SUPABASE_URL + perfume.imgUrl}
                  alt="향수 이미지"
                  width={128}
                  height={128}
                />
              </Link>
            </td>
            <td className="text-center">{perfume.brand}</td>
            <td className="text-center">{perfume.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PerfumeListTable;
