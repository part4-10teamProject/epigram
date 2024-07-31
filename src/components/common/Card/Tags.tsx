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
    <div className="flex font-custom text-blue-400">
      {tagDataArray.map((tag: { name: string; id: number }) => {
        const tagName = tag.name;
        const index = tag.id;

        return <p key={index}>#{tagName}</p>;
      })}
    </div>
  );
};

export default Tags;
