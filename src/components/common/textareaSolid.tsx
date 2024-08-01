'use client';

function TextAreaSolid() {
  return (
    <form className="group relative">
      <textarea
        typeof="text"
        id="내용"
        maxLength={500}
        rows={15}
        placeholder="500자 이내로 입력해주세요"
        onFocus={() => console.log('본문을 작성해주세요')}
        className="h-[132px] w-[312px] border pl-2 pt-2 text-xl font-normal leading-[26px] group-hover:border-red-500 group-active:border-red-500 md:h-[132px] md:w-[384px] xl:h-[148px] xl:w-[640px]"
      ></textarea>

      <p className="invisible mt-2 w-[312px] text-right text-sm text-pink-600 group-hover:visible group-active:visible md:h-[132px] md:w-[384px] xl:h-[148px] xl:w-[640px]">
        500자 이내로 입력해주세요.
      </p>
    </form>
  );
}

export default TextAreaSolid;
