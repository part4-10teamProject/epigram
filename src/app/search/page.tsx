'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api/getEpigrams';
import SearchText from '@/components/common/SearchText';
import Tags from '@/components/common/Tags';
import { useState, useCallback, ChangeEvent } from 'react';

interface Tag {
  name: string;
  id: number;
}

interface DataItem {
  likeCount: number;
  tags: Tag[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
}

interface HighlightedTag {
  name: JSX.Element[] | string;
  id: number;
}

interface HighlightedDataItem {
  likeCount: number;
  tags: HighlightedTag[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: JSX.Element[] | string;
  content: JSX.Element[] | string;
  id: number;
  isLiked: boolean;
}

const highlightText = (text: string, searchTerm: string): JSX.Element[] => {
  if (!searchTerm) return [<span key="0">{text}</span>];
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-[#5195ee]">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const Search = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [query, setQuery] = useState<string>(''); // 검색어를 저장할 상태
  const [hasSearched, setHasSearched] = useState<boolean>(false); // 검색이 수행되었는지 추적

  const { data, refetch, isLoading, error } = useQuery<{
    totalCount: number;
    nextCursor: number;
    list: DataItem[];
  }>({
    queryKey: ['epigrams', { keyword: query }], // query 상태를 사용
    queryFn: () => fetchData({ keyword: query, writerId: undefined }),
    enabled: false, // 검색어가 있을 때만 refetch를 호출하도록 설정
  });

  const performSearch = useCallback(() => {
    const searchTerm = searchValue.trim();
    if (searchTerm) {
      setQuery(searchTerm); // query 상태 업데이트
      setHasSearched(true); // 검색이 수행되었음을 표시
      setRecentSearches((prevSearches) => {
        const updatedSearches = prevSearches.filter(
          (term) => term !== searchTerm,
        );
        updatedSearches.unshift(searchTerm);
        const limitedSearches = updatedSearches.slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
        return limitedSearches;
      });
      refetch();
    } else {
      setQuery(''); // 빈 검색어 처리
      setHasSearched(true); // 검색이 수행되었음을 표시
      // 빈 검색어에 대한 처리를 추가할 수도 있음
    }
  }, [searchValue, refetch]);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleSearchIconClick = () => {
    performSearch();
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchValue(term);
    performSearch();
  };

  // 에러 발생 시 메시지 표시
  if (error) return <div>Error occurred: {error.message}</div>;

  // 로딩 중일 때 로딩 표시
  if (isLoading) return <div>Loading...</div>;

  // 데이터가 없는 경우
  const listData = data?.list || [];

  // 데이터에 하이라이트 적용
  const filteredData: HighlightedDataItem[] = listData.map((item) => ({
    ...item,
    author: highlightText(item.author, query), // query 상태 사용
    content: highlightText(item.content, query), // query 상태 사용
    tags: item.tags.map((tag) => ({
      ...tag,
      name: highlightText(tag.name, query), // query 상태 사용
    })),
  }));

  return (
    <div className="mx-auto flex flex-col items-center gap-6 md:gap-8 xl:gap-10">
      <div className="w-[312px] md:w-[384px] xl:w-[640px]">
        <SearchText
          value={searchValue}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchKeyDown}
          onIconClick={handleSearchIconClick}
        />
        <div>
          <div className="mt-4 flex flex-row justify-between">
            <p className="text-xl font-medium text-black-700 md:text-2xl xl:text-[24px]">
              최근 검색어
            </p>
            <button
              onClick={() => {
                setRecentSearches([]);
                localStorage.removeItem('recentSearches');
              }}
              className="text-sm font-semibold text-red-500 md:text-lg xl:text-xl"
            >
              모두 지우기
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {recentSearches.map((term, index) => (
              <div
                key={index}
                className="mr-2 cursor-pointer items-center rounded-[22px] bg-background px-2 py-3 text-xl font-normal text-black-300 md:mr-4 md:text-2xl xl:px-3 xl:py-[14px] xl:text-[24px]"
                onClick={() => handleRecentSearchClick(term)}
              >
                <span className="mr-2">{term}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRecentSearches((prevSearches) => {
                      const updatedSearches = prevSearches.filter(
                        (item) => item !== term,
                      );
                      localStorage.setItem(
                        'recentSearches',
                        JSON.stringify(updatedSearches),
                      );
                      return updatedSearches;
                    });
                  }}
                  className="text-red-500"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          {hasSearched && filteredData.length === 0 ? (
            <div className="flex h-[200px] w-full items-center justify-center text-xl xl:text-2xl">
              ‘{query || '검색어'}’(이)가 없습니다
            </div> // 검색어가 있을 때만 표시
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-100 py-4 md:px-6 xl:py-6"
              >
                <div className="flex flex-col items-start justify-between gap-1 font-custom text-xl md:gap-2 xl:gap-6 xl:text-2xl xl:leading-[28px]">
                  <p className="text-left text-black-600">
                    {typeof item.content === 'string'
                      ? item.content
                      : item.content.map((part, i) => (
                          <span key={i}>{part}</span>
                        ))}
                  </p>
                  <p className="bottom-[24px] right-[24px] text-right text-blue-400">
                    -&nbsp;
                    {typeof item.author === 'string'
                      ? item.author
                      : item.author.map((part, i) => (
                          <span key={i}>{part}</span>
                        ))}
                    &nbsp;-
                  </p>
                </div>
                <Tags
                  responseData={{
                    ...item,
                    tags: item.tags.map((tag) => ({
                      ...tag,
                      name: tag.name,
                    })),
                  }}
                  containerClassName={
                    'flex flex-row justify-end text-xl xl:text-2xl gap-3 xl:text-[20px] font-pretendard'
                  }
                  tagClassName={'inline'}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
