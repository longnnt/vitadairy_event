
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListGroupEventCallback } from '../interfaces';
import { editGroupEvent } from '../services';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';


export const useEditNewGroupEvent = (callback: IListGroupEventCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EDIT_GROUP_EVENT);
  return {
    ...useMutation(editGroupEvent, {
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
