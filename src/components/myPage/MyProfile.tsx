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
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
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
      <h2 className="mt-4 text-2xl font-semibold text-black-950">
        {userInfo.nickname}
      </h2>
      <button
        onClick={logout}
        className="mt-2 rounded-[100px] bg-line-100 px-4 py-2 text-gray-500 hover:bg-gray-300 focus:outline-none"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyProfile;
