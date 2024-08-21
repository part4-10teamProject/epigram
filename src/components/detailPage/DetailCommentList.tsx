'use client';

import Image from 'next/image';
import defaultProfile from '../../../public/assets/images/default_profile.png';
import Comment from '../common/Comment';
import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getDetailCommentData } from '@/api/client/getDetailCommentData';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface IdProps {
  id: number;
}

const DetailCommentList: React.FC<IdProps> = ({ id }) => {
  const [commentInput, setCommentInput] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['detailComment'],
    queryFn: ({ pageParam = 0 }) => getDetailCommentData(id, pageParam, 3, 4),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="mx-auto">
          <h1 className="pb-6 text-xl font-semibold xl:text-2xl">댓글</h1>
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
                  <button className="mt-3 rounded-lg bg-black-500 px-4 py-2 text-white">
                    저장
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        {comments.map((comment) => (
          <div key={comment.id} className="border-t border-[#CFDBEA]">
            <Comment
              item={comment}
              isMyComment={true}
              onDelete={() => console.log('삭제')}
              onEdit={() => console.log('수정')}
            />
          </div>
        ))}
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
