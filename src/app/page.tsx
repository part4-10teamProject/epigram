import ButtonStart from '@/components/common/ButtonStart';
import Image from 'next/image';
import { landingImages } from '../utils/landingImages';

<<<<<<< HEAD
const imagesForCard = (key: string) => {
  return landingImages[key].map((image, index) => (
    <div key={index} className={image.className}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
      />
    </div>
  ));
};
=======
// import { useEffect, useState } from 'react';
import EmotionBoard from '../components/common/EmotionBoard';
import EmotionCalender from '../components/common/EmotionCalender';
>>>>>>> 781eac8 (🐛 용인님 리뷰수정작업)

// export default function Home() {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return (
//     <h1>
//       {isClient ? (
//         <>
//           <EmotionBoard />
//           <EmotionCalender />
//         </>
//       ) : (
//         'Prerendered'
//       )}
//     </h1>
//   );
// }

// 현재 애플리케이션을 렌더링할 때, 서버에서 사전 렌더링된 React 트리와 브라우저에서 처음 렌더링(수화) 중에 렌더링된 React 트리 사이에 차이가 있습니다.
// 해결방법 : 위와 같이 초기랜더링을 클라이언트 일때 랜더링 하게 하거나, 아래와 같이 다이나믹 옵션으로 서버랜더링 취소 할수 있습니다. 또는 이게 프롭으로 locale='ko'를 넣었습니다. 랜더링 다른부분을 찾아서 해결!
// import dynamic from 'next/dynamic';

// const NoSSR = dynamic(() => import('../components/common/EmotionCalender'), {
//   ssr: false,
// });

export default function Page() {
  return (
<<<<<<< HEAD
    <div className="mx-auto flex w-full flex-col items-center">
      <div className="flex h-[672px] w-full flex-col items-center gap-[168px] bg-striped md:h-[676px] md:gap-[106px] xl:h-[960px] xl:gap-[214px]">
        <div className="mt-[200px] flex h-[184px] w-[250px] flex-col items-center justify-between md:mt-[204px] md:h-[228px] md:w-[332px] xl:mt-[320px] xl:h-[308px] xl:w-[415px]">
          <div>
            <h2 className="mb-[8px] text-center font-custom text-2xl font-normal leading-[40px] text-black-500 md:mb-[24px] md:text-3xl md:leading-[48px] xl:mb-[40px] xl:text-4xl">
              나만 갖고 있기엔 <br />
              아까운 글이 있지 않나요?
            </h2>
            <p className="text-center font-custom text-lg text-black-300 md:text-xl">
              다른 사람들과 감정을 공유해 보세요.
            </p>
          </div>
          <div className="xl:w-[286px]">
            <ButtonStart text="시작하기" />
          </div>
        </div>
        <div className="mb-[20px] flex h-[48px] w-[56] flex-col items-center justify-between md:h-[54px] md:w-[74px] xl:mb-[58px]">
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

      <div className="relative flex w-full flex-col items-center gap-[196px] border-b border-[#f2f2f2] bg-background md:gap-[220px] xl:gap-[380px]">
        <div className="absolute left-0 top-[-15px] h-[40px] w-full bg-zigzag-pattern" />
        <div className="mt-[139px] flex h-[382px] w-[312px] flex-col justify-between md:h-[390px] md:w-[384px] xl:mt-[155px] xl:h-[388px] xl:w-[1188px] xl:flex-row xl:items-end">
          {imagesForCard('one')}
          <div>
            <h3 className="mb-4 text-left text-2xl text-[24px] font-bold text-black-950 md:mb-5 xl:mb-[40px] xl:text-3xl xl:leading-[46px]">
              명언이나 글귀,
              <br /> 토막 상식들을 공유해 보세요.
            </h3>
            <span className="block text-xl font-normal text-blue-600 md:inline xl:block xl:text-2xl xl:text-[24px]">
              나만 알던 소중한 글들을
            </span>
            <span className="block text-xl font-normal text-blue-600 md:inline xl:block xl:text-2xl xl:text-[24px]">
              {' '}
              다른 사람들에게 전파하세요.
            </span>
          </div>
        </div>
        <div className="flex h-[355px] w-[312px] flex-col justify-between md:h-[390px] md:w-[384px] xl:h-[388px] xl:w-[1195px] xl:flex-row-reverse xl:items-end">
          {imagesForCard('two')}
          <div className="text-right">
            <h3 className="mb-4 text-2xl text-[24px] font-bold text-black-950 md:mb-5 xl:mb-[40px] xl:text-3xl xl:leading-[46px]">
              감정 상태에 따라, <br />
              알맞은 위로를 받을 수 있어요.
            </h3>
            <span className="block text-xl font-normal text-blue-600 xl:text-2xl xl:text-[24px]">
              태그를 통해 글을 모아 볼 수 있어요.
            </span>
          </div>
        </div>
        <div className="flex h-[381px] w-[312px] flex-col justify-between md:h-[390px] md:w-[384px] xl:h-[388px] xl:w-[1186px] xl:flex-row xl:items-end">
          {imagesForCard('three')}
          <div>
            <h3 className="mb-4 text-left text-2xl text-[24px] font-bold text-black-950 md:mb-5 xl:mb-[40px] xl:text-3xl xl:leading-[46px]">
              내가 요즘 어떤 감정 상태인지
              <br /> 통계로 한눈에 볼 수 있어요.
            </h3>
            <span className="text-xl font-normal text-blue-600 md:inline xl:block xl:text-2xl xl:text-[24px]">
              감정 달력으로
            </span>
            <span className="text-xl font-normal text-blue-600 xl:text-2xl xl:text-[24px]">
              {' '}
              내 마음에 담긴
            </span>
            <span className="block text-xl font-normal text-blue-600 md:inline xl:text-2xl xl:text-[24px]">
              {' '}
              감정을 확인해보세요.
            </span>
          </div>
        </div>
        <div className="mb-[35px] flex h-[100%] w-[312px] flex-col justify-between md:mb-[45px] md:w-[384px] xl:mb-[75px] xl:w-[640px]">
          <h3 className="mb-[40px] text-center text-2xl text-[24px] font-bold text-black-950 xl:mb-[100px] xl:text-3xl xl:leading-[46px]">
            사용자들이 직접 <br />
            인용한 에피그램들
          </h3>
          {imagesForCard('four')}
        </div>
        <div className="absolute bottom-[-13px] left-0 h-[40px] w-full scale-y-[-1] bg-zigzag-pattern" />
      </div>

      <div className="flex h-[600px] w-full flex-col items-center bg-striped md:h-[528px] xl:h-[1040px]">
        <div className="mb-[270px] mt-[180px] flex h-[150px] w-[122px] flex-col items-center justify-between md:mb-[198px] md:mt-[180px] xl:mb-[403px] xl:mt-[420px] xl:h-[217px] xl:w-[286px]">
          <div>
            <Image
              src="/assets/icons/logo_epigram.svg"
              alt="에피그램로고"
              width={122}
              height={70}
              priority
              className="xl:h-[105px] xl:w-[184px]"
            />
          </div>
          <ButtonStart text="시작하기" />
        </div>
      </div>
    </div>
=======
    <>
      <EmotionBoard />
      <EmotionCalender />
    </>
>>>>>>> 781eac8 (🐛 용인님 리뷰수정작업)
  );
}

//참고사항
// <Calendar
// locale="en"        //이거 때문에 렌더링이 다른거였어요
// onChange={onChange}
// value={value}
// next2Label={null}
// prev2Label={null}
// formatDay={(locale, date) => moment(date).format('D')}
// tileContent={addContent}
// showNeighboringMonth={false}
// onActiveStartDateChange={({ activeStartDate }) =>
//   getActiveMonth(activeStartDate)
// }
// />
// locale : 언어 ('ko'도 가능)
// onChange : 선택에 따라 value 변경하는 함수 (setValue의 역할)
// value : 선택한 날짜 (Date 형태)
// next2Label / prev2Label : 년 단위 이동 버튼
// formatDay : 날짜 형태 바꾸는 함수
// tileContent : 날짜 칸에 보여지는 콘텐츠
// showNeighboringMonth : 앞뒤 달의 이어지는 날짜 보여주기 여부
// onActiveStartDateChange : 활성화된(현재 보여지는) 년, 월, 일이 변경될 때마다 실행
// (인자 activeStartDate : 활성화된 년, 월, 일의 가장 첫 날짜)

//참고 블로그 글, 우리 구현 내용이랑 거의 일치해서 css만 만지면 됩니다.
//https://velog.io/@pikadev1771/react-calendar-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0-%EB%82%A0%EC%A7%9C-%EB%B3%80%ED%99%98-%ED%98%84%EC%9E%AC-%EB%8B%AC-%EA%B5%AC%ED%95%98%EA%B8%B0-%EC%BD%98%ED%85%90%EC%B8%A0-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0
