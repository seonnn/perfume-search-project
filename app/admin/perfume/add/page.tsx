'use client';
import ImageInput from '@/components/admin/ImageInput';
import LabelInput from '@/components/admin/LabelInput';
import LabelSelect from '@/components/admin/LabelSelect';
import NoteFilterModal from '@/components/admin/NoteFilterModal';
import PerfumeNoteInput from '@/components/admin/PerfumeNoteInput';
import Loading from '@/components/common/Loading';
import { Brand } from '@/types';
import { ImageState, SelectedNoteList } from '@/types/admin';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
  const router = useRouter();
  const [imageState, setImageState] = useState<ImageState>({
    imageFile: null,
    imageSrc: '',
    imageUrl: '',
  });
  const [perfumeName, setPerfumeName] = useState('');
  const [brand, setBrand] = useState('1');
  const [brandList, setBrandList] = useState<Brand[]>();
  const [noteList, setNoteList] = useState();
  const [noteType, setNoteType] = useState('');
  const [selectedNoteList, setSelectedNoteList] = useState<SelectedNoteList>({ t: [], m: [], b: [] });
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const handleSelectedNoteList = (type: string, id: number) => {
    let prevNoteList = selectedNoteList[type];
    let newNoteList = prevNoteList.includes(id)
      ? prevNoteList.filter((noteId) => id !== noteId)
      : [...prevNoteList, id];

    setSelectedNoteList({ ...selectedNoteList, [type]: newNoteList });
  };

  const handleImageRegisterButtonClick = async () => {
    if (!imageState || !imageState.imageFile) return window.alert('향수 이미지를 입력해주세요!');

    const formData = new FormData();

    formData.append('file', imageState.imageFile);
    formData.append('name', imageState.imageFile.name);

    const response = await fetch('/api/perfume/image', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());

    if (response.status === 409) {
      setImageState({ ...imageState, imageUrl: response.imageUrl });
      return window.alert('이미 등록된 향수 이미지입니다.');
    }

    setImageState({ ...imageState, imageUrl: response.imageUrl });
    return window.alert('향수 이미지가 등록되었습니다.');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/perfume', {
        method: 'POST',
        body: JSON.stringify({
          p_name: perfumeName,
          b_id: +brand,
          imgurl: imageState.imageUrl,
          selectedNoteList,
        }),
      }).then((res) => res.json());

      if (response.status === 409) return window.alert(`이미 등록된 향수입니다.`);

      router.push('/admin/perfume');
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('향수 등록 실패!');
    }
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
        <ImageInput imageState={imageState} setImageState={setImageState} />
        <button
          className="text-white px-8 py-2 bg-beige-400 font-bold rounded mb-6"
          onClick={handleImageRegisterButtonClick}
          type="button"
        >
          향수 이미지 등록
        </button>
        <div className="w-full grid grid-cols-2 gap-8">
          <div className="flex items-center">
            <LabelInput label="향수명" perfumeName={perfumeName} setPerfumeName={setPerfumeName} />
          </div>
          <div className="flex items-center">
            <LabelSelect
              optionList={brandList}
              defaultValue={brand}
              setDefaultValue={setBrand}
              label="브랜드명"
              size="large"
            />
          </div>
        </div>
        <PerfumeNoteInput
          type="t"
          noteList={noteList}
          selectedNoteList={selectedNoteList['t']}
          setIsNoteModalOpen={setIsNoteModalOpen}
          setNoteType={setNoteType}
          handleSelectedNoteList={handleSelectedNoteList}
        />
        <PerfumeNoteInput
          type="m"
          noteList={noteList}
          selectedNoteList={selectedNoteList['m']}
          setIsNoteModalOpen={setIsNoteModalOpen}
          setNoteType={setNoteType}
          handleSelectedNoteList={handleSelectedNoteList}
        />
        <PerfumeNoteInput
          type="b"
          noteList={noteList}
          selectedNoteList={selectedNoteList['b']}
          setIsNoteModalOpen={setIsNoteModalOpen}
          setNoteType={setNoteType}
          handleSelectedNoteList={handleSelectedNoteList}
        />
        <button type="submit" className="text-white px-8 p-3 bg-beige-400 font-bold text-xl rounded mt-8">
          향수 등록
        </button>
      </form>
    </div>
  );
}

export default Page;
