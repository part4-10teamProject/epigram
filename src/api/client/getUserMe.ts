import { instance } from '../client/AxiosInstance';
import Cookies from 'js-cookie';

const refreshToken = async () => {
  const refreshToken = Cookies.get('refresh');
  if (!refreshToken) throw new Error('No refresh token found');

  try {
    const response = await instance.post('/auth/refresh-token', {
      refreshToken,
    });
    Cookies.set('token', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

export const getUserMe = async (token: string) => {
  try {
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('토큰이 없습니다');
    }
    const response = await instance.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Unauthorized
      const newToken = await refreshToken();
      Cookies.set('token', newToken);
      // 재시도
      const retryResponse = await instance.get('/users/me', {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
      return retryResponse.data;
    }
    throw new Error('Failed to fetch user data');
  }
};
