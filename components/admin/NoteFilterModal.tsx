import { Note } from '@/types';
import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import FilterItem from '../common/FilterItem';
import { PerfumeNote } from '@/types/admin';
import Button from '../common/Button';

interface FilterModalNoteList extends Omit<Note, 'fragranceId'> {
  checked: boolean;
}

interface NoteFilterModalProps {
  noteList: FilterModalNoteList[];
  type: string;
  selectedNoteList: PerfumeNote[];
  handleSelectedNoteList: (type: string, id: number) => void;
  setIsNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit?: boolean;
}

function NoteFilterModal({
  noteList,
  type,
  selectedNoteList,
  handleSelectedNoteList,
  setIsNoteModalOpen,
  isEdit = false,
}: NoteFilterModalProps) {
  const wrapperRef = useRef(null);

  const handleModalWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (wrapperRef.current === event.target) {
      if (window.confirm('노트 입력을 완료하시겠습니까?')) setIsNoteModalOpen(false);
    }
    return;
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
              if (window.confirm('노트 입력을 완료하시겠습니까?')) setIsNoteModalOpen(false);
              return;
            }}
          />
        </div>
        <div className="grid grid-cols-4 mt-4 gap-y-3">
          {noteList.map((note) => (
            <FilterItem
              key={note.id}
              item={note.name}
              onClick={() => handleSelectedNoteList(type, note.id)}
              id={note.id}
              type={type}
              checked={selectedNoteList.some((selectedNote) => selectedNote.noteId === note.id)}
            />
          ))}
        </div>
        <div className="w-full flex justify-center mt-5">
          <Button text={isEdit ? '노트 수정' : '노트 입력'} onClick={() => setIsNoteModalOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default NoteFilterModal;
