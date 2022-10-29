import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { IEventCallback } from '../interface';
import { addNewEvent } from '../service';

export const useAddNewEvent = (callback: IEventCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EVENT_LIST);
  return {
    ...useMutation(addNewEvent, {
      onSuccess: (_result, _variables, context) => {
        if (!context) return;
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
