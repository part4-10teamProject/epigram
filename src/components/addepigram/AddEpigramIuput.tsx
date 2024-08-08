'use client';

import { useState } from 'react';

const AddEpigramNameInput: React.FC = () => {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <div>
        <p className="w-[600px] text-[20px] leading-8">
          {' '}
          저자{' '}
          <span className="w-[500px] text-[24px] leading-8 text-red-500">
            {' '}
            *{' '}
          </span>
        </p>
      </div>
      <form>
        <label>
          <input type="radio" name="직접 입력" color="black" /> 직접 입력
          <input
            className="pl-10"
            type="radio"
            name="직접 입력"
            color="black"
          />
          알 수 없음
          <input type="radio" name="직접 입력" color="black" /> 본인
        </label>
      </form>
      <label>
        <input
          value={name}
          className="h-[64px] w-[640px] gap-2 rounded-lg border pl-3 focus:border-red-500"
          placeholder="저자 이름 입력"
          name=""
          type="text"
          onChange={handleChange}
        ></input>
      </label>
    </div>
  );
};

export default AddEpigramNameInput;
