'use client';

import Image from 'next/image';
import React from 'react';
import angryIcon from '../../../public/assets/icons/emotion/logo_angry.svg';
import heartIcon from '../../../public/assets/icons/emotion/logo_heart.svg';
import sadIcon from '../../../public/assets/icons/emotion/logo_sad.svg';
import smileIcon from '../../../public/assets/icons/emotion/logo_smiling.svg';
import thinkIcon from '../../../public/assets/icons/emotion/logo_thinking.svg';

interface EmotionIconProps {
  emotion: 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';
  isSelected: boolean;
}

const emotionColors = {
  MOVED: 'border-[#FBC85B]',
  HAPPY: 'border-[#48BB98]',
  WORRIED: 'border-[#8E80E3]',
  SAD: 'border-[#5195EE]',
  ANGRY: 'border-[#E46E80]',
};
//감정보드에 한글로 표기
const emotionKorean = {
  MOVED: '감동',
  HAPPY: '기쁨',
  WORRIED: '고민',
  SAD: '슬픔',
  ANGRY: '분노',
};

const EmotionIcon: React.FC<EmotionIconProps> = ({ emotion, isSelected }) => {
  let emotionIconSrc;
  switch (emotion) {
    case 'MOVED':
      emotionIconSrc = heartIcon;
      break;
    case 'HAPPY':
      emotionIconSrc = smileIcon;
      break;
    case 'WORRIED':
      emotionIconSrc = thinkIcon;
      break;
    case 'SAD':
      emotionIconSrc = sadIcon;
      break;
    case 'ANGRY':
      emotionIconSrc = angryIcon;
      break;
  }

  return (
    <div className="mx-auto h-[84px] md:h-[96px] xl:h-[136px]">
      <div
        className={`flex h-[56px] w-[56px] items-center justify-center rounded-2xl border-[3px] md:h-[64px] md:w-[64px] xl:h-[96px] xl:w-[96px] xl:border-[4px] ${isSelected ? `${emotionColors[emotion]} text-current` : 'border-transparent bg-[#AFBACD26] text-gray-400 hover:bg-gray-200'} overflow-hidden`}
      >
        <div className={`text-3xl md:text-4xl xl:text-5xl`}>
          <Image
            className="h-[32px] w-[32px] md:h-[32px] md:w-[32px] xl:h-[48px] xl:w-[48px]"
            alt="EmojiIcon"
            src={emotionIconSrc}
          />
        </div>
      </div>
      <div
        className={`text-center text-sm font-semibold md:text-lg xl:text-2xl ${isSelected ? '' : 'text-gray-400'}`}
      >
        {emotionKorean[emotion]}
      </div>
    </div>
  );
};

export default EmotionIcon;
