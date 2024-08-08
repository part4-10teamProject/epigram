import Card from '@/components/common/Card';

const mockdata = {
  likeCount: 1,
  tags: [
    {
      name: 'string',
      id: 1,
    },
  ],
  writerId: 1,
  referenceUrl: 'string',
  referenceTitle: 'string',
  author: 'string',
  content: 'string',
  id: 1,
  isLiked: true,
};

const SignUpPage = () => {
  return (
    <div>
      <Card responseData={mockdata} />
    </div>
  );
};

export default SignUpPage;
