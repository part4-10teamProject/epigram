'use client';

import Image from 'next/image';
import React from 'react';
import { relativeTime } from '../../utils/relativeTime';

const DEFAULT_PROFILE_IMAGE = '/assets/images/default_profile.png';

// Mock data
const mockComment = {
  list: [
    {
      id: 66,
      content: 'string4',
      isPrivate: true,
      createdAt: '2024-07-29T05:05:39.994Z',
      updatedAt: '2024-07-29T05:05:39.994Z',
      writer: {
        id: 107,
        nickname: '고한샘',
        image: 'https://example.com/...',
      },
      epigramId: 154,
    },
    {
      id: 65,
      content: 'string3sdfsa fdsdfsdfs fsdfsdfsdf sdfdf dfdfsfsfsdfsfdsdf',
      isPrivate: true,
      createdAt: '2024-07-29T05:05:37.408Z',
      updatedAt: '2024-07-29T05:05:37.408Z',
      writer: {
        id: 107,
        nickname: '고한샘',
        image: 'https://example.com/...',
      },
      epigramId: 154,
    },
    {
      id: 64,
      content: 'string2',
      isPrivate: true,
      createdAt: '2024-07-29T05:05:34.145Z',
      updatedAt: '2024-07-29T05:05:34.145Z',
      writer: {
        id: 107,
        nickname: '고한샘',
        image: 'https://example.com/...',
      },
      epigramId: 154,
    },
    {
      id: 63,
      content: 'string',
      isPrivate: true,
      createdAt: '2024-07-29T05:05:17.064Z',
      updatedAt: '2024-07-29T05:05:17.064Z',
      writer: {
        id: 107,
        nickname: '고한샘',
        image: 'https://example.com/...',
      },
      epigramId: 154,
    },
  ],
  nextCursor: null,
  totalCount: 4,
};

interface Writer {
  id: number;
  nickname: string;
  image: string;
}

interface CommentItem {
  id: number;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  epigramId: number;
}

interface CommentProps {
  item: CommentItem;
}

// Comment component
export const Comment: React.FC<CommentProps> = ({ item }) => {
  const getImageSrc = (src: string) => {
    return src === 'https://example.com/...' ? DEFAULT_PROFILE_IMAGE : src;
  };
  return (
    <div className="mx-6 my-4 flex w-full gap-4 p-4 md:my-6 lg:my-[35px]">
      {/* 왼쪽 열: 프로필 이미지 */}
      <div className="relative h-12 w-12 flex-shrink-0">
        <Image
          src={getImageSrc(item.writer.image)}
          alt={`${item.writer.nickname}'s profile picture`}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>

      {/* 오른쪽 열: 댓글 내용 및 버튼 */}
      <div className="flex flex-1 flex-col gap-2 md:gap-3 xl:gap-4">
        {/* 첫 번째 행: 작성자, 작성시간, 수정, 삭제 버튼 */}
        <div className="flex items-center justify-between">
          <div className="leading-1.125 flex items-center justify-between gap-2 text-xs md:text-sm md:leading-6 lg:text-[16px] lg:leading-[26px]">
            <p>{item.writer.nickname}</p>
            <p>{relativeTime(item.createdAt)}</p>
          </div>
          <div className="flex gap-4">
            <button className="leading-1.125 border-b border-gray-700 bg-transparent text-xs text-gray-700 md:text-sm md:leading-6 lg:text-[16px] lg:leading-[26px]">
              수정
            </button>
            <button className="leading-1.125 border-b border-red-600 bg-transparent text-xs text-red-600 md:text-sm md:leading-6 lg:text-[16px] lg:leading-[26px]">
              삭제
            </button>
          </div>
        </div>

        {/* 두 번째 행: 댓글 내용 */}
        <div>
          <p className="flex-wrap text-sm font-normal leading-6 md:text-[16px] md:leading-[26px] lg:text-[20px] lg:leading-8">
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
};

// CommentList component
const CommentList: React.FC = () => {
  return (
    <div>
      {mockComment.list.map((item) => (
        <Comment key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CommentList;
