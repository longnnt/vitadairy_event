import { useQuery, useQueryClient, QueryKey } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreParams } from '../interfaces';
import { getStoreAdmin } from '../services';

export function useGetStoreAdmin(params: IStoreParams) {
  // console.log(params)
  const queryClient = useQueryClient();
  // console.log('store',queryClient.getQueryData(QUERY_KEYS.STORE_ADMIN))
  return {
    ...useQuery([QUERY_KEYS.STORE_ADMIN], () => getStoreAdmin(params), {
      select: (data) => data?.data?.response,
      cacheTime:Infinity
    }),
  };
}
