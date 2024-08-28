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

  // 차트 데이터를 준비합니다.
  const chartData = {
    labels: Object.keys(emotionData) as Emotion[],
    datasets: [
      {
        data: totalEmotions > 0 ? Object.values(emotionData) : [1], // 데이터가 없을 경우 1을 넣어 빈 차트를 만듭니다.
        backgroundColor:
          totalEmotions > 0
            ? Object.keys(emotionColors).map(
                (emotion) => emotionColors[emotion as Emotion],
              )
            : ['#f0f0f0'], // 데이터가 없을 경우 빈 차트의 색상을 설정합니다.
      },
    ],
  };

  const chartOptions = {
    cutout: '90%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: totalEmotions > 0, // 데이터가 없을 경우 툴팁 비활성화
      },
    },
  };

  const handleEmotionClick = (emotion: Emotion) => {
    if (totalEmotions > 0) {
      setSelectedChartEmotion(emotion);
    }
  };

  return (
    <div className="mt-8 flex w-[235px] items-center justify-between md:w-[263px] xl:w-[416px]">
      <div className="w-[120 px] relative h-[120px] xl:h-[180px] xl:w-[180px]">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {totalEmotions > 0 && selectedChartEmotion && (
            <>
              <div className="relative h-[24px] w-[24px] xl:h-[40px] xl:w-[40px]">
                <Image
                  src={emotions[selectedChartEmotion]}
                  alt={selectedChartEmotion}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span className="mt-2 text-lg font-bold">
                {emotionLabels[selectedChartEmotion]}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[10px] xl:gap-[14px]">
        {Object.keys(emotionData).map((emotionKey) => {
          const count = emotionData[emotionKey as Emotion];
          const percentage =
            totalEmotions > 0 ? ((count / totalEmotions) * 100).toFixed(1) : 0;
          return (
            <div
              key={emotionKey}
              className={`flex cursor-pointer items-center space-x-2 transition-colors duration-200 ${
                selectedChartEmotion === emotionKey
                  ? 'text-black'
                  : selectedChartEmotion
                    ? 'text-gray-400'
                    : 'hover:text-blue-500'
              }`}
              onClick={() => handleEmotionClick(emotionKey as Emotion)}
            >
              <div
                className="h-2 w-2 flex-shrink-0 rounded-sm xl:h-4 xl:w-4"
                style={{
                  backgroundColor: emotionColors[emotionKey as Emotion],
                }}
              />
              <div className="relative h-4 w-4 xl:h-6 xl:w-6">
                <Image
                  src={emotions[emotionKey as Emotion]}
                  alt={emotionKey}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span className="text-sm font-semibold xl:text-2xl">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionChart;
