import { instance } from './AxiosInstance';
import Cookies from 'js-cookie';

export const deleteComment = async (id: number) => {
  try {
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('토큰이 없습니다');
    }

    const response = await instance.delete(`/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
