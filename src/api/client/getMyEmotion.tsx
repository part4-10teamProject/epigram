import { instance } from './AxiosInstance';

export const getMyEmotion = async (id: number) => {
  try {
    const response = await instance.get(`/emotionLogs/today?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
