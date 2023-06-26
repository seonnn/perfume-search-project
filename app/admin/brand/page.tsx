'use client';
import AdminTableRow from '@/components/admin/AdminTableRow';
import AdminTableRowAdd from '@/components/admin/AdminTableRowAdd';
import Loading from '@/components/common/Loading';
import { Brand } from '@/types';
import { adminTableHeader } from '@/utils/admin';
import React, { useEffect, useState } from 'react';

function Page() {
  const [brandList, setBrandList] = useState<Brand[]>();
  const [isBrandAddMode, setIsBrandAddMode] = useState(false);

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
            <AdminTableRow key={brand.id} id={brand.id} name={brand.name} getData={getBrandList} isBrand={true} />
          ))}
          <AdminTableRowAdd
            isAddMode={isBrandAddMode}
            setIsAddMode={setIsBrandAddMode}
            getData={getBrandList}
            isBrand={true}
          />
        </tbody>
      </table>
    </main>
  );
}

export default Page;
