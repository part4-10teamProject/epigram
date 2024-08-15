import React from 'react';
import { ResponseData } from '@/types/card';
import Tags from '@/components/common/Tags';

type FeedProps = {
  epigramData: ResponseData;
};

const FeedCard: React.FC<FeedProps> = ({ epigramData }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-[140px] w-[312px] rounded-[16px] border border-[#F2F2F2] p-[24px] drop-shadow md:h-[180px] md:w-[294px] xl:h-[259px] xl:w-[585px]">
        <div className="flex h-full flex-col justify-between font-custom text-lg md:text-xl xl:text-[24px] xl:leading-10">
          <p className="line-clamp-2 text-ellipsis md:line-clamp-4">
            {epigramData.content}
          </p>
          <p className="text-right text-blue-400">-{epigramData.author}-</p>
        </div>
      </div>
      <Tags
        responseData={epigramData}
        containerClassName="flex justify-end gap-4"
      />
    </div>
  );
};

export default FeedCard;
