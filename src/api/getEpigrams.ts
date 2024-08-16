import { instance } from './AxiosInstance';
import { FetchDataResponse } from '@/types/search';

interface FetchDataParams {
  limit?: number;
  cursor?: number | null;
  keyword?: string;
  writerId?: number;
}

export const fetchData = async ({
  limit = 3,
  cursor,
  keyword,
  writerId,
}: FetchDataParams): Promise<FetchDataResponse> => {
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
