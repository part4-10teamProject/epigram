'use client';

import Image from 'next/image';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
}

const SearchText: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onIconClick,
}) => {
  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        className="h-[52px] w-full border-0 border-b-2 border-blue-800 py-2 pr-5 text-xl text-black-700 focus:outline-none md:h-[60px] md:text-2xl xl:h-[80px] xl:border-b-4 xl:pr-8 xl:text-[24px]"
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={onIconClick}
      >
        <Image
          src="/assets/icons/search_icon.svg"
          alt="Search Icon"
          width={20}
          height={20}
          className="h-5 w-5 md:h-5 md:w-5 xl:h-9 xl:w-9"
        />
      </div>
    </div>
  );
};

export default SearchText;
