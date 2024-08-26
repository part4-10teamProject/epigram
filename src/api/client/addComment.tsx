import Cookies from 'js-cookie';
import { instance } from './AxiosInstance';

interface AddCommentType {
  epigramId: number;
  isPrivate: boolean;
  content: string;
}

export const addComment = async (content: AddCommentType) => {
  const token = Cookies.get('token');
  try {
    const response = await instance.post(`/comments`, content, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
