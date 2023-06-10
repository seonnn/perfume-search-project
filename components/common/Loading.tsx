import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Loading() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
      <div className="text-stone-600 animate-spin">
        <AiOutlineLoading3Quarters size={48} />
      </div>
    </div>
  );
}

export default Loading;
