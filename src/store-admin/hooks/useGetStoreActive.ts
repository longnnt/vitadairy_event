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
  return useMutation(getActiveStore, {
    onMutate: () => {
      const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.STORE_ADMIN);
      cancelMultiQueries(queryClient, keys);
      const previousTodos = queryClient.getQueryData(keys)
      // queryClient.setQueryData([QUERY_KEYS.STORE_ADMIN])
      return { previousTodos }
    },
    onSuccess: (_rs, _variables) => {
      queryClient
      .getQueryCache()
      .findAll(QUERY_KEYS.STORE_ADMIN)
      .forEach(({ queryKey }) => {
        queryClient.invalidateQueries(queryKey);
      });
      callback.onSuccess && callback.onSuccess();
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}
