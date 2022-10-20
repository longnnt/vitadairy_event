import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreAdminCallback } from '../interfaces';
import { exportStoreAdmin } from '../services';

export function useExportFile(callback: IStoreAdminCallback) {
  const queryClient = useQueryClient();

  return useMutation(exportStoreAdmin, {
    onSuccess: (rs, _variables) => {
      if (rs.data?.meta?.status === 1000) {
        queryClient.invalidateQueries([QUERY_KEYS.STORE_ADMIN]);
        callback.onSuccess && callback.onSuccess();
      } else {
        callback.onError && callback.onError();
      }
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError();
    },
  });
}
