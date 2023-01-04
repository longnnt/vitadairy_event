import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListGroupEventCallback } from '../interfaces';
import { deleteListPrizeAdmin } from 'src/event/list-prize/services';
import { deleteGroupEvent } from '../services';

export function useDeleteGroupEvent(callback: IListGroupEventCallback) {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteGroupEvent(id), {
    onSuccess: (_rs, _variables) => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.EVENT_LIST_GROUP_EVENT])
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
