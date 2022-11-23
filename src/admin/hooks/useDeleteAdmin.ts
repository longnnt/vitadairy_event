import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAdminCallback } from '../interfaces';
import { deleteAdmin } from '../services';

export function useDeleteAdmin(callback: IAdminCallback) {
  const queryClient = useQueryClient();
  console.log(queryClient.getQueryCache())
   
  return useMutation((id: number) => deleteAdmin(id), {
    onSuccess: (_rs, _variables) => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.ADMIN])
        .forEach(({ queryKey }) => {
          console.log(queryKey)
          queryClient.invalidateQueries(queryKey);
        });
      console.log(_rs)
      console.log(_variables)
      callback.onSuccess && callback.onSuccess();
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}
