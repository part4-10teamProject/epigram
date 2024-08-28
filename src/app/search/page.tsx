'use client';

import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import SearchText from '@/components/common/SearchText';
import EpigramItem from '@/components/search/EpigramItem';
import RecentSearches from '@/components/search/RecentSearches';
import {
  HighlightedDataItem,
  PaginatedFetchDataResponse,
} from '@/types/search';
import { highlightText } from '@/utils/highLightText';
import { useRouter } from 'next/navigation';
import { fetchData } from '@/api/client/getEpigrams';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const Search = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [isRecentSearches, setIsRecentSearches] = useState<boolean>(true);
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

  // 초기 렌더링 시 로컬 스토리지에서 데이터를 가져오는 useEffect
  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      const parsedSearches = JSON.parse(storedSearches);
      if (Array.isArray(parsedSearches) && parsedSearches.length > 0) {
        setRecentSearches(parsedSearches);
        setIsRecentSearches(true);
      } else {
        // 빈 배열이거나 배열이 아닌 경우
        setRecentSearches([]);
        setIsRecentSearches(false);
      }
    } else {
      // 로컬 스토리지에서 키가 없을 때
      setRecentSearches([]);
      setIsRecentSearches(false);
    }
  }, []); // 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  useEffect(() => {
    if (query.trim().length > 0) {
      queryClient.removeQueries({ queryKey: ['epigrams', query], exact: true });
      refetch();
    }
  }, [query, queryClient, refetch]);

  const updateRecentSearches = useCallback((searchTerm: string) => {
    setRecentSearches((prevSearches) => {
      // 기존 검색어에서 현재 검색어를 제거
      const updatedSearches = prevSearches.filter(
        (term) => term !== searchTerm,
      );
      // 새로운 검색어를 맨 앞에 추가
      updatedSearches.unshift(searchTerm);
      // 최대 5개 검색어만 유지
      const limitedSearches = updatedSearches.slice(0, 5);
      // 로컬 스토리지에 저장
      localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));

      // 검색어가 하나라도 있는 경우 true, 없는 경우 false
      setIsRecentSearches(limitedSearches.length > 0);

      return limitedSearches;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    // 로컬 스토리지에서 'recentSearches' 키를 제거
    localStorage.removeItem('recentSearches');
    // 상태를 업데이트
    setRecentSearches([]);
    setIsRecentSearches(false);
  }, []);

  const removeRecentSearch = useCallback((term: string) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = prevSearches.filter((item) => item !== term);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      // 빈 배열일 경우 false, 그렇지 않으면 true
      setIsRecentSearches(updatedSearches.length > 0);
      return updatedSearches;
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

  const handleRecentSearchClick = (term: string) => {
    setSearchValue(term);
    setQuery(term);
    updateRecentSearches(term);
  };

  const moveEpigramDetail = (id: number) => {
    router.push(`epigrams/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;
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
          onClearAll={clearRecentSearches}
          onClickItem={handleRecentSearchClick}
          onRemoveItem={removeRecentSearch}
          isRecentSearches={isRecentSearches}
        />
        <div>
          {filteredData.length === 0 ? (
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
