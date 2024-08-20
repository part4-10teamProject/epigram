import { instance } from './AxiosInstance';

export const getNewCommentDatas = async (
  cursor: number,
  limitNumber: number,
) => {
  const limit = cursor === 0 ? 4 : limitNumber;
  try {
    const res = await instance.get(`/comments?limit=${limit}&cursor=${cursor}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
