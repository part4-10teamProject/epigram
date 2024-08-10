import { instance } from './AxiosInstance';

interface FetchDataParams {
  limit?: number;
  cursor?: string;
  keyword?: string;
  writerId?: number;
}

export const fetchData = async ({
  limit = 5,
  cursor,
  keyword,
  writerId,
}: FetchDataParams) => {
  const response = await instance.get('/epigrams', {
    params: {
      limit,
      cursor,
      keyword,
      writerId,
    },
  });
  return response.data;
};
