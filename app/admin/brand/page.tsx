'use client';
import Loading from '@/components/common/Loading';
import { Brand } from '@/types';
import { adminTableHeader } from '@/utils/admin';
import React, { useEffect, useState } from 'react';
import { BsPencilFill, BsTrash3Fill, BsPlusCircle } from 'react-icons/bs';
// BsCheckCircleFill
// BsXSquareFill

function Page() {
  const [brandList, setBrandList] = useState<Brand[]>();

  const getBrandList = async () => {
    let brandResponse = await fetch('/api/brandList').then((res) => res.json());
    setBrandList(brandResponse);
  };

  useEffect(() => {
    getBrandList();
  }, []);

  if (!brandList) return <Loading />;
  return (
    <main className="w-full flex flex-col justify-start items-center gap-20">
      <h2 className="text-2xl text-stone-800 font-bold">브랜드 목록 관리</h2>
      <table className="w-full text-stone-800">
        <thead>
          <tr className="border-y-1">
            {adminTableHeader['brand'].map((headerName) => (
              <th className="font-normal py-2 px-2" key={headerName}>
                {headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {brandList.map((brand) => (
            <tr className="border-b-1" key={brand.id}>
              <td className="text-center py-2">{brand.id}</td>
              <td className="text-center">{brand.name}</td>
              <td className="py-2 flex justify-around">
                <BsPencilFill size={20} />
                <BsTrash3Fill size={20} />
              </td>
            </tr>
          ))}
          <tr className="border-b-1">
            <td className="py-2" colSpan={3}>
              <button className="flex justify-center items-center gap-4 w-full">
                <BsPlusCircle size={20} />
                브랜드 추가
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default Page;
