'use client';
import { EpigramList, Epigrams } from '@/types/epigramList';
import Card from '../common/Card';
import { getNewEpigramDatas } from '@/api/client/getNewEpigramDatas';
import { useInfiniteQuery } from '@tanstack/react-query';

interface EpigramsProps {
  epigramList: EpigramList;
}

const NewEpigramList: React.FC<EpigramsProps> = ({ epigramList }) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['epigrams'],
    queryFn: ({ pageParam = 0 }) => getNewEpigramDatas(pageParam, 5), // pageParam는 fetchNextPage를 호출하면 nextCursor 값이 전달된다.
    initialPageParam: undefined,
    initialData: {
      // 리액트쿼리 초기값을 Props로 받아오는 epigramList로 넣음
      pages: [epigramList],
      pageParams: [0],
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined, //페이지커서
  });

  // data.pages에 있는 배열들이 각각의 list배열을 가지고 있는데 이것들을 하나로 합쳐서 배열로 반환함
  const epigrams: Epigrams[] = data.pages.flatMap((page) => page.list);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl font-semibold xl:text-[24px] xl:leading-8">
        최신 에피그램
      </h1>
      <div>
        <div className="flex flex-col gap-4">
          {epigrams.map((epigram) => (
            <div key={epigram.id}>
              <Card responseData={epigram} />
            </div>
          ))}
        </div>
        <div className="mt-[72px] text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
            className={`rounded-full border px-[20px] py-3 text-lg font-medium text-[#8B9DBC] xl:px-[50px] xl:text-2xl ${hasNextPage ? 'hover:bg-[#919191] hover:text-black-950' : 'border-[#CFDBEA]'}`}
          >
            {hasNextPage ? '+ 에피그램 더보기' : '데이터가 없어요'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEpigramList;
