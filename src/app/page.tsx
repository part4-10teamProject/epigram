export default function Home() {
  return (
    <div className="mx-auto flex w-full flex-col items-center">
      <div className="flex h-[672px] w-full flex-col items-center gap-[168px] border border-black-200 md:h-[676px] xl:h-[960px]">
        <div className="mt-[200px] h-[184px] w-[250px] bg-red-200 md:h-[228px] md:w-[332px] xl:h-[308px] xl:w-[415px]">
          배너 1
        </div>
        <div className="mb-[20px] h-[48px] w-[56] bg-black-300 md:h-[54px] md:w-[74px] xl:mb-[58px]">
          더 알아보기22
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center gap-[196px] border border-black-200 md:gap-[220px] xl:gap-[380px]">
        <div className="absolute top-0 h-[15px] w-full border border-red-700 bg-red-600"></div>
        <div className="mt-[139px] h-[382px] w-[312px] bg-yellow-400 md:h-[390px] md:w-[384px] xl:mt-[155px] xl:h-[388px] xl:w-[1188px]">
          카드 1
        </div>
        <div className="h-[355px] w-[312px] bg-yellow-400 md:h-[390px] md:w-[384px] xl:h-[388px] xl:w-[1195px]">
          카드 2
        </div>
        <div className="h-[381px] w-[312px] bg-yellow-400 md:h-[390px] md:w-[384px] xl:h-[388px] xl:w-[1186px]">
          카드 3
        </div>
        <div className="mb-[35px] h-[680px] w-[312px] bg-yellow-400 md:mb-[45px] md:h-[792px] md:w-[384px] xl:mb-[75px] xl:h-[1056px] xl:w-[640px]">
          카드 4
        </div>
        <div className="absolute bottom-0 h-[15px] w-full border border-red-700 bg-red-600"></div>
      </div>

      <div className="flex h-[600px] w-full flex-col items-center border border-black-200 md:h-[528px] xl:h-[1040px]">
        <div className="mb-[270px] mt-[180px] h-[150px] w-[122px] bg-red-200 md:mb-[198px] md:mt-[180px] xl:mb-[403px] xl:mt-[420px] xl:h-[217px] xl:w-[286px]">
          배너 2
        </div>
      </div>
    </div>
  );
}
