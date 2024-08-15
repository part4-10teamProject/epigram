import FeedCard from './FeedCard';
import testImg from '../../../public/assets/images/close.png'; // 일단 임시로 지금 추가되어있는 이미지를 넣어놓음 나중에 메인페이지 머지되면 그때 추가되는 이미지를 여기에 넣을거임
import Image from 'next/image';

const FeedEpigramList = () => {
  const epigrams = [
    {
      likeCount: 0,
      id: 334,
      content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
      author: '앙드레 말로',
      referenceTitle: 'string',
      referenceUrl: 'https://example.com/...',
      writerId: 760,
      tags: [
        {
          id: 220,
          name: '무당',
        },
      ],
    },
    {
      likeCount: 0,
      id: 335,
      content:
        '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지. ',
      author: '익명',
      referenceTitle: 'string',
      referenceUrl: 'https://example.com/...',
      writerId: 760,
      tags: [
        {
          id: 220,
          name: '나아가야할때',
        },
        {
          id: 221,
          name: '꿈을이루고싶을떄',
        },
      ],
    },
    {
      likeCount: 0,
      id: 335,
      content:
        '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지. ',
      author: '익명',
      referenceTitle: 'string',
      referenceUrl: 'https://example.com/...',
      writerId: 760,
      tags: [
        {
          id: 220,
          name: '나아가야할때',
        },
        {
          id: 221,
          name: '꿈을이루고싶을떄',
        },
      ],
    },
    {
      likeCount: 0,
      id: 334,
      content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
      author: '앙드레 말로',
      referenceTitle: 'string',
      referenceUrl: 'https://example.com/...',
      writerId: 760,
      tags: [
        {
          id: 220,
          name: '무당',
        },
      ],
    },
    {
      likeCount: 0,
      id: 334,
      content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
      author: '앙드레 말로',
      referenceTitle: 'string',
      referenceUrl: 'https://example.com/...',
      writerId: 760,
      tags: [
        {
          id: 220,
          name: '무당',
        },
      ],
    },
    {
      likeCount: 0,
      id: 335,
      content:
        '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지. ',
      author: '익명',
      referenceTitle: 'string',
      referenceUrl: 'https://example.com/...',
      writerId: 760,
      tags: [
        {
          id: 220,
          name: '나아가야할때',
        },
        {
          id: 221,
          name: '꿈을이루고싶을떄',
        },
      ],
    },
  ];
  return (
    <div>
      <h1 className="mb-9 text-xl font-semibold xl:text-[24px] xl:leading-8">
        피드
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-10">
        {epigrams.map((epigram) => (
          <FeedCard key={epigram.id} epigramData={epigram} />
        ))}
      </div>
      <div className="flex justify-center pt-20">
        <button className="flex items-center justify-center gap-2 rounded-full border border-[#CFDBEA] px-10 py-3 text-blue-500">
          <Image src={testImg} alt="추가하기" />
          <p className="text-lg xl:text-2xl">에피그램 더보기</p>
        </button>
      </div>
    </div>
  );
};

export default FeedEpigramList;
