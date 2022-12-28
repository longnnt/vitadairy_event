import { useSelector } from 'src/common/redux/store';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { updateEventStatus } from '../service';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { cancelMultiQueries } from 'src/common/utils/cacelCategoryInvalidate';
import { IUpdateEventCallback } from '../interface';

export function useUpdateEventStatus(callback: IUpdateEventCallback) {
  const queryClient = useQueryClient();
  return useMutation(updateEventStatus, {
    onSuccess: (_rs, _variables) => {
      queryClient
      .getQueryCache()
      .findAll(QUERY_KEYS.EVENT_LIST)
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
