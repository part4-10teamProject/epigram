import { getEpigramDatas } from '@/api/server/getEpigramDatas';
import { getTodayData } from '@/api/server/getTodayData';
import NewCommentList from '@/components/epigramsPage/NewCommentList';
import NewEpigramList from '@/components/epigramsPage/NewEpigramList';
import TodayCard from '@/components/epigramsPage/TodayCard';

const mainPage = async () => {
  const todayData = await getTodayData();
  const epigramDatas = await getEpigramDatas(3);

  if (!todayData || !epigramDatas)
    return (
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

          <div className="mb-7 text-[24px] font-semibold">
            오늘의 감정은 어떤가요?
          </div>
          {!epigramDatas ? ( // epigramDatas가 존재하지 않을 때
            <div>
              <div className="mb-7 text-[24px] font-semibold">
                에피그램이 없습니다.
              </div>
              <button>에피그램 추가하러가기</button>
            </div>
          ) : (
            // epigramDatas가 존재할 때
            <NewEpigramList epigrams={epigramDatas.list} />
          )}
          <NewCommentList />
        </div>
      </div>
    );

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
