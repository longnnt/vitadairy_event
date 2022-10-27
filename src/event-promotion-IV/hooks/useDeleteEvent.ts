import { getRelatedCacheKeys } from './../../common/utils/getRelatedCacheKeys';
import { IEventCallback, IResEvents } from './../interface';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { deleteEvents } from '../service';
import { cancelMultiQueries } from 'src/common/utils/cacelCategoryInvalidate';

// export function useDeleteEvents(callback: IEventCallback) {
export function useDeleteEvents() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(deleteEvents, {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.DELETE_EVENT_LIST]);
      },
    }),
  };

  // return useMutation((eventIds) => deleteEvents(eventIds), {

  //   onMutate: async (eventIds: number[]) => {
  //     const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.DELETE_EVENT_LIST);
  //     cancelMultiQueries(queryClient, keys);

  //     const previousEvent = keys.map(
  //       (key) => queryClient.getQueryData<IResEvents>(key) || ({} as IResEvents)
  //     );
  //     keys.forEach((queryKey) => {
  //       queryClient.setQueryData<IResEvents>(queryKey, (old) => {
  //         if (!old) return {} as IResEvents;
  //         const newEvents = (old.data || []).filter((p) => !eventIds.includes(+p.id));
  //         const total = old.total - (old.data.length - newEvents.length);
  //         return {
  //           data: [...newEvents],
  //           total,
  //         };
  //       });
  //     });

  //     return { previousEvent, keys };
  //   },
  //   onSuccess: (_result, _variables, context) => {
  //     console.log('im here');
  //     if (!context) return;
  //     context.keys.forEach((queryKey) => {
  //       queryClient.invalidateQueries(queryKey);
  //     });

  //     callback.onSuccess && callback.onSuccess();
  //   },
  //   onError: (_error, _variables, context) => {
  //     if (!context?.previousEvent || !context.previousEvent.length) return;
  //     callback.onError && callback.onError();

  //     context.keys.forEach((key, index) => {
  //       queryClient.setQueryData<IResEvents>(key, context?.previousEvent[index]);
  //     });
  //   },
  //   retry: 2,
  // });
}
