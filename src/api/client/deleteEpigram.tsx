import Cookies from 'js-cookie';
import { instance } from './AxiosInstance';

export const deleteEpigram = async (id: number) => {
  const token = Cookies.get('token');
  try {
    await instance.delete(`/epigrams/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};
