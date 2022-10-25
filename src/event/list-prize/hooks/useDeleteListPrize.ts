import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreAdminCallback } from '../interfaces';
import { deleteListPrizeAdmin } from '../services';



export function useDeleteListPrizeAdmin(callback: IStoreAdminCallback) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteListPrizeAdmin(id), {
    onSuccess: (_rs, _variables) => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.EVENT_PRIZE_HISTORY])
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
