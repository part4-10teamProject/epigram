import { OauthResponse, PostOauth } from '@/types/auth';

export const postCodeToken = async (authCode: string, endpoint: string) => {
  const requestBody: PostOauth = {
    redirectUri: `http://localhost:3000/login/oauth/${endpoint}`,
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

//구글
/*
export const postJWTToken = async (authCode) => {
  const res = await fetch(`https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${process.env.NEXT_PUBLIC_GOOGLE_SERVICE_EMAIL}:generateIdToken`,{method:'POST',
    body:{
      audience: ``,
      includeEmail: "true"
    }
  });
  const data: GoogleOauthResponse = await res.json();

  const response = await fetch(
    `https://www.googleapis.com/drive/v2/files?access_token=${data.access_token}`,
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response}`);
  }
  const authData = await response.json();
  console.log(authData);
};
/*  const requestBody: PostOauth = {
    redirectUri: `${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`,
    token: data.access_token,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/GOOGLE`,
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
    4/0AX4XfWiAvnXLqxlckFUVao8j0zvZUJ06AMgr-n0vSPotHWcn9p-zHCjqwr47KHS_vDvu8w&
*/
