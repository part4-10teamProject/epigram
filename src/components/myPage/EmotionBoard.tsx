'use client';

import React from 'react';
import EmotionEmoji from './EmotionEmoji';
import { useQuery } from '@tanstack/react-query';
import { getMyEmotion } from '@/api/client/getMyEmotion';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

const emotions = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'] as const;

const EmotionBoard = () => {
  const { userInfo } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ['MyEmotion'],
    queryFn: () => getMyEmotion(userInfo.id),
    enabled: !!userInfo,
  });

  //날짜변환
  const dateObject = new Date(userInfo?.updatedAt);
  const year = dateObject.getUTCFullYear();
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getUTCDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  if (isLoading) return <LoadingSpinner />;
  if (!data)
    return (
      <div className="flex h-[134px] items-center justify-center text-2xl font-semibold md:h-[146px] xl:h-[216px]">
        오늘의 감정을 선택해주세요
      </div>
    );

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-row justify-between">
        <div className="text-xl font-semibold xl:text-[24px] xl:leading-8">
          오늘의 감정
        </div>
        <div className="text-xl text-blue-400 xl:text-2xl">{today}</div>
      </div>

      <div className="mx-auto flex w-[312px] items-center justify-between md:w-[352px] xl:w-[544px]">
        {emotions.map((emotion) => (
          <EmotionEmoji
            key={emotion}
            emotion={emotion}
            isSelected={data?.emotion === emotion}
          />
        ))}
      </div>
    </div>
  );
};

export default EmotionBoard;
