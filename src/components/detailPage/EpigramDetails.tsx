'use client';
import { useState } from 'react';
import Tags from '../common/Tags';
import toggle from '../../../public/assets/images/toggle.png';
import Image from 'next/image';
import Link from 'next/link';
import like from '../../../public/assets/icons/like.svg';
import move from '../../../public/assets/images/move.png';
import redlike from '../../../public/assets/icons/redlike.svg';
import { Epigrams } from '@/types/epigramList';

interface EpigramProps {
  epigram: Epigrams;
}

const EpigramDetails: React.FC<EpigramProps> = ({ epigram }) => {
  const [isMyPost, setIsMyPost] = useState(true);
  const [isDropDown, setIsDropDown] = useState(false);
  const [isLike, setIsLike] = useState(epigram.isLiked);
  const [likeCount, setLikeCount] = useState(epigram.likeCount);

  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Tags responseData={epigram} containerClassName={'flex gap-[16px]'} />
          {isMyPost && (
            <div className="relative h-[24px] w-[24px] cursor-pointer xl:h-[36px] xl:w-[36px]">
              <Image
                onClick={() => setIsDropDown(!isDropDown)}
                src={toggle}
                alt="토글"
              />
              {isDropDown && (
                <div className="absolute right-0 top-12 rounded-2xl border border-blue-300">
                  <div className="rounded- h-[40px] w-[97px] rounded-bl-[0px] rounded-br-[0px] rounded-tl-[16px] rounded-tr-[16px] bg-background px-6 py-2 text-lg hover:bg-blue-300 xl:h-[56px] xl:w-[134px] xl:px-8 xl:py-3 xl:text-2xl">
                    <Link href="/">수정하기</Link>
                  </div>
                  <div className="h-[40px] w-[97px] rounded-bl-[16px] rounded-br-[16px] rounded-tl-[0px] rounded-tr-[0px] bg-background px-6 py-2 text-lg hover:bg-blue-300 xl:h-[56px] xl:w-[134px] xl:px-8 xl:py-3 xl:text-2xl">
                    삭제하기
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="font-custom text-[24px] leading-[40px] xl:text-[32px] xl:leading-[48px]">
          {epigram.content}
        </div>
        <div className="text-right font-custom text-[16px] leading-[26px] text-[#ABB8CE] md:text-[20px] md:leading-[28px] xl:text-[24px] xl:leading-[20px]">
          - {epigram.author} -
        </div>
      </div>
      <div className="absolute left-1/2 top-[300px] flex -translate-x-1/2 transform items-center gap-4 md:top-[365px] xl:top-[400px]">
        <button className="flex items-center gap-1 rounded-full bg-black-600 px-[14px] py-[6px] text-white">
          {isLike ? (
            <Image
              src={redlike}
              alt="좋아요"
              className="h-5 w-5 xl:h-9 xl:w-9"
            />
          ) : (
            <Image src={like} alt="좋아요" className="h-5 w-5 xl:h-9 xl:w-9" />
          )}

          {likeCount}
        </button>
        <Link href={`${epigram.referenceUrl}`}>
          <div className="flex items-center gap-[5px] rounded-full bg-[#F2F2F2] px-[14px] py-[6px] text-[#ABABAB] xl:text-2xl">
            {epigram.referenceTitle}
            <Image
              className="h-5 w-5 xl:h-9 xl:w-9"
              src={move}
              alt="이동하기"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EpigramDetails;
