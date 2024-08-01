import React from 'react';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-[44px] w-full rounded-[12px] border-none bg-blue-200 pl-[16px] text-[16px] placeholder-blue-400 xl:text-[20px]"
    />
  );
};

export default Input;
