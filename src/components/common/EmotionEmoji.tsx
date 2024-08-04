'use client';

import React from 'react';

/*import heartIcon from '../../../public/assets/icons/emotion/logo_heart.svg';
import smileIcon from '../../../public/assets/icons/emotion/logo_smiling.svg';
import thinkIcon from '../../../public/assets/icons/emotion/logo_thinking.svg';
import sadIcon from '../../../public/assets/icons/emotion/logo_sad.svg';
import angryIcon from '../../../public/assets/icons/emotion/logo_angry.svg';*/

interface EmotionIconProps {
  emotion: '감동' | '기쁨' | '고민' | '슬픔' | '분노';
  isSelected: boolean;
  onClick: () => void;
}

const emotionIcons = {
  감동: '😍',
  기쁨: '😊',
  고민: '🤔',
  슬픔: '😢',
  분노: '😡',
};

const emotionColors = {
  감동: 'border-yellow-400',
  기쁨: 'border-green-400',
  고민: 'border-purple-400',
  슬픔: 'border-blue-400',
  분노: 'border-red-400',
};

const EmotionIcon: React.FC<EmotionIconProps> = ({
  emotion,
  isSelected,
  onClick,
}) => {
  //미선택 시, 아이콘&텍스트 회색필터 적용
  return (
    <button
      onClick={onClick}
      className={`flex h-16 w-16 flex-col items-center justify-center rounded-2xl border-4 p-4 md:p-4 xl:p-4 ${
        isSelected ? `${emotionColors[emotion]}` : 'border-transparent'
      } ${isSelected ? 'text-current' : 'text-gray-400'} md:w-19 md:h-19 overflow-hidden xl:h-24 xl:w-24`}
    >
      <div
        className={`text-3xl md:text-4xl xl:text-5xl ${isSelected ? '' : 'grayscale filter'}`}
      >
        {emotionIcons[emotion]}
      </div>
      <div
        className={`mt-1 text-sm md:text-base xl:text-lg ${isSelected ? '' : 'text-gray-400'}`}
      >
        {emotion}
      </div>
    </button>
  );
};

export default EmotionIcon;
