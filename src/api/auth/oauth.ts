'use client';

import { instance } from '@/api/client/AxiosInstance';
import Cookies from 'js-cookie';
import { PostOauth } from '@/types/auth';
import { useEffect } from 'react';

//redirect된 메인 페이지에서 동작
//이 동작 자체가 리다이렉트된 후에만 동작해야 되는 거고
//메인 페이지 자체로 첫 마운트 됐을 땐 param이 없으니까
//존재하면 동작하는 걸로로

export const getCodeTokenKakao = () => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&endpoint=kakao`;
  return 'KAKAO';
};
export const getCodeTokenGoogle = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&endpoint=google`;
  return 'GOOGLE';
};

export const usePostCodeToken = (authCode, endpoint) => {
  if (!authCode) {
    console.log('Error');
  }

  async function postCodeToken(requestBody: PostOauth) {
    const response = instance.post(`/auth/signIn/${endpoint}`, requestBody);

    const data = (await response).data;
    Cookies.set('userData', data);
  }

  useEffect(() => {
    const requestBody: PostOauth = {
      redirectUri: `http://localhost:3000`,
      token: authCode,
    };
    postCodeToken(requestBody);
  }, [authCode]);
};
