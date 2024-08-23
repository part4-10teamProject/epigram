'use client';

import moment from 'moment'; //날짜&시간 다루는 Moment.js 라이브러리 임포트
import Image from 'next/image'; //next.js의 최적화 이미지 컴포넌트
import React from 'react';
import Calendar from 'react-calendar'; //react-calender 컴포넌트 임포트
import 'react-calendar/dist/Calendar.css'; //Calender 컴포넌트의 css
import angryIcon from '../../../public/assets/icons/emotion/logo_angry.svg';
import heartIcon from '../../../public/assets/icons/emotion/logo_heart.svg';
import sadIcon from '../../../public/assets/icons/emotion/logo_sad.svg';
import smileIcon from '../../../public/assets/icons/emotion/logo_smiling.svg';
import thinkIcon from '../../../public/assets/icons/emotion/logo_thinking.svg';
import '../myPage/calendarCustom.css'; //캘린더는 따로 커스텀 스타일링 css

//감정유형 정의하는 타입(Swagger는 영어이므로)
type Emotion = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';
//감정별 아이콘 매핑
const emotions: Record<Emotion, string> = {
  MOVED: heartIcon.src,
  HAPPY: smileIcon.src,
  WORRIED: thinkIcon.src,
  SAD: sadIcon.src,
  ANGRY: angryIcon.src,
};
//감정별 색상 매핑
const emotionColors: Record<Emotion, string> = {
  MOVED: '#FBC85B',
  HAPPY: '#48BB98',
  WORRIED: '#8E80E3',
  SAD: '#5195EE',
  ANGRY: '#E46E80',
};
//감정별 한글라벨(웹표기 위함)
const emotionLabels: Record<Emotion, string> = {
  MOVED: '감동',
  HAPPY: '기쁨',
  WORRIED: '고민',
  SAD: '슬픔',
  ANGRY: '분노',
};
//서버에서 받아온 캘린더 데이터의 타입 정의
interface CalenderData {
  createdAt: string; //감정기록된 날짜
  emotion: string; //감정유형
  userId: number; //사용자 ID
  id: number; //기록 ID
}
//컴포넌트에 전달된 프롭 타입 정의
type EmotionCalendarProps = {
  initialSelectedEmotion: CalenderData[];
};

const LOCALE = 'ko'; //캘린더 언어설정(한국어)

//EmotionCalender 컴포넌트 정의
const EmotionCalendar: React.FC<EmotionCalendarProps> = ({
  initialSelectedEmotion,
}) => {
  //날짜별로 감정 매핑
  const selectedEmotion: Record<string, Emotion> = {};
  initialSelectedEmotion.forEach((data: CalenderData) => {
    const dateKey = moment(data.createdAt).format('YYYY-MM-DD');
    selectedEmotion[dateKey] = data.emotion as Emotion;
  });
  return (
    <div className="flex items-center justify-center">
      <div className="calendar-container flex w-[312px] flex-col items-center justify-center p-4 text-black-900 md:w-[384px] xl:w-[640px]">
        <Calendar
          locale={LOCALE}
          prev2Label={null}
          next2Label={null}
          value={new Date()}
          prevLabel={
            <Image
              src="/assets/icons/chevron_left.svg"
              alt="왼쪽 화살표"
              width={20}
              height={20}
            />
          }
          nextLabel={
            <Image
              src="/assets/icons/chevron_right.svg"
              alt="오른쪽 화살표"
              width={20}
              height={20}
            />
          }
          formatDay={(locale, date) => moment(date).format('D')}
          tileClassName={({ date, view }) =>
            view === 'month' &&
            selectedEmotion[moment(date).format('YYYY-MM-DD')]
              ? 'emotion-day'
              : null
          }
          tileContent={({ date, view }) =>
            view === 'month' &&
            selectedEmotion[moment(date).format('YYYY-MM-DD')] ? (
              <Image
                src={
                  emotions[selectedEmotion[moment(date).format('YYYY-MM-DD')]]
                }
                alt="Emotion Icon"
                width={24}
                height={24}
              />
            ) : null
          }
          className="custom-calendar text-black w-full rounded-lg bg-white"
        />
      </div>
    </div>
  );
};

export default EmotionCalendar;
