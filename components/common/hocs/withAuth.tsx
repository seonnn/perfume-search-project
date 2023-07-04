import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth<P>(Component: React.ComponentType<P & { children: React.ReactNode }>) {
  const WrappedComponent = ({ ...props }: P & { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAuthUser, setIsAuthUser] = useState(false);

    useEffect(() => {
      if (localStorage.getItem('user')) {
        setIsAuthUser(true);
      } else {
        window.alert('본 페이지는 관리자 회원만 접근 가능합니다. 이용 권한이 없어 메인 페이지로 이동합니다.');
        router.push('/');
      }
    }, []);

    return isAuthUser ? <Component {...props} /> : null;
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
