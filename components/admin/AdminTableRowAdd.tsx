import React, { useState } from 'react';
import { BsPlusSquare, BsCheckSquare, BsXSquare } from 'react-icons/bs';
import LabelSelect from './LabelSelect';
import { fragranceList } from '@/utils/fragranceList';

interface AdminTableRowAddProps {
  isAddMode: boolean;
  setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>;
  getData: () => Promise<void>;
  isBrand: boolean;
}

function AdminTableRowAdd({ isAddMode, setIsAddMode, getData, isBrand }: AdminTableRowAddProps) {
  const [selectValue, setSelectValue] = useState(isBrand ? '' : '1');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async () => {
    try {
      const response = isBrand
        ? await fetch('/api/brandList', {
            method: 'POST',
            body: JSON.stringify({
              b_name: inputValue,
            }),
          }).then((res) => res.json())
        : await fetch('/api/noteList', {
            method: 'POST',
            body: JSON.stringify({
              n_name: inputValue,
              f_id: +selectValue,
            }),
          }).then((res) => res.json());

      if (response.status === 409) {
        setInputValue('');
        return window.alert(`이미 등록된 ${isBrand ? '브랜드' : '노트'}입니다.`);
      }

      window.alert(`${isBrand ? '브랜드' : '노트'} 등록이 완료되었습니다.`);
      await getData();
      setInputValue('');
      setSelectValue(isBrand ? '' : '1');
      setIsAddMode(false);
      return;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <tr className="border-b-1">
      {isAddMode ? (
        <React.Fragment>
          <td></td>
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
                setInputValue('');
                setSelectValue(isBrand ? '' : '1');
                setIsAddMode(!isAddMode);
              }}
            />
          </td>
        </React.Fragment>
      ) : (
        <td className="py-2" colSpan={4}>
          <button className="flex justify-center items-center gap-2 w-full" onClick={() => setIsAddMode(!isAddMode)}>
            <BsPlusSquare size={20} />
            {isBrand ? '브랜드 추가' : '노트 추가'}
          </button>
        </td>
      )}
    </tr>
  );
}

export default AdminTableRowAdd;
