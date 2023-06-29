'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { adminTableHeader } from '@/utils/admin';
import { Perfume } from '@/types';
import Loading from '@/components/common/Loading';
import Link from 'next/link';
import Button from '@/components/common/Button';

function Page() {
  const [perfumeList, setPerfumeList] = useState<Perfume[]>();

  const getBrandList = async () => {
    let brandResponse = await fetch('/api/perfumeList').then((res) => res.json());
    setPerfumeList(brandResponse);
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
            <tr className="border-b-1" key={perfume.id}>
              <td className="text-center">{perfume.id}</td>
              <td className="flex justify-center py-2">
                <Image
                  src={process.env.NEXT_PUBLIC_SUPABASE_URL + perfume.imgUrl}
                  alt="향수 이미지"
                  width={128}
                  height={128}
                />
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
