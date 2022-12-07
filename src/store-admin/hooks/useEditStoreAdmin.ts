import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreAdminCallback } from '../interfaces';
import { editStoreAdmin } from '../services';

export const useEditStoreAdmin = (callback: IStoreAdminCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editStoreAdmin, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.STORE_ADMIN_EDIT, variables.id]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
