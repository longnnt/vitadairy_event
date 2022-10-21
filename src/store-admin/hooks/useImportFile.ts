import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { SuccessUploadCode } from '../constants';
import { IStoreAdminCallback } from '../interfaces';
import { importStoreAdmin } from '../services';

export function useImportFile(callback: IStoreAdminCallback) {
  const queryClient = useQueryClient();

  return useMutation(importStoreAdmin, {
    onSuccess: (rs, _variables) => {
      if (rs.data?.meta?.status === SuccessUploadCode) {
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
