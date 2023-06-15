import React from 'react';
import EnglishPearAndFreesia from '@/public/perfumeImg/조말론_잉글리쉬페어앤프리지아.png';
import Image from 'next/image';

const tableHeader = ['ID', '이미지', '브랜드', '향수명'];

function Page() {
  return (
    <div className="my-44 flex flex-col w-[1064px] justify-center items-center gap-5">
      <h2 className="text-2xl text-stone-800 font-bold">향수 목록 관리</h2>
      <div className="flex w-full justify-end">
        <button className="text-white px-8 py-2 bg-beige-400 font-bold rounded">향수 등록</button>
      </div>
      <table className="w-full text-stone-800">
        <thead>
          <tr className="border-y-1">
            {tableHeader.map((headerName) => (
              <th className="font-normal py-2 px-2" key={headerName}>
                {headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-1">
            <td className="text-center">1</td>
            <td className="flex justify-center">
              <Image src={EnglishPearAndFreesia} alt="향수 이미지" width={216} height={216} />
            </td>
            <td className="text-center">조말론</td>
            <td className="text-center">잉글리쉬 페어 앤 프리지아 코롱</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Page;
