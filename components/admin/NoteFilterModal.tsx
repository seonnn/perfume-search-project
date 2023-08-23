import { Note } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import FilterItem from '../common/FilterItem';
import { SelectedNoteList } from '@/types/admin';
import Button from '../common/Button';

type FilterModalNoteList = Omit<Note, 'fragranceId'>;

interface NoteFilterModalProps {
  noteList: FilterModalNoteList[];
  type: string;
  selectedNoteList: SelectedNoteList;
  setSelectedNoteList: React.Dispatch<React.SetStateAction<SelectedNoteList>>;
  setIsNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit?: boolean;
}

function NoteFilterModal({
  noteList,
  type,
  selectedNoteList,
  setSelectedNoteList,
  setIsNoteModalOpen,
  isEdit = false,
}: NoteFilterModalProps) {
  const wrapperRef = useRef(null);
  const [temporarySelectedNoteList, setTemporarySelectedNoteList] = useState(selectedNoteList[type] || []);

  const handleModalWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (wrapperRef.current === event.target) {
      if (window.confirm('노트 입력을 취소하시겠습니까?')) setIsNoteModalOpen(false);
    }
    return;
  };

  const handleTemporarySelectedNoteList = (id: number) => {
    const noteIdx = temporarySelectedNoteList.map((note) => note.noteId).findIndex((noteId) => noteId === id);
    let newNoteList =
      noteIdx > -1
        ? temporarySelectedNoteList.filter((noteId, idx) => idx !== noteIdx)
        : [...temporarySelectedNoteList, { noteId: id }];

    setTemporarySelectedNoteList(newNoteList);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-20"
      ref={wrapperRef}
      onClick={handleModalWrapperClick}
    >
      <div className="w-[960px] bg-white p-8">
        <div className="w-full flex justify-between items-center border-b-1 border-b-stone-300 pb-5">
          <h2 className="text-2xl font-bold">노트 목록</h2>
          <IoClose
            size={28}
            onClick={() => {
              if (window.confirm('노트 입력을 취소하시겠습니까?')) setIsNoteModalOpen(false);
              return;
            }}
          />
        </div>
        <div className="grid grid-cols-4 mt-4 gap-y-3">
          {noteList.map((note) => (
            <FilterItem
              key={note.id}
              item={note.name}
              onClick={() => handleTemporarySelectedNoteList(note.id)}
              id={note.id}
              type={type}
              checked={temporarySelectedNoteList.some((selectedNote) => selectedNote.noteId === note.id)}
            />
          ))}
        </div>
        <div className="w-full flex justify-center mt-5 gap-4">
          <Button
            text={isEdit ? '수정' : '입력'}
            onClick={() => {
              setIsNoteModalOpen(false);
              setSelectedNoteList({ ...selectedNoteList, [type]: temporarySelectedNoteList });
            }}
          />
          <Button text={'취소'} design="white" onClick={() => setIsNoteModalOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default NoteFilterModal;
