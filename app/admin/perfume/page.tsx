'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { adminTableHeader } from '@/utils/admin';
import { Perfume } from '@/types';
import Loading from '@/components/common/Loading';
import Link from 'next/link';
import Button from '@/components/common/Button';

export const revalidate = 0;

function Page() {
  const [perfumeList, setPerfumeList] = useState<Perfume[]>();

  const getBrandList = async () => {
    let perfumeResponse = await fetch('/api/perfumeList', { cache: 'no-store' }).then((res) => res.json());
    setPerfumeList(perfumeResponse);
  };

  useEffect(() => {
    getBrandList();
  }, []);

  if (!perfumeList) return <Loading />;
  return (
    <main className="w-full flex flex-col justify-start items-center gap-5">
      <h2 className="text-2xl text-stone-800 font-bold">향수 목록 관리</h2>
      <div className="flex w-full justify-end">
        <Link href={'/admin/perfume/add'}>
          <Button text="향수 등록" />
        </Link>
      </div>
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
          {perfumeList.map((perfume) => (
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
    </main>
  );
}

export default Page;
