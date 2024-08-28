'use client';

import BottomList from '@/components/myPage/BottomList';
import { MyProfileModal } from '@/components/myPage/MyProfileModal';
import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import EmotionBoard from '../../components/myPage/EmotionBoard';
import EmotionCalender from '../../components/myPage/EmotionCalender';
import MyProfile from '../../components/myPage/MyProfile';

const MyPage: React.FC = () => {
  const [profileModal, setProfileModal] = useState(false);
  const { userInfo } = useAuth();

  if (!userInfo) return;

  return (
    <div className="bg-background pt-[64px] xl:pt-[128px]">
      <main className="w-full">
        <div className="relative h-[1004px] items-center rounded-[24px] bg-white shadow-lg md:h-[1111px] xl:h-[1901px]">
          <div className="absolute left-1/2 top-[-40px] mb-[36px] flex w-[312px] -translate-x-1/2 transform flex-col items-center justify-between gap-[58px] md:mb-[59px] md:w-[384px] md:gap-[62px] xl:top-[-60px] xl:mb-[87px] xl:w-[640px] xl:gap-[157px]">
            <div className="mb-[-2px] md:mb-[-6px] xl:mb-[-69px]">
              <MyProfile setProfileModal={setProfileModal} />
            </div>
            <div className="h-[134px] w-full md:h-[146px] xl:h-[216px]">
              <EmotionBoard />
            </div>
            <div className="h-[316px] w-full md:h-[380px] xl:h-[648px]">
              <EmotionCalender />
            </div>
          </div>
        </div>

        <BottomList />
      </main>
      <MyProfileModal
        isOpen={profileModal}
        onClose={() => setProfileModal(false)}
        userInfo={userInfo}
      />
    </div>
  );
};

export default MyPage;
