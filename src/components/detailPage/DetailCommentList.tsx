'use client';

import Image from 'next/image';
import defaultProfile from '../../../public/assets/images/default_profile.png';
import Comment from '../common/Comment';
import React, { useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { getDetailCommentData } from '@/api/client/getDetailCommentData';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { addComment } from '@/api/client/addComment';
import Cookies from 'js-cookie';
import { deleteComment } from '@/api/client/deleteComment';
import { editComment } from '@/api/client/editComment';

interface IdProps {
  id: number;
}

interface AddCommentType {
  epigramId: number;
  isPrivate: boolean;
  content: string;
}

interface EditContentItem {
  isPrivate: boolean;
  content: string;
}

interface EditContent {
  id: number;
  content: EditContentItem;
}

const DetailCommentList: React.FC<IdProps> = ({ id }) => {
  const [commentInput, setCommentInput] = useState('');
  const queryClient = useQueryClient();

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['detailComment'],
    queryFn: ({ pageParam = 0 }) => getDetailCommentData(id, pageParam, 3, 4),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  // 댓글을 추가하면 실행되는 부분
  const AddCommentMutation = useMutation({
    mutationFn: (content: AddCommentType) => addComment(content),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['detailComment'] }),
  });

  const handleAddMutation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const content: AddCommentType = {
      epigramId: id,
      isPrivate: false,
      content: commentInput,
    };
    AddCommentMutation.mutate(content);
    setCommentInput('');
  };

  // 삭제시 실행되는 코드 부분
  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['detailComment'] });
    },
  });

  const handleDeleteMutation = (id: number) => {
    deleteCommentMutation.mutate(id);
  };

  // 수정시 실행되는 코드 부분
  const editCommentMutation = useMutation({
    mutationFn: ({ id, content }: EditContent) => editComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['detailComment'] });
    },
  });

  const handleEditMutation = (id: number, content: EditContentItem) => {
    editCommentMutation.mutate({ id, content });
  };

  const comments = data?.pages.flatMap((page) => page.list) ?? [];
  const { totalCount } = data?.pages[0] ?? 0;
  const userId = Number(Cookies.get('userId'));

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="mx-auto">
          <h1 className="pb-6 text-xl font-semibold xl:text-2xl">
            댓글 ({totalCount})
          </h1>
          <div className="flex gap-6">
            <div>
              <Image
                width={48}
                height={48}
                className="rounded-full"
                src={defaultProfile}
                alt="이미지"
              />
            </div>
            <form>
              <textarea
                onChange={handleInput}
                value={commentInput}
                placeholder="100자 이내로 입력해주세요."
                className="h-[80px] w-[248px] resize-none rounded-lg border border-[#CFDBEA] bg-background px-4 py-3 text-base md:h-[80px] md:w-[320px] xl:h-[104px] xl:w-[568px] xl:text-2xl"
              />
              {commentInput && (
                <div className="text-end">
                  <button
                    onClick={handleAddMutation}
                    className="mt-3 rounded-lg bg-black-500 px-4 py-2 text-white"
                  >
                    저장
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        {comments && comments.length > 0 ? (
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
          <div className="text-center text-2xl">댓글을 추가해주세요</div>
        )}
      </div>
      <div className="mt-20 text-center">
        <button
          onClick={() => fetchNextPage()}
          className={`rounded-full border border-[#CFDBEA] px-[20px] py-3 text-lg font-medium text-[#8B9DBC] xl:px-[50px] xl:text-2xl`}
        >
          + 댓글 더보기
        </button>
      </div>
    </div>
  );
};

export default DetailCommentList;
