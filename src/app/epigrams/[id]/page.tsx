'use client';

import DetailCommentList from '@/components/detailPage/DetailCommentList';
import EpigramDetails from '@/components/detailPage/EpigramDetails';

const mockData = {
  likeCount: 4,
  tags: [
    {
      name: '태그1111',
      id: 1,
    },
    {
      name: '태그2222',
      id: 2,
    },
  ],
  writerId: 1,
  referenceUrl: 'https://www.naver.com',
  referenceTitle: '왕도로 가는길!',
  author: '앙드레 말로',
  content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
  id: 356,
  isLiked: true,
};

const DetailPage = () => {
  return (
    <div>
      <div className="h-[300px] bg-striped md:h-[366px] xl:h-[400px]">
        <div className="mx-auto w-[312px] pt-10 md:w-[384px] xl:w-[640px]">
          <EpigramDetails epigram={mockData} />
        </div>
      </div>
      <div className="relative h-screen bg-background">
        <div className="absolute left-0 top-[-15px] h-[40px] w-full bg-zigzag-pattern">
          <div className="mx-auto mt-20 md:w-[384px] xl:w-[640px]">
            <div>
              <DetailCommentList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
