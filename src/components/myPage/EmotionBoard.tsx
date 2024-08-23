'use client';

import React, { useEffect, useState } from 'react';
import EmotionEmoji from './EmotionEmoji';

const emotions = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'] as const;

interface EmotionData {
  createdAt: string;
  emotion: string;
  userId: number;
  id: number;
}

interface EmotionBoardProps {
  emotionData?: EmotionData; // emotionData가 있을수도 없을수도
}

const EmotionBoard: React.FC<EmotionBoardProps> = ({ emotionData }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  useEffect(() => {
    if (emotionData) {
      setSelectedEmotion(emotionData.emotion);
    }
  }, [emotionData]);

  return (
    <div className="[ flex flex-col items-center justify-center">
      <div className="justfiy-center flex w-[312px] items-center gap-[16px] p-4 md:w-[384px] xl:w-[640px]">
        {emotions.map((emotion) => (
          <EmotionEmoji
            key={emotion}
            emotion={emotion}
            isSelected={selectedEmotion === emotion}
          />
        ))}
      </div>
      {!selectedEmotion && <p className="text-red-400">선택을 해주세요</p>}
    </div>
  );
};

export default EmotionBoard;
