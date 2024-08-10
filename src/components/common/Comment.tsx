'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { relativeTime } from '../../utils/relativeTime';
import { CommentItem } from '@/types/commentList';
import defaultImg from '../../../public/assets/images/default_profile.png';

// Mock data : test 할때 Comment 프롭으로 전달하기
// const item = {
//   id: 66,
//   content: 'string4',
//   isPrivate: true,
//   createdAt: '2024-07-29T05:05:39.994Z',
//   updatedAt: '2024-07-29T05:05:39.994Z',
//   writer: {
//     id: 107,
//     nickname: '고한샘',
//     image: 'https://example.com/...',
//   },
//   epigramId: 154,
// };

interface CommentProps {
  item: CommentItem;
  isMyComment?: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number, content: string) => void;
}

// Comment component
const Comment: React.FC<CommentProps> = ({
  item,
  isMyComment = false,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editContent, setEditContent] = useState(item.content); // 수정 중인 내용 상태

  const profileImg =
    item.writer.image === null ? defaultImg : item.writer.image;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(item.content);
  };

  const handleSaveEdit = () => {
    onEdit(item.id, editContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      onDelete(item.id);
    }
  };

  return (
    <div className="flex w-full gap-4 p-4">
      {/* 왼쪽 열: 프로필 이미지 */}
      <div className="relative h-12 w-12 flex-shrink-0">
        <Image
          src={profileImg}
          alt={`${item.writer.nickname}'s profile`}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>

      {/* 오른쪽 열: 댓글 내용 및 버튼 */}
      <div className="flex flex-1 flex-col gap-2 md:gap-3 xl:gap-4">
        {/* 첫 번째 행: 작성자, 작성시간, 수정, 삭제 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-2 text-xs text-black-300 md:text-lg xl:text-xl">
            <p>{item.writer.nickname}</p>
            <p>{relativeTime(item.createdAt)}</p>
          </div>
          {isMyComment && (
            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <button
                    className="border-b border-black-600 bg-transparent text-xs text-black-600 md:text-lg xl:text-xl"
                    onClick={handleSaveEdit}
                  >
                    저장
                  </button>
                  <button
                    className="border-b border-redState bg-transparent text-xs text-redState md:text-lg xl:text-xl"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="border-b border-black-600 bg-transparent text-xs text-black-600 md:text-lg xl:text-xl"
                    onClick={handleEdit}
                  >
                    수정
                  </button>
                  <button
                    className="border-b border-redState bg-transparent text-xs text-redState md:text-lg xl:text-xl"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* 두 번째 행: 댓글 내용 */}
        <div>
          {isEditing ? (
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
            />
          ) : (
            <p className="flex-wrap text-lg text-black-700 md:text-xl xl:text-2xl">
              {item.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
