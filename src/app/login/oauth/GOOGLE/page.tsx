'use client';

import { postCodeToken } from '@/api/auth/auth';
import { OauthResponse, PostOauth } from '@/types/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';

export default function GOOGLERedirectPage() {
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code');

  const mutation: UseMutationResult<OauthResponse, Error, PostOauth> =
    useMutation<OauthResponse, Error, PostOauth>({
      mutationFn: postCodeToken,
      onSuccess: (data) => {
        const token = data.accessToken;
        Cookies.set('token', token);
        Cookies.set('userId', `${data.user.id}`);
        redirect('/');
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
  }, [authCode]);
}
