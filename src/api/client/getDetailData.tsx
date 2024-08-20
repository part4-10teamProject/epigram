import { instance } from './AxiosInstance';

export const getDetailData = async (id: string) => {
  try {
    const response = await instance.get(`/epigrams/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
