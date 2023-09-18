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
    <div className="flex flex-col gap-3 cursor-pointer max-xs:gap-2">
      <div className="flex justify-center items-center relative bg-stone-50 pt-[100%]">
        <Image
          src={process.env.NEXT_PUBLIC_SUPABASE_URL + imgUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
        />
      </div>
      <div className="text-sm text-stone-500 max-xs:text-xs">{brand}</div>
      <div className="text-stone-800 max-xs:text-sm">{name}</div>
    </div>
  );
}

export default PerfumeCard;
