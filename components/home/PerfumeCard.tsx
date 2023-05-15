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
      <div className="flex justify-center items-center bg-stone-50 p-4">
        <Image src={imgUrl} alt={name} width={192} height={192} />
      </div>
      <div className="text-sm text-stone-500">{brand}</div>
      <div className="text-stone-800">{name}</div>
    </div>
  );
}

export default PerfumeCard;
