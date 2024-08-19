import { instance } from './AxiosInstance';

export const getNewFeedDatas = async (
  // cursor로 마지막 데이터 id를 받고 limitNumber로 몇개의 데이터를 가져올건지 작성
  cursor: number,
  firstdata: number, // 처음에 가져올 데이터 갯수
  limitNumber: number,
) => {
  const limit = cursor === 0 ? firstdata : limitNumber;
  try {
    const res = await instance.get(`epigrams?limit=${limit}&cursor=${cursor}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
