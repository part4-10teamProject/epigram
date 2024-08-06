import Image from 'next/image';
import { landingImages } from '../utils/landingImages';

const imagesForCard = (key: string) => {
  return landingImages[key].map((image, index) => (
    <div key={index} className={image.className}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority
      />
    </div>
  ));
};

export default function Home() {
  return (
    <div className="mx-auto flex w-full flex-col items-center">
      <div className="flex h-[672px] w-full flex-col items-center gap-[168px] border border-black-200 md:h-[676px] md:gap-[106px] xl:h-[960px] xl:gap-[214px]">
        <div className="mt-[200px] flex h-[184px] w-[250px] flex-col items-center justify-between bg-red-200 md:mt-[204px] md:h-[228px] md:w-[332px] xl:mt-[320px] xl:h-[308px] xl:w-[415px]">
          <div>
            <h2 className="mb-[8px] text-center text-2xl font-normal leading-[40px] text-black-500 md:mb-[24px] md:text-3xl md:leading-[48px] xl:mb-[40px] xl:text-4xl">
              나만 갖고 있기엔 <br />
              아까운 글이 있지 않나요?
            </h2>
            <p className="text-center text-lg text-black-300 md:text-xl">
              다른 사람들과 감정을 공유해 보세요.
            </p>
          </div>
          <button className="h-[48px] w-[112px] rounded-xl bg-black-500 text-xl font-semibold text-blue-100 xl:h-[64px] xl:w-[286px] xl:text-2xl">
            시작하기
          </button>
        </div>
        <div className="mb-[20px] flex h-[48px] w-[56] flex-col items-center justify-between bg-black-300 md:h-[54px] md:w-[74px] xl:mb-[58px]">
          <p className="text-center text-sm font-semibold text-blue-400 md:text-xl">
            더 알아보기
          </p>
          <div>
            <Image
              src="/assets/icons/chevron_up.svg"
              alt="더보기"
              width={24}
              height={24}
              priority
            />
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center gap-[196px] border border-black-200 md:gap-[220px] xl:gap-[380px]">
        <div className="absolute top-0 h-[15px] w-full border border-red-700 bg-red-600"></div>
        <div className="mt-[139px] flex h-[382px] w-[312px] flex-col justify-between bg-yellow-400 md:h-[390px] md:w-[384px] xl:mt-[155px] xl:h-[388px] xl:w-[1188px]">
          {imagesForCard('one')}
          <div>
            <h3 className="text-left text-2xl text-[24px] font-bold text-black-950">
              명언이나 글귀,
              <br /> 토막 상식들을 공유해 보세요.
            </h3>
            <p className="text-xl font-normal text-blue-600">
              나만 알던 소중한 글들을 <br />
              다른 사람들에게 전파하세요.
            </p>
          </div>
        </div>
        <div className="flex h-[355px] w-[312px] flex-col justify-between bg-yellow-400 md:h-[390px] md:w-[384px] xl:h-[388px] xl:w-[1195px]">
          {imagesForCard('two')}
          <div>
            <h3 className="text-left text-2xl text-[24px] font-bold text-black-950">
              감정 상태에 따라, <br />
              알맞은 위로를 받을 수 있어요.
            </h3>
            <p className="text-xl font-normal text-blue-600">
              태그를 통해 글을 모아 볼 수 있어요.
            </p>
          </div>
        </div>
        <div className="flex h-[381px] w-[312px] flex-col justify-between bg-yellow-400 md:h-[390px] md:w-[384px] xl:h-[388px] xl:w-[1186px]">
          {imagesForCard('three')}
          <div>
            <h3 className="text-left text-2xl text-[24px] font-bold text-black-950">
              내가 요즘 어떤 감정 상태인지
              <br /> 통계로 한눈에 볼 수 있어요.
            </h3>
            <p className="text-xl font-normal text-blue-600">
              감정 달력으로 내 마음에 담긴
              <br /> 감정을 확인해보세요.
            </p>
          </div>
        </div>
        <div className="mb-[35px] flex h-[680px] w-[312px] flex-col justify-between bg-yellow-400 md:mb-[45px] md:h-[792px] md:w-[384px] xl:mb-[75px] xl:h-[1056px] xl:w-[640px]">
          <h3>
            사용자들이 직접 <br />
            인용한 에피그램들
          </h3>
          {imagesForCard('four')}
        </div>
        <div className="absolute bottom-0 h-[15px] w-full border border-red-700 bg-red-600"></div>
      </div>

      <div className="flex h-[600px] w-full flex-col items-center border border-black-200 md:h-[528px] xl:h-[1040px]">
        <div className="mb-[270px] mt-[180px] h-[150px] w-[122px] bg-red-200 md:mb-[198px] md:mt-[180px] xl:mb-[403px] xl:mt-[420px] xl:h-[217px] xl:w-[286px]">
          <h2>날마다 에피그램</h2>
          <button>시작하기</button>
        </div>
      </div>
    </div>
  );
}
