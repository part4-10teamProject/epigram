'use client';

import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchData } from '@/api/getEpigrams';
import SearchText from '@/components/common/SearchText';
import EpigramItem from '@/components/search/EpigramItem';
import RecentSearches from '@/components/search/RecentSearches';
import {
  HighlightedDataItem,
  PaginatedFetchDataResponse,
} from '@/types/search';
import { highlightText } from '@/utils/highLightText';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const queryClient = useQueryClient();
  const router = useRouter();

  const fetchEpigrams = async ({
    pageParam = 0,
  }: {
    pageParam?: number | null;
  }) => {
    const response = await fetchData({
      keyword: query,
      cursor: pageParam,
    });
    return response;
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  }: UseInfiniteQueryResult<PaginatedFetchDataResponse, Error> =
    useInfiniteQuery({
      queryKey: ['epigrams', query],
      queryFn: fetchEpigrams,
      getNextPageParam: (lastPage, allPages) => {
        const totalCount = lastPage.totalCount;
        const nextCursor = lastPage.nextCursor;
        const totalItemsFetched = allPages.flatMap((page) => page.list).length;

        if (nextCursor == null || totalItemsFetched >= totalCount) {
          return undefined;
        }
        return nextCursor;
      },
      enabled: query.trim().length > 0,
      initialPageParam: undefined,
    });

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      queryClient.removeQueries(['epigrams', query], { exact: true });
      refetch();
    }
  }, [query, queryClient, refetch]);

  const updateRecentSearches = useCallback((searchTerm: string) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = prevSearches.filter(
        (term) => term !== searchTerm,
      );
      updatedSearches.unshift(searchTerm);
      const limitedSearches = updatedSearches.slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
      return limitedSearches;
    });
  }, []);

  const performSearch = useCallback(() => {
    const searchTerm = searchValue.trim();
    setQuery(searchTerm);
    if (searchTerm.length > 0) {
      updateRecentSearches(searchTerm);
    }
  }, [searchValue, updateRecentSearches]);

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

  const handleClearAllRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchValue(term);
    setQuery(term);
    updateRecentSearches(term);
  };

  const removeRecentSearch = (term: string) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = prevSearches.filter((item) => item !== term);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  const moveEpigramDetail = (id: number) => {
    router.push(`epigrams/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  const listData = data?.pages.flatMap((page) => page.list) || [];
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
      <div className="mt-2 w-[312px] md:mt-4 md:w-[384px] xl:mt-6 xl:w-[640px]">
        <SearchText
          value={searchValue}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchKeyDown}
          onIconClick={handleSearchIconClick}
        />
        <RecentSearches
          recentSearches={recentSearches}
          onClearAll={handleClearAllRecentSearches}
          onClickItem={handleRecentSearchClick}
          onRemoveItem={removeRecentSearch}
        />
        <div>
          {searchValue.trim().length === 0 ? (
            <div className="flex h-[200px] w-full items-center justify-center text-xl xl:text-2xl">
              검색어를 입력해 주세요.
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex h-[200px] w-full items-center justify-center text-xl xl:text-2xl">
              ‘{query || '검색어'}’(이)가 없습니다
            </div>
          ) : (
            filteredData.map((item) => (
              <EpigramItem
                key={item.id}
                item={item}
                onClick={moveEpigramDetail}
              />
            ))
          )}
          {hasNextPage && (
            <div className="flex flex-col items-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="my-[40px] h-[48px] w-[153px] rounded-[100px] border border-line-200 text-lg text-blue-500 md:my-[68px] xl:my-[72px] xl:h-[56px] xl:w-[238px] xl:text-2xl"
              >
                {isFetchingNextPage ? '검색 중' : '검색결과 더보기'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
