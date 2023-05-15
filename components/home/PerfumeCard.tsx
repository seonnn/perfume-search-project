import React from 'react';
import Image from 'next/image';

interface PerfumeCardProps {
  brand?: string;
  name: string;
  imgUrl: string;
  id: number;
}

function PerfumeCard({ brand, name, imgUrl, id }: PerfumeCardProps) {
  return (
    <div className="flex flex-col gap-3 cursor-pointer">
      <div className="flex justify-center items-center relative bg-stone-50 pt-[100%]">
        <Image src={imgUrl} alt={name} fill className="object-cover" />
      </div>
      <div className="text-sm text-stone-500">{brand}</div>
      <div className="text-stone-800">{name}</div>
    </div>
  );
}

export default PerfumeCard;
