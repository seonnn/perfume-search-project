import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { BsCheckSquare, BsXSquare } from 'react-icons/bs';
import { AdminNote } from '@/types';
import FragranceSelect from './FragranceSelect';

interface NoteTableRowProps extends AdminNote {
  getNoteList: () => Promise<void>;
}

function NoteTableRow({ id, name, fragranceId, fragranceName, getNoteList }: NoteTableRowProps) {
  const [isNoteEditMode, setIsNoteEditMode] = useState(false);
  const [fragranceValue, setFragranceValue] = useState(String(fragranceId));
  const [noteName, setNoteName] = useState(name);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/noteList', {
        method: 'PUT',
        body: JSON.stringify({
          n_id: id,
          n_name: noteName,
          f_id: +fragranceValue,
        }),
      }).then((res) => res.json());

      if (response.status === 409) {
        window.alert('노트를 수정하시려면 수정된 정보를 입력해주세요.');
        setIsNoteEditMode(false);
        return;
      }

      window.alert('노트 수정이 완료되었습니다.');
      await getNoteList();
      setIsNoteEditMode(false);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return isNoteEditMode ? (
    <tr className="border-b-1">
      <td className="text-center py-2">{id}</td>
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
        <BsXSquare size={20} className="cursor-pointer" onClick={() => setIsNoteEditMode(!isNoteEditMode)} />
      </td>
    </tr>
  ) : (
    <tr className="border-b-1" key={id}>
      <td className="text-center py-2">{id}</td>
      <td className="text-center">{name}</td>
      <td className="text-center">{fragranceName}</td>
      <td className="py-2 flex justify-around">
        <FaRegEdit size={20} className="cursor-pointer" onClick={() => setIsNoteEditMode(!isNoteEditMode)} />
        <FaRegTrashAlt size={20} className="cursor-pointer" />
      </td>
    </tr>
  );
}

export default NoteTableRow;
