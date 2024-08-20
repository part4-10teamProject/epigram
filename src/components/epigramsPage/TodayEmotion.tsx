'use client';
import { useEffect, useState } from 'react';
import TodayEmoji from './TodayEmoji';
import { todayEmotionPost } from '@/api/client/todayEmotionPost';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

interface TodayEmotionItem {
  emotion: string;
}

const emotions = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'] as const;

const TodayEmotion = () => {
  const [isVisible, setIsVisible] = useState(true); // 화면 렌더링 여부

  const emotionPostMutaion = useMutation({
    mutationFn: (emoji: TodayEmotionItem) => todayEmotionPost(emoji),
    onSuccess: () => Cookies.set('isTodayEmotion', 'ture', { expires: 1 }), // 데이터 요청을 성공하면 쿠키에 isTodayEmotion 키값으로 true를 저장함
    onError: (error) => console.error(error),
  });

  const handlePostMutation = (emoji: string) => {
    const content = { emotion: emoji };
    emotionPostMutaion.mutate(content);
    setIsVisible(false);
  };

  useEffect(() => {
    const localData = Cookies.get('isTodayEmotion'); // 화면이 처음 렌더링되어질 때 쿠키에 isTodayEmotion 키값을 가져온다
    if (localData) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

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
