'use client';

import React, { useState } from 'react';
import EmotionBoard from '../../components/myPage/EmotionBoard';
import EmotionCalender from '../../components/myPage/EmotionCalender';
import MyCommentList from '../../components/myPage/MyCommentList';
import MyEpigramList from '../../components/myPage/MyEpigramList';
import MyProfile from '../../components/myPage/MyProfile';
import { useAuth } from '@/contexts/AuthContext';
import { MyProfileModal } from '@/components/myPage/MyProfileModal';

const MyPage: React.FC = () => {
  // activeTab 상태 설정
  const [activeTab, setActiveTab] = useState<'epigram' | 'comment'>('epigram');
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
        <div className="relative mt-8 flex flex-col justify-center">
          <div className="flex space-x-8">
            <button
              className={`text-xl font-semibold ${activeTab === 'epigram' ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('epigram')}
            >
              내 에피그램
            </button>
            <button
              className={`text-xl font-semibold ${activeTab === 'comment' ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('comment')}
            >
              내 댓글
            </button>
          </div>
          <div className="mt-8">
            {activeTab === 'epigram' && <MyEpigramList />}
            {activeTab === 'comment' && <MyCommentList />}
          </div>
        </div>
        <div className="mt-8 space-y-8"></div>
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
