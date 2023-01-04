import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IManageEventAdminCallback } from '../common/interface';
import { patchEventStatus } from '../services';

export function usePatchEvent(callback: IManageEventAdminCallback) {
  const queryClient = useQueryClient();
  return useMutation(patchEventStatus, {
    onSuccess: (_rs, _variables) => {
      queryClient
      .getQueryCache()
      .findAll(QUERY_KEYS.EVENT_ADMIN_CONTROLLER)
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
