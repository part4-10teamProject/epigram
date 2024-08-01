'use client';

import React, { useState } from 'react';
import Input from '@/app/login/(FormFeild)/Input';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event?.target.value);
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event?.target.value);
  }

  const emailInput = () => {};
  const passwordInput = () => {};

  return (
    <div className="flex w-full flex-col gap-[10px]">
      <form className="flex w-full flex-col justify-between gap-[16px]">
        <Input
          type="email"
          placeholder="이메일"
          onChange={emailInput}
          required={true}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          onChange={passwordInput}
        />
        <button
          type="submit"
          className="h-[44px] w-full cursor-pointer rounded-[12px] bg-black-500 text-white disabled:bg-blue-200"
        >
          로그인
        </button>
      </form>
      <p className="text-right text-[14px] text-blue-400 md:text-[16px] xl:text-[20px]">
        회원이 아니신가요?
        <a
          href="@/app/signup/page.tsx"
          className="cursor-pointer text-[14px] text-black-500 md:text-[16px] xl:text-[20px]"
        >
          가입하기
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
