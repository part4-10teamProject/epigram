'use client';

import updateUserProfile from '@/api/client/updateUserProfile';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import EmotionBoard from '../../components/myPage/EmotionBoard';
import EmotionCalender from '../../components/myPage/EmotionCalender';
import EmotionChart from '../../components/myPage/EmotionChart';
import MyCommentList from '../../components/myPage/MyCommentList';
import MyEpigramList from '../../components/myPage/MyEpigramList';
import MyProfile from '../../components/myPage/MyProfile';

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

const defaultImg = 'https://picsum.photos/600/400'; // 기본 이미지 URL

const MyPage: React.FC = () => {
  const { userInfo, logout } = useAuth(); // useAuth를 사용하여 userInfo와 logout 함수를 가져옴

  const userImg = userInfo?.image ?? defaultImg; // userInfo.image가 null인 경우 defaultImg 사용

  // activeTab 상태 설정
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

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      logout(); // useAuth에서 제공하는 logout 함수 호출
      window.location.href = '/login';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 문제가 발생했습니다.');
    }
  };

  const handleProfileUpdate = (image: string, nickname: string) => {
    const updatedProfile = {
      image: image,
      nickname: nickname,
    };
    mutation.mutate(updatedProfile);
  };

  const handleImageChange = (newImageUrl: string) => {
    // 프로필 이미지 업데이트 상태를 유지하는 로직을 여기에 추가할 수 있습니다.
    console.log('이미지 업데이트됨:', newImageUrl);
    // 예: local state 업데이트 등
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="relative w-full rounded-[24px] bg-white p-8 shadow-lg">
          <MyProfile
            name={userInfo?.nickname || '기본닉네임'} // 변경된 닉네임 보여줌
            imageUrl={userImg} // 변경된 이미지 URL 또는 기본 이미지 보여줌
            onLogout={handleLogout}
            onImageChange={handleImageChange} // onImageChange 함수 전달
            onProfileUpdate={handleProfileUpdate} // 프로필 업데이트 함수 전달
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
