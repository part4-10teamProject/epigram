'use client';

import Image from 'next/image';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchText: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-[50%]">
      {/* 부모 컨테이너 부분이고 임시로 만듬 */}
      <div className="relative w-full">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-[52px] w-full border-0 border-b-2 py-2 pr-5 text-base focus:outline-none md:h-[60px] md:text-xl lg:h-[80px] lg:pr-8 lg:text-2xl"
          style={{ borderBottomColor: '#40516E' }}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
          <Image
            src="/assets/icons/search_icon.svg"
            alt="Search Icon"
            width={20}
            height={20}
            className="h-5 w-5 md:h-5 md:w-5 lg:h-9 lg:w-9"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchText;
