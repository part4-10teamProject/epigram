interface Tag {
  name: string;
  id: number;
}

export interface DataItem {
  likeCount: number;
  tags: Tag[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
}

interface HighlightedTag {
  name: JSX.Element[] | string;
  id: number;
}

export interface HighlightedDataItem {
  likeCount: number;
  tags: HighlightedTag[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: JSX.Element[] | string;
  content: JSX.Element[] | string;
  id: number;
  isLiked: boolean;
}
