'use client';

import React, { useState } from 'react';
import Input from '@/components/formField/Input';
import {
  checkEmail,
  checkNicknameLength,
  checkPasswordLength,
  checkPasswordSame,
} from '@/components/formField/validation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const passwordValue = password;

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
  function handlePasswordCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordCheck(event?.target.value);
    setIsValid(checkPasswordSame(passwordValue, passwordCheck));
    return isValid;
  }
  function handleNickname(event: React.ChangeEvent<HTMLInputElement>) {
    setNickname(event?.target.value);
    setIsValid(checkNicknameLength(nickname));
    return isValid;
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setButtonValid(isValid);
    return buttonValid;
  }

  return (
    <form className="flex flex-col justify-between gap-[16px]">
      <label>이메일</label>
      <Input
        type="email"
        placeholder="이메일"
        onChange={handleEmail}
        style={isValid ? 'border-none' : 'border-redState border-[1px]'}
      />
      <p
        className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isValid ? 'hidden' : 'inline'}`}
      >
        이메일을 입력해주세요
      </p>
      <label>비밀번호</label>
      <Input
        id="password"
        type="password"
        placeholder="비밀번호"
        onChange={handlePassword}
        style={isValid ? 'border-none' : 'border-redState border-[1px]'}
      />
      <Input
        type="passwordConfirmation"
        placeholder="비밀번호 확인"
        onChange={handlePasswordCheck}
        style={isValid ? 'border-none' : 'border-redState border-[1px]'}
      />
      <p
        className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isValid ? 'hidden' : 'inline'}`}
      >
        비밀번호가 일치하지 않습니다
      </p>

      <label>닉네임</label>
      <Input
        placeholder="닉네임"
        onChange={handleNickname}
        style={isValid ? 'border-none' : 'border-redState border-[1px]'}
      />
      <button
        type="submit"
        className={`h-[64px] w-full ${buttonValid ? 'cursor-pointer bg-black-500' : 'disabled:cursor-not-allowed disabled:bg-blue-200'}`}
        onClick={handleSubmit}
      >
        가입하기
      </button>
    </form>
  );
};

export default LoginPage;
