import { IStoreActive } from './../interfaces';
import { codeSelector } from './../storeAdmin.slice';
import { useSelector } from 'src/common/redux/store';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getActiveStore } from '../services';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { cancelMultiQueries } from 'src/common/utils/cacelCategoryInvalidate';
import { IStoreAdminCallback } from '../interfaces';

export function useGetStoreActive(callback: IStoreAdminCallback) {
  const queryClient = useQueryClient();
  // console.log('active',queryClient.getQueryCache())
  return useMutation(getActiveStore, {
    onSuccess: (_rs, _variables) => {
      console.log('storeadsadas',queryClient.getQueryData([QUERY_KEYS.STORE_ADMIN]))
      console.log(queryClient.getQueryCache())
      queryClient
        .getQueryCache()
        .findAll(QUERY_KEYS.STORE_ADMIN)
        .forEach(({ queryKey }) => {
          // console.log(queryKey)
          // queryClient.invalidateQueries(queryKey);
        });
      callback.onSuccess && callback.onSuccess();
      // console.log(_rs)
      // console.log(_variables)
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}
