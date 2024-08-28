'use client';

import Comment from '@/components/common/Comment';
import { CommentItem, CommentList } from '@/types/commentList';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

interface EditContentItem {
  isPrivate: boolean;
  content: string;
}

interface MyCommentListProps {
  userId: number;
  comments: CommentItem[];
  isCommentVisible: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<CommentList, unknown>, Error>
  >;
  hasNextPage: boolean;
  handleDeleteMutation: (id: number) => void;
  handleEditMutation: (id: number, content: EditContentItem) => void;
}

const MyCommentList: React.FC<MyCommentListProps> = ({
  userId,
  comments,
  isCommentVisible,
  fetchNextPage: commentFetchNextPage,
  hasNextPage: commentHasNextPage,
  handleDeleteMutation,
  handleEditMutation,
}) => {
  return (
    <div className="flex flex-col gap-10">
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
              disabled={!commentHasNextPage}
              onClick={() => commentFetchNextPage()}
              className={`rounded-full border border-[#CFDBEA] px-[20px] py-3 text-lg font-medium text-[#8B9DBC] xl:px-[50px] xl:text-2xl ${
                commentHasNextPage
                  ? 'hover:bg-[#919191] hover:text-black-950'
                  : 'border-[#CFDBEA]'
              }`}
            >
              {commentHasNextPage ? '+ 댓글 더보기' : '댓글 없음'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCommentList;
