import Image from 'next/image';
import React from 'react';
import GoogleLogo from '@/public/socialLogos/google.svg';
import NaverLogo from '@/public/socialLogos/naver.svg';

const option = {
  google: {
    name: '구글',
    bg: 'bg-white',
    border: 'border-stone-300',
    text: 'bg-stone-800',
    logo: GoogleLogo,
  },
  naver: {
    name: '네이버',
    bg: 'bg-green-naver',
    border: 'border-green-naver',
    text: 'text-white',
    logo: NaverLogo,
  },
};

function SocialLoginButton({ type }: { type: 'google' | 'naver' }) {
  const { name, bg, border, text, logo } = option[type];

  return (
    <button className={`flex justify-center items-center gap-3 rounded py-3 w-full border-1 ${bg} ${border} ${text}`}>
      <Image src={logo} alt={name} width={24} height={24} />
      {name}로 시작하기
    </button>
  );
}

export default SocialLoginButton;
