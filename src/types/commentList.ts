export interface CommentList {
  totalCount: number;
  nextCursor: number;
  list: CommentItem[];
}

export interface CommentItem {
  id: number;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  epigramId: number;
}

interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}
