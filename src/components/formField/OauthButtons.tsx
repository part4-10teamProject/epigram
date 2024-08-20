import { getCodeTokenGoogle, getCodeTokenKakao } from '@/api/auth/oauth';

const OauthButtons: React.FC = (token) => {
  return (
    <div className="flex w-[96px] justify-between xl:w-[136px]">
      <button className="border-none bg-none" onClick={getCodeTokenGoogle}>
        <img
          alt="google"
          src="/assets/icons/logo_google.svg"
          className="h-[40px] w-[40px] cursor-pointer xl:h-[60px] xl:w-[60px]"
        />
      </button>
      <button className="border-none bg-none" onClick={getCodeTokenKakao}>
        <img
          alt="kakao"
          src="/assets/icons/logo_kakao.svg"
          className="h-[40px] w-[40px] cursor-pointer xl:h-[60px] xl:w-[60px]"
        />
      </button>
    </div>
  );
};

export default OauthButtons;
