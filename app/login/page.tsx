import React from 'react';
import Logo from '@/public/logo.svg';
import Image from 'next/image';
import SocialLoginButton from '@/components/login/SocialLoginButton';

function Page() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center border-1 border-stone-300 rounded w-96 px-6 py-14 gap-8">
        <Image src={Logo} alt="logo" width={208} height={34} />
        <div className="flex flex-col gap-4 w-full">
          <SocialLoginButton type="google" />
          <SocialLoginButton type="naver" />
        </div>
      </div>
    </div>
  );
}

export default Page;
