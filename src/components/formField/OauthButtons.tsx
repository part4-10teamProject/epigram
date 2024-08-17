import Link from 'next/link';

const OauthButtons: React.FC = (token) => {
  return (
    <div className="flex w-[96px] justify-between xl:w-[136px]">
      <Link
        href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`}
      >
        <img
          alt="google"
          src="/assets/icons/logo_google.svg"
          className="h-[40px] w-[40px] cursor-pointer xl:h-[60px] xl:w-[60px]"
        />
      </Link>
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`}
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
