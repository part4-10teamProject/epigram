'use client';
import Image from 'next/image';
import scroll from '../../../public/assets/images/scroll.png';
import plus from '../../../public/assets/images/plus.png';
import { useRouter } from 'next/navigation';
const ScrollButton = () => {
  const router = useRouter();
  const handleAddPage = () => {
    router.push('/addepigram');
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className="fixed bottom-[100px] right-[40px] z-50">
      <div className="flex flex-col gap-2">
        <button
          onClick={handleAddPage}
          className="flex items-center gap-1 rounded-full bg-blue-900 px-4 py-3 text-lg font-semibold text-white xl:px-5 xl:py-4 xl:text-2xl"
        >
          <Image src={plus} alt="추가" width={24} height={24} />
          에피그램 만들기
        </button>
        <div
          onClick={scrollTop}
          className="ml-auto h-12 w-12 cursor-pointer xl:h-16 xl:w-16"
        >
          <Image src={scroll} alt="스크롤" />
        </div>
      </div>
    </div>
  );
};

export default ScrollButton;
