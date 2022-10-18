import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { IAdminCallback, IResAdmins } from '../interfaces';
import { deleteAdmin } from '../services';
import { cancelMultiQueries } from 'src/common/utils/cacelCategoryInvalidate';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

export function useDeleteAdmin(callback: IAdminCallback) {
  const queryClient = useQueryClient();
  return useMutation((ids: number[]) => deleteAdmin(ids), {
    onSuccess: (_rs, _variables) => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.ADMIN])
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
