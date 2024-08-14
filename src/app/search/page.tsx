'use client';

import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/api/getEpigrams';
import SearchText from '@/components/common/SearchText';
import EpigramItem from '@/components/search/EpigramItem';
import RecentSearches from '@/components/search/RecentSearches';
import { DataItem, HighlightedDataItem } from '@/types/search';
import { highlightText } from '@/utils/highLightText';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

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
    enabled: query.trim().length > 0, // query가 비어 있지 않을 때만 쿼리 활성화
  };

  const { data, isLoading, error } = useQuery(queryOptions);

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default Search;
