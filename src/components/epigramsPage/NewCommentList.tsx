'use client';

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import Comment from '@/components/common/Comment';
import { getNewCommentDatas } from '@/api/client/getNewCommentDatas';
import { deleteComment } from '@/api/client/deleteComment';
import { useEffect, useState } from 'react';
import { editComment } from '@/api/client/editComment';
import Cookies from 'js-cookie';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface EditContentItem {
  isPrivate: boolean;
  content: string;
}

interface EditContent {
  id: number;
  content: EditContentItem;
}

const NewCommentList = () => {
  const [userId, setUserId] = useState<number | null>(null);

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
    // mutationFn은 무조건 하나의 매개변수만 넣을 수 있어서 매개변수를 객체형태로 만들어서 id와 content를 넣음
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
      queryClient.removeQueries({ queryKey: ['comments'] }); // 다른화면으로 이동하면 queryKey값을 제거함. 이렇게 해야지 다시 화면을 돌아왔을 때 초기화면이 됨
    };
  }, [queryClient]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl font-semibold xl:text-[24px] xl:leading-8">
        최신 댓글
      </h1>
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
            className={`rounded-full border border-[#CFDBEA] px-[20px] py-3 text-lg font-medium text-[#8B9DBC] xl:px-[50px] xl:text-2xl ${hasNextPage ? 'hover:bg-[#919191] hover:text-black-950' : 'border-[#CFDBEA]'}`}
          >
            {hasNextPage ? '+ 댓글 더보기' : '댓글 없음'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCommentList;
