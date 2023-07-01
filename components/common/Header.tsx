'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.svg';
import { FaBars } from 'react-icons/fa';
import useModal from '@/hooks/useModal';
import ProfileModal from './ProfileModal';
import { FaUserCircle } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atom';

function Header() {
  const profileModal = useModal('profileModal');
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const userId = localStorage.getItem('userName');
    setUser({
      id: userId || '',
      role: userId === 'admin' ? 'admin' : 'user',
    });
  }, []);

  return (
    <nav className="fixed top-0 left-0 flex justify-center w-full h-24 bg-stone-200 z-10 max-sm:h-20">
      <div className="flex w-full max-w-screen-xl justify-between items-center mx-5 text-stone-400">
        <Link href="/">
          <Image src={Logo} alt="logo" width={208} height={34} className="max-sm:w-4/5 max-sm:h-4/5" />
        </Link>
        <div className="flex relative gap-8 font-bold text-lg max-sm:hidden">
          {profileModal.isModalOpened && <ProfileModal handleIsModalOpened={profileModal.handleIsModalOpened} />}
          {/* <div>향수 검색</div>
          <div>계절&색 추천</div> */}
          {user.id ? (
            <FaUserCircle
              size={40}
              className="text-stone-600 cursor-pointer"
              onClick={profileModal.handleIsModalOpened}
            />
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </div>
        <div className="sm:hidden">
          <FaBars size={22} />
        </div>
      </div>
    </nav>
  );
}

export default Header;
