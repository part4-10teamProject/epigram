const Tags = () => {
  const responseData = {
    tags: [
      {
        name: '태그',
        id: 1,
      },
    ],
  };

  const tagDataArray: { name: string; id: number }[] = responseData.tags;

  return (
    <div className="flex font-custom text-[12px] text-blue-400 md:text-[16px] xl:text-[24px]">
      {tagDataArray.map((tag: { name: string; id: number }) => {
        const tagName = tag.name;
        const index = tag.id;

        return <p key={index}>#{tagName}</p>;
      })}
    </div>
  );
};

export default Tags;
