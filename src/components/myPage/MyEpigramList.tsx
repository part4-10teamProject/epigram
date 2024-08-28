'use client';

import Card from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';

const MyEpigramList = ({ epigramListProps }) => {
  const {
    isListVisible,
    fetchNextPage,
    hasNextPage,
    isLoading,
    epigrams,
  } = epigramListProps;
  return (
    <div className="flex flex-col gap-10">
     
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
