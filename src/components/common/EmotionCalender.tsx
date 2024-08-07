'use client';

import 'chart.js/auto';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Doughnut } from 'react-chartjs-2';

const emotions = {
  감동: '😍',
  기쁨: '😊',
  고민: '🤔',
  슬픔: '😢',
  분노: '😡',
};

const emotionColors = {
  감동: '#FBC85B',
  기쁨: '#48BB98',
  고민: '#8E80E3',
  슬픔: '#5195EE',
  분노: '#E46E80',
};

const initialEmotionData = {
  감동: 35,
  기쁨: 20,
  고민: 9,
  슬픔: 17,
  분노: 19,
};

const EmotionCalendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEmotion, setSelectedEmotion] = useState<
    Record<string, string>
  >({});
  const [emotionData, setEmotionData] = useState(initialEmotionData);

  const handleDayClick = (value: Date) => {
    setDate(value);
    const emotionInput = prompt(
      'Enter your emotion for the day (감동, 기쁨, 고민, 슬픔, 분노):',
    );

    if (emotionInput && emotions[emotionInput as keyof typeof emotions]) {
      setSelectedEmotion({
        ...selectedEmotion,
        [value.toDateString()]: emotions[emotionInput as keyof typeof emotions],
      });
      setEmotionData({
        ...emotionData,
        [emotionInput as keyof typeof emotionData]:
          (emotionData[emotionInput as keyof typeof emotionData] || 0) + 1,
      });
    } else {
      alert(
        'Invalid emotion. Please enter one of: 감동, 기쁨, 고민, 슬픔, 분노.',
      );
    }
  };

  const chartData = {
    labels: Object.keys(emotionData),
    datasets: [
      {
        data: Object.values(emotionData),
        backgroundColor: Object.keys(emotionColors).map(
          (emotion) => emotionColors[emotion as keyof typeof emotionColors],
        ),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center p-4 text-black-900">
      <Calendar
        onClickDay={handleDayClick}
        value={date}
        tileContent={({ date, view }) =>
          view === 'month' && selectedEmotion[date.toDateString()] ? (
            <span>{selectedEmotion[date.toDateString()]}</span>
          ) : null
        }
        className="text-black w-full max-w-md rounded-lg bg-white shadow-lg"
      />
      <div className="mt-8 w-full max-w-md">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default EmotionCalendar;
