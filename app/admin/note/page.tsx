import React from 'react';
import { BsPencilFill, BsTrash3Fill, BsPlusCircle } from 'react-icons/bs';
// BsCheckCircleFill
// BsXSquareFill

const tableHeader = ['ID', '노트명', '노트 카테고리', '관리'];

function Page() {
  return (
    <main className="w-full flex flex-col justify-start items-center gap-20">
      <h2 className="text-2xl text-stone-800 font-bold">향수 목록 관리</h2>
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
            <td className="text-center py-2">4</td>
            <td className="text-center">시트러스</td>
            <td className="text-center">Citrus</td>
            <td className="py-2 flex justify-center gap-8">
              <BsPencilFill size={20} />
              <BsTrash3Fill size={20} />
            </td>
          </tr>
          <tr className="border-b-1">
            <td className="py-2" colSpan={4}>
              <button className="flex justify-center items-center gap-4 w-full">
                <BsPlusCircle size={20} />
                노트 추가
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default Page;
