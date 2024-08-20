import React from 'react';
import Tags from '@/components/common/Tags';
import { HighlightedDataItem } from '@/types/search';

interface EpigramItemProps {
  item: HighlightedDataItem;
  onClick: (id: number) => void;
}

const EpigramItem: React.FC<EpigramItemProps> = ({ item, onClick }) => {
  return (
    <div
      key={item.id}
      className="cursor-pointer border-b border-gray-100 py-4 md:px-6 xl:py-6"
      onClick={() => onClick(item.id)}
    >
      <div className="flex flex-col items-start justify-between gap-1 font-custom text-xl md:gap-2 xl:gap-6 xl:text-2xl xl:leading-[28px]">
        <p className="text-left text-black-600">{item.content}</p>
        <p className="bottom-[24px] right-[24px] text-right text-blue-400">
          -&nbsp;
          {item.author}
          &nbsp;-
        </p>
      </div>
      <Tags
        responseData={{
          ...item,
          tags: item.tags.map((tag) => ({
            ...tag,
            name: tag.name, // JSX.Element[]로 이미 처리된 상태
          })),
        }}
        containerClassName={
          'flex flex-row justify-end text-xl xl:text-2xl gap-3 xl:text-[20px] font-pretendard'
        }
        tagClassName={'inline'}
      />
    </div>
  );
};

export default EpigramItem;
