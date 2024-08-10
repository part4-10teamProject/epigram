import { CommentList } from '@/types/commentList';

export const getCommentsDatas = async (limit: number) => {
  try {
    const res = await fetch(
      `https://fe-project-epigram-api.vercel.app/6-10/comments?limit=${limit}`,
      { cache: 'no-cache' },
    );
    if (!res.ok) {
      throw new Error(`에러발생 : ${res.status}`);
    }
    const data: CommentList = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
