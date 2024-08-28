import Cookies from 'js-cookie';
import { instance } from './AxiosInstance';
import { CommentList } from '@/types/commentList';

export const getUserCommentDatas = async (
  cursor: number,
  limitNumber: number,
  userId: number,
): Promise<CommentList | undefined> => {
  const token = Cookies.get('token');
  const limit = cursor === 0 ? 4 : limitNumber;
  try {
    const response = await instance.get<CommentList>(
      `users/${userId}/comments?limit=${limit}&cursor=${cursor}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
