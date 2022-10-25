import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListPrizeCallback } from '../interfaces';
import { deleteListPrizeAdmin } from '../services';

export function useDeleteListPrizeAdmin(callback: IListPrizeCallback) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteListPrizeAdmin(id), {
    onSuccess: (_rs, _variables) => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.EVENT_LIST_PRIZE])
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
