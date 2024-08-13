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

type Emotion = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

const emotions: Record<Emotion, string> = {
  MOVED: heartIcon.src,
  HAPPY: smileIcon.src,
  WORRIED: thinkIcon.src,
  SAD: sadIcon.src,
  ANGRY: angryIcon.src,
};

const emotionColors: Record<Emotion, string> = {
  MOVED: '#FBC85B',
  HAPPY: '#48BB98',
  WORRIED: '#8E80E3',
  SAD: '#5195EE',
  ANGRY: '#E46E80',
};

type EmotionCalendarProps = {
  initialSelectedEmotion: Record<string, Emotion>;
  initialEmotionData: Record<Emotion, number>;
};

const LOCALE = 'ko';

const EmotionCalendar: React.FC<EmotionCalendarProps> = ({
  initialSelectedEmotion,
  initialEmotionData,
}) => {
  const [selectedEmotion] = useState<Record<string, Emotion>>(
    initialSelectedEmotion,
  );

  const [emotionData] = useState<Record<Emotion, number>>(initialEmotionData);

  const [selectedChartEmotion, setSelectedChartEmotion] =
    useState<Emotion | null>(null);

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
          view === 'month' &&
          selectedEmotion[date.toISOString().slice(0, 10)] ? (
            <Image
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
          {Object.keys(emotionData).map((emotionKey) => (
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
