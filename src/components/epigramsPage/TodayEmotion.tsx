'use client';
import { useEffect, useState } from 'react';
import TodayEmoji from './TodayEmoji';
import { todayEmotionPost } from '@/api/client/todayEmotionPost';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface TodayEmotionItem {
  emotion: string;
}

const emotions = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'] as const;

const TodayEmotion = () => {
  const [isVisible, setIsVisible] = useState(true); // 화면 렌더링 여부
  const [isLoading, setIsLoading] = useState(true); // 로딩화면여부

  const emotionPostMutaion = useMutation({
    mutationFn: (emoji: TodayEmotionItem) => todayEmotionPost(emoji),
    onSuccess: () => Cookies.set('isTodayEmotion', 'ture', { expires: 1 }),
    onError: (error) => console.error(error),
  });

  const handlePostMutation = (emoji: string) => {
    const content = { emotion: emoji };
    emotionPostMutaion.mutate(content);
    setIsVisible(false);
  };

  useEffect(() => {
    const localData = Cookies.get('isTodayEmotion');
    if (localData) {
      setIsVisible(false);
      setIsLoading(false);
    } else {
      setIsVisible(true);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!isVisible) return null;

  return (
    <div className="flex flex-col gap-[20px] xl:gap-[40px]">
      <h1 className="text-xl font-semibold xl:text-[24px] xl:leading-8">
        오늘의 감정은 어떤가요?!!
      </h1>
      <div className="flex justify-center gap-[16px] p-4">
        {emotions.map((emotion) => (
          <TodayEmoji
            key={emotion}
            emotion={emotion}
            onClick={() => handlePostMutation(emotion)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayEmotion;
