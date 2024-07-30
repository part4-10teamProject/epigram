//import { useState } from 'react';

const Card = () => {
  return (
    <div className="w-[312px] rounded-[16px] border-none bg-none p-[24px]">
      <div className="font-custom relative text-[14px]">
        <p className="absolute left-0 top-0 break-words"></p>
        <p className="text-gray absolute bottom-0 right-0"></p>
      </div>
    </div>
  );
};

export default Card;
