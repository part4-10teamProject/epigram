import Cookies from 'js-cookie';
import { instance } from './AxiosInstance';

export interface Addepigram {
  tags: string[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

export const AddEpigramPost = async (epigram: Addepigram) => {
  try {
    const token = Cookies.get('token');

    const response = await instance.post('/epigrams', epigram, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('에피그램이 등록되지 않았습니다!');
  }
};
