import { Epigrams } from '@/types/epigramList';

export const getTodayEpigramData = async () => {
  try {
    const res = await fetch(
      'https://fe-project-epigram-api.vercel.app/6-10/epigrams/today',
      { cache: 'no-cache' }, // no-cache를 해야지 서버에서최신 데이터를 가져올 수 있음
    );
    if (!res.ok) {
      throw new Error(`에러발생 : ${res.status}`);
    }
    const data: Epigrams = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
