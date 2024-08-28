import { instance } from './AxiosInstance';

export const getUserEpigramDatas = async (
  cursor: number,
  limitNumber: number,
  userId: number,
) => {
  const limit = cursor === 0 ? 3 : limitNumber;
  try {
    const response = await instance.get(
      `/epigrams?limit=${limit}&cursor=${cursor}&writerId=${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
