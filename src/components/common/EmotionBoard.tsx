'use client';

import React, { useState } from 'react';
import EmotionEmoji from './EmotionEmoji';

const emotions = ['감동', '기쁨', '고민', '슬픔', '분노'] as const;

const EmotionBoard: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  return (
    <div className="flex justify-center gap-[16px] p-4">
      {emotions.map((emotion) => (
        <EmotionEmoji
          key={emotion}
          emotion={emotion}
          isSelected={selectedEmotion === emotion}
          onClick={() => setSelectedEmotion(emotion)}
        />
      ))}
    </div>
  );
};

export default EmotionBoard;
