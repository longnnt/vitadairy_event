import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { IManageEventAdminCallback } from '../common/interface';
import { postCreateEventAdmin } from '../services';

export const usePostCreateEventAdmin = (callback: IManageEventAdminCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EVENT_LIST);
  return {
    ...useMutation(postCreateEventAdmin, {
      onSuccess: (_result, _variables) => {
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
