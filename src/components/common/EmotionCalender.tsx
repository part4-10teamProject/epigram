'use client';

import 'chart.js/auto';
import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Doughnut } from 'react-chartjs-2';
import angryIcon from '../../../public/assets/icons/emotion/logo_angry.svg';
import heartIcon from '../../../public/assets/icons/emotion/logo_heart.svg';
import sadIcon from '../../../public/assets/icons/emotion/logo_sad.svg';
import smileIcon from '../../../public/assets/icons/emotion/logo_smiling.svg';
import thinkIcon from '../../../public/assets/icons/emotion/logo_thinking.svg';
import './calendarCustom.css';

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

// 초기 감정 데이터 임의 설정 - 캘린더
const initialSelectedEmotion: Record<string, Emotion> = {
  '2024-08-01': '감동',
  '2024-08-02': '기쁨',
  '2024-08-03': '고민',
  '2024-08-04': '슬픔',
  '2024-08-05': '분노',
};

// 감정별 초기 데이터 값 임의 설정 - 도넛 차트
const initialEmotionData: Record<Emotion, number> = {
  감동: 35,
  기쁨: 20,
  고민: 9,
  슬픔: 17,
  분노: 19,
};

const LOCALE = 'ko'; // 언어: 한국어

// EmotionCalendar 컴포넌트 정의
const EmotionCalendar: React.FC = () => {
  // 선택된 감정 상태 관리
  const [selectedEmotion] = useState<Record<string, Emotion>>(
    initialSelectedEmotion,
  );

  // 감정 데이터 상태 관리
  const [emotionData] = useState<Record<Emotion, number>>(initialEmotionData);

  // 선택된 감정을 표시하기 위한 상태
  const [selectedChartEmotion, setSelectedChartEmotion] =
    useState<Emotion | null>(null);

  // 차트 데이터 설정
  const chartData = {
    labels: Object.keys(emotionData) as Emotion[], // 감정의 레이블(차트 조각의 범주) 설정
    datasets: [
      {
        data: Object.values(emotionData), // 감정별 데이터 값 설정
        backgroundColor: Object.keys(emotionColors).map(
          (emotion) => emotionColors[emotion as Emotion], // 감정별 색상 설정
        ),
      },
    ],
  };

  // 범례를 숨기기 위한 옵션 설정
  const chartOptions = {
    cutout: '90%',
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
    },
  };

  // 감정 목록을 클릭했을 때 호출되는 함수
  const handleEmotionClick = (emotion: Emotion) => {
    setSelectedChartEmotion(emotion);
  };

  return (
    <div className="calendar-container flex flex-col items-center p-4 text-black-900">
      <Calendar
        locale={LOCALE}
        prev2Label={null} //이전 2달 버튼 숨기기
        next2Label={null} //다음 2달 버튼 숨기기
        value={new Date()} //현재날짜를 기본값
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
          // 월 형태로 띄움 & 감정 Icon 표시
          view === 'month' &&
          selectedEmotion[date.toISOString().slice(0, 10)] ? (
            <Image
              // 감정 Icon svg로 표시
              src={emotions[selectedEmotion[date.toISOString().slice(0, 10)]]}
              alt="Emotion Icon"
              width={24}
              height={24}
            />
          ) : null
        }
        className="custom-calendar text-black w-full max-w-md rounded-lg bg-white"
      />
      <div className="mt-8 flex w-full max-w-md items-center justify-center space-x-8">
        <div className="relative h-60 w-60">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {selectedChartEmotion && (
              <>
                <Image
                  src={emotions[selectedChartEmotion]}
                  alt={selectedChartEmotion}
                  width={40}
                  height={40}
                />
                <span className="mt-2 text-lg font-bold">
                  {selectedChartEmotion}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {/* 차트 옆 감정 목록 */}
          {Object.keys(emotionData).map((emotionKey) => (
            <div
              key={emotionKey}
              className={`flex cursor-pointer items-center space-x-2 transition-colors duration-200 ${
                selectedChartEmotion === emotionKey
                  ? 'text-black' // 선택된 항목: black로 표시
                  : selectedChartEmotion
                    ? 'text-gray-400' // 선택X 항목: gray로 표시
                    : 'hover:text-blue-500' // Hover시 색상 변경
              }`}
              onClick={() => handleEmotionClick(emotionKey as Emotion)}
            >
              <div
                className="h-4 w-4 rounded-sm"
                style={{
                  backgroundColor: emotionColors[emotionKey as Emotion],
                }}
              />
              <Image
                src={emotions[emotionKey as Emotion]}
                alt={emotionKey}
                width={24}
                height={24}
              />
              <span className="text-sm font-bold">
                {emotionData[emotionKey as Emotion]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionCalendar;
