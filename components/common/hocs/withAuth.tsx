import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';

export function withAuth<P>(Component: React.ComponentType<P & { children: React.ReactNode }>) {
  const WrappedComponent = ({ ...props }: P & { children: React.ReactNode }) => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    let userEmail = '';

    if (token) {
      const { email }: { email: string } = jwtDecode(token);
      userEmail = email;
    }

    useEffect(() => {
      if (userEmail !== 'surfragmanager@gmail.com' && userEmail !== 'admin@surfrag.test') {
        window.alert('본 페이지는 관리자 회원만 접근 가능합니다. 이용 권한이 없어 메인 페이지로 이동합니다.');
        router.push('/');
      }
      setIsClient(true);
    }, []);

    return isClient && userEmail !== 'surfragmanager@gmail.com' && userEmail !== 'admin@surfrag.test' ? null : (
      <Component {...props} />
    );
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
