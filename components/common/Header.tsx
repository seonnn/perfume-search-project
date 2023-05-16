import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.svg';
import { FaBars } from 'react-icons/fa';

function Header() {
  return (
    <nav className="fixed top-0 left-0 flex justify-center w-full h-24 bg-stone-200 z-10 max-sm:h-20">
      <div className="flex w-full max-w-screen-xl justify-between items-center mx-5 text-stone-400">
        <Link href="/">
          <Image src={Logo} alt="logo" width={208} height={34} className="max-sm:w-4/5 max-sm:h-4/5" />
        </Link>
        {/* <div className="flex gap-8 font-bold text-lg max-sm:hidden">
          <div>향수 검색</div>
          <div>계절&색 추천</div>
        </div>
        <div className="sm:hidden">
          <FaBars size={22} />
        </div> */}
      </div>
    </nav>
  );
}

export default Header;
