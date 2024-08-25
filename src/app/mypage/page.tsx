'use client';

import updateUserProfile from '@/api/client/updateUserProfile';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import EmotionBoard from '../../components/myPage/EmotionBoard';
import EmotionCalender from '../../components/myPage/EmotionCalender';
import EmotionChart from '../../components/myPage/EmotionChart';
import MyCommentList from '../../components/myPage/MyCommentList';
import MyEpigramList from '../../components/myPage/MyEpigramList';
import MyProfile from '../mypage/MyProfile';

const MockData1 = {
  id: 9184,
  userId: 760,
  emotion: 'HAPPY',
  createdAt: '2024-08-13T00:00:00.000Z',
};

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
  const [profileImage, setProfileImage] = useState(
    'https://picsum.photos/600/400',
  );

  const [activeTab, setActiveTab] = useState<'epigram' | 'comment'>('epigram');

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      alert('프로필이 성공적으로 업데이트되었습니다!');
    },
    onError: (error: AxiosError) => {
      alert(`업데이트 실패: ${error.message}`);
    },
  });

  const handleLogout = () => {
    alert('로그아웃되었습니다.');
  };

  const handleImageChange = (newImageUrl: string) => {
    setProfileImage(newImageUrl);
  };

  const handleProfileUpdate = () => {
    const updatedProfile = {
      image: profileImage, // 현재 프로필 이미지
      nickname: '김코드', // 실제로는 사용자 입력 또는 상태에서 가져온 값
    };
    mutation.mutate(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="relative w-full rounded-[24px] bg-white p-8 shadow-lg">
          <MyProfile
            name="김코드"
            imageUrl={profileImage}
            onLogout={handleLogout}
            onImageChange={handleImageChange}
            onProfileUpdate={handleProfileUpdate} // 프로필 업데이트 함수 추가
          />
          <div className="mt-8 flex justify-center">
            <h2 className="text-left text-xl">오늘의 감정</h2>
            <EmotionBoard emotionData={MockData1} />
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
