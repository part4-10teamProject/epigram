'use client';

import SearchText from '@/components/common/SearchText';
import Tags from '@/components/common/Tags';
import { useState, useCallback, useEffect } from 'react';

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

const data: DataItem[] = [
  {
    likeCount: 10,
    tags: [
      { name: '샘플1', id: 1 },
      { name: '샘플2', id: 2 },
      { name: '샘플3', id: 3 },
      { name: '샘플4', id: 4 },
    ],
    writerId: 10,
    referenceUrl: '',
    referenceTitle: '',
    author: '작가1',
    content: '이것은 샘플 콘텐츠입니다. 샘플 텍스트가 포함되어 있습니다.',
    id: 1,
    isLiked: true,
  },
  {
    likeCount: 5,
    tags: [
      { name: '예시1', id: 1 },
      { name: '예시2', id: 2 },
    ],
    writerId: 20,
    referenceUrl: '',
    referenceTitle: '',
    author: '작가2',
    content: '다른 예시 텍스트입니다.',
    id: 2,
    isLiked: false,
  },
  // 추가 객체들...
];

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
  const [searchValue, setSearchValue] = useState<string>(''); // 입력값 상태
  const [filteredData, setFilteredData] = useState<HighlightedDataItem[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 최근 검색어를 가져옵니다.
    const storedSearches = JSON.parse(
      localStorage.getItem('recentSearches') || '[]',
    ) as string[];
    setRecentSearches(storedSearches);
  }, []);

  const performSearch = useCallback(() => {
    const searchTerm = searchValue.trim();
    if (searchTerm) {
      // 최근 검색어에 추가 (중복 제외)
      setRecentSearches((prevSearches) => {
        const updatedSearches = prevSearches.filter(
          (term) => term !== searchTerm,
        );
        updatedSearches.unshift(searchTerm); // 새로운 검색어를 맨 앞에 추가
        const limitedSearches = updatedSearches.slice(0, 5); // 최대 5개의 검색어만 유지
        localStorage.setItem('recentSearches', JSON.stringify(limitedSearches)); // 로컬 스토리지에 저장
        return limitedSearches;
      });

      // 검색어에 기반하여 필터링된 데이터 업데이트
      const filtered = data.filter(
        (item) =>
          item.content.includes(searchTerm) ||
          item.author.includes(searchTerm) ||
          item.tags.some((tag) => tag.name.includes(searchTerm)),
      );

      // 하이라이트 적용
      setFilteredData(
        filtered.map((item) => ({
          ...item,
          author: highlightText(item.author, searchTerm),
          content: highlightText(item.content, searchTerm),
          tags: item.tags.map((tag) => ({
            ...tag,
            name: highlightText(tag.name, searchTerm),
          })),
        })),
      );
    } else {
      // 빈 검색어일 때는 필터링된 데이터 비움
      setFilteredData([]);
    }
  }, [searchValue]);

  const onChange = (changeValue: string) => {
    setSearchValue(changeValue); // 입력값 상태 업데이트
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      performSearch(); // 엔터 키를 눌렀을 때 검색 실행
    }
  };

  const onIconClick = () => {
    performSearch(); // 돋보기 아이콘을 클릭할 때 검색 실행
  };

  const onRecentSearchClick = (term: string) => {
    setSearchValue(term); // 검색어를 입력값 상태로 설정
    performSearch(); // 검색 실행
  };

  const deleteSearch = (searchTerm: string) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = prevSearches.filter(
        (term) => term !== searchTerm,
      );
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches)); // 로컬 스토리지에 저장
      return updatedSearches;
    });
  };

  const clearAllSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches'); // 로컬 스토리지에서 최근 검색어 삭제
  };

  return (
    <div className="mx-auto flex flex-col items-center gap-6 md:gap-8 xl:gap-10">
      <div className="w-[312px] md:w-[384px] xl:w-[640px]">
        <SearchText
          value={searchValue} // 입력값 상태 전달
          onChange={onChange}
          onKeyDown={onKeyDown} // 엔터 키를 눌렀을 때 검색 실행
          onIconClick={onIconClick} // 돋보기 아이콘을 클릭할 때 검색 실행
        />
        <div>
          <div className="mt-4 flex flex-row justify-between">
            <p className="text-xl font-medium text-black-700 md:text-2xl xl:text-[24px]">
              최근 검색어
            </p>
            <button
              onClick={clearAllSearches}
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
                onClick={() => onRecentSearchClick(term)} // 최근 검색어 클릭 시 검색어 설정 및 검색 실행
              >
                <span className="mr-2">{term}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 함
                    deleteSearch(term);
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
          {filteredData.map((item) => (
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
                    : item.author.map((part, i) => <span key={i}>{part}</span>)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
