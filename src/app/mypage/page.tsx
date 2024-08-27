'use client';

import React, { useState } from 'react';
import EmotionBoard from '../../components/myPage/EmotionBoard';
import EmotionCalender from '../../components/myPage/EmotionCalender';
import MyCommentList from '../../components/myPage/MyCommentList';
import MyEpigramList from '../../components/myPage/MyEpigramList';
import MyProfile from '../../components/myPage/MyProfile';

const MyPage: React.FC = () => {
  // activeTab 상태 설정
  const [activeTab, setActiveTab] = useState<'epigram' | 'comment'>('epigram');

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="relative w-full rounded-[24px] bg-white p-8 shadow-lg">
          <MyProfile />
          <div className="mt-8 flex justify-center">
            <EmotionBoard />
          </div>
          <div className="mt-8">
            <EmotionCalender />
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
    </div>
  );
};

export default MyPage;
