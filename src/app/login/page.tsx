'use client';

import React, { useState } from 'react';
import Input from '@/components/formField/Input';
import {
  checkEmail,
  checkPasswordLength,
} from '@/components/formField/validation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValid, setIsValid] = useState(true);
  const [buttonValid, setButtonValid] = useState(false);

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event?.target.value);
    setIsValid(checkEmail(email));
    return isValid;
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event?.target.value);
    setIsValid(checkPasswordLength(password));
    return isValid;
  }
  /*function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setButtonValid(isValid);
    return buttonValid;
  }*/

  return (
    <div className="flex w-full flex-col gap-[10px]">
      <form className="flex w-full flex-col justify-between gap-[16px]">
        <Input
          type="email"
          placeholder="이메일"
          onChange={handleEmail}
          style={isValid ? 'border-none' : 'border-redState border-[1px]'}
        />
        <p
          className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isValid ? 'hidden' : 'inline'}`}
        >
          존재하지 않는 아이디입니다
        </p>

        <Input
          type="password"
          placeholder="비밀번호"
          onChange={handlePassword}
          style={isValid ? 'border-none' : 'border-redState border-[1px]'}
        />
        <p
          className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isValid ? 'hidden' : 'inline'}`}
        >
          비밀번호가 올바르지 않습니다
        </p>

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
          className="cursor-pointer text-[14px] text-black-500 underline md:text-[16px] xl:text-[20px]"
        >
          가입하기
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
