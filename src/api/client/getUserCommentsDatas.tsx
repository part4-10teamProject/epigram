import { instance } from '@/api/AxiosInstance';
import Cookies from 'js-cookie';

export const getUserCommentDatas = async (
  cursor: number,
  limitNumber: number,
  userId: number,
) => {
  const token = Cookies.get('token');
  const limit = cursor === 0 ? 4 : limitNumber;
  try {
    const response = await instance.get(
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
