import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.svg';

function Header() {
  return (
    <nav className="fixed top-0 left-0 flex justify-center w-full h-24 bg-stone-200 z-10">
      <div className="flex w-full max-w-screen-xl justify-between items-center text-stone-400">
        <Link href="/">
          <Image src={Logo} alt="logo" width={208} height={34} />
        </Link>
        {/* <div className="flex gap-6 font-bold text-lg">
          <div>향수 검색</div>
          <div>컬러 추천</div>
        </div> */}
      </div>
    </nav>
  );
}

export default Header;
