import { ResponseData } from '@/types/card';
type Props = {
  responseData: ResponseData;
};

const Tags: React.FC<Props> = ({ responseData }) => {
  const tagDataArray = responseData.tags ?? []; // tag가 없는 경우에는 빈 배열을 반환하게 만들어서 오류를 없앰

  return (
    <div
      className={`flex justify-end gap-4 font-custom text-[12px] text-blue-400 md:text-[16px] xl:text-[24px]`}
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
