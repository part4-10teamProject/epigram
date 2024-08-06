'use client';

import { useState } from 'react';

function TextAreaSolid() {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <label className="">
      <textarea
        name="에피그램 내용 작성"
        typeof="text"
        value={text}
        id="내용"
        maxLength={500}
        onChange={handleChange}
        placeholder="500자 이내로 입력해주세요"
        className="resize: none h-[132px] w-[312px] border pl-2 pt-2 text-xl font-normal leading-[26px] group-hover:border-red-500 group-active:border-red-500 md:h-[132px] md:w-[384px] xl:h-[148px] xl:w-[640px]"
      ></textarea>

      <p
        className={`${text.length >= 500 ? 'block' : 'hidden'} mt-2 w-[312px] text-right text-sm text-pink-600 md:h-[132px] md:w-[384px] xl:h-[148px] xl:w-[640px]`}
      >
        500자 이내로 입력해주세요.
      </p>
    </label>
  );
}

export default TextAreaSolid;
