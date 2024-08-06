import { ResponseData } from '@/types/card';
type Props = {
  responseData: ResponseData;
  textAlign?: string;
};

const Tags: React.FC<Props> = ({ responseData, textAlign }) => {
  const tagDataArray = responseData.tags;

  return (
    <div
      className={`font-custom text-[12px] text-blue-400 md:text-[16px] xl:text-[24px] ${textAlign}`}
    >
      {tagDataArray.map((tag: { name: string; id: number }) => {
        const tagName = tag.name;
        const index = tag.id;

        return <p key={index}>#{tagName}</p>;
      })}
    </div>
  );
};

export default Tags;
