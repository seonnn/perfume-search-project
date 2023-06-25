import React, { useState } from 'react';
import { BsPlusSquare, BsCheckSquare, BsXSquare } from 'react-icons/bs';
import FragranceSelect from './FragranceSelect';

interface NoteTableRowAddProps {
  isNoteAddMode: boolean;
  setIsNoteAddMode: React.Dispatch<React.SetStateAction<boolean>>;
  getNoteList: () => Promise<void>;
}

function NoteTableRowAdd({ isNoteAddMode, setIsNoteAddMode, getNoteList }: NoteTableRowAddProps) {
  const [fragranceValue, setFragranceValue] = useState('1');
  const [noteName, setNoteName] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/noteList', {
        method: 'POST',
        body: JSON.stringify({
          n_name: noteName,
          f_id: +fragranceValue,
        }),
      }).then((res) => res.json());

      if (response.status === 409) return window.alert('이미 등록된 노트입니다.');

      window.alert('노트 등록이 완료되었습니다.');
      setIsNoteAddMode(false);
      return getNoteList();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <tr className="border-b-1">
      {isNoteAddMode ? (
        <React.Fragment>
          <td></td>
          <td className="text-center py-1">
            <input
              className="border-1 border-stone-300 py-[3px] px-2"
              value={noteName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNoteName(event.target.value)}
            />
          </td>
          <td className="text-center">
            <FragranceSelect defaultValue={fragranceValue} setDefaultValue={setFragranceValue} />
          </td>
          <td className="py-2.5 flex justify-around items-center">
            <BsCheckSquare size={20} className="cursor-pointer" onClick={handleSubmit} />
            <BsXSquare size={20} className="cursor-pointer" onClick={() => setIsNoteAddMode(!isNoteAddMode)} />
          </td>
        </React.Fragment>
      ) : (
        <td className="py-2" colSpan={4}>
          <button
            className="flex justify-center items-center gap-2 w-full"
            onClick={() => setIsNoteAddMode(!isNoteAddMode)}
          >
            <BsPlusSquare size={20} />
            노트 추가
          </button>
        </td>
      )}
    </tr>
  );
}

export default NoteTableRowAdd;
