'use client';
import { userAtom } from '@/recoil/atom';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import jwtDecode from 'jwt-decode';
import { useRecoilValue, useResetRecoilState } from 'recoil';

interface ProfileModalProps {
  handleIsModalOpened: () => void;
}

function ProfileModal({ handleIsModalOpened }: ProfileModalProps) {
  const user = useRecoilValue(userAtom);
  const resetUser = useResetRecoilState(userAtom);

  const router = useRouter();
  const modalRef = useRef(null);
  let userEmail = '';

  if (user) {
    const { email }: { email: string } = jwtDecode(user);
    userEmail = email;
  }

  const profileMenu =
    userEmail === 'surfragmanager@gmail.com' || userEmail === 'admin@surfrag.test'
      ? [
          { name: '향수 목록 관리', url: '/admin/perfume' },
          { name: '노트 목록 관리', url: '/admin/note' },
          { name: '브랜드 목록 관리', url: '/admin/brand' },
          { name: '로그아웃', url: '/' },
        ]
      : [{ name: '로그아웃', url: '/' }];

  const handleLinkChange = (url: string) => {
    router.push(url);
    return handleIsModalOpened();
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      }).then((res) => res.json());

      localStorage.removeItem('user');
      resetUser();
      handleIsModalOpened();

      window.alert('로그아웃 되었습니다.');
      router.push('/');
      return router.refresh();
    } catch (error) {
      console.error(error);
      throw new Error('로그아웃 실패');
    }
  };

  return (
    <div
      ref={modalRef}
      className="w-48 flex flex-col absolute right-0 top-12 bg-white border-1 py-2 border-stone-400 rounded"
    >
      {profileMenu.map((menu) => (
        <div
          key={menu.name}
          className="text-base font-normal text-stone-600 px-4 py-3 hover:bg-stone-100 cursor-pointer"
          onClick={menu.name === '로그아웃' ? handleLogout : () => handleLinkChange(menu.url)}
        >
          {menu.name}
        </div>
      ))}
    </div>
  );
}

export default ProfileModal;
