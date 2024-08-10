'use client';

import { CommentItem, CommentList } from '@/types/commentList';
import { useInfiniteQuery } from '@tanstack/react-query';
import Comment from '@/components/common/Comment';
import { getNewCommentDatas } from '@/api/client/getNewCommentDatas';

interface CommentProps {
  commentList: CommentList;
}

const NewCommentList: React.FC<CommentProps> = ({ commentList }) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: ({ pageParam = 0 }) => getNewCommentDatas(pageParam, 5),
    initialPageParam: undefined,
    initialData: {
      pages: [commentList],
      pageParams: [0],
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  const comments: CommentItem[] = data.pages.flatMap((page) => page.list);
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl font-semibold xl:text-[24px] xl:leading-8">
        최신 댓글
      </h1>
      <div>
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="border-t border-[#CFDBEA]">
              <Comment
                item={comment}
                isMyComment={true}
                onDelete={(id) => console.log('id', id)} // 일단 임시로 콘솔입력되는 함수 넣음
                onEdit={() => console.log('편집중')} // 일단 임시로 콘솔입력되는 함수 넣음
              />
            </div>
          ))}
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
