import { instance } from './AxiosInstance';
import Cookies from 'js-cookie';

export const getDetailCommentData = async (
  id: number,
  cursor: number,
  firstdata: number,
  limitNumber: number,
) => {
  const limit = cursor === 0 ? firstdata : limitNumber;

  try {
    const token = Cookies.get('token');
    const response = await instance.get(
      `/epigrams/${id}/comments?limit=${limit}&cursor=${cursor}`,
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
