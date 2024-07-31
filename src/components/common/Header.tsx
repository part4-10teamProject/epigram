import Image from 'next/image';

const HeaderOnlyLogo = () => {
  return (
    <nav className="flex h-[52px] items-center border border-blue-900 md:h-[60px] xl:h-[80px]">
      <div className="container mx-auto flex items-center justify-center">
        <div className="">
          <Image
            src="/assets/icons/logo_home.svg"
            alt="Home Logo"
            width={101}
            height={26}
            className="h-[26px] w-[101px] xl:h-[36px] xl:w-[131px]"
          />
        </div>
      </div>
    </nav>
  );
};

const Header = () => {
  return (
    <nav className="xl:px:[120px] flex h-[52px] items-center border border-blue-900 px-[24px] md:h-[60px] md:px-[72px] xl:h-[80px]">
      <div className="container mx-auto flex items-center justify-between">
        {/* 메뉴 아이콘 - 모바일에서만 표시 */}
        <div className="flex gap-3 md:gap-6 xl:gap-9">
          <div className="md:hidden">
            <Image
              src="/assets/icons/gnb_menu.svg"
              alt="Menu"
              width={24}
              height={24}
              className="h-[24px] w-[24px]"
            />
          </div>

          <div>
            <Image
              src="/assets/icons/logo_home.svg"
              alt="Home Logo"
              width={101}
              height={26}
              className="h-[26px] w-[101px] xl:h-[36px] xl:w-[131px]"
            />
          </div>

          <div className="hidden items-center gap-6 md:flex xl:gap-9">
            <button className="text-lg text-black-600 xl:text-xl">피드</button>
            <button className="text-lg text-black-600 xl:text-xl">검색</button>
          </div>
        </div>

        {/* 사용자 프로필 */}
        <div className="flex items-center gap-[6px]">
          <Image
            src="/assets/icons/default_user.svg"
            alt="User Profile"
            width={16}
            height={16}
            className="h-[16px] w-[16px] xl:h-[24px] xl:w-[24px]"
          />
          <p className="text-md text-gray-300 xl:text-lg">김코드</p>
        </div>
      </div>
    </nav>
  );
};

export { HeaderOnlyLogo, Header };
