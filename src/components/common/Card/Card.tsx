import { ResponseData } from '@/types/sample';

const Card = (responseData: ResponseData) => {
  //fetch get한 response 중 페이지에 알맞은 endpoint의 것 특정 후의 코드
  responseData = {
    likeCount: 0,
    tags: [
      {
        name: '태그',
        id: 1,
      },
    ],
    writerId: 1,
    referenceUrl: 'string',
    referenceTitle: 'string',
    author: '저자',
    content: '에피그램 내용입니다.',
    id: 1,
    isLiked: true,
  };

  const contentData = responseData.content;
  const authorData = responseData.author;

  return (
    <div className="w-full rounded-[16px] border-none bg-none p-[24px]">
      <div className="flex flex-col justify-between gap-[20px] font-custom text-[14px]">
        <p className="bottom-[60px] left-[24px] top-[24px] m-0 break-words text-left">
          {contentData}
        </p>
        <p className="bottom-[24px] right-[24px] text-right text-blue-400">
          -{authorData}-
        </p>
      </div>
    </div>
  );
};

export default Card;
