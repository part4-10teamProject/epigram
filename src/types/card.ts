export interface ResponseData {
  likeCount: number;
  tags: {
    name: string | JSX.Element[]; //검색페이지에서 하이라이트된 <span>태그를 감싼 텍스트가 보여야하기 때문에 수정합니다
    id: number;
  }[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string | JSX.Element[];
  content: string | JSX.Element[];
  id: number;
  isLiked: boolean;
}
