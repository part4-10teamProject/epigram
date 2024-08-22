'use client';

<<<<<<< HEAD
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
<<<<<<< HEAD
};
//감정보드에 한글로 표기
const emotionKorean = {
  MOVED: '감동',
  HAPPY: '기쁨',
  WORRIED: '고민',
  SAD: '슬픔',
  ANGRY: '분노',
=======
>>>>>>> 781eac8 (🐛 용인님 리뷰수정작업)
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
    <div className="flex flex-col items-center">
      <div //Button 없앰
        className={`flex h-[56px] w-[56px] items-center justify-center rounded-2xl border-[3px] md:h-[64px] md:w-[64px] md:border-[3px] xl:h-[96px] xl:w-[96px] xl:border-[4px] ${
          isSelected ? `${emotionColors[emotion]}` : 'border-transparent'
        } ${isSelected ? 'text-current' : 'text-gray-400'} ${
          isSelected ? '' : 'bg-[#AFBACD26] opacity-75 hover:bg-gray-200'
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
      </div>
      <div
        className={`mt-1 text-center text-sm md:text-base xl:text-lg ${isSelected ? '' : 'text-gray-400'}`}
      >
        {emotionKorean[emotion]}
      </div>
    </div>
=======
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
>>>>>>> b561718 (✨ Component feat)
  );
};

export default EmotionIcon;
