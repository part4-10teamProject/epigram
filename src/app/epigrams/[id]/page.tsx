'use client';

import { getDetailData } from '@/api/client/getDetailData';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import DetailCommentList from '@/components/detailPage/DetailCommentList';
import EpigramDetails from '@/components/detailPage/EpigramDetails';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const DetailPage = () => {
  const { id } = useParams();
  const Id = Array.isArray(id) ? id[0] : id;

  const { data, isLoading } = useQuery({
    queryKey: ['detailData'],
    queryFn: () => getDetailData(Id),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="h-[300px] bg-striped md:h-[366px] xl:h-[400px]">
        <div className="mx-auto w-[312px] pt-10 md:w-[384px] xl:w-[640px]">
          <EpigramDetails epigram={data} />
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
