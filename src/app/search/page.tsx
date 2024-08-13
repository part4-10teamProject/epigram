'use client';

import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/api/getEpigrams';
import SearchText from '@/components/common/SearchText';
import Tags from '@/components/common/Tags';
import { DataItem, HighlightedDataItem } from '@/types/search';
import { highlightText } from '@/utils/highLightText';

const Search = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const queryOptions: UseQueryOptions<
    {
      totalCount: number;
      nextCursor: number;
      list: DataItem[];
    },
    Error
  > = {
    queryKey: ['epigrams', { keyword: query }],
    queryFn: () => fetchData({ keyword: query, writerId: undefined }),
    enabled: query.trim().length > 0 && hasSearched,
    onSuccess: () => {
      setHasSearched(false); // 성공적으로 데이터를 가져온 후 초기화
    },
  };

  const { data, isLoading, error } = useQuery(queryOptions);

  // 최근 검색어 로딩
  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const performSearch = useCallback(() => {
    const searchTerm = searchValue.trim();
    if (searchTerm.length > 0) {
      setQuery(searchTerm);
      setHasSearched(true);
      setRecentSearches((prevSearches) => {
        const updatedSearches = prevSearches.filter(
          (term) => term !== searchTerm,
        );
        updatedSearches.unshift(searchTerm);
        const limitedSearches = updatedSearches.slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
        return limitedSearches;
      });
    } else {
      setQuery('');
      setHasSearched(true);
    }
  }, [searchValue]);

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
    setQuery(term);
    setHasSearched(true);
  };

  if (error) return <div>Error occurred: {error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  const listData = data?.list || [];
  const filteredData: HighlightedDataItem[] = listData.map((item) => ({
    ...item,
    author: highlightText(item.author, query),
    content: highlightText(item.content, query),
    tags: item.tags.map((tag) => ({
      ...tag,
      name: highlightText(tag.name, query),
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
          {searchValue.trim().length === 0 ? (
            <div className="flex h-[200px] w-full items-center justify-center text-xl xl:text-2xl">
              검색어를 입력해 주세요.
            </div>
          ) : hasSearched && filteredData.length === 0 ? (
            <div className="flex h-[200px] w-full items-center justify-center text-xl xl:text-2xl">
              ‘{query || '검색어'}’(이)가 없습니다
            </div>
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
