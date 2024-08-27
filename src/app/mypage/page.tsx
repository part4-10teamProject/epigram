'use client';

import React, { useState } from 'react';
import EmotionBoard from '../../components/myPage/EmotionBoard';
import EmotionCalender from '../../components/myPage/EmotionCalender';
import EmotionChart from '../../components/myPage/EmotionChart';
import MyCommentList from '../../components/myPage/MyCommentList';
import MyEpigramList from '../../components/myPage/MyEpigramList';
import MyProfile from '../../components/myPage/MyProfile';

const MockData2 = [
  {
    id: 9184,
    userId: 760,
    emotion: 'HAPPY',
    createdAt: '2024-08-16T00:00:00.000Z',
  },
  {
    id: 9184,
    userId: 760,
    emotion: 'ANGRY',
    createdAt: '2024-08-15T00:00:00.000Z',
  },
  {
    id: 9184,
    userId: 760,
    emotion: 'SAD',
    createdAt: '2024-08-14T00:00:00.000Z',
  },
  {
    id: 9094,
    userId: 760,
    emotion: 'HAPPY',
    createdAt: '2024-08-12T00:00:00.000Z',
  },
  {
    id: 9094,
    userId: 760,
    emotion: 'MOVED',
    createdAt: '2024-08-27T00:00:00.000Z',
  },
];

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
            <EmotionCalender initialSelectedEmotion={MockData2} />
          </div>
          <div className="mt-8">
            <h2 className="text-left text-xl">감정 차트</h2>
            <EmotionChart initialSelectedEmotion={MockData2} />
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
