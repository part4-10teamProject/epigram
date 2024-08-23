import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { getUserMe } from '@/api/client/getUserMe';

export const useUserInfo = () => {
  const token = Cookies.get('token');

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      if (!token) {
        throw new Error('No token found');
      }
      return await getUserMe(token);
    },
    enabled: !!token,
    retry: false,
  });
};
