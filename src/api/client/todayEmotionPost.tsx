import { instance } from './AxiosInstance';
import Cookies from 'js-cookie';

interface TodayEmotionItem {
  emotion: string;
}

export const todayEmotionPost = async (emoji: TodayEmotionItem) => {
  try {
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('토큰이 없습니다');
    }

    const response = await instance.post('/emotionLogs/today', emoji, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
