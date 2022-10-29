import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IEventCallback } from '../interface';
import { editEventService } from '../service';

export const useEditEvent = (callback: IEventCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editEventService, {
      onSuccess: (_result, variables) => {
        console.log(_result);
        queryClient.invalidateQueries([QUERY_KEYS.EVENT_DETAIL, variables.id]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
