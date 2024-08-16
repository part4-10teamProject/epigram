import React from 'react';

interface RecentSearchesProps {
  recentSearches: string[];
  onClearAll: () => void;
  onClickItem: (term: string) => void;
  onRemoveItem: (term: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentSearches,
  onClearAll,
  onClickItem,
  onRemoveItem,
}) => {
  return (
    <div>
      <div className="mt-6 flex flex-row justify-between md:mt-8 xl:mt-10">
        <p className="text-xl font-medium text-black-700 md:text-2xl xl:text-[24px]">
          최근 검색어
        </p>
        <button
          onClick={onClearAll}
          className="text-sm font-semibold text-red-500 md:text-lg xl:text-xl"
        >
          모두 지우기
        </button>
      </div>
      <div className="mb-[24px] mt-4 flex flex-wrap gap-2 md:mb-[32px] md:mt-[24px] md:gap-4 xl:my-[40px]">
        {recentSearches.map((term, index) => (
          <div
            key={index}
            className="cursor-pointer items-center rounded-[22px] bg-background px-2 py-3 text-xl font-normal text-black-300 md:text-2xl xl:px-3 xl:py-[14px] xl:text-[24px]"
            onClick={() => onClickItem(term)}
          >
            <span className="mr-2">{term}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveItem(term);
              }}
              className="text-red-500"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
