import { Note } from '@/types';
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface NoteInputProps {
  type: 't' | 'm' | 'b';
  noteList: Omit<Note, 'fragranceId'>[];
  selectedNoteList: number[];
  setIsNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNoteType: React.Dispatch<React.SetStateAction<string>>;
  handleSelectedNoteList: (type: string, id: number) => void;
}

const noteType = {
  t: '탑노트',
  m: '미들노트',
  b: '베이스노트',
};

function NoteInput({
  type,
  noteList,
  selectedNoteList,
  setIsNoteModalOpen,
  setNoteType,
  handleSelectedNoteList,
}: NoteInputProps) {
  useEffect(() => {
    setNoteType(type);
  }, []);

  return (
    <div className="w-full flex items-center">
      <label className="flex w-24 shrink-0">{noteType[type]}:</label>
      <div className="relative w-full">
        <input
          className="w-full flex grow border-1 border-stone-300 p-3 bg-white"
          onClick={() => {
            setIsNoteModalOpen(true);
            setNoteType(type);
          }}
          readOnly
        />
        <div className="absolute top-[7px] left-3 flex gap-1">
          {selectedNoteList.length ? (
            noteList
              .filter((note) => selectedNoteList.includes(note.id))
              .map((note) => (
                <span
                  key={note.id}
                  className="flex gap-1 items-center font-bold p-2 text-sm bg-beige-400 text-white rounded "
                >
                  {note.name}
                  <IoClose size={16} onClick={() => handleSelectedNoteList(type, note.id)} />
                </span>
              ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteInput;
