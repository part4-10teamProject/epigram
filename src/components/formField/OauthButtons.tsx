'use client';

import Link from 'next/link';

const OauthButtons: React.FC = (token) => {
  //OpenID Connect과정에서 필수 param임
  const nonce =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  return (
    <div className="flex w-[96px] justify-between xl:w-[136px]">
      <Link
        href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&nonce=${nonce}&response_type=code&scope=openid%20profile%20email&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`}
      >
        <img
          alt="google"
          src="/assets/icons/logo_google.svg"
          className="h-[40px] w-[40px] cursor-pointer xl:h-[60px] xl:w-[60px]"
        />
      </Link>
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&endpoint=kakao`}
      >
        <img
          alt="kakao"
          src="/assets/icons/logo_kakao.svg"
          className="h-[40px] w-[40px] cursor-pointer xl:h-[60px] xl:w-[60px]"
        />
      </Link>
    </div>
  );
};

export default OauthButtons;
