'use client';
import React, { useEffect, useState } from 'react';
import { PerfumeDetail } from '@/types';
import { getPerfumeDetail } from '@/utils/supabase/getPerfumeDetail';
import DetailContents from '@/components/detail/DetailContents';

function PerfumeDetail({ params }: { params: { id: string } }) {
  const [perfume, setPerfume] = useState<PerfumeDetail | null>();

  const fetchPerfumeDetail = async () => {
    const { name, imgUrl, brandName, perfumeNoteList } = await getPerfumeDetail(params.id);
    setPerfume({ name, imgUrl, brandName, perfumeNoteList });
  };

  useEffect(() => {
    fetchPerfumeDetail();
  }, []);

  if (!perfume) return <div>Loading...</div>;
  return (
    <DetailContents
      name={perfume.name}
      imgUrl={perfume.imgUrl}
      brandName={perfume.brandName}
      perfumeNoteList={perfume.perfumeNoteList}
    />
  );
}

export default PerfumeDetail;
