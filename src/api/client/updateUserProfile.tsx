import axios from 'axios';

const updateUserProfile = async (profileData) => {
  const { data } = await axios.patch(
    'https://api.example.com/user/profile',
    profileData,
  ); // 실제 API 엔드포인트로 교체
  return data;
};

export default updateUserProfile;
