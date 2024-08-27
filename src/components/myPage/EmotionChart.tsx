'use client';

import 'chart.js/auto'; // Chart.js 라이브러리 자동 임포트
import Image from 'next/image'; // next.js의 최적화 이미지 컴포넌트
import React, { useEffect, useState } from 'react'; // React 훅 사용
import { Doughnut } from 'react-chartjs-2'; // Chart.js의 도넛차트 컴포넌트 임포트

type Emotion = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

const emotions: Record<Emotion, string> = {
  MOVED: '/assets/icons/emotion/logo_heart.svg',
  HAPPY: '/assets/icons/emotion/logo_smiling.svg',
  WORRIED: '/assets/icons/emotion/logo_thinking.svg',
  SAD: '/assets/icons/emotion/logo_sad.svg',
  ANGRY: '/assets/icons/emotion/logo_angry.svg',
};

const emotionColors: Record<Emotion, string> = {
  MOVED: '#FBC85B',
  HAPPY: '#48BB98',
  WORRIED: '#8E80E3',
  SAD: '#5195EE',
  ANGRY: '#E46E80',
};

const emotionLabels: Record<Emotion, string> = {
  MOVED: '감동',
  HAPPY: '기쁨',
  WORRIED: '고민',
  SAD: '슬픔',
  ANGRY: '분노',
};

interface CalenderData {
  createdAt: string;
  emotion: string;
  userId: number;
  id: number;
}

type EmotionChartProps = {
  initialSelectedEmotion: CalenderData[];
};

const EmotionChart: React.FC<EmotionChartProps> = ({
  initialSelectedEmotion,
}) => {
  const [emotionData, setEmotionData] = useState<Record<Emotion, number>>({
    MOVED: 0,
    HAPPY: 0,
    WORRIED: 0,
    SAD: 0,
    ANGRY: 0,
  });

  const [totalEmotions, setTotalEmotions] = useState<number>(0);
  const [selectedChartEmotion, setSelectedChartEmotion] =
    useState<Emotion | null>(null);

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

    setEmotionData(updatedEmotionData);

    const total = Object.values(updatedEmotionData).reduce(
      (sum, value) => sum + value,
      0,
    );
    setTotalEmotions(total);
  }, [initialSelectedEmotion]);

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

  const chartOptions = {
    cutout: '90%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleEmotionClick = (emotion: Emotion) => {
    setSelectedChartEmotion(emotion);
  };

  return (
    // 도넛차트 & 감정리스트 컨테이너
    <div>
      <div className="text-xl font-semibold xl:text-[24px] xl:leading-8">
        감정차트
      </div>
      <div className="mt-8 flex w-[312px] items-center justify-center space-x-8 md:w-[384px] xl:w-[640px]">
        <div className="relative h-60 w-60">
          <Doughnut data={chartData} options={chartOptions} />
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
                    ? 'text-black' // 선택된 감정
                    : selectedChartEmotion
                      ? 'text-gray-400'
                      : 'hover:text-blue-500' // 그 외 나머지 감정들
                }`}
                onClick={() => handleEmotionClick(emotionKey as Emotion)}
              >
                <div
                  className="h-4 w-4 flex-shrink-0 rounded-sm"
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
  );
};

export default EmotionChart;
