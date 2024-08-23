import { instance } from './AxiosInstance';
import Cookies from 'js-cookie';

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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODI2LCJ0ZWFtSWQiOiI2LTEwIiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjQzOTMwMzAsImV4cCI6MTcyNDM5NDgzMCwiaXNzIjoic3AtZXBpZ3JhbSJ9.mv3hUvC2_pkx60p20as0tOl6xNM1j0SI5UOCbNaxGCA`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('에피그램이 등록되지 않았습니다!');
  }
};
