'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brand } from '@/types';
import { ImageState, SelectedNoteList } from '@/types/admin';

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
  const [selectedNoteList, setSelectedNoteList] = useState<SelectedNoteList>({ t: [], m: [], b: [] });
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  useEffect(() => {
    const getPerfumeDetail = async () => {
      const response = await fetch(`/api/perfume/${params.id}`).then((res) => res.json());
      console.log(response);
    };

    getPerfumeDetail();
  }, []);
  return <div>Page</div>;
}

export default Page;
