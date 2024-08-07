import Card from '../common/Card';
import { Epigrams } from '@/types/epigramList';

interface TodayProps {
  todayData: Epigrams;
}

const TodayCard: React.FC<TodayProps> = ({ todayData }) => {
  return (
    <div className="flex flex-col gap-[20px] xl:gap-[40px]">
      <h1 className="text-xl font-semibold xl:text-[24px] xl:leading-8">
        오늘의 에피그램
      </h1>
      <div>
        <Card responseData={todayData} />
      </div>
    </div>
  );
};

export default TodayCard;
