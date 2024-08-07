import React from 'react';
import { ResponseData } from '@/types/card';
import Tags from '@/components/common/Tags';

type Props = {
  responseData: ResponseData;
};

const Card: React.FC<Props> = ({ responseData }) => {
  const contentData = responseData.content;
  const authorData = responseData.author;

  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full rounded-[16px] border-[1px] border-solid border-[#F2F2F2] p-[24px] drop-shadow"
        style={{ backgroundImage: `url('/assets/images/image_bg.png')` }}
      >
        <div className="flex flex-col justify-between gap-[20px] font-custom text-[14px] md:text-[16px] xl:text-[24px]">
          <p className="bottom-[60px] left-[24px] top-[24px] m-0 break-words text-left">
            {contentData}
          </p>
          <p className="bottom-[24px] right-[24px] text-right text-blue-400">
            -{authorData}-
          </p>
        </div>
      </div>
      <Tags responseData={responseData} />
    </div>
  );
};

export default Card;
