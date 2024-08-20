'use client';

import { InputProps } from '@/types/Form';

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  outlineStyle,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`h-[44px] w-full rounded-[12px] bg-blue-200 p-[16px] text-[16px] placeholder-blue-400 xl:h-[64px] xl:text-[20px] ${outlineStyle}`}
    />
  );
};

export default Input;
