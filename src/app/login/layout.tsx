import OauthButtons from '@/components/formField/OauthButtons';
import React from 'react';

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-[calc(100vh-52px)] w-screen items-center justify-center">
      <div className="flex h-auto w-[312px] flex-col items-center justify-between gap-[50px] md:w-[384px] md:gap-[60px] xl:w-[640px]">
        <img
          src="/assets/images/logo_epigram.svg"
          alt="logo"
          className="h-[48px] w-[172px]"
        />
        <div className="w-full">{children}</div>
        <div className="flex flex-col items-center gap-[24px]">
          <div className="flex w-full justify-between gap-[14px] xl:gap-[24px]">
            <hr className="border-[1px] border-blue-400" />
            <p className="text-[12px] text-blue-400 xl:text-[20px]">
              SNS 계정으로 간편 로그인하기
            </p>
            <hr className="border-[2px] border-blue-400" />
          </div>
          <OauthButtons />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
