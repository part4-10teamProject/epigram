export interface ResponseData {
  likeCount: number;
  tags: {
    name: string;
    id: number;
  }[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
}
