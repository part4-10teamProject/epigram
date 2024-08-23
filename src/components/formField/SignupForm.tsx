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
  //Input의 value를 저장한 state

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');

  //위 value의 유효성 여부를 저장한 state

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  //서버에 내 입력 이메일 혹은 닉네임이 중복됨 여부를 저장한 state

  const [hasEmailExisted, setHasEmailExisted] = useState(false);
  const [hasNicknameExisted, setHasNicknameExisted] = useState(false);

  //Input에 값을 입력했는가 여부를 저장한 state

  const [emailTouched, setEmailTouched] = useState(false);

  const [passwordCheckTouched, setPasswordCheckTouched] = useState(false);

  //password input의 타입 => 입력 값 보이고 안 보이고를 state로

  const [passwordType, setPasswordType] = useState(false);
  const [passwordCheckType, setPasswordCheckType] = useState(false);

  //현재 sagment 가져옴 => .push 메소드로 다른 페이지(sagment)로 이동
  const router = useRouter();

  //이메일 input의 onChange 이벤트 핸들러

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmailTouched(true);
    setEmail(event.target.value);
    setIsEmailValid(checkEmail(event.target.value));
  }

  //비밀번호 input의 onChange 이벤트 핸들러

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setIsPasswordValid(checkPassword(event.target.value));
    setIsPasswordSame(passwordCheck === event.target.value);
  }

  //비밀번호 확인 input의 onChange 이벤트 핸들러

  function handlePasswordCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordCheckTouched(true);
    setPasswordCheck(event.target.value);
    setIsPasswordSame(password === event.target.value);
  }

  //닉네임 input의 onChange 이벤트 핸들러

  function handleNickname(event: React.ChangeEvent<HTMLInputElement>) {
    setNickname(event.target.value);
    setIsNicknameValid(checkNickname(event.target.value));
  }

  //두 비밀번호 input의 입력값 눈모양 아이콘 클릭으로 바꾸는 함수

  const passwordVisibility = () => {
    setPasswordType(!passwordType);
  };

  const passwordCheckVisibility = () => {
    setPasswordCheckType(!passwordCheckType);
  };

  //모든 input 값이 조건을 충족시켰을 때 버튼 활성화

  const isButtonForm =
    isEmailValid && isPasswordValid && isPasswordSame && isNicknameValid;

  //리액트 쿼리로 postUserInput 함수의 response와 errror 제어
  //postUserInput: /auth가 url인 api POST 함수

  const mutation: UseMutationResult<AuthResponse, Error, ButtonData> =
    useMutation<AuthResponse, Error, ButtonData>({
      mutationFn: postUserInput,
      onSuccess: (data: AuthResponse) => {
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

  //userData: Post 시 request body에 넣을 객체 => axios 통해 자동으로 json화
  //endpoint: url 정함

  const signupData = {
    userData: {
      email: email,
      nickname: nickname,
      password: password,
      passwordConfirmation: passwordCheck,
    },
    endpoint: 'signUp',
  };

  //onClick의 이벤트 핸들러 함수

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
          outlineStyle={
            isEmailValid ? 'outline-none' : 'outline-redState outline-[1px]'
          }
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
            outlineStyle={
              isPasswordValid
                ? 'outline-none'
                : 'outline-redState outline-[1px]'
            }
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
          outlineStyle={
            isPasswordSame ? 'outline-none' : 'outline-redState outline-[1px]'
          }
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
          outlineStyle={
            !hasNicknameExisted
              ? 'outline-none'
              : 'outline-redState outline-[1px]'
          }
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
