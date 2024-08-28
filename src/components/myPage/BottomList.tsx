'use client';

import { useEffect, useState } from 'react';
import MyCommentList from './MyCommentList';
import MyEpigramList from './MyEpigramList';
import { useAuth } from '@/contexts/AuthContext';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { getUserEpigramDatas } from '@/api/client/getUserEpigramDatas';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { deleteComment } from '@/api/client/deleteComment';
import { editComment } from '@/api/client/editComment';
import { getUserCommentDatas } from '@/api/client/getUserCommentsDatas';

interface EditContentItem {
  isPrivate: boolean;
  content: string;
}

interface EditContent {
  id: number;
  content: EditContentItem;
}

const BottomList = () => {
  // activeTab 상태 설정
  const [activeTab, setActiveTab] = useState<'epigram' | 'comment'>('epigram');

  const { userInfo } = useAuth(); // 유저 정보를 가져옴
  const queryClient = useQueryClient();

  const [totalCount, setTotalCount] = useState<number | null>(null); // 총 에피그램 개수 상태
  const [isListVisible, setIsListVisible] = useState(true); // 에피그램 리스트의 가시성 상태

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery({
      queryKey: ['epigrams'],
      queryFn: async ({ pageParam = 0 }) => {
        if (!userInfo?.id) {
          return { list: [], nextCursor: undefined, totalCount: 0 };
        }
        const response = await getUserEpigramDatas(pageParam, 4, userInfo.id);
        if (pageParam === 0) {
          setTotalCount(response.totalCount); // 처음 로드 시 총 개수 설정
        }
        return response;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    });

  const epigrams = data?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['MyEpigrams'] });
    };
  }, [queryClient]);

  const handleToggleVisibility = () => {
    setIsListVisible((prevState) => !prevState); // 가시성 상태 토글
  };

  const userId = userInfo?.id; // 유저ID를 useAuth에서 가져옴
  const [isCommentVisible, setIsCommentVisible] = useState(true); // 댓글 리스트의 가시성 상태

  // 리액트쿼리를 활용해서 데이터를 가져오고 초기 렌더링하는 코드부분
  const {
    data: commentData,
    fetchNextPage: commentFetchNextPage,
    hasNextPage: commentHasNextPage,
    isFetching: commentIsFetching,
    isLoading: commentIsLoading,
  } = useInfiniteQuery({
    queryKey: ['MyComments', userId], // userId를 쿼리키에 포함
    queryFn: ({ pageParam = 0 }) => {
      if (userId === undefined) {
        throw new Error('User ID is undefined');
      }
      return getUserCommentDatas(pageParam, 5, userId); // userId를 매개변수로 전달
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  // 댓글 삭제 Mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MyComments', userId] });
    },
  });

  const handleDeleteMutation = (id: number) => {
    deleteCommentMutation.mutate(id);
  };

  // 댓글 수정 Mutation
  const editCommentMutation = useMutation({
    mutationFn: ({ id, content }: EditContent) => editComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MyComments', userId] });
    },
  });

  const handleEditMutation = (id: number, content: EditContentItem) => {
    editCommentMutation.mutate({ id, content });
  };

  const comments = commentData?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['MyComments', userId] });
    };
  }, [queryClient, userId]);

  if (commentIsLoading) return <LoadingSpinner />;

  const handleCommentVisibility = () => {
    setIsCommentVisible((prevState) => !prevState);
  };

  const epigramListProps = {
    isListVisible,
    fetchNextPage,
    hasNextPage,
    isLoading,
    epigrams,
  };

  const commentListProps = {
    comments,
    isCommentVisible,
    commentFetchNextPage,
    commentHasNextPage,
    handleDeleteMutation,
    handleEditMutation,
  };

  return (
    <>
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="flex space-x-8">
          <button
            className="cursor-pointer text-left text-xl font-semibold xl:text-[24px] xl:leading-8"
            onClick={() => {
              handleToggleVisibility();
              setActiveTab('epigram');
            }}
          >
            내 에피그램{' '}
            {isFetching || totalCount === null ? '' : `(${totalCount})`}
          </button>
          <button
            className="cursor-pointer text-xl font-semibold xl:text-[24px] xl:leading-8"
            onClick={() => {
              handleCommentVisibility();
              setActiveTab('comment');
            }}
          >
            내 댓글 {commentIsFetching && `(${commentData.totalCount})`}
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[312px] py-8 md:max-w-[384px] xl:max-w-[640px] xl:pt-28">
        <div className="flex flex-col gap-40"></div>
        <div className="mt-8">
          {activeTab === 'epigram' && (
            <MyEpigramList epigramListProps={epigramListProps} />
          )}
          {activeTab === 'comment' && (
            <MyCommentList commentListProps={commentListProps} />
          )}
        </div>
      </div>
      <div className="mt-8 space-y-8"></div>
    </>
  );
};

export default BottomList;
