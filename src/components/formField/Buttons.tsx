'use client';

import { signIn, signUp } from '@/api/auth/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const SignupButton = (
  buttonValid: boolean,
  email: string,
  nickname: string,
  password: string,
  passwordCheck: string,
) => {
  const router = useRouter();

  function submitSignup(e) {
    e.preventDefault();
    if (buttonValid) {
      await signUp(email, nickname, password, passwordCheck)
        .then((data) => {
          console.log('Success', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
  return (
    <button
      type="submit"
      onClick={submitSignup}
      className={`h-[44px] w-full rounded-[12px] text-white xl:h-[64px] xl:text-[20px] ${signupButtonValid ? 'cursor-pointer bg-black-500' : 'cursor-not-allowed bg-blue-300'}`}
    >
      가입하기
    </button>
  );
};

export const LoginButton = (
  buttonValid: boolean,
  email: string,
  password: string,
) => {
  function submitLogin(e) {
    e.preventDefault();
    if (buttonValid) {
      await signIn(email, password)
        .then((data) => {
          console.log('Success', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
  const router = useRouter();
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      router.push('/');
    }
  }, []);

  return (
    <button
      type="submit"
      onClick={submitLogin}
      className={`h-[44px] w-full rounded-[12px] text-white xl:h-[64px] xl:text-[20px] ${loginButtonValid ? 'cursor-pointer bg-black-500' : 'cursor-not-allowed bg-blue-300'}`}
    >
      로그인
    </button>
  );
};
