import FeedEpigramList from '@/components/feedPage/FeedEpigramList';

const feedPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[312px] py-8 md:max-w-[600px] xl:max-w-[1200px] xl:pt-28">
        <FeedEpigramList />
      </div>
    </div>
  );
};

export default feedPage;
