import { ImageState } from '@/types/admin';
import Image from 'next/image';
import React from 'react';
import { BsPlus } from 'react-icons/bs';

interface ImageInputProps {
  imageState: ImageState;
  setImageState: React.Dispatch<React.SetStateAction<ImageState>>;
}

function ImageInput({ imageState, setImageState }: ImageInputProps) {
  const setImagePreview = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const imageFile = event.target.files[0];

    if (!imageFile.type.includes('image/')) return window.alert('이미지 파일만 업로드 가능합니다.');
    if (imageFile.size > 512000) return window.alert('500kb 미만의 파일만 업로드 가능합니다.');

    const imageSrc = URL.createObjectURL(imageFile);

    setImageState({ ...imageState, imageFile: imageFile, imageSrc: imageSrc });
  };

  return (
    <div className="w-48 h-48 flex justify-center items-center bg-stone-100 text-stone-600">
      <label htmlFor="image">
        {imageState.imageSrc ? (
          <Image src={imageState.imageSrc} alt="perfumeImage" width={176} height={176} />
        ) : (
          <BsPlus size={48} className="cursor-pointer" />
        )}
      </label>
      <input className="hidden" onChange={setImagePreview} type="file" accept="image/*" id="image" name="imgae" />
    </div>
  );
}

export default ImageInput;
