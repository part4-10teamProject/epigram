import { instance } from './AxiosInstance';

export const getCalendarData = async (
  id: number,
  year: number,
  month: number,
) => {
  try {
    const response = await instance.get(
      `/emotionLogs/monthly?userId=${id}&year=${year}&month=${month}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
