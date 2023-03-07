import React from 'react';
import wild_bluebell from '@/public/perfumeImg/조말론_와일드블루벨.png';
import Image from 'next/image';

function PerfumeCard() {
  return (
    <div className="flex flex-col gap-3 cursor-pointer w-56">
      <div className="flex justify-center items-center w-56 h-56 bg-stone-50 p-4">
        <Image src={wild_bluebell} alt="조말론 와일드블루벨 코롱" />
      </div>
      <div className="text-sm">조말론</div>
      <div>와일드 블루벨 코롱</div>
    </div>
  );
}

export default PerfumeCard;
