'use client';

import { useState } from 'react';
import { checkEmail, checkPassword } from './validation';
import { AuthResponse, ButtonData, ErrorDataAxios } from '@/types/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { postUserInput } from '@/api/auth/auth';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Input from './Input';
import { AxiosError } from 'axios';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm: React.FC = () => {
  //Input의 value를 저장한 state

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordExisted, setIsPasswordExisted] = useState(false);

  //서버에 내 입력 이메일의 존재 여부를 저장한 state

  const [isEmailExisted, setIsEmailExisted] = useState(true);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [passwordType, setPasswordType] = useState(false);

  const router = useRouter();

  //이메일 및 비밀번호 input의 onChange 이벤트 핸들러

  //useContext 사용
  const { login } = useAuth();

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

  //두 비밀번호 input의 입력값 눈모양 아이콘 클릭으로 바꾸는 함수

  const passwordVisibility = () => {
    setPasswordType(!passwordType);
  };

  //모든 input 값이 조건을 충족시켰을 때 버튼 활성화

  const isButtonForm = isEmailValid && isPasswordValid;

  //리액트 쿼리로 postUserInput 함수의 response와 errror 제어
  //data fetching 성공 시 cookie에 accesstoken과 id 저장

  const mutation: UseMutationResult<AuthResponse, Error, ButtonData> =
    useMutation<AuthResponse, Error, ButtonData>({
      mutationFn: postUserInput,
      onSuccess: (data: AuthResponse) => {
        console.log('User signed up successfully:', data);

        Cookies.set('token', data.accessToken);
        Cookies.set('userId', `${data.user.id}`);
        Cookies.set('refresh', data.refreshToken);
        login(data.accessToken);
        router.push('/');
      },
      onError: (error: AxiosError<ErrorDataAxios>) => {
        const errorResponse: ErrorDataAxios = error.response.data;
        console.error('Error signing up:', errorResponse);
        if (errorResponse.message === '존재하지 않는 이메일입니다') {
          setIsEmailExisted(false);
        } else if (errorResponse.message === '비밀번호가 일치하지 않습니다') {
          setIsPasswordExisted(false);
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
    mutation.mutateAsync(loginData);
  };

  return (
    <form className="flex w-[312px] flex-col justify-between gap-[16px] md:w-[384px] xl:w-[640px]">
      <div>
        <Input
          type="email"
          placeholder="이메일"
          onChange={handleEmail}
          outlineStyle={
            isEmailValid ? 'outline-none' : 'outline-redState outline-[1px]'
          }
        />
        {!isEmailExisted && emailTouched ? (
          <p className="text-[12px] text-redState md:text-[14px] xl:text-[16px]">
            존재하지 않는 이메일입니다.
          </p>
        ) : null}
      </div>
      <div>
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
        {!isPasswordValid && !passwordTouched ? (
          <p
            className={`xl:text-[16px]} text-[12px] text-redState md:text-[14px]`}
          >
            숫자, 영어 대소문자, 특수문자 포함 8자 이상 입력해주세요
          </p>
        ) : null}
        {isPasswordExisted ? (
          <p
            className={`xl:text-[16px]} text-[12px] text-redState md:text-[14px]`}
          >
            비밀번호가 일치하지 않습니다
          </p>
        ) : null}
      </div>

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
