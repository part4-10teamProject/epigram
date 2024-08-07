import NewCommentList from '@/components/mainPage/NewCommentList';
import NewEpigramList from '@/components/mainPage/NewEpigramList';
import TodayCard from '@/components/mainPage/TodayCard';

const getTodayData = async () => {
  const res = await fetch(
    'https://fe-project-epigram-api.vercel.app/6-10/epigrams/today',
  ).then((res) => res.json());
  return res;
};

const getEpigramDatas = async () => {
  const res = await fetch(
    'https://fe-project-epigram-api.vercel.app/6-10/epigrams?limit=3',
  ).then((res) => res.json());
  return res ?? [];
};

const mainPage = async () => {
  const todayData = await getTodayData();
  const epigramDatas = await getEpigramDatas();
  // console.log('todayaaa', todayData);
  // console.log('epigramDatas', epigramDatas);

  return (
    <div className="mx-auto max-w-[312px] py-8 md:max-w-[384px] xl:max-w-[640px] xl:pt-28">
      <div className="flex flex-col gap-40">
        <TodayCard />
        <div className="mb-7 text-[24px] font-semibold">
          오늘의 감정은 어떤가요?
        </div>
        <NewEpigramList />
        <NewCommentList />
      </div>
    </div>
  );
};

export default mainPage;
