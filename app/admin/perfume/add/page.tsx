'use client';
import NoteFilterModal from '@/components/admin/NoteFilterModal';
import NoteInput from '@/components/admin/NoteInput';
import Loading from '@/components/common/Loading';
import { Brand } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
// BsPlus

export interface SelectedNoteList {
  [key: string]: number[];
  t: number[];
  m: number[];
  b: number[];
}

function Page() {
  const [imageState, setImageState] = useState<{ imageFile: File; imageUrl: string }>();
  const [brand, setBrand] = useState('');
  const [brandList, setBrandList] = useState<Brand[]>();
  const [noteList, setNoteList] = useState();
  const [noteType, setNoteType] = useState('');
  const [selectedNoteList, setSelectedNoteList] = useState<SelectedNoteList>({ t: [], m: [], b: [] });
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(event.target.value);
  };

  const handleSelectedNoteList = (type: string, id: number) => {
    let prevNoteList = selectedNoteList[type];
    let newNoteList = prevNoteList.includes(id)
      ? prevNoteList.filter((noteId) => id !== noteId)
      : [...prevNoteList, id];

    setSelectedNoteList({ ...selectedNoteList, [type]: newNoteList });
  };

  const setImagePreview = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const imageFile = event.target.files[0];

    if (!imageFile.type.includes('image/')) return window.alert('이미지 파일만 업로드 가능합니다.');
    if (imageFile.size > 512000) return window.alert('500kb 미만의 파일만 업로드 가능합니다.');

    const imageUrl = URL.createObjectURL(imageFile);

    setImageState({ imageFile: imageFile, imageUrl: imageUrl });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageState) return window.alert('향수 이미지를 입력해주세요!');

    const formData = new FormData();

    formData.append('image', imageState.imageFile);
    formData.append('imagename', JSON.stringify({ imagename: imageState.imageFile.name }));

    const response = await fetch('/api/perfume', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());

    console.log('response:' + JSON.parse(response));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const [brandResponse, noteResponse] = await Promise.all([fetch('/api/brandList'), fetch('/api/noteList')]);
        const brands = await brandResponse.json();
        const notes = await noteResponse.json();

        setBrandList(brands);
        setNoteList(notes);
      } catch (error) {
        console.error('브랜드, 노트 목록 조회 실패', error);
      }
    };

    getData();
  }, []);

  if (!brandList || !noteList) return <Loading />;
  return (
    <div className="w-full flex flex-col justify-start items-center text-stone-800">
      {isNoteModalOpen && (
        <NoteFilterModal
          noteList={noteList}
          type={noteType}
          selectedNoteList={selectedNoteList[noteType]}
          handleSelectedNoteList={handleSelectedNoteList}
          setIsNoteModalOpen={setIsNoteModalOpen}
        />
      )}
      <h2 className="text-2xl font-bold mb-16">향수 등록</h2>
      <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        <div className="w-48 h-48 flex justify-center items-center bg-stone-100 text-stone-600 mb-20 cursor-pointer">
          <label htmlFor="image">
            {imageState ? (
              <Image src={imageState.imageUrl} alt="perfumeImage" width={192} height={192} />
            ) : (
              <BsPlus size={48} />
            )}
          </label>
          <input className="hidden" onChange={setImagePreview} type="file" accept="image/*" id="image" name="imgae" />
        </div>
        <div className="w-full grid grid-cols-2 gap-8">
          <div className="flex items-center">
            <label className="flex w-24 shrink-0">향수명:</label>
            <input className="flex grow border-1 border-stone-300 p-3" name="p_name" />
          </div>
          <div className="flex items-center">
            <label className="flex w-24 shrink-0">브랜드명:</label>
            <select
              className={`flex grow border-1 border-stone-300 p-3 bg-white ${
                brand ? 'text-stone-600' : 'text-stone-400'
              }`}
              value={brand}
              onChange={handleBrandChange}
              name="b_name"
            >
              <option value={0} className="text-stone-600" hidden>
                브랜드를 선택해주세요.
              </option>
              {brandList?.map((brand) => (
                <option key={brand.id} value={brand.id} className="text-stone-600">
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <NoteInput
          type="t"
          noteList={noteList}
          selectedNoteList={selectedNoteList['t']}
          setIsNoteModalOpen={setIsNoteModalOpen}
          setNoteType={setNoteType}
          handleSelectedNoteList={handleSelectedNoteList}
        />
        <NoteInput
          type="m"
          noteList={noteList}
          selectedNoteList={selectedNoteList['m']}
          setIsNoteModalOpen={setIsNoteModalOpen}
          setNoteType={setNoteType}
          handleSelectedNoteList={handleSelectedNoteList}
        />
        <NoteInput
          type="b"
          noteList={noteList}
          selectedNoteList={selectedNoteList['b']}
          setIsNoteModalOpen={setIsNoteModalOpen}
          setNoteType={setNoteType}
          handleSelectedNoteList={handleSelectedNoteList}
        />
        <button className="text-white px-8 py-3 bg-beige-400 font-bold text-xl rounded mt-8">향수 등록</button>
      </form>
    </div>
  );
}

export default Page;
