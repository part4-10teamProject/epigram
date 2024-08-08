const NewCommentList = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl font-semibold xl:text-[24px] xl:leading-8">
        최신 댓글
      </h1>
      <div>
        <div>카드내용 렌더링중</div>
        <div className="mt-[72px] text-center">
          <button className="rounded-full border border-[#CFDBEA] px-[20px] py-3 text-lg font-medium text-[#8B9DBC] xl:px-[50px] xl:text-2xl">
            + 댓글 더보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCommentList;
