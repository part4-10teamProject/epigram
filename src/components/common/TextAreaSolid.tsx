function TextAreaSolid() {
  return (
    <div>
      <input
        type="text"
        name="댓글"
        id="todo-input"
        placeholder="500자 이내로 입력해주세요."
        className="border-gray top-0 m-4 h-[132px] w-[312px] justify-center rounded-lg border text-xl font-[400]"
      />
      <form className="static h-[192px] w-[400px]">
        <input
          type="text"
          name="댓글"
          id="todo-input"
          placeholder="본문을 적어볼까요"
          className="top-0 m-4 h-[132px] w-[312px] rounded-lg border border-black text-xl font-[400]"
        />
        <p className="flex flex-row-reverse px-[70px] text-xl text-red-600 dark:text-red-50">
          500자 이내로 입력해주세요!
        </p>
      </form>
    </div>
  );
}

export default TextAreaSolid;
