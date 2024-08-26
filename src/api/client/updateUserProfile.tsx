import axios, { AxiosError } from 'axios';

interface UserProfileData {
  image: string;
  nickname: string;
}

const updateUserProfile = async (profileData: UserProfileData) => {
  try {
    const { data } = await axios.patch('users/me', profileData); // 실제 API 엔드포인트로 교체
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러 처리
      console.error(
        'Failed to update profile:',
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || 'Failed to update profile',
      );
    } else {
      // 기타 에러 처리
      console.error('An unexpected error occurred:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export default updateUserProfile;
