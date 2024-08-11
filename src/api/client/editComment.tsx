import { instance } from './AxiosInstance';
import Cookies from 'js-cookie';

interface EditContentItem {
  isPrivate: boolean;
  content: string;
}

export const editComment = async (id: number, content: EditContentItem) => {
  try {
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('토큰이 없습니다');
    }

    const response = await instance.patch(`/comments/${id}`, content, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
