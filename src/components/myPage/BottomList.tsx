'use client';

import { deleteComment } from '@/api/client/deleteComment';
import { editComment } from '@/api/client/editComment';
import { getUserCommentDatas } from '@/api/client/getUserCommentsDatas';
import { getUserEpigramDatas } from '@/api/client/getUserEpigramDatas';
import { useAuth } from '@/contexts/AuthContext';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../common/LoadingSpinner';
import MyCommentList from './MyCommentList';
import MyEpigramList from './MyEpigramList';

// 인터페이스 정의
interface EditContentItem {
  isPrivate: boolean;
  content: string;
}

interface EditContent {
  id: number;
  content: EditContentItem;
}

const BottomList = () => {
  // 상태 관리
  const [activeTab, setActiveTab] = useState<'epigram' | 'comment'>('epigram');
  const [totalCount, setTotalCount] = useState<number | null>(null); // 총 에피그램 개수 상태
  const [commentTotalCount, setCommentTotalCount] = useState<
    number | undefined
  >(null); // 총 댓글 개수 상태
  const [isListVisible, setIsListVisible] = useState(true); // 에피그램 리스트 가시성
  const [isCommentVisible, setIsCommentVisible] = useState(true); // 댓글 리스트 가시성

  const { userInfo } = useAuth(); // 유저 정보를 가져옴
  const queryClient = useQueryClient();
  const userId = userInfo?.id; // 유저ID를 useAuth에서 가져옴

  // 에피그램 데이터를 가져오기 위한 useInfiniteQuery
  const {
    data: epigramData,
    fetchNextPage: epigramFetchNextPage,
    hasNextPage: epigramHasNextPage,
    isLoading: epigramIsLoading,
    isFetching: epigramIsFetching,
  } = useInfiniteQuery({
    queryKey: ['epigrams', userId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!userId) {
        return { list: [], nextCursor: undefined, totalCount: 0 };
      }
      const response = await getUserEpigramDatas(pageParam, 4, userId);
      if (pageParam === 0) {
        setTotalCount(response.totalCount); // 처음 로드 시 총 개수 설정
      }
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  // 댓글 데이터를 가져오기 위한 useInfiniteQuery
  const {
    data: commentData,
    fetchNextPage: commentFetchNextPage,
    hasNextPage: commentHasNextPage,
    isFetching: commentIsFetching,
    isLoading: commentIsLoading,
  } = useInfiniteQuery({
    queryKey: ['MyComments', userId], // userId를 쿼리키에 포함
    queryFn: async ({ pageParam = 0 }) => {
      if (!userId) {
        throw new Error('User ID is undefined');
      }
      const response = await getUserCommentDatas(pageParam, 5, userId);
      setCommentTotalCount(response.totalCount);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  // Mutation: 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MyComments', userId] });
    },
  });

  const handleDeleteMutation = (id: number) => {
    deleteCommentMutation.mutate(id);
  };

  // Mutation: 댓글 수정
  const editCommentMutation = useMutation({
    mutationFn: ({ id, content }: EditContent) => editComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MyComments', userId] });
    },
  });

  const handleEditMutation = (id: number, content: EditContentItem) => {
    editCommentMutation.mutate({ id, content });
  };

  // 탭 클릭 핸들러
  const handleEpigramClick = () => {
    setActiveTab('epigram');
    setIsListVisible(true);
    setIsCommentVisible(false);
  };

  const handleCommentClick = () => {
    setActiveTab('comment');
    setIsCommentVisible(true);
    setIsListVisible(false);
  };

  // 에피그램 및 댓글 데이터 평탄화
  const epigrams = epigramData?.pages.flatMap((page) => page.list) ?? [];
  const comments = commentData?.pages.flatMap((page) => page.list) ?? [];

  // 컴포넌트 언마운트 시 쿼리 캐시 제거
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['MyEpigrams'] });
      queryClient.removeQueries({ queryKey: ['MyComments', userId] });
    };
  }, [queryClient, userId]);

  // 로딩 상태 처리
  if (commentIsLoading || epigramIsLoading) return <LoadingSpinner />;

  // 리스트 프로퍼티 구성
  const epigramListProps = {
    isListVisible,
    fetchNextPage: epigramFetchNextPage,
    hasNextPage: epigramHasNextPage,
    isLoading: epigramIsLoading,
    epigrams,
  };

  const commentListProps = {
    userId,
    comments,
    isCommentVisible,
    fetchNextPage: commentFetchNextPage,
    hasNextPage: commentHasNextPage,
    handleDeleteMutation,
    handleEditMutation,
  };

  return (
    <div className="mx-auto mt-2 max-w-[312px] md:max-w-[384px] xl:max-w-[640px] xl:pt-28">
      <div className="mb-0.2 mt-10 flex flex-col items-start">
        <div className="flex space-x-8">
          <button
            className="cursor-pointer text-left text-xl font-semibold xl:text-[24px] xl:leading-8"
            onClick={handleEpigramClick}
          >
            내 에피그램{' '}
            {epigramIsFetching || totalCount === null ? '' : `(${totalCount})`}
          </button>
          <button
            className="cursor-pointer text-left text-xl font-semibold xl:text-[24px] xl:leading-8"
            onClick={handleCommentClick}
          >
            내 댓글 {commentIsFetching || `(${commentTotalCount})`}
          </button>
        </div>
      </div>
      <div className="py-8">
        <div className="flex flex-col gap-40">
          <div className="mt-0.2">
            {activeTab === 'epigram' && <MyEpigramList {...epigramListProps} />}
            {activeTab === 'comment' && <MyCommentList {...commentListProps} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomList;
