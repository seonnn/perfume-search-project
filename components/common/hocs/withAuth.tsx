import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/atom';
import jwt_decode from 'jwt-decode';

export function withAuth<P>(Component: React.ComponentType<P & { children: React.ReactNode }>) {
  const WrappedComponent = ({ ...props }: P & { children: React.ReactNode }) => {
    const router = useRouter();
    const user = useRecoilValue(userAtom);
    const { email }: { email: string } = jwt_decode(user);

    useEffect(() => {
      if (email !== 'surfragmanager@gmail.com' && email !== 'admin@surfrag.test') {
        window.alert('본 페이지는 관리자 회원만 접근 가능합니다. 이용 권한이 없어 메인 페이지로 이동합니다.');
        router.push('/');
      }
    }, []);

    return email !== 'surfragmanager@gmail.com' && email !== 'admin@surfrag.test' ? null : <Component {...props} />;
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
