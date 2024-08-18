'use client';
import FeedCard from './FeedCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getNewFeedDatas } from '@/api/getNewFeedDatas';

const FeedEpigramList = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['FeedDatas'],
    queryFn: ({ pageParam = 0 }) => getNewFeedDatas(pageParam, 6, 4),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  const epigrams = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <div>
      <h1 className="mb-9 text-xl font-semibold xl:text-[24px] xl:leading-8">
        피드
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-10">
        {epigrams.map((epigram) => (
          <FeedCard key={epigram.id} epigramData={epigram} />
        ))}
      </div>
      <div className="flex justify-center pt-20">
        <button
          disabled={!hasNextPage}
          onClick={() => fetchNextPage()}
          className={`rounded-full border text-lg xl:text-2xl ${hasNextPage ? 'hover:bg-gray-400 hover:text-black-950' : null} border-line-200 px-[18px] py-3 text-blue-500 xl:gap-2 xl:px-10`}
        >
          {hasNextPage ? '+ 에피그램 더보기' : '데이터가 없어요 '}
        </button>
      </div>
    </div>
  );
};

export default FeedEpigramList;
