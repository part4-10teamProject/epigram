'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="flex h-[52px] items-center border border-blue-900 px-[24px] md:h-[60px] md:px-[72px] xl:h-[80px] xl:px-[120px]">
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
              <Link href="#" className="text-lg text-black-600 xl:text-xl">
                피드
              </Link>
              <Link href="#" className="text-lg text-black-600 xl:text-xl">
                검색
              </Link>
            </div>
          </div>

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

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-[#00000099]"
            onClick={toggleMenu}
          ></div>
          <div className="fixed inset-y-0 left-0 z-50 w-[220px] bg-white shadow-lg">
            <div className="border-bottom border-line-100 m-4 flex items-center justify-end">
              <button onClick={toggleMenu} className="text-xl">
                X
              </button>
            </div>
            <ul>
              <li className="px-5 py-6">
                <Link href="#" className="text-xl text-black-600">
                  피드
                </Link>
              </li>
              <li className="px-5 py-6">
                <Link href="#" className="text-xl text-black-600">
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

export { HeaderOnlyLogo, Header };
