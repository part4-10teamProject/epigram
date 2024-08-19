import { ResponseData } from '@/types/card';
type Props = {
  responseData: ResponseData;
  containerClassName?: string;
  tagClassName?: string;
};

const Tags: React.FC<Props> = ({
  responseData,
  containerClassName,
  tagClassName,
}) => {
  const tagDataArray = responseData.tags ?? [];

  return (
    <div
      className={`font-custom text-[12px] text-blue-400 md:text-[16px] xl:text-[24px] ${containerClassName}`}
    >
      {tagDataArray.map((tag: { name: string; id: number }) => {
        const tagName = tag.name;
        const index = tag.id;

        return (
          <p key={index} className={tagClassName}>
            #{tagName}
          </p>
        );
      })}
    </div>
  );
};

export default Tags;
