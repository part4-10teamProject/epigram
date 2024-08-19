export interface EpigramList {
  totalCount: number;
  nextCursor: number;
  list: Epigrams[];
}

export interface Epigrams {
  likeCount: number;
  tags: Tags[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
  isLiked?: boolean;
}

interface Tags {
  name: string;
  id: number;
}
