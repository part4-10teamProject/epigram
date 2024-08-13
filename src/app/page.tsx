// 'use client';

// import { useEffect, useState } from 'react';

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
/*export default function Home() {
  return <div>랜딩페이지</div>;
}*/

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
