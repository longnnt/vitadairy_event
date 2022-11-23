import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreAdminCallback } from '../interfaces';
import { deleteStoreAdmin } from '../services';

export function useDeleteStoreAdmin(callback: IStoreAdminCallback) {
  const queryClient = useQueryClient();
  // console.log('Delete',queryClient.getQueryCache())
  return useMutation((id: string) => deleteStoreAdmin(id), {
    onSuccess: (_rs, _variables) => {
      // queryClient
      //   .getQueryCache()
      //   .findAll([QUERY_KEYS.STORE_ADMIN])
      //   .forEach(({ queryKey }) => {
      //     queryClient.invalidateQueries(queryKey);
      //   });
      callback.onSuccess && callback.onSuccess();
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}
