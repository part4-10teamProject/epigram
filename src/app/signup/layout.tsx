import React from 'react';

const FormField: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-[312px] flex-col justify-between gap-[50px] md:w-[384px] md:gap-[60px] xl:w-[640px]">
      <img
        src="@/public/assets/images/logo_epigram"
        alt="logo"
        className="fixed top-0 h-[48px] w-[172px] items-center"
      />
      {children}
      <div className="flex flex-col gap-[24px]">
        <div className="flex w-full justify-between gap-[14px] xl:gap-[24px]">
          <hr className="border-[1px] border-blue-400" />
          <p className="text-[12px] text-blue-400 xl:text-[20px]">
            SNS 계정으로 간편 가입하기
          </p>
          <hr className="border-[1px] border-blue-400" />
        </div>
        <div className="flex justify-between gap-[16px]">
          <img
            alt="google"
            src="@/public/assets/logo/logo_google.svg"
            className="h-[40px] w-[40px] xl:h-[60px] xl:w-[60px]"
          />
          <img
            alt="kakao"
            src="@/public/assets/logo/logo_kakao.svg"
            className="h-[40px] w-[40px] xl:h-[60px] xl:w-[60px]"
          />
        </div>
      </div>
    </div>
  );
};

export default FormField;
