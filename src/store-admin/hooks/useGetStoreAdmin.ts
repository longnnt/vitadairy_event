import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreAdminSearchParams, IDataStore } from '../interfaces';
import { getStoreAdmin } from '../services';

export function useGetStoreAdmin(params: IStoreAdminSearchParams) {
  return {
    ...useQuery([QUERY_KEYS.STORE_ADMIN, params], () =>
      getStoreAdmin(params)
    ),
  };
};
