'use client';

import { postCodeToken } from '@/api/auth/auth';
import { OauthResponse, PostOauth } from '@/types/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function KakaoRedirect() {
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code');

  const router = useRouter();

  const mutation: UseMutationResult<OauthResponse, Error, PostOauth> =
    useMutation<OauthResponse, Error, PostOauth>({
      mutationFn: postCodeToken,
      onSuccess: (data) => {
        const token = data.accessToken;
        Cookies.set('token', token);
        Cookies.set('userId', `${data.user.id}`);
        router.push('/');
      },
      onError: (error) => {
        console.error('Signing error', error);
      },
    });

  useEffect(() => {
    if (authCode) {
      const requestBody: PostOauth = {
        postBody: {
          redirectUri: `http://localhost:3000/login/oauth/GOOGLE`,
          token: authCode,
        },
        endpoint: 'GOOGLE',
      };

      mutation.mutate(requestBody);
    }
  }, [authCode, mutation]);
}
