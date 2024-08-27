import Cookies from 'js-cookie';
import { instance } from './AxiosInstance';

interface Content {
  image: string;
  nickname: string;
}

export const patchUserProfileUpdate = async (
  image: string,
  nickname: string,
) => {
  const content: Content = { image: image, nickname: nickname };
  try {
    const token = Cookies.get('token');
    const response = await instance.patch(`/users/me`, content, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
