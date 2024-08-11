'use client';

import 'chart.js/auto';
import Image from 'next/image';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './calendarCustom.css';
import { Doughnut } from 'react-chartjs-2';
import angryIcon from '../../../public/assets/icons/emotion/logo_angry.svg';
import heartIcon from '../../../public/assets/icons/emotion/logo_heart.svg';
import sadIcon from '../../../public/assets/icons/emotion/logo_sad.svg';
import smileIcon from '../../../public/assets/icons/emotion/logo_smiling.svg';
import thinkIcon from '../../../public/assets/icons/emotion/logo_thinking.svg';

// 감정 Icon 타입 정의
type Emotion = '감동' | '기쁨' | '고민' | '슬픔' | '분노';
// 감정 Icon svg파일
const emotions: Record<Emotion, string> = {
  감동: heartIcon.src,
  기쁨: smileIcon.src,
  고민: thinkIcon.src,
  슬픔: sadIcon.src,
  분노: angryIcon.src,
};
// 감정별 color 정의
const emotionColors: Record<Emotion, string> = {
  감동: '#FBC85B',
  기쁨: '#48BB98',
  고민: '#8E80E3',
  슬픔: '#5195EE',
  분노: '#E46E80',
};

// 초기 감정데이터 임의설정 - 캘린더
const initialSelectedEmotion: Record<string, Emotion> = {
  '2024-08-01': '감동',
  '2024-08-02': '기쁨',
  '2024-08-03': '고민',
  '2024-08-04': '슬픔',
  '2024-08-05': '분노',
};
// 감정별 초기 데이터값 임의설정 - 도넛차트
const initialEmotionData: Record<Emotion, number> = {
  감동: 35,
  기쁨: 20,
  고민: 9,
  슬픔: 17,
  분노: 19,
};

const LOCALE = 'ko';

//EmotionCalender 컴포넌트 정의
const EmotionCalendar: React.FC = () => {
  // 선택된감정 상태 관리
  const [selectedEmotion] = useState<Record<string, Emotion>>(
    initialSelectedEmotion,
  );
  // 감정데이터 상태 관리
  const [emotionData] = useState<Record<Emotion, number>>(initialEmotionData);
  // 차트 데이터 설정
  const chartData = {
    labels: Object.keys(emotionData) as Emotion[], // 감정의 레이블(차트조각의 범주) 설정
    datasets: [
      {
        data: Object.values(emotionData), // 감정별 데이터 값 설정
        backgroundColor: Object.keys(emotionColors).map(
          (emotion) => emotionColors[emotion as Emotion], // 감정별 색상 설정
        ),
      },
    ],
  };

  return (
    <div className="calendar-container flex flex-col items-center p-4 text-black-900">
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
          view === 'month' && selectedEmotion[date.toISOString().slice(0, 10)]
            ? 'emotion-day'
            : null
        }
        tileContent={({ date, view }) =>
          //월 형태로 띄움 & 감정Icon 표시
          view === 'month' &&
          selectedEmotion[date.toISOString().slice(0, 10)] ? (
            <Image
              // 감정Icon svg로 표시
              src={emotions[selectedEmotion[date.toISOString().slice(0, 10)]]}
              alt="Emotion Icon"
              width={24}
              height={24}
            />
          ) : null
        }
        className="custom-calendar text-black w-full max-w-md rounded-lg bg-white"
      />
      <div className="mt-8 w-full max-w-md">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default EmotionCalendar;
