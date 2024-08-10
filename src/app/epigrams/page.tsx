import { getCommentsDatas } from '@/api/server/getCommentDatas';
import { getEpigramDatas } from '@/api/server/getEpigramDatas';
import { getTodayData } from '@/api/server/getTodayData';
import NewCommentList from '@/components/epigramsPage/NewCommentList';
import NewEpigramList from '@/components/epigramsPage/NewEpigramList';
import TodayCard from '@/components/epigramsPage/TodayCard';

const mainPage = async () => {
  const todayData = await getTodayData();
  const epigramDatas = await getEpigramDatas(3);
  const commentDatas = await getCommentsDatas(4);

  if (!todayData || !epigramDatas || !commentDatas)
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
              <NewEpigramList epigramList={epigramDatas} />
            )}
            {!commentDatas ? ( // commentDatas가 존재하지 않을 경우
              <div>
                <div className="mb-7 text-[24px] font-semibold">
                  최신 댓글이 없습니다.
                </div>
                <button>에피그램 추가하러가기</button>
              </div>
            ) : (
              // commentDatas가 존재함
              <NewCommentList commentList={commentDatas} />
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[312px] py-8 md:max-w-[384px] xl:max-w-[640px] xl:pt-28">
        <div className="flex flex-col gap-40">
          <TodayCard todayData={todayData} />
          <div className="mb-7 text-[24px] font-semibold">
            오늘의 감정은 어떤가요?
          </div>
          <NewEpigramList epigramList={epigramDatas} />
          <NewCommentList commentList={commentDatas} />
        </div>
      </div>
    </div>
  );
};

export default mainPage;
