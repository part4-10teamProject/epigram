export interface Tag {
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

export interface FetchDataResponse {
  totalCount: number;
  nextCursor: number | null; // 다음 페이지의 cursor, 없으면 null
  list: DataItem[];
}

export interface PaginatedFetchDataResponse {
  pages: FetchDataResponse[];
  pageParams: (number | undefined)[];
}

export interface HighlightedTag {
  name: JSX.Element;
  id: number; // 하이라이트된 텍스트
}

export interface HighlightedDataItem {
  id: number;
  author: JSX.Element;
  content: JSX.Element;
  tags: HighlightedTag[];
  likeCount: number;
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  isLiked: boolean;
}
