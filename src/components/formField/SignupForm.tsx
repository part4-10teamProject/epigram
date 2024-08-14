'use client';

import React, { useState } from 'react';
import Input from '@/components/formField/Input';
import {
  checkEmail,
  checkNickname,
  checkPassword,
} from '@/components/formField/validation';
import { useRouter } from 'next/navigation';
import { postUserInput } from '@/api/auth/auth';
import { AuthResponse, ButtonData } from '@/types/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');

  // 유효성검사여부( 처음에 렌더링될 때는 이거를 토대로 에러메시지띄움)
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const [hasEmailExisted, setHasEmailExisted] = useState(false);
  const [hasNicknameExisted, setHasNicknameExisted] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordCheckTouched, setPasswordCheckTouched] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);

  const router = useRouter();

  const [passwordType, setPasswordType] = useState(false);
  const [passwordCheckType, setPasswordCheckType] = useState(false);

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setIsEmailValid(checkEmail(event.target.value));
    setEmailTouched(true);
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setIsPasswordValid(checkPassword(event.target.value));
  }
  function handlePasswordCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordCheck(event.target.value);
    setIsPasswordSame(password === event.target.value);
    setPasswordCheckTouched(true);
  }
  function handleNickname(event: React.ChangeEvent<HTMLInputElement>) {
    setNickname(event.target.value);
    setIsNicknameValid(checkNickname(event.target.value));
    setNicknameTouched(true);
  }

  const passwordVisibility = () => {
    setPasswordType(!passwordType);
  };

  const passwordCheckVisibility = () => {
    setPasswordCheckType(!passwordCheckType);
  };

  const isButtonForm =
    isEmailValid && isPasswordValid && isPasswordSame && isNicknameValid;

  const mutation: UseMutationResult<AuthResponse, Error, ButtonData> =
    useMutation<AuthResponse, Error, ButtonData>({
      mutationFn: postUserInput,
      onSuccess: (data: AuthResponse) => {
        console.log('User signed up successfully:', data);
        if (data) {
          router.push('/login');
        }
      },
      onError: (error: Error) => {
        console.error('Error signing up:', error);
        if (error.message === 'Request failed with status code 400') {
          setHasEmailExisted(true);
        } else if (error.message === 'Request failed with status code 500') {
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

  const signupButton: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    mutation.mutate(signupData);
  };

  return (
    <form className="flex w-[312px] flex-col justify-between gap-[16px] md:w-[384px] xl:w-[640px]">
      <div>
        <label>이메일</label>
        <Input
          type="email"
          placeholder="이메일"
          onChange={handleEmail}
          style={`${isEmailValid ? 'border-none' : 'border-redState border-[1px]'}`}
        />
        {emailTouched && !isEmailValid ? (
          <p className="text-[12px] text-redState md:text-[14px] xl:text-[16px]">
            유효한 이메일을 입력해주세요.
          </p>
        ) : null}
        {hasEmailExisted ? (
          <p className="text-[12px] text-redState md:text-[14px] xl:text-[16px]">
            이미 존재하는 이메일입니다.
          </p>
        ) : null}
      </div>

      <div>
        <label>비밀번호</label>
        <div className="relative h-[44px] w-full xl:h-[64px]">
          <Input
            type={passwordType ? 'text' : 'password'}
            placeholder="비밀번호"
            onChange={handlePassword}
            style={`${isPasswordValid ? 'border-none' : 'border-redState border-[1px]'}`}
          />

          <img
            onClick={passwordVisibility}
            src="/assets/icons/visibility.png"
            alt="eye"
            className="absolute right-[16px] top-3 h-[24px] w-[24px] cursor-pointer xl:top-[20px]"
          />
        </div>
      </div>

      <div className="relative h-[44px] w-full xl:h-[64px]">
        <Input
          type={passwordCheckType ? 'text' : 'password'}
          placeholder="비밀번호 확인"
          onChange={handlePasswordCheck}
          style={`${
            isPasswordSame ? 'border-none' : 'border-redState border-[1px]'
          }`}
        />
        <img
          onClick={passwordCheckVisibility}
          src="/assets/icons/visibility.png"
          alt="visiblity"
          className="absolute right-[16px] top-3 h-[24px] w-[24px] cursor-pointer xl:top-[20px]"
        />
        {!isPasswordValid ? (
          <p
            className={`xl:text-[16px]} text-[12px] text-redState md:text-[14px]`}
          >
            숫자, 영어 대소문자, 특수문자 포함 8자 이상 입력해주세요
          </p>
        ) : null}

        {passwordCheckTouched && !isPasswordSame ? (
          <p
            className={`text-[12px] text-redState md:text-[14px] xl:text-[16px]`}
          >
            비밀번호가 일치하지 않습니다
          </p>
        ) : null}
      </div>
      <div className="mt-5">
        <label>닉네임</label>
        <Input
          placeholder="닉네임"
          onChange={handleNickname}
          style={`${!hasNicknameExisted ? 'border-none' : 'border-redState border-[1px]'}`}
        />
      </div>
      {hasNicknameExisted ? (
        <p className="text-[12px] text-redState md:text-[14px] xl:text-[16px]">
          이미 존재하는 닉네임입니다.
        </p>
      ) : null}

      <button
        type="submit"
        onClick={signupButton}
        disabled={!isButtonForm}
        className={`h-[44px] w-full rounded-[12px] text-white xl:h-[64px] xl:text-[20px] ${isButtonForm ? 'bg-black-500' : 'bg-blue-300'}`}
      >
        가입하기
      </button>
    </form>
  );
};

export default SignUpForm;
