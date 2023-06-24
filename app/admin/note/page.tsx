'use client';

import Loading from '@/components/common/Loading';
import { AdminNote, Note } from '@/types';
import { adminTableHeader } from '@/utils/admin';
import { fragranceList } from '@/utils/fragranceList';
import React, { useEffect, useState } from 'react';
import NoteTableRowAdd from '@/components/admin/NoteTableRowAdd';
import NoteTableRow from '@/components/admin/NoteTableRow';

function Page() {
  const [noteList, setNoteList] = useState<AdminNote[]>();
  const [isNoteAddMode, setIsNoteAddMode] = useState(false);

  const getNoteList = async () => {
    let noteResponse = await fetch('/api/noteList').then((res) => res.json());
    setNoteList(
      noteResponse.map((note: Note) => {
        let { id, name, fragranceId } = note;
        return { id, name, fragranceId, fragranceName: fragranceList[note.fragranceId - 1].name };
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
          {noteList.map((note) => (
            <NoteTableRow
              key={note.id}
              id={note.id}
              name={note.name}
              fragranceId={note.fragranceId}
              fragranceName={note.fragranceName}
            />
          ))}
          <NoteTableRowAdd isNoteAddMode={isNoteAddMode} setIsNoteAddMode={setIsNoteAddMode} />
        </tbody>
      </table>
    </main>
  );
}

export default Page;
