import { instance } from './AxiosInstance';
import Cookies from 'js-cookie';

export const postImgUpload = async (file) => {
  if (!file) return;
  const formData = new FormData();
  formData.append('image', file);
  try {
    const token = Cookies.get('token');
    const response = await instance.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
