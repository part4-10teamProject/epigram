'use client';

import { getCalendarData } from '@/api/client/getCalendarData';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment'; //날짜&시간 다루는 Moment.js 라이브러리 임포트
import Image from 'next/image'; //next.js의 최적화 이미지 컴포넌트
import { useState } from 'react';
import Calendar from 'react-calendar'; //react-calender 컴포넌트 임포트
import angryIcon from '../../../public/assets/icons/emotion/logo_angry.svg';
import heartIcon from '../../../public/assets/icons/emotion/logo_heart.svg';
import sadIcon from '../../../public/assets/icons/emotion/logo_sad.svg';
import smileIcon from '../../../public/assets/icons/emotion/logo_smiling.svg';
import thinkIcon from '../../../public/assets/icons/emotion/logo_thinking.svg';
import { LoadingSpinner } from '../common/LoadingSpinner';
import '../myPage/calendarCustom.css'; //캘린더는 따로 커스텀 스타일링 css
import EmotionChart from './EmotionChart';

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

//서버에서 받아온 캘린더 데이터의 타입 정의
interface CalenderData {
  createdAt: string; //감정기록된 날짜
  emotion: string; //감정유형
  userId: number; //사용자 ID
  id: number; //기록 ID
}

const LOCALE = 'ko'; //캘린더 언어설정(한국어)

//EmotionCalender 컴포넌트 정의
const EmotionCalendar = () => {
  const monthOfActiveDate = moment(new Date()).month() + 1;
  const yearOfAcActiveData = moment().year();
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);
  const [activeYear, setActiveYear] = useState(yearOfAcActiveData);
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['CalenderData'],
    queryFn: () => getCalendarData(userInfo.id, activeYear, activeMonth),
    enabled: !!userInfo?.id,
  });

  const getMutation = useMutation({
    mutationFn: () => getCalendarData(userInfo.id, activeYear, activeMonth),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['CalenderData'] }),
  });

  const handleMutation = () => {
    getMutation.mutate();
  };

  const getActiveMonth = (activeStartDate: moment.MomentInput) => {
    const newActiveMonth = moment(activeStartDate).month() + 1;
    const newActiveYear = moment(activeStartDate).year();
    setActiveMonth(newActiveMonth);
    setActiveYear(newActiveYear);
    handleMutation();
  };

  //날짜별로 감정 매핑
  const selectedEmotion: Record<string, Emotion> = {};
  if (data) {
    data.forEach((data: CalenderData) => {
      const dateKey = moment(data.createdAt).format('YYYY-MM-DD');
      selectedEmotion[dateKey] = data.emotion as Emotion;
    });
  } else return;

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div>
        <Calendar
          locale={LOCALE}
          prev2Label={null}
          next2Label={null}
          value={new Date()}
          onActiveStartDateChange={({ activeStartDate }) =>
            getActiveMonth(activeStartDate)
          }
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
                className="xl:h-[36px] xl:w-[36px]"
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
      <div className="mt-[58px] flex h-[218px] w-full flex-col justify-between md:mt-[62px] xl:mt-[157px] xl:h-[344px]">
        <h2 className="text-xl font-semibold xl:text-[24px] xl:leading-8">
          감정 차트
        </h2>
        <div className="flex justify-center">
          <EmotionChart initialSelectedEmotion={data} />
        </div>
      </div>
    </>
  );
};

export default EmotionCalendar;
