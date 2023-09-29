'use client';
import React, { useState } from 'react';
import Logo from '@/public/logo.svg';
import Image from 'next/image';
import LabelInput from '@/components/common/LabelInput';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atom';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const setUser = useSetRecoilState(userAtom);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const userToken = getCookie(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(8).split('.')[0]}-auth-token`);
        if (typeof userToken === 'string') {
          setUser(JSON.parse(userToken)[0]);
          localStorage.setItem('token', JSON.parse(userToken)[0]);
        }
        router.refresh();
        window.alert('로그인 되었습니다.');
        return router.push('/');
      } else {
        return window.alert('아이디 또는 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error(error);
      window.alert('로그인 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center border-1 border-stone-300 rounded w-[458px] px-7 pt-10 pb-8 gap-8">
        <Image src={Logo} alt="logo" width={208} height={34} />
        <form className="w-full flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <LabelInput
              label="아이디"
              state={email}
              setState={setEmail}
              placeholder="이메일을 입력해주세요."
              type="email"
            />
          </div>
          <div className="flex items-center mb-4">
            <LabelInput
              label="비밀번호"
              state={password}
              setState={setPassword}
              placeholder="비밀번호를 입력해주세요."
              type="password"
            />
          </div>
          <Button text="로그인" />
          <div className="mt-4 text-center text-xs text-stone-500">
            계정이 없으신가요?{' '}
            <Link href="/signup">
              <span>회원가입</span>
            </Link>
          </div>
          {/* <div className="flex flex-col gap-4 w-full">
          <SocialLoginButton type="google" />
          <SocialLoginButton type="naver" />
        </div> */}
        </form>
      </div>
    </div>
  );
}

export default Page;
