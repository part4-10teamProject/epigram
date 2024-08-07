import { getEpigramDatas } from '@/api/server/getEpigramDatas';
import { getTodayData } from '@/api/server/getTodayData';
import NewCommentList from '@/components/mainPage/NewCommentList';
import NewEpigramList from '@/components/mainPage/NewEpigramList';
import TodayCard from '@/components/mainPage/TodayCard';

const mainPage = async () => {
  const todayData = await getTodayData();
  const epigramDatas = await getEpigramDatas(3);

  if (!todayData || !epigramDatas) return;
  return (
    <div className="mx-auto max-w-[312px] py-8 md:max-w-[384px] xl:max-w-[640px] xl:pt-28">
      <div className="flex flex-col gap-40">
        <TodayCard todayData={todayData} />
        <div className="mb-7 text-[24px] font-semibold">
          오늘의 감정은 어떤가요?
        </div>
        <NewEpigramList epigrams={epigramDatas.list} />
        <NewCommentList />
      </div>
    </div>
  );
};

export default mainPage;
