'use client';

import Image from 'next/image';
import React from 'react';
import movedImg from '../../../public/assets/images/moved.png';
import happyImg from '../../../public/assets/images/haapy.png';
import worriedImg from '../../../public/assets/images/worried.png';
import sadImg from '../../../public/assets/images/sad.png';
import angryImg from '../../../public/assets/images/angry.png';

interface EmotionIconProps {
  emotion: 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';
  onClick: () => void;
}

const emotionColors = {
  MOVED: 'hover:border-[#FBC85B]',
  HAPPY: 'hover:border-[#48BB98]',
  WORRIED: 'hover:border-[#8E80E3]',
  SAD: 'hover:border-[#5195EE]',
  ANGRY: 'hover:border-[#E46E80]',
};

const TodayEmoji: React.FC<EmotionIconProps> = ({ emotion, onClick }) => {
  let emotionIconSrc;
  switch (emotion) {
    case 'MOVED':
      emotionIconSrc = movedImg;
      break;
    case 'HAPPY':
      emotionIconSrc = happyImg;
      break;
    case 'WORRIED':
      emotionIconSrc = worriedImg;
      break;
    case 'SAD':
      emotionIconSrc = sadImg;
      break;
    case 'ANGRY':
      emotionIconSrc = angryImg;
      break;
  }

  let emotionName;
  switch (emotion) {
    case 'MOVED':
      emotionName = '감동';
      break;
    case 'HAPPY':
      emotionName = '기쁨';
      break;
    case 'WORRIED':
      emotionName = '걱정';
      break;
    case 'SAD':
      emotionName = '슬픔';
      break;
    case 'ANGRY':
      emotionName = '화남';
      break;
  }

  return (
    <div className="group flex flex-col items-center">
      <button
        onClick={onClick}
        className={`flex h-[56px] w-[56px] items-center justify-center rounded-2xl md:h-[64px] md:w-[64px] xl:h-[96px] xl:w-[96px] ${emotionColors[emotion]} text-gray-400' overflow-hidden bg-[#AFBACD26] text-current hover:border-[4px] hover:bg-white`}
      >
        <Image
          className="h-[32px] w-[32px] md:h-[32px] md:w-[32px] xl:h-[48px] xl:w-[48px]"
          alt="EmojiIcon"
          src={emotionIconSrc}
        />
      </button>
      <div
        className={`mt-1 text-sm text-gray-400 group-hover:text-black-950 md:text-lg xl:text-2xl`}
      >
        {emotionName}
      </div>
    </div>
  );
};

export default TodayEmoji;
