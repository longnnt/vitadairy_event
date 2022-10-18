import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreAdminSearchParams, IDataStore } from '../interfaces';
import { getStoreAdmin } from '../services';

export function useGetStoreAdmin(params: IStoreAdminSearchParams) {
  const query = useQuery<IDataStore>([QUERY_KEYS.STORE_ADMIN, params], () => getStoreAdmin(params));
  return { data: query.data || ({} as IDataStore), isLoading: query.isLoading };
}
