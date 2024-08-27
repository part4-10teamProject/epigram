'use client';

import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import defaultImg from '../../../public/assets/images/profile_sample.png';
import Image from 'next/image';
import { MyProfileModal } from './MyProfileModal';

const MyProfile = () => {
  const { logout, userInfo } = useAuth();
  const [profileModal, setProfileModal] = useState(false);

  const userImg = userInfo?.image ?? defaultImg;

  if (!userInfo) return;

  return (
    <div className="flex h-[166px] w-[80px] flex-col items-center justify-between gap-4 xl:h-[240px] xl:w-[120px]">
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-[80px] w-[80px] overflow-hidden rounded-full border-4 border-white shadow-lg xl:h-[120px] xl:w-[120px]">
          <Image
            src={userImg}
            alt={`${userInfo.nickname}'s profile`}
            onClick={() => setProfileModal(true)}
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
          />
        </div>
        <MyProfileModal
          isOpen={profileModal}
          onClose={() => setProfileModal(false)}
          userInfo={userInfo}
        />
        <h2 className="h-[26px] w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-xl font-semibold text-black-950 xl:h-[32px] xl:w-[120px] xl:text-2xl xl:text-[24px]">
          {userInfo.nickname}
        </h2>
      </div>
      <button
        onClick={logout}
        className="h-[36px] w-[77px] rounded-[100px] bg-line-100 text-gray-500 hover:bg-gray-300 focus:outline-none xl:h-[48px] xl:w-[100px]"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyProfile;
