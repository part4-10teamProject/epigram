import { Epigrams } from '@/types/epigramList';

export const getTodayData = async () => {
  try {
    const res = await fetch(
      'https://fe-project-epigram-api.vercel.app/6-10/epigrams/today',
      { cache: 'no-cache' },
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
