'use client';

import Image from 'next/image';
import React from 'react';
import angryIcon from '../../../public/assets/icons/emotion/logo_angry.svg';
import heartIcon from '../../../public/assets/icons/emotion/logo_heart.svg';
import sadIcon from '../../../public/assets/icons/emotion/logo_sad.svg';
import smileIcon from '../../../public/assets/icons/emotion/logo_smiling.svg';
import thinkIcon from '../../../public/assets/icons/emotion/logo_thinking.svg';

interface EmotionIconProps {
  emotion: '감동' | '기쁨' | '고민' | '슬픔' | '분노';
  isSelected: boolean;
  onClick: () => void;
}

const emotionColors = {
  감동: 'border-[#FBC85B]',
  기쁨: 'border-[#48BB98]',
  고민: 'border-[#8E80E3]',
  슬픔: 'border-[#5195EE]',
  분노: 'border-[#E46E80]',
};

const EmotionIcon: React.FC<EmotionIconProps> = ({
  emotion,
  isSelected,
  onClick,
}) => {
  let emotionIconSrc;
  switch (emotion) {
    case '감동':
      emotionIconSrc = heartIcon;
      break;
    case '기쁨':
      emotionIconSrc = smileIcon;
      break;
    case '고민':
      emotionIconSrc = thinkIcon;
      break;
    case '슬픔':
      emotionIconSrc = sadIcon;
      break;
    case '분노':
      emotionIconSrc = angryIcon;
      break;
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={`flex h-[56px] w-[56px] items-center justify-center rounded-2xl border-[3px] md:h-[64px] md:w-[64px] md:border-[3px] xl:h-[96px] xl:w-[96px] xl:border-[4px] ${
          isSelected ? `${emotionColors[emotion]}` : 'border-transparent'
        } ${isSelected ? 'text-current' : 'text-gray-400'} ${
          isSelected ? '' : 'bg-gray-500 opacity-75 hover:bg-gray-200'
        } overflow-hidden`}
      >
        <div
          className={`text-3xl md:text-4xl xl:text-5xl ${isSelected ? '' : 'grayscale filter'}`}
        >
          <Image
            className="h-[32px] w-[32px] md:h-[32px] md:w-[32px] xl:h-[48px] xl:w-[48px]"
            alt="EmojiIcon"
            src={emotionIconSrc}
          />
        </div>
      </button>
      <div
        className={`mt-1 text-center text-sm md:text-base xl:text-lg ${isSelected ? '' : 'text-gray-400'}`}
      >
        {emotion}
      </div>
    </div>
  );
};

export default EmotionIcon;
