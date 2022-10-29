import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { cancelMultiQueries } from 'src/common/utils/cacelCategoryInvalidate';
import { deleteEvents } from '../service';
import { getRelatedCacheKeys } from './../../common/utils/getRelatedCacheKeys';
import { IEventCallback, IResEvents } from './../interface';

export function useDeleteEvents(callback: IEventCallback) {
  const queryClient = useQueryClient();
  return useMutation((eventIds) => deleteEvents(eventIds), {
    onMutate: async (eventIds: number[]) => {
      const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.DELETE_EVENT_LIST);

      cancelMultiQueries(queryClient, keys);

      const previousEvent = keys.map(
        (key) => queryClient.getQueryData<IResEvents>(key) || ({} as IResEvents)
      );
      keys.forEach((queryKey) => {
        queryClient.setQueryData<IResEvents>(queryKey, (old) => {
          if (!old) return {} as IResEvents;
          const newEvents = (old.data || []).filter((p) => !eventIds.includes(+p.id));
          const total = old.total - (old.data.length - newEvents.length);
          return {
            data: [...newEvents],
            total,
          };
        });
      });

      return { previousEvent, keys };
    },

    onSuccess: (_rs, _variables) => {
      if (_rs?.data.meta.msg === 'OK') {
        queryClient
          .getQueryCache()
          .findAll([QUERY_KEYS.EVENT_LIST])
          .forEach(({ queryKey }) => {
            queryClient.invalidateQueries(queryKey);
          });
        callback.onSuccess && callback.onSuccess();
      } else {
        callback.onSuccessSend && callback.onSuccessSend();
      }
    },
    onError: (_error, _variables) => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}
