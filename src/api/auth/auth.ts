'use client';

import { UserData, AuthResponse } from '@/types/auth';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

//회원가입

export async function signUp(
  emailValue: string,
  nicknameValue: string,
  passwordValue: string,
  passwordConfirmationValue: string,
) {
  const userData: UserData = {
    email: emailValue,
    nickname: nicknameValue,
    password: passwordValue,
    passwordConfirmation: passwordConfirmationValue,
  };

  const response = await fetch(`${baseURL}/auth/signUp`, {
    method: 'POST',
    headers: { 'Content-Type': 'appication/json' },
    body: JSON.stringify(userData),
  });

  const data: AuthResponse = await response.json();
  return data;
}

//로그인

export async function signIn(emailValue: string, passwordValue: string) {
  const userData: UserData = {
    email: emailValue,
    password: passwordValue,
  };

  const response = await fetch(`${baseURL}/auth/signIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'appication/json' },
    body: JSON.stringify({ userData }),
  });

  const data: AuthResponse = await response.json();

  //토큰 저장

  const token = data.accessToken;
  const expireDate = new Date(Date.now() + 86400e3).toUTCString;

  const userId = data.user.id;

  document.cookie =
    `userId=${userId};accessToken=${token};path=/;expires=` + expireDate;

  //console.log=""
}
