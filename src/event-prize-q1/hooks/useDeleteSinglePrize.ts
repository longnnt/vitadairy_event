import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreAdminCallback } from '../interface';
import { deleteSinglePrize } from '../services';

export function useDeleteListPrizeAdmin(callback: IStoreAdminCallback) {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteSinglePrize(id), {
    onSuccess: (_rs, _variables) => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.EVENT_LIST_PRIZE_Q1])
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