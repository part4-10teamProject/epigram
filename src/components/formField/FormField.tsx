'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/formField/Input';
import {
  checkEmail,
  checkNicknameLength,
  checkPassword,
  checkPasswordSame,
} from '@/components/formField/validation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// interface Router {
//   router: string;
// }

const FormField: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const pathname = usePathname();

  // circular reference
  // const passwordValue = password;

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const [signupButtonValid, setSignupButtonValid] = useState(false);
  const [loginButtonValid, setLoginButtonValid] = useState(false);

  //handle(input) 함수

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event?.target.value);

    const isEmailValid = checkEmail(email);
    setIsEmailValid(isEmailValid);
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event?.target.value);

    const isPasswordValid = checkPassword(password);
    setIsPasswordValid(isPasswordValid);
  }
  function handlePasswordCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordCheck(event?.target.value);

    const isPasswordSame = checkPasswordSame(password, passwordCheck);
    setIsPasswordSame(isPasswordSame);
  }
  function handleNickname(event: React.ChangeEvent<HTMLInputElement>) {
    setNickname(event?.target.value);

    const isNicknameValid = checkNicknameLength(nickname);
    setIsNicknameValid(isNicknameValid);
  }

  //모든 input이 조건을 만족했을 때 버튼 활성화

  // if (
  //   (isEmailValid && isNicknameValid && isPasswordSame && isPasswordValid) ===
  //   true
  // ) {
  //   setSignupButtonValid(true);
  // }
  // if ((isEmailValid && isPasswordValid) === true) {
  //   setLoginButtonValid(true);
  // }

  // 버튼 활성화 effect
  useEffect(() => {
    const isSignupButtonValid =
      isEmailValid && isNicknameValid && isPasswordSame && isPasswordValid;
    const isLoginButtonValid = isEmailValid && isPasswordValid;

    setSignupButtonValid(isSignupButtonValid);
    setLoginButtonValid(isLoginButtonValid);
  }, [isEmailValid, isNicknameValid, isPasswordSame, isPasswordValid]);

  //조건 별 에러 메세지

  //const [loginErrorMessage, setLoginErrorMessage] = useState('');
  //const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  return (
    <form className="flex w-[312px] flex-col justify-between gap-[16px] md:w-[384px] xl:w-[640px]">
      {/* 이메일 input */}

      <label className={`${pathname === '/signup' ? 'inline' : 'hidden'}`}>
        이메일
      </label>
      <Input
        type="email"
        placeholder="이메일"
        onChange={handleEmail}
        style={isEmailValid ? 'border-none' : 'border-redState border-[1px]'}
      />
      <p
        className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isEmailValid ? 'hidden' : 'inline'}`}
      >
        {/*{loginErrorMessage}*/}
      </p>

      {/* 비밀번호 input */}

      <label className={`${pathname === '/signup' ? 'inline' : 'hidden'}`}>
        비밀번호
      </label>
      <Input
        id="password"
        type="password"
        placeholder="비밀번호"
        onChange={handlePassword}
        style={isPasswordValid ? 'border-none' : 'border-redState border-[1px]'}
      />

      {/* 회원가입 페이지일 때만 비밀번호 확인 및 닉네임 input 추가됨 */}

      {pathname === '/signup' ? (
        <>
          <Input
            type="passwordConfirmation"
            placeholder="비밀번호 확인"
            onChange={handlePasswordCheck}
            style={
              isPasswordSame ? 'border-none' : 'border-redState border-[1px]'
            }
          />
          <p
            className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isPasswordValid ? 'hidden' : 'inline'}`}
          >
            숫자, 영어, 특수문자 포함 12자 이상 입력해주세요
          </p>
          {isPasswordValid ? (
            <p
              className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isPasswordSame ? 'hidden' : 'inline'}`}
            >
              비밀번호가 일치하지 않습니다
            </p>
          ) : null}
        </>
      ) : null}
      <p
        className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isPasswordSame ? 'hidden' : 'inline'}`}
      >
        {/*{passwordErrorMessage}*/}
      </p>
      {pathname === '/signup' ? (
        <>
          <label>닉네임</label>
          <Input
            placeholder="닉네임"
            onChange={handleNickname}
            style={
              isNicknameValid ? 'border-none' : 'border-redState border-[1px]'
            }
          />
          <p
            className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isNicknameValid ? 'hidden' : 'inline'}`}
          >
            이미 존재하는 닉네임입니다
          </p>

          {/* 이 아래 페이지 별 버튼이 구분돼 있음 */}

          <button
            type="submit"
            className={`h-[44px] w-full rounded-[12px] text-white xl:h-[64px] xl:text-[20px] ${signupButtonValid ? 'cursor-pointer bg-black-500' : 'disabled:cursor-not-allowed disabled:bg-blue-300'}`}
          >
            가입하기
          </button>
        </>
      ) : (
        <button
          type="submit"
          className={`h-[44px] w-full rounded-[12px] text-white xl:h-[64px] xl:text-[20px] ${loginButtonValid ? 'cursor-pointer bg-black-500' : 'cursor-not-allowed bg-blue-300'}`}
        >
          로그인
        </button>
      )}
      {pathname === '/login' ? (
        <div className="flex justify-end gap-[8px]">
          <p className="text-blue-400">회원이 아니신가요?</p>
          <Link href="/signup" className="underline">
            가입하기
          </Link>
        </div>
      ) : null}
    </form>
  );
};

export default FormField;

//loginErrorMessage = '이미 존재하는 이메일입니다'/ '존재하지 않는 아이디입니다'
//passwordErrorMessage = '비밀번호가 일치하지 않습니다'/'숫자, 영어, 특수문자 포함 12자 이상 입력해주세요'
