import { EpigramList } from '@/types/epigramList';

export const getEpigramDatas = async (limit: number) => {
  try {
    const res = await fetch(
      `https://fe-project-epigram-api.vercel.app/6-10/epigrams?limit=${limit}`,
      { cache: 'no-cache' }, // 이 옵션을 넣어줘야지 최신 데이터를 가져올 수 있음
    );
    if (!res.ok) {
      throw new Error(`에러발생 : ${res.status}`);
    }
    const data: EpigramList = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
