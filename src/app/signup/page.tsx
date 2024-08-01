'use client';

import React, { useState } from 'react';
import Input from '@/app/login/(FormFeild)/Input';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');

  function emailInput(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event?.target.value);
  }
  function passwordInput(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event?.target.value);
  }
  function checkPassword() {}
  function isNicknameValid() {}

  return (
    <form className="flex flex-col justify-between gap-[16px]">
      <label>이메일</label>
      <Input
        type="email"
        placeholder="이메일"
        onChange={emailInput}
        required={true}
      />
      <label>비밀번호</label>
      <Input type="password" placeholder="비밀번호" onChange={passwordInput} />
      <Input
        type="passwordConfirmation"
        placeholder="비밀번호 확인"
        onChange={checkPassword}
      />
      <label>닉네임</label>
      <Input placeholder="닉네임" onChange={isNicknameValid} />
      <button
        type="submit"
        className="h-[64px] w-full cursor-pointer bg-black-500 disabled:bg-blue-200"
      >
        가입하기
      </button>
    </form>
  );
};

export default LoginPage;
