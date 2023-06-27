import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { BsCheckSquare, BsXSquare } from 'react-icons/bs';
import LabelSelect from './LabelSelect';
import { fragranceList } from '@/utils/fragranceList';

interface TableRowProps {
  id: number;
  name: string;
  fragranceId?: number;
  fragranceName?: string;
  getData: () => Promise<void>;
  isBrand: boolean;
}

function AdminTableRow({ id, name, fragranceId, fragranceName, getData, isBrand }: TableRowProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const [selectValue, setSelectValue] = useState(fragranceId ? String(fragranceId) : '');

  const handleSubmit = async () => {
    try {
      const response = isBrand
        ? await fetch('/api/brandList', {
            method: 'PUT',
            body: JSON.stringify({
              b_id: id,
              b_name: inputValue,
            }),
          }).then((res) => res.json())
        : await fetch('/api/noteList', {
            method: 'PUT',
            body: JSON.stringify({
              n_id: id,
              n_name: inputValue,
              f_id: +selectValue,
            }),
          }).then((res) => res.json());

      if (response.status === 409) {
        if (window.confirm(`수정된 정보가 없습니다. ${isBrand ? '브랜드' : '노트'}정보 수정을 종료하시겠습니까?`))
          setIsEditMode(false);
        return;
      }

      window.alert(`${isBrand ? '브랜드' : '노트'} 수정이 완료되었습니다.`);
      await getData();
      setIsEditMode(false);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`${isBrand ? '브랜드' : '노트'} 정보를 삭제하시겠습니까?`)) return;

    try {
      const response = isBrand
        ? await fetch('/api/brandList', {
            method: 'DELETE',
            body: JSON.stringify({ b_id: id }),
          }).then((res) => res.json())
        : await fetch('/api/noteList', {
            method: 'DELETE',
            body: JSON.stringify({ n_id: id }),
          }).then((res) => res.json());

      window.alert(`${isBrand ? '브랜드' : '노트'} 삭제가 완료되었습니다.`);
      await getData();

      return response.status;
    } catch (error) {
      console.error(error);
    }
  };

  return isEditMode ? (
    <tr className="border-b-1">
      <td className="text-center py-2">{id}</td>
      <td className="text-center py-1">
        <input
          className="border-1 border-stone-300 py-[3px] px-2"
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
        />
      </td>
      {isBrand ? null : (
        <td className="text-center">
          <LabelSelect optionList={fragranceList} defaultValue={selectValue} setDefaultValue={setSelectValue} />
        </td>
      )}
      <td className="py-2.5 flex justify-around items-center">
        <BsCheckSquare size={20} className="cursor-pointer" onClick={handleSubmit} />
        <BsXSquare
          size={20}
          className="cursor-pointer"
          onClick={() => {
            setInputValue(name);
            if (fragranceId) setSelectValue(String(fragranceId));
            setIsEditMode(!isEditMode);
          }}
        />
      </td>
    </tr>
  ) : (
    <tr className="border-b-1" key={id}>
      <td className="text-center py-2">{id}</td>
      <td className="text-center">{name}</td>
      {isBrand ? null : <td className="text-center">{fragranceName}</td>}
      <td className="py-2 flex justify-around">
        <FaRegEdit size={20} className="cursor-pointer" onClick={() => setIsEditMode(!isEditMode)} />
        <FaRegTrashAlt size={20} className="cursor-pointer" onClick={handleDelete} />
      </td>
    </tr>
  );
}

export default AdminTableRow;
