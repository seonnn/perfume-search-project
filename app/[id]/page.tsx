'use client';
import { perfumeList } from '@/utils/noteList';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

function PerfumeDetail() {
  const pathname = usePathname();
  const item = perfumeList.find((perfume) => pathname && perfume.id === +pathname?.slice(1));

  if (!item) return <div>Loading...</div>;
  return (
    <div className="my-44 border-2">
      <Image src={item.imgUrl} alt={item.name} width={500} height={500} property="true" />
    </div>
  );
}

export default PerfumeDetail;
