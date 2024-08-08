import { Epigrams } from '@/types/epigramList';
import Card from '../common/Card';

interface EpigramsProps {
  epigrams: Epigrams[];
}

const NewEpigramList: React.FC<EpigramsProps> = ({ epigrams }) => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl font-semibold xl:text-[24px] xl:leading-8">
        최신 에피그램
      </h1>
      <div>
        <div className="flex flex-col gap-4">
          {epigrams.map((epigram) => (
            <div key={epigram.id}>
              <Card responseData={epigram} />
            </div>
          ))}
        </div>
        <div className="mt-[72px] text-center">
          <button className="rounded-full border border-[#CFDBEA] px-[20px] py-3 text-lg font-medium text-[#8B9DBC] xl:px-[50px] xl:text-2xl">
            + 에피그램 더보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEpigramList;
