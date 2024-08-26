import { instance } from './AxiosInstance';
import Cookies from 'js-cookie';

export const getDetailData = async (id: string) => {
  const token = Cookies.get('token');
  try {
    const response = await instance.get(`/epigrams/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
