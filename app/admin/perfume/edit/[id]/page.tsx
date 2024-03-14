'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brand } from '@/types';
import { ImageState, SelectedNoteList } from '@/types/admin';
import NoteFilterModal from '@/components/admin/NoteFilterModal';
import ImageInput from '@/components/admin/ImageInput';
import LabelInput from '@/components/common/LabelInput';
import LabelSelect from '@/components/admin/LabelSelect';
import PerfumeNoteInput from '@/components/admin/PerfumeNoteInput';
import Loading from '@/components/common/Loading';
import Button from '@/components/common/Button';
import { handleNoteList } from '@/utils/handleNoteList';
import { useDeletePerfumeDetail, usePutPerfumeDetail } from '@/hooks/queries/usePerfumeDetailQuery';

function Page({ params }: { params: { id: string } }) {
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
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedNoteList, setSelectedNoteList] = useState<SelectedNoteList>({ t: [], m: [], b: [] });
  const [notesToDelete, setNotesToDelete] = useState<number[]>([]);
  const { mutate: putPerfume } = usePutPerfumeDetail(params.id);
  const { mutate: deletePerfume } = useDeletePerfumeDetail();

  const handleSelectedNoteList = (type: string, id: number) => {
    const { newNoteList, noteIdx } = handleNoteList(selectedNoteList[type], id);

    if (noteIdx > -1) {
      let newNoteToDelete = selectedNoteList[type][noteIdx].perfumeNoteId;
      if (typeof newNoteToDelete === 'number') {
        setNotesToDelete([...notesToDelete, newNoteToDelete]);
      }
    }

    setSelectedNoteList({ ...selectedNoteList, [type]: newNoteList });
  };

  const handleImageEditButtonClick = async () => {
    if (imageState.imageSrc === imageState.imageUrl || !imageState.imageFile)
      return window.alert('향수 이미지를 변경하시려면 새로운 향수 이미지를 등록해주세요!');

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
    return window.alert('향수 이미지가 수정되었습니다.');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      putPerfume({
        p_id: +params.id,
        p_name: perfumeName,
        b_id: +brand,
        imgurl: imageState.imageUrl,
        selectedNoteList,
        notesToDelete,
      });
    } catch (error) {
      console.error(error);
      throw new Error('향수 등록 실패!');
    }
  };

  const handleDelete = async () => {
    try {
      deletePerfume({ selectedNoteList, imageUrl: imageState.imageUrl, p_id: +params.id });
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

    const getPerfumeDetail = async () => {
      const response = await fetch(`/api/perfume/${params.id}`).then((res) => res.json());

      setImageState({ ...imageState, imageSrc: response.imgurl, imageUrl: response.imgurl });
      setBrand(String(response.brandId));
      setSelectedNoteList(response.perfumeNoteList);
      setPerfumeName(response.name);
    };

    getData();
    getPerfumeDetail();
  }, []);

  if (!brandList || !noteList || !perfumeName) return <Loading />;
  return (
    <div className="w-full flex flex-col justify-start items-center text-stone-800">
      {isNoteModalOpen && (
        <NoteFilterModal
          noteList={noteList}
          type={noteType}
          selectedNoteList={selectedNoteList}
          setSelectedNoteList={setSelectedNoteList}
          setIsNoteModalOpen={setIsNoteModalOpen}
          isEdit={true}
        />
      )}
      <h2 className="text-2xl font-bold mb-16">향수 등록</h2>
      <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        <ImageInput imageState={imageState} setImageState={setImageState} />
        <Button text="향수 이미지 수정" onClick={handleImageEditButtonClick} type="button" />
        <div className="w-full grid grid-cols-2 gap-8 mt-6">
          <div className="flex items-center">
            <LabelInput label="향수명" state={perfumeName} setState={setPerfumeName} />
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
        <div className="flex mt-8 gap-4">
          <Button text="수정" type="submit" size="large" />
          <Button text="삭제" type="button" size="large" design="white" onClick={handleDelete} />
        </div>
      </form>
    </div>
  );
}

export default Page;
