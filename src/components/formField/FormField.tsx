'use client';

import React, { MouseEventHandler, useEffect, useState } from 'react';
import Input from '@/components/formField/Input';
import {
  checkEmail,
  checkNicknameLength,
  checkPassword,
  checkPasswordSame,
} from '@/components/formField/validation';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { postUserInput } from '@/api/auth/auth';
import { UserData, AuthResponse, ButtonData } from '@/types/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const FormField: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordCheckTouched, setPasswordCheckTouched] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);

  const [signupButtonValid, setSignupButtonValid] = useState(false);
  const [loginButtonValid, setLoginButtonValid] = useState(false);

  //handle(input) 함수

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setIsEmailValid(checkEmail(email));
    setEmailTouched(true);
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setIsPasswordValid(checkPassword(password));
    setPasswordTouched(true);
  }
  function handlePasswordCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordCheck(event.target.value);
    setIsPasswordSame(checkPasswordSame(password, passwordCheck));
    setPasswordCheckTouched(true);
  }
  function handleNickname(event: React.ChangeEvent<HTMLInputElement>) {
    setNickname(event.target.value);
    setIsNicknameValid(checkNicknameLength(nickname));
    setNicknameTouched(true);
  }

  const [passwordType, setPasswordType] = useState(false);
  const [passwordCheckType, setPasswordCheckType] = useState(false);
  const visible = 'text';
  const invisible = 'password';

  const passwordVisibility: MouseEventHandler = (e) => {
    e.preventDefault();
    setPasswordType(!passwordType);
  };

  const passwordCheckVisibility: MouseEventHandler = (e) => {
    e.preventDefault();
    setPasswordCheckType(!passwordCheckType);
  };

  const [hasEmailExisted, setHasEmailExisted] = useState(false);
  const [hasNicknameExisted, setHasNicknameExisted] = useState(false);

  useEffect(() => {
    const isSignupButtonValid =
      isEmailValid && isNicknameValid && isPasswordSame && isPasswordValid;
    const isLoginButtonValid = isEmailValid && isPasswordValid;

    setSignupButtonValid(isSignupButtonValid);
    setLoginButtonValid(isLoginButtonValid);
  }, [isEmailValid, isNicknameValid, isPasswordSame, isPasswordValid]);

  //onClick 함수

  const mutation: UseMutationResult<AuthResponse, Error, ButtonData> =
    useMutation<AuthResponse, Error, ButtonData>({
      mutationFn: postUserInput,
      onSuccess: (data: AuthResponse) => {
        console.log('User signed up successfully:', data);
      },
      onError: (error: Error) => {
        console.error('Error signing up:', error);
        if (error.message === '이미 사용중인 이메일입니다.') {
          setHasEmailExisted(true);
        } else if (error.message === 'Internal Server Error') {
          setHasNicknameExisted(true);
        }
      },
    });

  const signupData = {
    userData: {
      email: email,
      nickname: nickname,
      password: password,
      passwordConfirmation: passwordCheck,
    },
    endpoint: 'signUp',
  };
  const loginData = {
    userData: { email: email, password: password },
    endpoint: 'signIn',
  };

  const signupButton: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    if (signupButtonValid) {
      try {
        const response = mutation.mutateAsync(signupData);
        if (response) {
          const data = await response;
          router.push('/login');
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    }
  };

  const loginButton: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    if (loginButtonValid) {
      try {
        const response = mutation.mutateAsync(loginData);
        if (response) {
          const data = response;
          const token = (await data).accessToken;
          const id = (await data).user.id;
          Cookies.set('token', token);
          Cookies.set('userId', `${id}`);
          router.push('/');
        }
      } catch (error) {
        console.error('Error signing in:', error);
      }
    }
  };

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
        style={
          isEmailValid && emailTouched
            ? 'border-none'
            : 'border-redState border-[1px]'
        }
      />
      <p className="text-[12px] text-redState md:text-[14px] xl:text-[16px]">
        {isEmailValid && emailTouched ? null : '이메일 형식으로 입력해주세요.'}
      </p>
      <p className="text-[12px] text-redState md:text-[14px] xl:text-[16px]">
        {hasEmailExisted ? '이미 존재하는 이메일입니다.' : null}
      </p>

      {/* 비밀번호 input */}

      <label className={`${pathname === '/signup' ? 'inline' : 'hidden'}`}>
        비밀번호
      </label>
      <div className="relative h-[44px] w-full xl:h-[64px]">
        <Input
          type={passwordType ? visible : invisible}
          placeholder="비밀번호"
          onChange={handlePassword}
          style={
            isPasswordValid && passwordTouched
              ? 'border-none'
              : 'border-redState border-[1px]'
          }
        />

        <button
          className="absolute right-[16px] top-[10px] h-[24px] w-[24px] xl:top-[20px]"
          onClick={passwordVisibility}
        >
          <img
            src="/assets/icons/visibility.png"
            alt="eye"
            className="h-[24px] w-[24px]"
          />
        </button>
      </div>

      {/* 회원가입 페이지일 때만 비밀번호 확인 및 닉네임 input 추가됨 */}

      {pathname === '/signup' ? (
        <>
          <div className="relative h-[44px] w-full xl:h-[64px]">
            <Input
              type={passwordCheckType ? visible : invisible}
              placeholder="비밀번호 확인"
              onChange={handlePasswordCheck}
              style={
                isPasswordSame ? 'border-none' : 'border-redState border-[1px]'
              }
            />
            <button
              className="absolute right-[16px] top-[10px] h-[24px] w-[24px] xl:top-[20px]"
              onClick={passwordCheckVisibility}
            >
              <img
                src="/assets/icons/visibility.png"
                alt="visiblity"
                className="h-[24px] w-[24px]"
              />
            </button>
          </div>
          {isPasswordValid ? null : (
            <p className="text-[12px] text-redState md:text-[14px] xl:text-[16px]">
              {isPasswordValid
                ? null
                : '숫자, 영어 대소문자, 특수문자 포함 8자 이상 입력해주세요'}
            </p>
          )}
          {isPasswordSame && isPasswordValid && passwordCheckTouched ? null : (
            <p
              className={`text-[12px] text-redState md:text-[14px] xl:text-[16px] ${isPasswordSame ? 'hidden' : 'inline'}`}
            >
              비밀번호가 일치하지 않습니다
            </p>
          )}
        </>
      ) : null}

      {pathname === '/signup' ? (
        <>
          <label>닉네임</label>
          <Input
            placeholder="닉네임"
            onChange={handleNickname}
            style={`${isNicknameValid && nicknameTouched ? 'border-none' : 'border-redState border-[1px]'}`}
          />
          <p>닉네임은 </p>
          <p className="text-[12px] text-redState md:text-[14px] xl:text-[16px]">
            {hasNicknameExisted ? '이미 존재하는 닉네임입니다' : null}
          </p>

          {/* 이 아래 페이지 별 버튼이 구분돼 있음 */}

          <button
            type="submit"
            onClick={signupButton}
            disabled={mutation.isPending}
            className={`h-[44px] w-full rounded-[12px] text-white xl:h-[64px] xl:text-[20px] ${signupButtonValid ? 'cursor-pointer bg-black-500' : 'cursor-default bg-blue-300'}`}
          >
            가입하기
          </button>
        </>
      ) : (
        <button
          type="submit"
          onClick={loginButton}
          disabled={mutation.isPending}
          className={`h-[44px] w-full rounded-[12px] text-white xl:h-[64px] xl:text-[20px] ${loginButtonValid ? 'cursor-pointer bg-black-500' : 'cursor-default bg-blue-300'}`}
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
