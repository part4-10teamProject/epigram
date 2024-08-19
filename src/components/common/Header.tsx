'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const HeaderOnlyLogo: React.FC = () => {
  const router = useRouter();

  const handleLogoClick = (): void => {
    router.push('/');
  };

  return (
    <nav className="flex h-[52px] items-center border-b border-b-line-100 md:h-[60px] xl:h-[80px]">
      <div
        onClick={handleLogoClick}
        className="container mx-auto flex cursor-pointer items-center justify-center"
      >
        <Image
          src="/assets/icons/logo_home.svg"
          alt="Home Logo"
          width={101}
          height={26}
          className="h-[26px] w-[101px] xl:h-[36px] xl:w-[131px]"
          priority // Add priority to LCP image
        />
      </div>
    </nav>
  );
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = (): void => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 로컬 스토리지에서 로그인상태를 가져옵니다. 아무값도 저장 안되있으니까 undefined로 false가 될겁니다.
      setIsLoggedIn(loggedIn); // 만약 로그인상태로 테스트하고 싶으면 개발자도구 열고 콘솔창에서 localStorage.setItem('isLoggedIn', 'true'); 입력하세요

      if (
        !loggedIn &&
        pathname !== '/login' &&
        pathname !== '/signup' &&
        pathname !== '/'
      ) {
        router.push('/login');
      }
    };

    checkLoginStatus();
  }, [pathname, router]);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = (): void => {
    router.push('/');
  };

  const handleProfileClick = (): void => {
    router.push('/mypage');
  };

  return (
    <>
      <nav className="flex h-[52px] items-center border-b border-b-line-100 px-[24px] md:h-[60px] md:px-[72px] xl:h-[80px] xl:px-[120px]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex gap-3 md:gap-6 xl:gap-9">
            <div className="md:hidden" onClick={toggleMenu}>
              <Image
                src="/assets/icons/gnb_menu.svg"
                alt="Menu"
                width={24}
                height={24}
                className="h-[24px] w-[24px]"
              />
            </div>

            <div onClick={handleLogoClick} className="cursor-pointer">
              <Image
                src="/assets/icons/logo_home.svg"
                alt="Home Logo"
                width={101}
                height={26}
                className="h-[26px] w-[101px] xl:h-[36px] xl:w-[131px]"
              />
            </div>

            <div className="hidden items-center gap-6 md:flex xl:gap-9">
              <Link href="/feed" className="text-lg text-black-600 xl:text-xl">
                피드
              </Link>
              <Link
                href="/search"
                className="text-lg text-black-600 xl:text-xl"
              >
                검색
              </Link>
            </div>
          </div>

          <div
            className="flex cursor-pointer items-center gap-[6px]"
            onClick={handleProfileClick}
          >
            <Image
              src="/assets/icons/default_user.svg"
              alt="User Profile"
              width={16}
              height={16}
              className="h-[16px] w-[16px] xl:h-[24px] xl:w-[24px]"
            />
            {isLoggedIn && (
              <p className="text-md text-gray-300 xl:text-lg">김코드</p>
            )}
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-[#00000099]"
            onClick={toggleMenu}
          ></div>
          <div className="fixed inset-y-0 left-0 z-50 w-[220px] bg-white shadow-lg">
            <div className="flex items-center justify-end border-b border-b-line-100 p-4">
              <button onClick={toggleMenu} className="text-xl">
                X
              </button>
            </div>
            <ul>
              <li className="px-5 py-6">
                <Link
                  href="/feed"
                  className="text-xl text-black-600"
                  onClick={toggleMenu}
                >
                  피드
                </Link>
              </li>
              <li className="px-5 py-6">
                <Link
                  href="/search"
                  className="text-xl text-black-600"
                  onClick={toggleMenu}
                >
                  검색
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

const ClientHeader: React.FC = () => {
  const pathname = usePathname();

  const showHeaderOnlyLogo = pathname === '/login' || pathname === '/signup';

  return showHeaderOnlyLogo ? <HeaderOnlyLogo /> : <Header />;
};

export default ClientHeader;
