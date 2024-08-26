'use client';

import { deleteComment } from '@/api/client/deleteComment';
import { editComment } from '@/api/client/editComment';
import { getUserCommentDatas } from '@/api/client/getUserCommentsDatas';
import Comment from '@/components/common/Comment';
import { useAuth } from '@/contexts/AuthContext';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface EditContentItem {
  isPrivate: boolean;
  content: string;
}

interface EditContent {
  id: number;
  content: EditContentItem;
}

const MyCommentList = () => {
  const { userInfo } = useAuth();
  const userId = userInfo?.id; // 유저ID를 useAuth에서 가져옴
  const [isCommentVisible, setIsCommentVisible] = useState(true); // 댓글 리스트의 가시성 상태

  // 리액트쿼리를 활용해서 데이터를 가져오고 초기 렌더링하는 코드부분
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
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

  const queryClient = useQueryClient();

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

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['MyComments', userId] });
    };
  }, [queryClient, userId]);

  if (isLoading) return <LoadingSpinner />;

  const handleToggleVisibility = () => {
    setIsCommentVisible((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-10">
      <h1
        className="cursor-pointer text-xl font-semibold xl:text-[24px] xl:leading-8"
        onClick={handleToggleVisibility}
      >
        내 댓글 ({comments.length})
      </h1>
      {isCommentVisible && ( // 댓글 리스트의 가시성 상태에 따라 보여주기
        <div>
          <div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-t border-[#CFDBEA]">
                  <Comment
                    item={comment}
                    isMyComment={userId === comment.writer.id}
                    onDelete={(id) => handleDeleteMutation(id)}
                    onEdit={(id, content) => handleEditMutation(id, content)}
                  />
                </div>
              ))
            ) : (
              <div>댓글이 없습니다.</div>
            )}
          </div>
          <div className="mt-[72px] text-center">
            <button
              disabled={!hasNextPage}
              onClick={() => fetchNextPage()}
              className={`rounded-full border border-[#CFDBEA] px-[20px] py-3 text-lg font-medium text-[#8B9DBC] xl:px-[50px] xl:text-2xl ${
                hasNextPage
                  ? 'hover:bg-[#919191] hover:text-black-950'
                  : 'border-[#CFDBEA]'
              }`}
            >
              {hasNextPage ? '+ 댓글 더보기' : '댓글 없음'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCommentList;
