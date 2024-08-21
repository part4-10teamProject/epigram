'use client';

import { instance } from '@/api/client/AxiosInstance';
import Cookies from 'js-cookie';
import { GoogleOauthResponse, OauthResponse, PostOauth } from '@/types/auth';
import React from 'react';
import { URLSearchParams } from 'url';
//redirect된 메인 페이지에서 동작
//이 동작 자체가 리다이렉트된 후에만 동작해야 되는 거고
//메인 페이지 자체로 첫 마운트 됐을 땐 param이 없으니까
//존재하면 동작하는 걸로로

export const getCodeTokenKakao: React.MouseEventHandler<HTMLButtonElement> = (
  e,
) => {
  e.preventDefault();
  window.location.href = `https://kauth.kakao.com/oauth/authorize?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&endpoint=kakao`;
};
export const getCodeTokenGoogle: React.MouseEventHandler<HTMLButtonElement> = (
  e,
) => {
  e.preventDefault();
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&endpoint=google`;
};

export const postCodeToken = async (authCode: string, endpoint: string) => {
  const requestBody: PostOauth = {
    redirectUri: `http://localhost:3000/login/oauth/${endpoint}`,
    token: authCode,
  };
  console.log(authCode);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/${endpoint}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response}`);
    }

    const data: OauthResponse = await response.json();

    Cookies.set('accessToken', data.accessToken);
    Cookies.set('refreshToken', data.refreshToken);
    Cookies.set('id', `${data.user.id}`);
  } catch (error) {
    console.error('Error fetching data and setting cookies:', error);
  }
};

export const postJWTToken = async (authCode, endpoint) => {
  const params = new URLSearchParams({
    client_id: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
    client_secret: ``,
    code: `${authCode}`,
    grant_type: 'authorization_code',
    redirect_uri: `${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`,
  });
  const res = await fetch(
    `https://oauth2.googleapis.com/token?${params.toString()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );
  const data: GoogleOauthResponse = await res.json();
  const requestBody: PostOauth = {
    redirectUri: `http://localhost:3000/login/oauth/${endpoint}`,
    token: data.accessToken,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/${endpoint}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      },
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response}`);
    }

    const data: OauthResponse = await response.json();
  } catch (error) {
    console.error('Error fetching data and setting cookies:', error);
  }
};
