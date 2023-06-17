'use client';

import Loading from '@/components/common/Loading';
import { AdminNote, Note } from '@/types';
import { adminTableHeader } from '@/utils/admin';
import { fragranceList } from '@/utils/fragranceList';
import React, { useEffect, useState } from 'react';
import { BsPencilFill, BsTrash3Fill, BsPlusCircle } from 'react-icons/bs';
// BsCheckCircleFill
// BsXSquareFill

function Page() {
  const [noteList, setNoteList] = useState<AdminNote[]>();

  const getNoteList = async () => {
    let noteResponse = await fetch('/api/noteList').then((res) => res.json());
    setNoteList(
      noteResponse.map((note: Note) => {
        let { id, name } = note;

        return { id, name, fragranceName: fragranceList[note.fragranceId - 1].name };
      })
    );
  };

  useEffect(() => {
    getNoteList();
  }, []);

  if (!noteList) return <Loading />;
  return (
    <main className="w-full flex flex-col justify-start items-center gap-20">
      <h2 className="text-2xl text-stone-800 font-bold">노트 목록 관리</h2>
      <table className="w-full text-stone-800">
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
          {noteList.map((note) => (
            <tr className="border-b-1" key={note.id}>
              <td className="text-center py-2">{note.id}</td>
              <td className="text-center">{note.name}</td>
              <td className="text-center">{note.fragranceName}</td>
              <td className="py-2 flex justify-center gap-8">
                <BsPencilFill size={20} />
                <BsTrash3Fill size={20} />
              </td>
            </tr>
          ))}
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
