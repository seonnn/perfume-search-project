import Image from 'next/image';
import React from 'react';
import GoogleLogo from '@/public/socialLogos/google.svg';
import NaverLogo from '@/public/socialLogos/naver.svg';

const option = {
  google: {
    name: '구글',
    bg: 'white',
    border: 'stone-400',
    text: 'stone-800',
    logo: GoogleLogo,
  },
  naver: {
    name: '네이버',
    bg: 'green-naver',
    border: 'green-naver',
    text: 'white',
    logo: NaverLogo,
  },
};

function SocialLoginButton({ type }: { type: 'google' | 'naver' }) {
  const { name, bg, border, text, logo } = option[type];

  return (
    <button
      className={`flex justify-center items-center gap-3 border-1 rounded py-3 w-full bg-${bg} border-${border} text-${text}`}
    >
      <Image src={logo} alt={name} width={24} height={24} />
      {name}로 시작하기
    </button>
  );
}

export default SocialLoginButton;
