import { GoogleOauthResponse, OauthResponse, PostOauth } from '@/types/auth';
import { headers } from 'next/headers';

//endpoint 다르게 입력해 구글 fetch 함수에서도 사용 가능하게 함

export const postCodeToken = async (authCode: string, endpoint: string) => {
  const headersList = headers();
  const host = headersList.get('host');
  const requestBody: PostOauth = {
    redirectUri:
      host === 'codeit-epigram.netlify.app'
        ? `https://codeit-epigram.netlify.app/login/oauth/${endpoint}`
        : `http://localhost:3000/login/oauth/${endpoint}`,
    token: authCode,
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
    return data;
  } catch (error) {
    console.error('Error fetching data and setting cookies:', error);
  }
};

//구글만

export const postJWTToken = async (authCode) => {
  const headersList = headers();
  const host = headersList.get('host');

  const res = await fetch(
    host === 'codeit-epigram.netlify.app'
      ? `https://oauth2.googleapis.com/token?code=${authCode}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_AUTH_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_NETLIFY_GOOGLE_URI}&grant_type=authorization_code`
      : `https://oauth2.googleapis.com/token?code=${authCode}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_AUTH_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );
  const data: GoogleOauthResponse = await res.json();
  const token = data.id_token;
  const response = await postCodeToken(token, 'GOOGLE');
  return response;
};
