'use client';

import { getUserEpigramDatas } from '@/api/client/getUserEpigramDatas';
import { useAuth } from '@/contexts/AuthContext';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Card from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';

const MyEpigramList = () => {
  const { userInfo } = useAuth(); // 유저 정보를 가져옴

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['MyEpigrams'],
    queryFn: ({ pageParam = 0 }) => {
      if (!userInfo?.id) {
        return Promise.resolve({ list: [], nextCursor: undefined });
      }
      return getUserEpigramDatas(pageParam, 4, userInfo.id);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  const epigrams = data?.pages.flatMap((page) => page.list) ?? [];

  const queryClient = useQueryClient();
  const [isEpigramVisible, setIsEpigramVisible] = useState(true); // 에피그램 리스트의 가시성 상태

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['MyEpigrams'] });
    };
  }, [queryClient]);

  if (isLoading) return <LoadingSpinner />;

  const handleToggleVisibility = () => {
    setIsEpigramVisible((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-10">
      <h1
        className="cursor-pointer text-left text-xl font-semibold xl:text-[24px] xl:leading-8"
        onClick={handleToggleVisibility}
      >
        내 에피그램 ({epigrams.length})
      </h1>
      {isEpigramVisible && ( // 에피그램 리스트의 가시성 상태에 따라 보여주기
        <div>
          <div className="flex flex-col gap-4">
            {epigrams && epigrams.length > 0 ? (
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
        </div>
      )}
    </div>
  );
};

export default MyEpigramList;
