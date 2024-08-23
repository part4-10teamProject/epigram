'use client';

import 'chart.js/auto'; //Chart.js 라이브러리 자동 임포트
import moment from 'moment'; //날짜&시간 다루는 Moment.js 라이브러리 임포트
import Image from 'next/image'; //next.js의 최적화 이미지 컴포넌트
import React, { useEffect, useState } from 'react'; //React 훅 사용
import Calendar from 'react-calendar'; //react-calender 컴포넌트 임포트
import 'react-calendar/dist/Calendar.css'; //Calender 컴포넌트의 css
import { Doughnut } from 'react-chartjs-2'; //Chart.js의 도넛차트 컴포넌트 임포트
import angryIcon from '../../../public/assets/icons/emotion/logo_angry.svg';
import heartIcon from '../../../public/assets/icons/emotion/logo_heart.svg';
import sadIcon from '../../../public/assets/icons/emotion/logo_sad.svg';
import smileIcon from '../../../public/assets/icons/emotion/logo_smiling.svg';
import thinkIcon from '../../../public/assets/icons/emotion/logo_thinking.svg';
import './calendarCustom.css'; //캘린더는 따로 커스텀 스타일링 css

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
  //감정데이터를 상태로 관리
  const [emotionData, setEmotionData] = useState<Record<Emotion, number>>({
    MOVED: 0,
    HAPPY: 0,
    WORRIED: 0,
    SAD: 0,
    ANGRY: 0,
  });
  //총 감정 수를 상태로 관리
  const [totalEmotions, setTotalEmotions] = useState<number>(0);
  //사용자가 선택한 감정을 상태로 관리
  const [selectedChartEmotion, setSelectedChartEmotion] =
    useState<Emotion | null>(null);

  //초기 감정 데이터를 바탕으로 상태 업데이트
  useEffect(() => {
    const updatedEmotionData: Record<Emotion, number> = {
      MOVED: 0,
      HAPPY: 0,
      WORRIED: 0,
      SAD: 0,
      ANGRY: 0,
    };

    initialSelectedEmotion.forEach((data: CalenderData) => {
      const emotion = data.emotion as Emotion;
      updatedEmotionData[emotion] += 1;
    });

    setEmotionData(updatedEmotionData); // 업데이트된 데이터를 상태로 설정

    // 총 감정 수 계산해서 상태로 설정
    const total = Object.values(updatedEmotionData).reduce(
      (sum, value) => sum + value,
      0,
    );
    setTotalEmotions(total);
  }, [initialSelectedEmotion]);

  //도넛차트에 사용할 데이터 정의
  const chartData = {
    labels: Object.keys(emotionData) as Emotion[],
    datasets: [
      {
        data: Object.values(emotionData),
        backgroundColor: Object.keys(emotionColors).map(
          (emotion) => emotionColors[emotion as Emotion],
        ),
      },
    ],
  };

  //도넛 차트 옵션 정의
  const chartOptions = {
    cutout: '90%', //가운데 구멍 크기
    plugins: {
      legend: {
        display: false, //차트의 범레 숨김(자동으로 보여지므로)
      },
    },
  };

  // 감정클릭 시, 선택된 감정을 상태로 설정하는 핸들러
  const handleEmotionClick = (emotion: Emotion) => {
    setSelectedChartEmotion(emotion);
  };

  return (
    //캘린더 페이지 중앙위치 컨테이너
    <div className="flex min-h-screen items-center justify-center">
      <div className="calendar-container flex w-[312px] flex-col items-center justify-center p-4 text-black-900 md:w-[384px] xl:w-[640px]">
        <Calendar
          locale={LOCALE}
          prev2Label={null} //2번째 이전 버튼 숨김
          next2Label={null} //2번째 다음 버튼 숨김
          value={new Date()} //캘린더에 표시할 초기 날짜
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
          formatDay={(locale, date) => moment(date).format('D')} //날짜 포맷 정의
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
          className="custom-calendar text-black w-full max-w-md rounded-lg bg-white"
        />
        {/* 도넛차트 & 감정리스트 컨테이너 */}
        <div className="mt-8 flex w-[312px] max-w-md items-center justify-center space-x-8 md:w-[384px] xl:w-[640px]">
          <div className="relative h-60 w-60">
            <Doughnut data={chartData} options={chartOptions} />{' '}
            {/* 도넛 차트 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* 선택된 감정이 있을 때 아이콘&라벨 표시 */}
              {selectedChartEmotion && (
                <>
                  <Image
                    src={emotions[selectedChartEmotion]}
                    alt={selectedChartEmotion}
                    width={50}
                    height={50}
                  />
                  <span className="mt-2 text-lg font-bold">
                    {emotionLabels[selectedChartEmotion]}{' '}
                    {/* 도넛차트 감정명 한글로 표기 */}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            {/* 감정 리스트를 순회하면서 각각의 감정 퍼센티지를 표시 */}
            {Object.keys(emotionData).map((emotionKey) => {
              const count = emotionData[emotionKey as Emotion];
              const percentage =
                totalEmotions > 0
                  ? ((count / totalEmotions) * 100).toFixed(1)
                  : 0;
              return (
                <div
                  key={emotionKey}
                  className={`flex cursor-pointer items-center space-x-2 transition-colors duration-200 ${
                    selectedChartEmotion === emotionKey
                      ? 'text-black' //선택된 감정
                      : selectedChartEmotion
                        ? 'text-gray-400'
                        : 'hover:text-blue-500' //그 외 나머지 감정들
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
                  <span className="text-sm font-bold">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionCalendar;
