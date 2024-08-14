'use client';

import { useState } from 'react';
import { checkEmail, checkPassword } from './validation';
import { AuthResponse, ButtonData } from '@/types/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { postUserInput } from '@/api/auth/auth';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Input from './Input';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailExisted, setIsEmailExisted] = useState(true);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [passwordType, setPasswordType] = useState(false);

  const router = useRouter();

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
  const passwordVisibility = () => {
    setPasswordType(!passwordType);
  };

  const isButtonForm = isEmailValid && isPasswordValid;

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
        if (error.message === '존재하지 않는 이메일입니다.') {
          setIsEmailExisted(false);
        }
      },
    });

  const loginData = {
    userData: { email: email, password: password },
    endpoint: 'signIn',
  };
  const loginButton: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    try {
      const response = mutation.mutateAsync(loginData);
      if (response) {
        const data = response;
        const token = (await data).accessToken;
        const id = (await data).user.id;
        Cookies.set('token', token);
        Cookies.set('userId', `${id}`);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <form className="flex w-[312px] flex-col justify-between gap-[16px] md:w-[384px] xl:w-[640px]">
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
      {isEmailExisted && emailTouched ? (
        <p>존재하지 않는 이메일입니다.</p>
      ) : null}
      <div className="relative h-[44px] w-full xl:h-[64px]">
        <Input
          type={passwordType ? 'text' : 'password'}
          placeholder="비밀번호"
          onChange={handlePassword}
          style={
            isPasswordValid && passwordTouched
              ? 'border-none'
              : 'border-redState border-[1px]'
          }
        />
        <img
          onClick={passwordVisibility}
          src="/assets/icons/visibility.png"
          alt="eye"
          className="absolute right-[16px] top-3 h-[24px] w-[24px] cursor-pointer xl:top-[20px]"
        />
      </div>
      {!isPasswordValid && passwordTouched ? (
        <p
          className={`xl:text-[16px]} text-[12px] text-redState md:text-[14px]`}
        >
          숫자, 영어 대소문자, 특수문자 포함 8자 이상 입력해주세요
        </p>
      ) : null}

      <button
        type="submit"
        onClick={loginButton}
        disabled={mutation.isPending}
        className={`h-[44px] w-full rounded-[12px] text-white xl:h-[64px] xl:text-[20px] ${isButtonForm ? 'cursor-pointer bg-black-500' : 'cursor-default bg-blue-300'}`}
      >
        로그인
      </button>
    </form>
  );
};
export default LoginForm;
