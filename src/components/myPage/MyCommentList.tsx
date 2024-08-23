'use client';

import { deleteComment } from '@/api/client/deleteComment';
import { editComment } from '@/api/client/editComment';
import { getNewCommentDatas } from '@/api/client/getNewCommentDatas';
import Comment from '@/components/common/Comment';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import Cookies from 'js-cookie';
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
  const [userId, setUserId] = useState<number | null>(null);
  const [isCommentVisible, setIsCommentVisible] = useState(true); // 댓글 리스트의 가시성 상태

  // 리액트쿼리를 활용해서 데이터를 가져오고 초기 렌더링하는 코드부분
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: ({ pageParam = 0 }) => getNewCommentDatas(pageParam, 5),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  const queryClient = useQueryClient();

  // 삭제시 실행되는 코드 부분
  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleDeleteMutation = (id: number) => {
    deleteCommentMutation.mutate(id);
  };

  // 수정시 실행되는 코드 부분
  const editCommentMutation = useMutation({
    mutationFn: ({ id, content }: EditContent) => editComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleEditMutation = (id: number, content: EditContentItem) => {
    editCommentMutation.mutate({ id, content });
  };

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => {
    const cookieUserId = Cookies.get('userId');
    if (cookieUserId) {
      setUserId(Number(cookieUserId));
    }
    return () => {
      queryClient.removeQueries({ queryKey: ['comments'] });
    };
  }, [queryClient]);

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
            {comments && comments.length > 0 ? (
              comments?.map((comment) => (
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
