import { getTodayEpigramData } from '@/api/server/getTodayEpigramData';
import ScrollButton from '@/components/common/ScrollButton';
import NewCommentList from '@/components/epigramsPage/NewCommentList';
import NewEpigramList from '@/components/epigramsPage/NewEpigramList';
import TodayCard from '@/components/epigramsPage/TodayCard';
import TodayEmotion from '@/components/epigramsPage/TodayEmotion';

const mainPage = async () => {
  const todayData = await getTodayEpigramData();

  if (!todayData)
    return (
      <div className="bg-background">
        <div className="mx-auto max-w-[312px] py-8 md:max-w-[384px] xl:max-w-[640px] xl:pt-28">
          <div className="flex flex-col gap-40">
            {!todayData ? ( // todayData 데이터가 존재하지 않을 때
              <div className="mb-7 text-[24px] font-semibold">
                오늘의 에피그램은 없습니다
              </div>
            ) : (
              // todayData가 존재할 때
              <TodayCard todayData={todayData} />
            )}

            <TodayEmotion />
            <NewEpigramList />
            <NewCommentList />
          </div>
          <ScrollButton />
        </div>
      </div>
    );

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[312px] py-8 md:max-w-[384px] xl:max-w-[640px] xl:pt-28">
        <div className="flex flex-col gap-40">
          <TodayCard todayData={todayData} />
          <TodayEmotion />
          <NewEpigramList />
          <NewCommentList />
        </div>
        <ScrollButton />
      </div>
    </div>
  );
};

export default mainPage;
