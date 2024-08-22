import { instance } from './AxiosInstance';
import Cookies from 'js-cookie';

export interface Addepigram {
  tags: string;
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODI2LCJ0ZWFtSWQiOiI2LTEwIiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjQzMTU2MDgsImV4cCI6MTcyNDMxNzQwOCwiaXNzIjoic3AtZXBpZ3JhbSJ9.67s-Fw61Adx_UdzmcXclYr0qNMAre2S_lsG1OM8kGQY`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('에피그램이 등록되지 않았습니다!');
  }
};
