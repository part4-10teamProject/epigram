'use client';

import { getUserEpigramDatas } from '@/api/client/getUserEpigramDatas';
import { useAuth } from '@/contexts/AuthContext';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Card from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';

const MyEpigramList = () => {
  const { userInfo } = useAuth(); // 유저 정보를 가져옴
  const queryClient = useQueryClient();

  const [totalCount, setTotalCount] = useState<number | null>(null); // 총 에피그램 개수 상태
  const [isListVisible, setIsListVisible] = useState(true); // 에피그램 리스트의 가시성 상태

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery({
      queryKey: ['epigrams'],
      queryFn: async ({ pageParam = 0 }) => {
        if (!userInfo?.id) {
          return { list: [], nextCursor: undefined, totalCount: 0 };
        }
        const response = await getUserEpigramDatas(pageParam, 4, userInfo.id);
        if (pageParam === 0) {
          setTotalCount(response.totalCount); // 처음 로드 시 총 개수 설정
        }
        return response;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    });

  const epigrams = data?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['MyEpigrams'] });
    };
  }, [queryClient]);

  const handleToggleVisibility = () => {
    setIsListVisible((prevState) => !prevState); // 가시성 상태 토글
  };

  return (
    <div className="flex flex-col gap-10">
      <button
        className="cursor-pointer text-left text-xl font-semibold xl:text-[24px] xl:leading-8"
        onClick={handleToggleVisibility}
      >
        내 에피그램 {isFetching || totalCount === null ? '' : `(${totalCount})`}
      </button>
      {isListVisible && ( // 에피그램 리스트의 가시성 상태에 따라 보여주기
        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {epigrams.length > 0 ? (
                  epigrams.map((epigram) => (
                    <div key={epigram.id}>
                      <Card responseData={epigram} />
                    </div>
                  ))
                ) : (
                  <div>데이터가 없어요</div>
                )}
              </div>
              <div className="mt-[72px] text-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage}
                  className={`rounded-full border border-[#CFDBEA] px-[20px] py-3 text-lg font-medium text-[#8B9DBC] xl:px-[50px] xl:text-2xl ${
                    hasNextPage
                      ? 'hover:bg-[#919191] hover:text-black-950'
                      : 'border-[#CFDBEA]'
                  }`}
                >
                  {hasNextPage ? '+ 에피그램 더보기' : '데이터가 없어요'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEpigramList;
